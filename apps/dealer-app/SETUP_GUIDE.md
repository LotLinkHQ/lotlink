# LotLink Dealer App Setup Guide

## Project Overview

LotLink is a unified RV dealership workflow automation platform with separate customer-facing and dealer-facing applications sharing a Supabase database.

- **Customer App** (Customer-facing): RV browsing, appointments, conversations
- - **Dealer App** (Dealer-facing): Appointment management, customer conversations, analytics
  - - **Shared Database**: Supabase for real-time synchronization
   
    - ## Prerequisites
   
    - - Node.js 18+
      - - pnpm (package manager)
        - - Supabase account (for database access)
         
          - ## Environment Setup
         
          - ### 1. Create .env.local in apps/dealer-app
         
          - ```bash
            VITE_SUPABASE_URL=https://your-project.supabase.co
            VITE_SUPABASE_ANON_KEY=your-anon-key-here
            ```

            Get these values from your Supabase project settings:
            1. Go to Supabase Dashboard
            2. 2. Select your project
               3. 3. Settings → API
                  4. 4. Copy Project URL and anon key
                    
                     5. ### 2. Install Dependencies
                    
                     6. ```bash
                        cd apps/dealer-app
                        pnpm install
                        ```

                        ## Running the Application

                        ### Development Mode

                        ```bash
                        cd apps/dealer-app
                        pnpm dev
                        ```

                        The app will start at `http://localhost:5173`

                        ### Build for Production

                        ```bash
                        cd apps/dealer-app
                        pnpm build
                        ```

                        ## Project Structure

                        ```
                        apps/dealer-app/
                        ├── src/
                        │   ├── main.tsx           # React entry point
                        │   ├── App.tsx            # Root component with router
                        │   ├── routes.tsx         # Route definitions
                        │   ├── layouts/
                        │   │   └── RootLayout.tsx # Main layout with sidebar navigation
                        │   ├── pages/
                        │   │   ├── dashboard.tsx      # Dashboard home
                        │   │   ├── appointments.tsx   # Appointments list
                        │   │   ├── conversations.tsx  # Conversations/messaging
                        │   │   ├── schedule.tsx       # Availability scheduling
                        │   │   ├── analytics.tsx      # Performance analytics
                        │   │   ├── settings.tsx       # Settings page
                        │   │   └── auth/
                        │   │       └── login.tsx      # Login page
                        │   ├── integrations/
                        │   │   └── supabase.ts    # Supabase client + real-time subscriptions
                        │   ├── database/
                        │   │   ├── types/
                        │   │   │   └── dealer.ts  # TypeScript interfaces
                        │   │   └── migrations/
                        │   │       └── 001_create_dealer_tables.sql
                        │   └── components/ (coming soon)
                        ├── package.json           # Dependencies
                        ├── tsconfig.json         # TypeScript config
                        ├── vite.config.ts        # Vite config
                        └── .env.local            # Environment variables (git ignored)
                        ```

                        ## Key Features Implemented

                        ### Dashboard
                        - Real-time stats (appointments, conversations, pending actions)
                        - - Quick action cards for navigation
                          - - React Query for efficient data fetching
                           
                            - ### Navigation
                            - - Collapsible sidebar with icons
                              - - Navigation to all main sections
                                - - User profile and notification indicators
                                  - - Logout functionality
                                   
                                    - ### Real-Time Features
                                    - - Supabase real-time subscriptions for appointments
                                      - - Live conversation updates
                                        - - Instant notifications
                                          - - Browser-based messaging with WebSocket support
                                           
                                            - ### Authentication
                                            - - Supabase Auth integration
                                              - - Protected routes
                                                - - Session management
                                                  - - Logout with redirect
                                                   
                                                    - ## Tech Stack
                                                   
                                                    - **Frontend:**
                                                    - - React 18
                                                      - - TypeScript
                                                        - - TanStack Router (client-side routing)
                                                          - - TanStack React Query (server state management)
                                                            - - Vite (build tool)
                                                              - - Tailwind CSS (styling)
                                                                - - Lucide React (icons)
                                                                 
                                                                  - **Backend/Database:**
                                                                  - - Supabase (PostgreSQL + Auth)
                                                                    - - Real-time Postgres subscriptions
                                                                      - - Edge Functions (for serverless APIs)
                                                                       
                                                                        - **Development:**
                                                                        - - ESLint (code quality)
                                                                          - - Prettier (formatting)
                                                                            - - npm workspaces (monorepo)
                                                                             
                                                                              - ## Database Schema
                                                                             
                                                                              - The dealer app uses these tables:
                                                                             
                                                                              - - `dealers` - Business information
                                                                                - - `dealer_availability` - Weekly availability schedules
                                                                                  - - `appointment_assignments` - Appointment routing
                                                                                    - - `conversation_routing` - Conversation assignment
                                                                                      - - `dealer_notifications` - Notification system
                                                                                       
                                                                                        - ## Common Tasks
                                                                                       
                                                                                        - ### Adding a New Page
                                                                                       
                                                                                        - 1. Create file in `src/pages/yourpage.tsx`
                                                                                          2. 2. Add route in `src/routes.tsx`
                                                                                             3. 3. Add navigation item in `src/layouts/RootLayout.tsx`
                                                                                               
                                                                                                4. ### Using Supabase Data
                                                                                               
                                                                                                5. ```typescript
                                                                                                   import { supabase } from '@/integrations/supabase'
                                                                                                   import { useQuery } from '@tanstack/react-query'

                                                                                                   const { data } = useQuery({
                                                                                                     queryKey: ['appointments'],
                                                                                                     queryFn: async () => {
                                                                                                       const { data } = await supabase
                                                                                                         .from('appointment_assignments')
                                                                                                         .select('*')
                                                                                                       return data
                                                                                                     }
                                                                                                   })
                                                                                                   ```

                                                                                                   ### Real-Time Subscriptions

                                                                                                   ```typescript
                                                                                                   import { subscribeToAppointments } from '@/integrations/supabase'

                                                                                                   useEffect(() => {
                                                                                                     const subscription = subscribeToAppointments(dealerId, (data) => {
                                                                                                       console.log('New appointment:', data)
                                                                                                     })

                                                                                                     return () => subscription.unsubscribe()
                                                                                                   }, [dealerId])
                                                                                                   ```

                                                                                                   ## Troubleshooting

                                                                                                   ### Missing Environment Variables
                                                                                                   ```
                                                                                                   Error: Missing Supabase environment variables
                                                                                                   ```
                                                                                                   Solution: Create `.env.local` with correct Supabase credentials

                                                                                                   ### Port Already in Use
                                                                                                   ```
                                                                                                   Port 5173 is already in use
                                                                                                   ```
                                                                                                   Solution: Change port in `vite.config.ts` or kill existing process

                                                                                                   ### Supabase Connection Failed
                                                                                                   - Verify Supabase URL and key are correct
                                                                                                   - - Check network connectivity
                                                                                                     - - Verify IP is allowed in Supabase firewall settings
                                                                                                      
                                                                                                       - ## Next Steps
                                                                                                      
                                                                                                       - 1. Implement remaining page components
                                                                                                         2. 2. Add custom UI component library
                                                                                                            3. 3. Set up error boundaries and error handling
                                                                                                               4. 4. Implement authentication flow
                                                                                                                  5. 5. Add form validation and error states
                                                                                                                     6. 6. Set up analytics tracking
                                                                                                                        7. 7. Configure CI/CD pipeline
                                                                                                                          
                                                                                                                           8. ## Learning Resources
                                                                                                                          
                                                                                                                           9. - [React Documentation](https://react.dev)
                                                                                                                              - - [TanStack Router](https://tanstack.com/router/latest)
                                                                                                                                - - [Supabase Documentation](https://supabase.com/docs)
                                                                                                                                  - - [Tailwind CSS](https://tailwindcss.com)
                                                                                                                                    - - [TypeScript Handbook](https://www.typescriptlang.org/docs)
                                                                                                                                     
                                                                                                                                      - ## Support
                                                                                                                                     
                                                                                                                                      - For issues or questions:
                                                                                                                                      - 1. Check existing issues in GitHub
                                                                                                                                        2. 2. Review browser console for errors
                                                                                                                                           3. 3. Check Supabase logs for backend issues
                                                                                                                                              4. 4. Contact the development team
