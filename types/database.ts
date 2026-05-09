// Hand-written types matching supabase/migrations/0001_initial_schema.sql
// Regenerate with: npm run db:types (after installing supabase CLI)

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type SubscriptionStatus = 'trialing' | 'active' | 'past_due' | 'canceled'
export type LeadSource = 'web_form' | 'email' | 'manual'
export type LeadStatus = 'new' | 'qualifying' | 'qualified' | 'booked' | 'lost' | 'handed_off'
export type ConversationChannel = 'email' | 'web_chat'
export type ConversationStatus = 'active' | 'closed' | 'handed_off'
export type MessageRole = 'user' | 'assistant' | 'system' | 'tool'
export type AppointmentStatus =
  | 'scheduled'
  | 'confirmed'
  | 'completed'
  | 'canceled'
  | 'no_show'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
        }
        Update: {
          email?: string
          full_name?: string | null
        }
        Relationships: []
      }
      businesses: {
        Row: {
          id: string
          owner_id: string
          name: string
          industry: string
          website: string | null
          phone: string | null
          service_area_zips: string[] | null
          business_hours: Json | null
          services: Json | null
          faqs: Json | null
          agent_name: string
          agent_tone: string
          agent_instructions: string | null
          google_calendar_id: string | null
          google_refresh_token: string | null
          widget_api_key: string
          forwarding_email_slug: string | null
          subscription_status: SubscriptionStatus
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          owner_id: string
          name: string
          industry?: string
          website?: string | null
          phone?: string | null
          service_area_zips?: string[] | null
          business_hours?: Json | null
          services?: Json | null
          faqs?: Json | null
          agent_name?: string
          agent_tone?: string
          agent_instructions?: string | null
          google_calendar_id?: string | null
          google_refresh_token?: string | null
          widget_api_key?: string
          forwarding_email_slug?: string | null
          subscription_status?: SubscriptionStatus
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
        }
        Update: Partial<Database['public']['Tables']['businesses']['Insert']>
        Relationships: []
      }
      leads: {
        Row: {
          id: string
          business_id: string
          source: LeadSource
          contact_name: string | null
          contact_email: string | null
          contact_phone: string | null
          initial_message: string | null
          zip_code: string | null
          status: LeadStatus
          qualified_at: string | null
          estimated_value_cents: number | null
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          business_id: string
          source: LeadSource
          contact_name?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          initial_message?: string | null
          zip_code?: string | null
          status?: LeadStatus
          qualified_at?: string | null
          estimated_value_cents?: number | null
          metadata?: Json
        }
        Update: Partial<Database['public']['Tables']['leads']['Insert']>
        Relationships: []
      }
      conversations: {
        Row: {
          id: string
          lead_id: string
          business_id: string
          channel: ConversationChannel
          status: ConversationStatus
          last_message_at: string | null
          created_at: string
        }
        Insert: {
          lead_id: string
          business_id: string
          channel: ConversationChannel
          status?: ConversationStatus
          last_message_at?: string | null
        }
        Update: Partial<Database['public']['Tables']['conversations']['Insert']>
        Relationships: []
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          role: MessageRole
          content: string
          tool_calls: Json | null
          tool_call_id: string | null
          created_at: string
        }
        Insert: {
          conversation_id: string
          role: MessageRole
          content: string
          tool_calls?: Json | null
          tool_call_id?: string | null
        }
        Update: Partial<Database['public']['Tables']['messages']['Insert']>
        Relationships: []
      }
      appointments: {
        Row: {
          id: string
          business_id: string
          lead_id: string
          scheduled_at: string
          duration_minutes: number
          service_type: string | null
          notes: string | null
          customer_name: string | null
          customer_email: string | null
          customer_phone: string | null
          customer_address: string | null
          status: AppointmentStatus
          google_event_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          business_id: string
          lead_id: string
          scheduled_at: string
          duration_minutes?: number
          service_type?: string | null
          notes?: string | null
          customer_name?: string | null
          customer_email?: string | null
          customer_phone?: string | null
          customer_address?: string | null
          status?: AppointmentStatus
          google_event_id?: string | null
        }
        Update: Partial<Database['public']['Tables']['appointments']['Insert']>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
