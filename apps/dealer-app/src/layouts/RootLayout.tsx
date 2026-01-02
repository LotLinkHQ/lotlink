import { Outlet } from '@tanstack/react-router'
import { LayoutDashboard, Calendar, MessageSquare, Clock, BarChart3, Settings, LogOut, Menu } from 'lucide-react'
import { useState } from 'react'
import { supabase } from '@/integrations/supabase'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Appointments', href: '/appointments', icon: Calendar },
  { label: 'Conversations', href: '/conversations', icon: MessageSquare },
  { label: 'Schedule', href: '/schedule', icon: Clock },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/settings', icon: Settings },
  ]

export default function RootLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = async () => {
        await supabase.auth.signOut()
        window.location.href = '/login'
  }

  return (
        <div className="h-screen flex bg-gray-50">
          {/* Sidebar */}
              <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r transition-all duration-200`}>
                      <div className="p-4 border-b">
                                <div className="flex items-center justify-between">
                                  {sidebarOpen && <h1 className="font-bold text-lg">LotLink</h1>h1>}
                                            <button 
                                                            onClick={() => setSidebarOpen(!sidebarOpen)}
                                                            className="p-2 hover:bg-gray-100 rounded-lg"
                                                          >
                                                          <Menu className="w-5 h-5" />
                                            </button>button>
                                </div>div>
                      </div>div>
              
                      <nav className="p-4 space-y-2">
                        {NAV_ITEMS.map(item => (
                      <a
                                      key={item.href}
                                      href={item.href}
                                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700 text-sm"
                                    >
                                    <item.icon className="w-5 h-5 flex-shrink-0" />
                        {sidebarOpen && <span>{item.label}</span>span>}
                      </a>a>
                    ))}
                      </nav>nav>
              
                      <div className="absolute bottom-4 left-4 right-4">
                                <button
                                              onClick={handleLogout}
                                              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700 text-sm"
                                            >
                                            <LogOut className="w-5 h-5" />
                                  {sidebarOpen && <span>Logout</span>span>}
                                </button>button>
                      </div>div>
              </div>div>
        
          {/* Main Content */}
              <div className="flex-1 overflow-auto">
                {/* Header */}
                      <div className="bg-white border-b sticky top-0 z-10">
                                <div className="px-8 py-4 flex justify-between items-center">
                                            <h2 className="text-xl font-semibold text-gray-900">Dealer Portal</h2>h2>
                                            <div className="flex items-center gap-4">
                                                          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                                                                          <MessageSquare className="w-5 h-5 text-gray-600" />
                                                                          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>span>
                                                          </button>button>
                                                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>div>
                                            </div>div>
                                </div>div>
                      </div>div>
              
                {/* Page Content */}
                      <div className="p-8">
                                <Outlet />
                      </div>div>
              </div>div>
        </div>div>
      )
}</div>
