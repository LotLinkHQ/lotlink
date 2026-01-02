import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase'

export default function DashboardPage() {
    const { data: stats } = useQuery({
          queryKey: ['dealer-stats'],
          queryFn: async () => {
                  const { data: appointments } = await supabase
                    .from('appointment_assignments')
                    .select('status')
                    .eq('dealer_id', (await supabase.auth.getUser()).data.user?.id!)

            const { data: conversations } = await supabase
                    .from('conversation_routing')
                    .select('id')
                    .eq('dealer_id', (await supabase.auth.getUser()).data.user?.id!)

            return {
                      appointments: appointments?.length || 0,
                      conversations: conversations?.length || 0,
                      pending: appointments?.filter(a => a.status === 'pending').length || 0,
            }
          },
    })

  return (
        <div className="space-y-8">
              <div>
                      <h1 className="text-3xl font-bold">Dashboard</h1>h1>
                      <p className="text-gray-600">Welcome to your dealer dashboard</p>p>
              </div>div>
        
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-6 rounded-lg border">
                                <div className="text-sm text-gray-600">Total Appointments</div>div>
                                <div className="text-3xl font-bold mt-2">{stats?.appointments || 0}</div>div>
                      </div>div>
                      <div className="bg-white p-6 rounded-lg border">
                                <div className="text-sm text-gray-600">Conversations</div>div>
                                <div className="text-3xl font-bold mt-2">{stats?.conversations || 0}</div>div>
                      </div>div>
                      <div className="bg-white p-6 rounded-lg border">
                                <div className="text-sm text-gray-600">Pending Actions</div>div>
                                <div className="text-3xl font-bold mt-2 text-amber-600">{stats?.pending || 0}</div>div>
                      </div>div>
              </div>div>
        
              <div className="bg-white p-6 rounded-lg border">
                      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <a href="/appointments" className="block p-4 border rounded-lg hover:bg-gray-50">
                                            <div className="font-semibold">View Appointments</div>div>
                                            <div className="text-sm text-gray-600">Manage your appointments</div>div>
                                </a>a>
                                <a href="/conversations" className="block p-4 border rounded-lg hover:bg-gray-50">
                                            <div className="font-semibold">View Conversations</div>div>
                                            <div className="text-sm text-gray-600">Chat with customers</div>div>
                                </a>a>
                                <a href="/schedule" className="block p-4 border rounded-lg hover:bg-gray-50">
                                            <div className="font-semibold">Update Schedule</div>div>
                                            <div className="text-sm text-gray-600">Set your availability</div>div>
                                </a>a>
                                <a href="/analytics" className="block p-4 border rounded-lg hover:bg-gray-50">
                                            <div className="font-semibold">View Analytics</div>div>
                                            <div className="text-sm text-gray-600">Check your performance</div>div>
                                </a>a>
                      </div>div>
              </div>div>
        </div>div>
      )
}</div>
