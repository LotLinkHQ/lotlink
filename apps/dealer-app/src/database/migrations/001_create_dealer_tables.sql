-- Create dealers table
CREATE TABLE public.dealers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    business_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    city VARCHAR(100),
    state VARCHAR(2),
    zip_code VARCHAR(10),
    business_license VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

-- Create dealer_availability table
CREATE TABLE public.dealer_availability (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dealer_id UUID NOT NULL REFERENCES dealers(id) ON DELETE CASCADE,
    day_of_week INT CHECK (day_of_week >= 0 AND day_of_week <= 6),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

-- Create appointment_assignments table
CREATE TABLE public.appointment_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
    dealer_id UUID NOT NULL REFERENCES dealers(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending', -- pending, accepted, rejected, completed
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

-- Create conversation_routing table
CREATE TABLE public.conversation_routing (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    dealer_id UUID REFERENCES dealers(id) ON DELETE SET NULL,
    routed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reason VARCHAR(255), -- ai_escalation, customer_request, etc.
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

-- Create dealer_notifications table
CREATE TABLE public.dealer_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dealer_id UUID NOT NULL REFERENCES dealers(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    type VARCHAR(50), -- appointment, conversation, alert
  read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

-- Create indexes for performance
CREATE INDEX idx_dealers_user_id ON dealers(user_id);
CREATE INDEX idx_dealer_availability_dealer_id ON dealer_availability(dealer_id);
CREATE INDEX idx_appointment_assignments_dealer_id ON appointment_assignments(dealer_id);
CREATE INDEX idx_appointment_assignments_appointment_id ON appointment_assignments(appointment_id);
CREATE INDEX idx_conversation_routing_dealer_id ON conversation_routing(dealer_id);
CREATE INDEX idx_conversation_routing_conversation_id ON conversation_routing(conversation_id);
CREATE INDEX idx_dealer_notifications_dealer_id ON dealer_notifications(dealer_id);
