export interface Dealer {
    id: string
    user_id: string
    business_name: string
    email: string
    phone?: string
    city?: string
    state?: string
    zip_code?: string
    business_license?: string
    created_at: string
    updated_at: string
}

export interface DealerAvailability {
    id: string
    dealer_id: string
    day_of_week: number // 0-6 (Sunday-Saturday)
  start_time: string
    end_time: string
    is_available: boolean
    created_at: string
    updated_at: string
}

export interface AppointmentAssignment {
    id: string
    appointment_id: string
    dealer_id: string
    assigned_at: string
    status: 'pending' | 'accepted' | 'rejected' | 'completed'
    updated_at: string
}

export interface ConversationRouting {
    id: string
    conversation_id: string
    dealer_id?: string
    routed_at: string
    reason?: string
    updated_at: string
}

export interface DealerNotification {
    id: string
    dealer_id: string
    title: string
    message?: string
    type: 'appointment' | 'conversation' | 'alert'
    read: boolean
    created_at: string
    updated_at: string
}
