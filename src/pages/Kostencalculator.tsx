import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { CheckCircle2, Lock, ListChecks } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type Region = "brussel" | "gent-antwerpen" | "overige";

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

  // Gate first
  const [gateEmail, setGateEmail] = useState("");
  const [gateCompany, setGateCompany] = useState("");
  const [gatePhone, setGatePhone] = useState("");
  const [gateSubmitting, setGateSubmitting] = useState(false);
  const [gateUnlocked, setGateUnlocked] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);

  // Calculator inputs
  const [employees, setEmployees] = useState("");
  const [surface, setSurface] = useState("");
  const [rent, setRent] = useState("");
  const [region, setRegion] = useState<Region>("brussel");
  const [utilities, setUtilities] = useState("");
  const [services, setServices] = useState("");
  const [fitout, setFitout] = useState("");
  const [term, setTerm] = useState("");
  const [daysPerWeek, setDaysPerWeek] = useState(3);

  const [wantsEmail, setWantsEmail] = useState(false);
  const [wantsScan, setWantsScan] = useState(false);
  const [confirmBusy, setConfirmBusy] = useState(false);
  const [confirmDone, setConfirmDone] = useState(false);

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

  const calcPayload = () => ({
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
  });

  const handleGateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gateEmail || !gateCompany) return;
    setGateSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-calculator-lead", {
        body: {
          mode: "gate",
          email: gateEmail.trim(),
          company: gateCompany.trim(),
          phone: gatePhone.trim() || null,
          ...calcPayload(),
        },
      });
      if (error) throw error;
      setLeadId((data as { id?: string })?.id ?? null);
      setGateUnlocked(true);
    } catch (err) {
      console.error(err);
      toast({ title: "Er ging iets mis. Probeer opnieuw.", variant: "destructive" });
    } finally {
      setGateSubmitting(false);
    }
  };

  const handleConfirm = async () => {
    if (!leadId) return;
    setConfirmBusy(true);
    try {
      const { error } = await supabase.functions.invoke("submit-calculator-lead", {
        body: {
          mode: "confirm",
          id: leadId,
          wants_email: wantsEmail,
          wants_scan: wantsScan,
          ...calcPayload(),
        },
      });
      if (error) throw error;
      setConfirmDone(true);
      if (wantsEmail) {
        toast({ title: `Verzonden naar ${gateEmail}.` });
      } else {
        toast({ title: "Bevestigd. Bedankt." });
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Er ging iets mis. Probeer opnieuw.", variant: "destructive" });
    } finally {
      setConfirmBusy(false);
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

      {!gateUnlocked ? (
        /* Gate first */
        <section className="mx-auto max-w-xl px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-border bg-card p-8 sm:p-10 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <Lock size={20} className="text-primary" />
              <span className="text-xs uppercase tracking-wider text-foreground/50">
                Toegang tot de calculator
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-primary leading-tight">
              Vul uw gegevens in om de calculator te starten.
            </h2>
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
                Uw gegevens worden niet gedeeld met derden en enkel gebruikt om u dit resultaat te
                tonen en, indien gewenst, contact op te nemen.
              </p>
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={gateSubmitting || !gateEmail || !gateCompany}
              >
                {gateSubmitting ? "Even geduld..." : "Start de calculator"}
              </Button>
            </form>
          </motion.div>
        </section>
      ) : (
        <>
          {/* Calculator + live results */}
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

              {/* Results — always visible */}
              <div className="space-y-6">
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
              </div>
            </div>

            {/* Benchmarks */}
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
          </section>

          {/* Combined follow-up action */}
          <section className="bg-secondary/40 py-16 lg:py-20">
            <div className="mx-auto max-w-2xl px-6 sm:px-8 lg:px-12">
              <div className="rounded-3xl border border-border bg-card p-8 sm:p-10 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <ListChecks size={22} className="text-primary" />
                  <span className="text-xs uppercase tracking-wider text-foreground/50">
                    Vervolgacties
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-primary leading-tight">
                  Wat wilt u nu doen?
                </h3>

                {confirmDone ? (
                  <div className="mt-6 flex items-start gap-3 text-sm text-primary">
                    <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
                    <span>
                      Bedankt, uw keuze is bevestigd
                      {wantsEmail ? ` en het resultaat werd verzonden naar ${gateEmail}` : ""}.
                      {wantsScan ? " We nemen zo snel mogelijk contact op." : ""}
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="mt-6 space-y-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <Checkbox
                          checked={wantsEmail}
                          onCheckedChange={(v) => setWantsEmail(v === true)}
                          className="mt-1"
                        />
                        <span className="text-sm text-foreground/80 leading-relaxed">
                          Stuur mij dit resultaat per e-mail
                          <span className="block text-xs text-foreground/50 mt-1">
                            We sturen uw kostenoverzicht naar{" "}
                            <span className="font-medium text-foreground/70">{gateEmail}</span>.
                          </span>
                        </span>
                      </label>

                      <label className="flex items-start gap-3 cursor-pointer">
                        <Checkbox
                          checked={wantsScan}
                          onCheckedChange={(v) => setWantsScan(v === true)}
                          className="mt-1"
                        />
                        <span className="text-sm text-foreground/80 leading-relaxed">
                          Ik wil hierover gecontacteerd worden voor een Opportunity Scan
                          <span className="block text-xs text-foreground/50 mt-1">
                            We gebruiken uw eerder ingevulde gegevens. Geen nieuw formulier nodig.
                          </span>
                        </span>
                      </label>
                    </div>

                    <div className="mt-8">
                      <Button
                        onClick={handleConfirm}
                        disabled={confirmBusy}
                        size="lg"
                        className="w-full sm:w-auto"
                      >
                        {confirmBusy ? "Bezig..." : "Bevestigen"}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>

        </>
      )}

      <Footer />
    </div>
  );
};

export default Kostencalculator;
