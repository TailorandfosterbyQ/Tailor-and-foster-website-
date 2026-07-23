import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CheckCircle2, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type Region = "brussel" | "gent-antwerpen" | "overige";
type Topic = "growth" | "downsizing" | "lease" | "interventions" | "other";

const OCCUPANCY_BY_DAYS: Record<number, number> = {
  1: 0.32,
  2: 0.40,
  3: 0.47,
  4: 0.52,
  5: 0.58,
};

const REGION_BENCH: Record<Region, { label: string; low: number; high: number }> = {
  "brussel": { label: "Brussel", low: 150, high: 300 },
  "gent-antwerpen": { label: "Gent/Antwerpen", low: 100, high: 180 },
  "overige": { label: "Overige regio", low: 60, high: 120 },
};

const fmtEuro = (n: number) =>
  new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(isFinite(n) ? n : 0);

const fmtNum = (n: number, digits = 1) =>
  new Intl.NumberFormat("nl-BE", { maximumFractionDigits: digits }).format(
    isFinite(n) ? n : 0
  );

const num = (v: string): number => {
  if (v === "" || v === null || v === undefined) return 0;
  const n = Number(v);
  return isFinite(n) ? n : 0;
};

const Kostencalculator = () => {
  // Empty starts with placeholders
  const [employees, setEmployees] = useState("");
  const [surface, setSurface] = useState("");
  const [rent, setRent] = useState("");
  const [region, setRegion] = useState<Region>("brussel");
  const [utilities, setUtilities] = useState("");
  const [services, setServices] = useState("");
  const [fitout, setFitout] = useState("");
  const [term, setTerm] = useState("");
  const [daysPerWeek, setDaysPerWeek] = useState(3);

  // Gate
  const [gateEmail, setGateEmail] = useState("");
  const [gateCompany, setGateCompany] = useState("");
  const [gatePhone, setGatePhone] = useState("");
  const [gateSubmitting, setGateSubmitting] = useState(false);
  const [gateUnlocked, setGateUnlocked] = useState(false);
  const [showGate, setShowGate] = useState(false);

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

  const results = useMemo(() => {
    const nEmp = num(employees);
    const nSurf = num(surface);
    const nRent = num(rent);
    const nUtil = num(utilities);
    const nSvc = num(services);
    const nFit = num(fitout);
    const nTerm = num(term);

    const yearlyRent = nRent * 12;
    const yearlyUtil = nUtil * 12;
    const yearlySvc = nSvc * 12;
    const totalTerm = (nRent + nUtil + nSvc) * 12 * nTerm + nFit;
    const costPerYear = yearlyRent + yearlyUtil + yearlySvc + nFit / Math.max(nTerm, 1);
    const costPerEmployee = costPerYear / Math.max(nEmp, 1);
    const costPerMonth = costPerYear / 12;
    const sqmPerEmployee = nSurf / Math.max(nEmp, 1);
    const rentPerSqm = yearlyRent / Math.max(nSurf, 1);
    const occupancy = OCCUPANCY_BY_DAYS[daysPerWeek] ?? 0.47;
    const unusedSqm = nSurf * (1 - occupancy);
    const unusedDesks = unusedSqm / 12;
    const unusedCost = unusedDesks * 10000;

    return {
      yearlyRent,
      yearlyUtil,
      yearlySvc,
      totalTerm,
      costPerYear,
      costPerEmployee,
      costPerMonth,
      sqmPerEmployee,
      rentPerSqm,
      occupancy,
      unusedSqm,
      unusedDesks,
      unusedCost,
    };
  }, [employees, surface, rent, utilities, services, fitout, term, daysPerWeek]);

  const bench = REGION_BENCH[region];

  const breakdownData = [
    { name: "Huur", value: results.yearlyRent, fill: "hsl(var(--primary))" },
    { name: "Nutsvoorzieningen", value: results.yearlyUtil, fill: "hsl(var(--primary) / 0.7)" },
    { name: "Diensten", value: results.yearlySvc, fill: "hsl(var(--primary) / 0.5)" },
    { name: "Inrichting/jaar", value: num(fitout) / Math.max(num(term), 1), fill: "hsl(var(--primary) / 0.3)" },
  ];

  const sqmBenchData = [
    { name: "U", value: Number(results.sqmPerEmployee.toFixed(1)) },
    { name: "Hybride markt (7-10)", value: 8.5 },
    { name: "Traditioneel (10-15)", value: 12.5 },
  ];

  const rentBenchData = [
    { name: "U", value: Number(results.rentPerSqm.toFixed(0)) },
    { name: `${bench.label} laag`, value: bench.low },
    { name: `${bench.label} hoog`, value: bench.high },
  ];

  const baseFilled =
    employees !== "" &&
    surface !== "" &&
    rent !== "" &&
    utilities !== "" &&
    services !== "" &&
    fitout !== "" &&
    term !== "";

  const handleGateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gateEmail || !gateCompany) return;
    setGateSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("submit-calculator-lead", {
        body: {
          email: gateEmail.trim(),
          company: gateCompany.trim(),
          phone: gatePhone.trim() || null,
          employees: num(employees),
          surface: num(surface),
          rent: num(rent),
          region,
          utilities: num(utilities),
          services: num(services),
          fitout: num(fitout),
          term: num(term),
          days_per_week: daysPerWeek,
          cost_per_year: results.costPerYear,
          cost_per_employee: results.costPerEmployee,
          total_term: results.totalTerm,
          unused_sqm: results.unusedSqm,
          unused_cost: results.unusedCost,
        },
      });
      if (error) throw error;
      setGateUnlocked(true);
    } catch (err) {
      console.error(err);
      toast({ title: "Er ging iets mis. Probeer opnieuw.", variant: "destructive" });
    } finally {
      setGateSubmitting(false);
    }
  };

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
          message:
            (form.message ? form.message.trim() + "\n\n" : "") +
            `[Kostencalculator resultaat]\n` +
            `Medewerkers: ${employees}, Oppervlakte: ${surface} m², Regio: ${bench.label}\n` +
            `Totaal over looptijd: ${fmtEuro(results.totalTerm)}\n` +
            `Kost per jaar: ${fmtEuro(results.costPerYear)}\n` +
            `Kost per medewerker/jaar: ${fmtEuro(results.costPerEmployee)}\n` +
            `Onbenutte ruimte: ${fmtNum(results.unusedSqm, 0)} m² (${fmtEuro(results.unusedCost)}/jaar)`,
        },
      });
      if (error) throw error;
      setSuccess(true);
    } catch (err) {
      console.error(err);
      toast({ title: "Er ging iets mis. Probeer opnieuw.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="bg-primary text-white py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.15] font-bold"
          >
            Wat kost uw kantoor u écht?
          </motion.h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
            Bereken in twee minuten uw werkelijke kantoorkosten, uw kost per medewerker en de
            structureel onbenutte ruimte. Vergelijk het resultaat met de markt.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Inputs */}
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="font-serif text-2xl font-semibold text-primary mb-6">
              Uw gegevens
            </h2>
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Aantal medewerkers</Label>
                  <Input
                    type="number"
                    min={1}
                    placeholder="bv. 30"
                    value={employees}
                    onChange={(e) => setEmployees(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Kantooroppervlakte (m²)</Label>
                  <Input
                    type="number"
                    min={0}
                    placeholder="bv. 450"
                    value={surface}
                    onChange={(e) => setSurface(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Maandelijkse huur (€)</Label>
                  <Input
                    type="number"
                    min={0}
                    placeholder="bv. 8000"
                    value={rent}
                    onChange={(e) => setRent(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Regio</Label>
                  <Select value={region} onValueChange={(v) => setRegion(v as Region)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brussel">Brussel</SelectItem>
                      <SelectItem value="gent-antwerpen">Gent/Antwerpen</SelectItem>
                      <SelectItem value="overige">Overige regio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Maandelijkse nutsvoorzieningen (€)</Label>
                  <Input
                    type="number"
                    min={0}
                    placeholder="bv. 900"
                    value={utilities}
                    onChange={(e) => setUtilities(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Maandelijkse diensten (€)</Label>
                  <Input
                    type="number"
                    min={0}
                    placeholder="bv. 1200"
                    value={services}
                    onChange={(e) => setServices(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Eenmalige inrichtingskost (€)</Label>
                  <Input
                    type="number"
                    min={0}
                    placeholder="bv. 100000"
                    value={fitout}
                    onChange={(e) => setFitout(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Looptijd huurcontract (jaren)</Label>
                  <Input
                    type="number"
                    min={1}
                    max={15}
                    placeholder="bv. 9"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between">
                  <Label>Gemiddeld aantal kantoordagen per medewerker per week</Label>
                  <span className="text-sm font-semibold text-primary">{daysPerWeek}</span>
                </div>
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={[daysPerWeek]}
                  onValueChange={(v) => setDaysPerWeek(v[0])}
                />
                <div className="flex justify-between text-xs text-foreground/50">
                  <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results / Gate */}
          <div className="space-y-6">
            {gateUnlocked ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Totaal over looptijd", value: fmtEuro(results.totalTerm) },
                    { label: "Kost per jaar", value: fmtEuro(results.costPerYear) },
                    { label: "Kost per medewerker / jaar", value: fmtEuro(results.costPerEmployee) },
                    { label: "Kost per maand", value: fmtEuro(results.costPerMonth) },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="rounded-2xl border border-border bg-card p-5 shadow-sm"
                    >
                      <div className="text-xs uppercase tracking-wider text-foreground/50">
                        {m.label}
                      </div>
                      <div className="mt-2 font-serif text-2xl font-semibold text-primary">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="font-serif text-lg font-semibold text-primary mb-4">
                    Kostenverdeling (per jaar)
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer>
                      <BarChart data={breakdownData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => fmtEuro(v)} width={80} />
                        <Tooltip formatter={(v: number) => fmtEuro(v)} />
                        <Bar dataKey="value">
                          {breakdownData.map((d, i) => (
                            <Cell key={i} fill={d.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </>
            ) : !showGate ? (
              <div className="rounded-3xl border border-border bg-card p-8 shadow-sm flex flex-col justify-center min-h-[400px]">
                <div className="flex items-center gap-3 mb-4">
                  <Lock size={20} className="text-primary" />
                  <span className="text-xs uppercase tracking-wider text-foreground/50">
                    Uw resultaat
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-primary leading-tight mb-3">
                  Klaar om uw werkelijke kantoorkosten te zien?
                </h3>
                <p className="text-foreground/70 mb-6">
                  Vul alle velden hiernaast in en bereken uw resultaat.
                </p>
                <Button
                  size="lg"
                  className="w-full"
                  disabled={!baseFilled}
                  onClick={() => setShowGate(true)}
                >
                  Bereken mijn resultaat
                </Button>
                {!baseFilled && (
                  <p className="mt-3 text-xs text-center text-foreground/50">
                    Vul eerst alle velden hiernaast in.
                  </p>
                )}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl border border-border bg-card p-8 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Lock size={20} className="text-primary" />
                  <span className="text-xs uppercase tracking-wider text-foreground/50">
                    Laatste stap
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-primary leading-tight">
                  Vul uw gegevens in om uw resultaat te zien.
                </h3>
                <form onSubmit={handleGateSubmit} className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="gate-email">E-mailadres</Label>
                    <Input
                      id="gate-email"
                      type="email"
                      required
                      maxLength={320}
                      value={gateEmail}
                      onChange={(e) => setGateEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gate-company">Bedrijfsnaam</Label>
                    <Input
                      id="gate-company"
                      required
                      maxLength={200}
                      value={gateCompany}
                      onChange={(e) => setGateCompany(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gate-phone">Telefoonnummer (optioneel)</Label>
                    <Input
                      id="gate-phone"
                      type="tel"
                      maxLength={50}
                      value={gatePhone}
                      onChange={(e) => setGatePhone(e.target.value)}
                    />
                  </div>
                  <p className="text-[12px] leading-relaxed text-foreground/50">
                    Uw gegevens worden niet gedeeld met derden en enkel gebruikt om u dit resultaat
                    te tonen en, indien gewenst, contact op te nemen.
                  </p>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={gateSubmitting || !gateEmail || !gateCompany}
                  >
                    {gateSubmitting ? "Even geduld..." : "Toon mijn resultaat"}
                  </Button>
                  <button
                    type="button"
                    onClick={() => setShowGate(false)}
                    className="w-full text-xs text-foreground/50 hover:text-foreground/80"
                  >
                    Terug om gegevens aan te passen
                  </button>
                </form>
              </motion.div>
            )}
          </div>
        </div>


        {/* Benchmarks + insight — gated */}
        {gateUnlocked && (
          <>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-serif text-lg font-semibold text-primary mb-1">
                  m² per medewerker vs. markt
                </h3>
                <p className="text-sm text-foreground/60 mb-4">
                  Hybride kantoren: 7-10 m². Traditioneel: 10-15 m².
                </p>
                <div className="h-56">
                  <ResponsiveContainer>
                    <BarChart data={sqmBenchData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" tick={{ fontSize: 11 }} />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={140} />
                      <Tooltip formatter={(v: number) => `${v} m²`} />
                      <Bar dataKey="value" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-serif text-lg font-semibold text-primary mb-1">
                  Huur per m²/jaar vs. {bench.label}
                </h3>
                <p className="text-sm text-foreground/60 mb-4">
                  Regionale bandbreedte: €{bench.low}-€{bench.high}/m²/jaar.
                </p>
                <div className="h-56">
                  <ResponsiveContainer>
                    <BarChart data={rentBenchData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" tick={{ fontSize: 11 }} />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={140} />
                      <Tooltip formatter={(v: number) => `€${v}`} />
                      <Bar dataKey="value" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-10 rounded-3xl bg-primary/10 border border-primary/20 p-8 sm:p-10"
            >
              <p className="font-serif text-xl sm:text-2xl leading-relaxed text-primary">
                Bij een geschatte bezettingsgraad van{" "}
                <span className="font-bold">{Math.round(results.occupancy * 100)}%</span> staat naar
                schatting <span className="font-bold">{fmtNum(results.unusedSqm, 0)} m²</span> van uw
                kantoor structureel leeg. Dat komt overeen met een kost van ongeveer{" "}
                <span className="font-bold">{fmtEuro(results.unusedCost)}</span> per jaar aan
                onbenutte ruimte.
              </p>
            </motion.div>
          </>
        )}
      </section>

      {/* Contact form */}
      <section className="bg-secondary/40 py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-primary">
              Wilt u dit resultaat bespreken?
            </h2>
            <p className="mt-4 text-foreground/70">
              Vraag een gratis Opportunity Scan aan. We nemen contact met u op binnen 48 uur.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-lg sm:p-10">
            {success ? (
              <div className="flex flex-col items-center py-10 text-center">
                <CheckCircle2 size={48} className="text-primary mb-4" />
                <p className="text-lg text-foreground/90 max-w-md">
                  Bedankt. We contacteren u binnen 48 uur voor een moment dat u past.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="k-name">Naam</Label>
                    <Input
                      id="k-name"
                      required
                      maxLength={200}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="k-company">Bedrijfsnaam</Label>
                    <Input
                      id="k-company"
                      required
                      maxLength={200}
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="k-email">E-mailadres</Label>
                    <Input
                      id="k-email"
                      type="email"
                      required
                      maxLength={320}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="k-phone">Telefoonnummer</Label>
                    <Input
                      id="k-phone"
                      type="tel"
                      required
                      maxLength={50}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="k-topic">Welke dienst?</Label>
                  <Select
                    value={form.topic}
                    onValueChange={(v) => setForm({ ...form, topic: v as Topic })}
                  >
                    <SelectTrigger id="k-topic">
                      <SelectValue placeholder="Selecteer een onderwerp" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="growth">Groeistrategieën</SelectItem>
                      <SelectItem value="downsizing">Ruimtereductie</SelectItem>
                      <SelectItem value="lease">Leasemanagement</SelectItem>
                      <SelectItem value="interventions">Kleine interventies</SelectItem>
                      <SelectItem value="other">Iets anders</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="k-message">Toelichting (optioneel)</Label>
                  <Textarea
                    id="k-message"
                    rows={4}
                    maxLength={2000}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={submitting || !form.topic}>
                  {submitting ? "Bezig met verzenden..." : "Vraag Opportunity Scan aan"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Kostencalculator;
