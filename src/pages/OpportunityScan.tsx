import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import opportunityScanHero from "@/assets/opportunity-scan-hero.jpg";
import { Handshake, CalendarCheck, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type Topic = "growth" | "downsizing" | "lease" | "interventions" | "other";

const OpportunityScan = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    topic: "" as Topic | "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.topic) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("submit-opportunity-scan", {
        body: {
          name: form.name.trim(),
          company: form.company.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          topic: form.topic,
          message: form.message.trim(),
        },
      });
      if (error) throw error;
      setSuccess(true);
    } catch (err) {
      console.error(err);
      toast({
        title: t("opportunityScan.form.error"),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="relative py-28 lg:py-36 overflow-hidden">
        <img
          src={opportunityScanHero}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary))]/85 via-[hsl(var(--primary))]/65 to-[hsl(var(--primary))]/35" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-white">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl text-[clamp(2rem,4vw,3.5rem)] leading-[1.15] font-bold font-serif"
          >
            {t("opportunityScan.hero.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-white/80"
          >
            {t("opportunityScan.hero.text")}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-3 max-w-2xl text-base leading-7 text-white/60"
          >
            {t("opportunityScan.hero.practicalDetail")}
          </motion.p>
        </div>
      </section>

      {/* Trust badges */}
      <section className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-border bg-card px-6 py-5 shadow-sm sm:px-10"
        >
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            {[
              { icon: Handshake, label: t("finalCta.benefit1") },
              { icon: CalendarCheck, label: t("finalCta.benefit2") },
              { icon: ShieldCheck, label: t("finalCta.benefit3") },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-2 text-foreground/80">
                <b.icon size={18} strokeWidth={2} className="text-primary/70" />
                <span className="text-sm font-medium tracking-wide">{b.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-3xl px-6 pb-20 pt-10 sm:px-8 lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center text-base leading-7 text-foreground/80"
        >
          {t("opportunityScan.hero.cta")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-border bg-card p-8 shadow-lg sm:p-10"
        >
          {success ? (
            <div className="flex flex-col items-center py-10 text-center">
              <CheckCircle2 size={48} className="text-primary mb-4" />
              <p className="text-lg text-foreground/90 max-w-md">
                {t("opportunityScan.form.success")}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("opportunityScan.form.name")}</Label>
                  <Input
                    id="name"
                    required
                    maxLength={200}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">{t("opportunityScan.form.company")}</Label>
                  <Input
                    id="company"
                    required
                    maxLength={200}
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("opportunityScan.form.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    maxLength={320}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("opportunityScan.form.phone")}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    maxLength={50}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic">{t("opportunityScan.form.topic")}</Label>
                <Select
                  value={form.topic}
                  onValueChange={(v) => setForm({ ...form, topic: v as Topic })}
                >
                  <SelectTrigger id="topic">
                    <SelectValue placeholder={t("opportunityScan.form.topic.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="growth">{t("opportunityScan.form.topic.growth")}</SelectItem>
                    <SelectItem value="downsizing">{t("opportunityScan.form.topic.downsizing")}</SelectItem>
                    <SelectItem value="lease">{t("opportunityScan.form.topic.lease")}</SelectItem>
                    <SelectItem value="interventions">{t("opportunityScan.form.topic.interventions")}</SelectItem>
                    <SelectItem value="other">{t("opportunityScan.form.topic.other")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{t("opportunityScan.form.message")}</Label>
                <Textarea
                  id="message"
                  rows={4}
                  maxLength={2000}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={submitting || !form.topic}
              >
                {submitting ? t("opportunityScan.form.submitting") : t("opportunityScan.form.submit")}
              </Button>
            </form>
          )}
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default OpportunityScan;
