import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3.23.8";

const NOTIFY_RECIPIENTS = [
  "Quinten.decort@tailorandfoster.com",
  "Bernard.decort@tailorandfoster.com",
];

const BodySchema = z.object({
  email: z.string().trim().email().max(320),
  company: z.string().trim().min(1).max(200),
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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    const d = parsed.data;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: inserted, error: insertError } = await supabase
      .from("calculator_leads")
      .insert({
        email: d.email,
        company: d.company,
        employees: d.employees ?? null,
        surface: d.surface ?? null,
        rent: d.rent ?? null,
        region: d.region ?? null,
        utilities: d.utilities ?? null,
        services: d.services ?? null,
        fitout: d.fitout ?? null,
        term: d.term ?? null,
        days_per_week: d.days_per_week ?? null,
        cost_per_year: d.cost_per_year ?? null,
        cost_per_employee: d.cost_per_employee ?? null,
        total_term: d.total_term ?? null,
        unused_sqm: d.unused_sqm ?? null,
        unused_cost: d.unused_cost ?? null,
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Insert failed:", insertError);
      return new Response(
        JSON.stringify({ error: "Kon lead niet opslaan." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const summary =
      `Nieuwe kostencalculator-lead\n\n` +
      `Bedrijf: ${d.company}\n` +
      `E-mail: ${d.email}\n\n` +
      `Medewerkers: ${d.employees ?? "-"}\n` +
      `Oppervlakte: ${d.surface ?? "-"} m²\n` +
      `Regio: ${d.region ?? "-"}\n` +
      `Maandhuur: €${d.rent ?? "-"}\n` +
      `Nutsvoorzieningen: €${d.utilities ?? "-"}\n` +
      `Diensten: €${d.services ?? "-"}\n` +
      `Inrichtingskost: €${d.fitout ?? "-"}\n` +
      `Looptijd: ${d.term ?? "-"} jaar\n` +
      `Kantoordagen/week: ${d.days_per_week ?? "-"}\n\n` +
      `Kost/jaar: €${Math.round(d.cost_per_year ?? 0)}\n` +
      `Kost/medewerker/jaar: €${Math.round(d.cost_per_employee ?? 0)}\n` +
      `Totaal over looptijd: €${Math.round(d.total_term ?? 0)}\n` +
      `Onbenutte ruimte: ${Math.round(d.unused_sqm ?? 0)} m² (€${Math.round(d.unused_cost ?? 0)}/jaar)`;

    const emailResults = await Promise.allSettled(
      NOTIFY_RECIPIENTS.map((recipient) =>
        supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "opportunity-scan-notification",
            recipientEmail: recipient,
            idempotencyKey: `calc-lead-${inserted.id}-${recipient}`,
            templateData: {
              name: "(kostencalculator lead)",
              company: d.company,
              email: d.email,
              phone: "-",
              topic: "Kostencalculator",
              message: summary,
            },
          },
        }),
      ),
    );

    emailResults.forEach((r, i) => {
      if (r.status === "rejected") {
        console.warn(`Email notify failed for ${NOTIFY_RECIPIENTS[i]}:`, r.reason);
      } else if ((r.value as { error?: unknown }).error) {
        console.warn(`Email notify error for ${NOTIFY_RECIPIENTS[i]}:`, (r.value as { error?: unknown }).error);
      }
    });

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
