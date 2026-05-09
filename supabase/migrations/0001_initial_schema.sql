-- ============================================================
-- Replyr — initial schema
-- ============================================================

-- ------------------------------------------------------------
-- Shared helper: keep updated_at current
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ------------------------------------------------------------
-- 1. profiles  (mirrors auth.users 1-to-1)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id          uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       text        NOT NULL,
  full_name   text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------
-- 2. businesses
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.businesses (
  id                      uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id                uuid        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name                    text        NOT NULL,
  industry                text        NOT NULL DEFAULT 'home_services',
  website                 text,
  phone                   text,
  service_area_zips       text[],
  business_hours          jsonb,
  services                jsonb,
  faqs                    jsonb,
  agent_name              text        NOT NULL DEFAULT 'Assistant',
  agent_tone              text        NOT NULL DEFAULT 'friendly_professional',
  agent_instructions      text,
  google_calendar_id      text,
  google_refresh_token    text,
  widget_api_key          text        UNIQUE NOT NULL DEFAULT gen_random_uuid()::text,
  forwarding_email_slug   text        UNIQUE,
  subscription_status     text        NOT NULL DEFAULT 'trialing'
                            CHECK (subscription_status IN ('trialing','active','past_due','canceled')),
  stripe_customer_id      text,
  stripe_subscription_id  text,
  created_at              timestamptz NOT NULL DEFAULT now(),
  updated_at              timestamptz NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------
-- 3. leads
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.leads (
  id                    uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id           uuid        NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  source                text        NOT NULL CHECK (source IN ('web_form','email','manual')),
  contact_name          text,
  contact_email         text,
  contact_phone         text,
  initial_message       text,
  zip_code              text,
  status                text        NOT NULL DEFAULT 'new'
                          CHECK (status IN ('new','qualifying','qualified','booked','lost','handed_off')),
  qualified_at          timestamptz,
  estimated_value_cents int,
  metadata              jsonb       NOT NULL DEFAULT '{}'::jsonb,
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------
-- 4. conversations
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.conversations (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id         uuid        NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  business_id     uuid        NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  channel         text        NOT NULL CHECK (channel IN ('email','web_chat')),
  status          text        NOT NULL DEFAULT 'active'
                    CHECK (status IN ('active','closed','handed_off')),
  last_message_at timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------
-- 5. messages
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.messages (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid        NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  role            text        NOT NULL CHECK (role IN ('user','assistant','system','tool')),
  content         text        NOT NULL,
  tool_calls      jsonb,
  tool_call_id    text,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------
-- 6. appointments
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.appointments (
  id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id       uuid        NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  lead_id           uuid        NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  scheduled_at      timestamptz NOT NULL,
  duration_minutes  int         NOT NULL DEFAULT 60,
  service_type      text,
  notes             text,
  customer_name     text,
  customer_email    text,
  customer_phone    text,
  customer_address  text,
  status            text        NOT NULL DEFAULT 'scheduled'
                      CHECK (status IN ('scheduled','confirmed','completed','canceled','no_show')),
  google_event_id   text,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- INDEXES
-- ============================================================

-- businesses
CREATE INDEX IF NOT EXISTS idx_businesses_owner_id
  ON public.businesses(owner_id);

-- leads
CREATE INDEX IF NOT EXISTS idx_leads_business_id
  ON public.leads(business_id);
CREATE INDEX IF NOT EXISTS idx_leads_business_status
  ON public.leads(business_id, status);
CREATE INDEX IF NOT EXISTS idx_leads_business_created
  ON public.leads(business_id, created_at DESC);

-- conversations
CREATE INDEX IF NOT EXISTS idx_conversations_lead_id
  ON public.conversations(lead_id);
CREATE INDEX IF NOT EXISTS idx_conversations_business_id
  ON public.conversations(business_id);
CREATE INDEX IF NOT EXISTS idx_conversations_business_last_msg
  ON public.conversations(business_id, last_message_at DESC);

-- messages
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id
  ON public.messages(conversation_id);

-- appointments
CREATE INDEX IF NOT EXISTS idx_appointments_business_id
  ON public.appointments(business_id);
CREATE INDEX IF NOT EXISTS idx_appointments_lead_id
  ON public.appointments(lead_id);
CREATE INDEX IF NOT EXISTS idx_appointments_business_scheduled
  ON public.appointments(business_id, scheduled_at);

-- ============================================================
-- UPDATED_AT TRIGGERS
-- ============================================================

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER trg_businesses_updated_at
  BEFORE UPDATE ON public.businesses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER trg_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER trg_appointments_updated_at
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments  ENABLE ROW LEVEL SECURITY;

-- profiles: own row only
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (id = auth.uid());

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (id = auth.uid());

-- businesses: owner only
CREATE POLICY "businesses_all_own" ON public.businesses
  FOR ALL USING (owner_id = auth.uid());

-- leads: via business ownership
CREATE POLICY "leads_all_own" ON public.leads
  FOR ALL USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE owner_id = auth.uid()
    )
  );

-- conversations: via business ownership
CREATE POLICY "conversations_all_own" ON public.conversations
  FOR ALL USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE owner_id = auth.uid()
    )
  );

-- messages: via conversation → business ownership
CREATE POLICY "messages_all_own" ON public.messages
  FOR ALL USING (
    conversation_id IN (
      SELECT c.id FROM public.conversations c
      JOIN public.businesses b ON b.id = c.business_id
      WHERE b.owner_id = auth.uid()
    )
  );

-- appointments: via business ownership
CREATE POLICY "appointments_all_own" ON public.appointments
  FOR ALL USING (
    business_id IN (
      SELECT id FROM public.businesses WHERE owner_id = auth.uid()
    )
  );

-- ============================================================
-- PROFILE AUTO-CREATION ON SIGNUP
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
