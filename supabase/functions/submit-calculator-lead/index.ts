import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3.23.8";

const NOTIFY_RECIPIENTS = [
  "Quinten.decort@tailorandfoster.com",
  "Bernard.decort@tailorandfoster.com",
];

const CalcSchema = z.object({
  employees: z.number().int().nonnegative().optional().nullable(),
  surface: z.number().nonnegative().optional().nullable(),
  rent: z.number().nonnegative().optional().nullable(),
  region: z.string().max(50).optional().nullable(),
  utilities: z.number().nonnegative().optional().nullable(),
  services: z.number().nonnegative().optional().nullable(),
  fitout: z.number().nonnegative().optional().nullable(),
  term: z.number().int().nonnegative().optional().nullable(),
  days_per_week: z.number().int().min(1).max(5).optional().nullable(),
  cost_per_year: z.number().optional().nullable(),
  cost_per_employee: z.number().optional().nullable(),
  total_term: z.number().optional().nullable(),
  unused_sqm: z.number().optional().nullable(),
  unused_cost: z.number().optional().nullable(),
});

const GateBody = CalcSchema.extend({
  mode: z.literal("gate"),
  email: z.string().trim().email().max(320),
  company: z.string().trim().min(1).max(200),
  phone: z.string().trim().max(50).optional().nullable(),
});

const ActionBody = CalcSchema.extend({
  mode: z.literal("action"),
  id: z.string().uuid(),
  action: z.enum(["email_result", "plan_scan"]),
});

const ConfirmBody = CalcSchema.extend({
  mode: z.literal("confirm"),
  id: z.string().uuid(),
  wants_email: z.boolean(),
  wants_scan: z.boolean(),
});

const BodySchema = z.discriminatedUnion("mode", [GateBody, ActionBody, ConfirmBody]);

const fmt = (n: number | null | undefined) =>
  n === null || n === undefined ? "-" : Math.round(n).toString();

function summary(d: z.infer<typeof CalcSchema> & { company?: string; email?: string; phone?: string | null }) {
  return (
    `Bedrijf: ${d.company ?? "-"}\n` +
    `E-mail: ${d.email ?? "-"}\n` +
    `Telefoon: ${d.phone ?? "-"}\n\n` +
    `Medewerkers: ${d.employees ?? "-"}\n` +
    `Oppervlakte: ${d.surface ?? "-"} m²\n` +
    `Regio: ${d.region ?? "-"}\n` +
    `Maandhuur: €${d.rent ?? "-"}\n` +
    `Nutsvoorzieningen: €${d.utilities ?? "-"}\n` +
    `Diensten: €${d.services ?? "-"}\n` +
    `Inrichtingskost: €${d.fitout ?? "-"}\n` +
    `Looptijd: ${d.term ?? "-"} jaar\n` +
    `Kantoordagen/week: ${d.days_per_week ?? "-"}\n\n` +
    `Kost/jaar: €${fmt(d.cost_per_year)}\n` +
    `Kost/medewerker/jaar: €${fmt(d.cost_per_employee)}\n` +
    `Totaal over looptijd: €${fmt(d.total_term)}\n` +
    `Onbenutte ruimte: ${fmt(d.unused_sqm)} m² (€${fmt(d.unused_cost)}/jaar)`
  );
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: parsed.error.flatten() }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    const body = parsed.data;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    if (body.mode === "gate") {
      const { data: inserted, error } = await supabase
        .from("calculator_leads")
        .insert({
          email: body.email,
          company: body.company,
          phone: body.phone ?? null,
          employees: body.employees ?? null,
          surface: body.surface ?? null,
          rent: body.rent ?? null,
          region: body.region ?? null,
          utilities: body.utilities ?? null,
          services: body.services ?? null,
          fitout: body.fitout ?? null,
          term: body.term ?? null,
          days_per_week: body.days_per_week ?? null,
          cost_per_year: body.cost_per_year ?? null,
          cost_per_employee: body.cost_per_employee ?? null,
          total_term: body.total_term ?? null,
          unused_sqm: body.unused_sqm ?? null,
          unused_cost: body.unused_cost ?? null,
        })
        .select("id")
        .single();

      if (error) {
        console.error("Insert failed:", error);
        return new Response(
          JSON.stringify({ error: "Kon lead niet opslaan." }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      const msg =
        `Nieuwe kostencalculator-lead (gate gepasseerd)\n\n` +
        summary({ ...body });

      await Promise.allSettled(
        NOTIFY_RECIPIENTS.map((recipient) =>
          supabase.functions.invoke("send-transactional-email", {
            body: {
              templateName: "opportunity-scan-notification",
              recipientEmail: recipient,
              idempotencyKey: `calc-gate-${inserted.id}-${recipient}`,
              templateData: {
                name: "(kostencalculator gate)",
                company: body.company,
                email: body.email,
                phone: body.phone ?? "-",
                topic: "Kostencalculator — gate",
                message: msg,
              },
            },
          }),
        ),
      );

      return new Response(JSON.stringify({ ok: true, id: inserted.id }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // action mode
    const { data: updated, error: updateError } = await supabase
      .from("calculator_leads")
      .update({
        employees: body.employees ?? null,
        surface: body.surface ?? null,
        rent: body.rent ?? null,
        region: body.region ?? null,
        utilities: body.utilities ?? null,
        services: body.services ?? null,
        fitout: body.fitout ?? null,
        term: body.term ?? null,
        days_per_week: body.days_per_week ?? null,
        cost_per_year: body.cost_per_year ?? null,
        cost_per_employee: body.cost_per_employee ?? null,
        total_term: body.total_term ?? null,
        unused_sqm: body.unused_sqm ?? null,
        unused_cost: body.unused_cost ?? null,
        action_taken: body.action,
      })
      .eq("id", body.id)
      .select("id, email, company, phone")
      .single();

    if (updateError || !updated) {
      console.error("Update failed:", updateError);
      return new Response(
        JSON.stringify({ error: "Kon lead niet updaten." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const actionLabel =
      body.action === "email_result" ? "vroeg resultaat per e-mail" : "vraagt Opportunity Scan aan";

    const notify =
      `Kostencalculator vervolgactie: ${actionLabel}\n\n` +
      summary({
        ...body,
        company: updated.company,
        email: updated.email,
        phone: updated.phone,
      });

    const tasks: Promise<unknown>[] = NOTIFY_RECIPIENTS.map((recipient) =>
      supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "opportunity-scan-notification",
          recipientEmail: recipient,
          idempotencyKey: `calc-action-${body.action}-${updated.id}-${recipient}`,
          templateData: {
            name: "(kostencalculator vervolg)",
            company: updated.company,
            email: updated.email,
            phone: updated.phone ?? "-",
            topic: `Kostencalculator — ${actionLabel}`,
            message: notify,
          },
        },
      }),
    );

    // If the user asked for the result by email, also send it to them.
    if (body.action === "email_result" && updated.email) {
      tasks.push(
        supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "opportunity-scan-notification",
            recipientEmail: updated.email,
            idempotencyKey: `calc-result-${updated.id}`,
            templateData: {
              name: updated.company,
              company: updated.company,
              email: updated.email,
              phone: updated.phone ?? "-",
              topic: "Uw kostencalculator resultaat",
              message:
                `Bedankt voor uw interesse. Hieronder uw persoonlijke kostenoverzicht:\n\n` +
                summary({
                  ...body,
                  company: updated.company,
                  email: updated.email,
                  phone: updated.phone,
                }),
            },
          },
        }),
      );
    }

    await Promise.allSettled(tasks);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("submit-calculator-lead error:", err);
    return new Response(
      JSON.stringify({ error: "Onverwachte fout." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
