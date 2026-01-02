# Quick Start - LotLink Dealer App

## 🚀 Get Up and Running in 3 Minutes

### Step 1: Clone the Repository
```bash
git clone https://github.com/LotLinkHQ/lotlink.git
cd lotlink/apps/dealer-app
```

### Step 2: Set Up Environment Variables
Copy the environment template and add your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and add:
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**How to get these values:**
1. Go to https://app.supabase.com
2. 2. Select your project
   3. 3. Click Settings → API
      4. 4. Copy the URL and anon key
        
         5. ### Step 3: Install Dependencies & Run
         6. ```bash
            # Install dependencies
            pnpm install

            # Start development server
            pnpm dev
            ```

            The app will open at **http://localhost:5173**

            ## ✨ What You'll See

            - **Dashboard** with real-time stats
            - - **Sidebar navigation** with collapsible menu
              - - **Professional UI** with Tailwind CSS styling
                - - **Real-time integration** with Supabase
                 
                  - ## 📁 Project Structure
                  - ```
                    src/
                    ├── pages/           # Page components (dashboard, appointments, etc.)
                    ├── layouts/         # Layout components (sidebar, header)
                    ├── integrations/    # Supabase client & subscriptions
                    ├── database/        # Types and migrations
                    └── routes.tsx       # Route definitions
                    ```

                    ## 🔧 Common Commands

                    ```bash
                    # Development
                    pnpm dev

                    # Build for production
                    pnpm build

                    # Check TypeScript
                    pnpm type-check

                    # Lint code
                    pnpm lint
                    ```

                    ## 🆘 Troubleshooting

                    **Port 5173 already in use?**
                    ```bash
                    # Kill the process or use a different port
                    pnpm dev --port 3000
                    ```

                    **Missing environment variables?**
                    Make sure `.env.local` exists with valid Supabase credentials

                    **Dependencies not installing?**
                    ```bash
                    rm -rf node_modules pnpm-lock.yaml
                    pnpm install
                    ```

                    ## 📚 Learn More
                    - [Full Setup Guide](./SETUP_GUIDE.md)
                    - - [React Docs](https://react.dev)
                      - - [Supabase Docs](https://supabase.com/docs)
                        - - [Tailwind CSS](https://tailwindcss.com)
                         
                          - Happy coding! 🎉
