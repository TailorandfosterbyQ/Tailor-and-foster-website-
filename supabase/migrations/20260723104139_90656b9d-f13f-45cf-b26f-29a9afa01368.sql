
CREATE TABLE public.calculator_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  employees INTEGER,
  surface NUMERIC,
  rent NUMERIC,
  region TEXT,
  utilities NUMERIC,
  services NUMERIC,
  fitout NUMERIC,
  term INTEGER,
  days_per_week INTEGER,
  cost_per_year NUMERIC,
  cost_per_employee NUMERIC,
  total_term NUMERIC,
  unused_sqm NUMERIC,
  unused_cost NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.calculator_leads TO anon, authenticated;
GRANT SELECT ON public.calculator_leads TO authenticated;
GRANT ALL ON public.calculator_leads TO service_role;

ALTER TABLE public.calculator_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit calculator leads"
  ON public.calculator_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(email) > 0 AND length(email) <= 320
    AND length(company) > 0 AND length(company) <= 200
  );

CREATE POLICY "Admins can view calculator leads"
  ON public.calculator_leads
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));
