-- ============================================================
-- Enable Postgres replication for realtime UI updates
-- ============================================================
-- The Replyr dashboard subscribes to changes on `leads` so contractors
-- see new leads / status changes appear without refreshing the page.

ALTER PUBLICATION supabase_realtime ADD TABLE public.leads;
