import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Real-time subscriptions
export const subscribeToAppointments = (dealerId: string, callback: (data: any) => void) => {
    return supabase
      .channel(`appointments:dealer:${dealerId}`)
      .on(
              'postgres_changes',
        {
                  event: '*',
                  schema: 'public',
                  table: 'appointment_assignments',
                  filter: `dealer_id=eq.${dealerId}`,
        },
              callback
            )
      .subscribe()
}

export const subscribeToConversations = (dealerId: string, callback: (data: any) => void) => {
    return supabase
      .channel(`conversations:dealer:${dealerId}`)
      .on(
              'postgres_changes',
        {
                  event: '*',
                  schema: 'public',
                  table: 'conversation_routing',
                  filter: `dealer_id=eq.${dealerId}`,
        },
              callback
            )
      .subscribe()
}

export const subscribeToNotifications = (dealerId: string, callback: (data: any) => void) => {
    return supabase
      .channel(`notifications:dealer:${dealerId}`)
      .on(
              'postgres_changes',
        {
                  event: 'INSERT',
                  schema: 'public',
                  table: 'dealer_notifications',
                  filter: `dealer_id=eq.${dealerId}`,
        },
              callback
            )
      .subscribe()
}
