import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3.23.8";

const NOTIFY_RECIPIENTS = [
  "Quinten.decort@tailorandfoster.com",
  "Bernard.decort@tailorandfoster.com",
];

const BodySchema = z.object({
  name: z.string().trim().min(1).max(200),
  company: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().min(1).max(50),
  topic: z.enum(["growth", "downsizing", "lease", "interventions", "other"]),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

const TOPIC_LABELS: Record<string, string> = {
  growth: "Groeistrategieën",
  downsizing: "Downsizing",
  lease: "Leasemanagement",
  interventions: "Kleine interventies",
  other: "Anders",
};

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
    const data = parsed.data;
    const message = data.message?.trim() || null;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: inserted, error: insertError } = await supabase
      .from("opportunity_scan_submissions")
      .insert({
        name: data.name,
        company: data.company,
        email: data.email,
        phone: data.phone,
        topic: data.topic,
        message,
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Insert failed:", insertError);
      return new Response(
        JSON.stringify({ error: "Kon aanvraag niet opslaan." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Try to send notification email to both recipients via Lovable Emails infra.
    // If email infrastructure/domain is not yet configured, the DB record is still saved.
    const emailResults = await Promise.allSettled(
      NOTIFY_RECIPIENTS.map((recipient) =>
        supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "opportunity-scan-notification",
            recipientEmail: recipient,
            idempotencyKey: `opp-scan-${inserted.id}-${recipient}`,
            templateData: {
              name: data.name,
              company: data.company,
              email: data.email,
              phone: data.phone,
              topic: TOPIC_LABELS[data.topic] ?? data.topic,
              message: message ?? "",
            },
          },
        }),
      ),
    );

    emailResults.forEach((r, i) => {
      if (r.status === "rejected") {
        console.warn(`Email notify failed for ${NOTIFY_RECIPIENTS[i]}:`, r.reason);
      } else if (r.value.error) {
        console.warn(`Email notify error for ${NOTIFY_RECIPIENTS[i]}:`, r.value.error);
      }
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("submit-opportunity-scan error:", err);
    return new Response(
      JSON.stringify({ error: "Onverwachte fout." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
