
CREATE TABLE public.opportunity_scan_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  topic TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.opportunity_scan_submissions TO anon, authenticated;
GRANT ALL ON public.opportunity_scan_submissions TO service_role;

ALTER TABLE public.opportunity_scan_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit opportunity scan requests"
  ON public.opportunity_scan_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(name) > 0 AND length(name) <= 200
    AND length(company) > 0 AND length(company) <= 200
    AND length(email) > 0 AND length(email) <= 320
    AND length(phone) > 0 AND length(phone) <= 50
    AND topic IN ('growth','downsizing','lease','interventions','other')
    AND (message IS NULL OR length(message) <= 2000)
  );
