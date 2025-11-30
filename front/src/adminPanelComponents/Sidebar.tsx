import { LayoutDashboard, TrendingUp, Info, Briefcase, FolderOpen, MessageSquare, Send } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Bosh sahifa', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analitika', icon: TrendingUp },
    { id: 'about', label: 'Biz haqimizda', icon: Info },
    { id: 'services', label: 'Xizmatlar', icon: Briefcase },
    { id: 'portfolio', label: 'Portfolio', icon: FolderOpen },
    { id: 'comments', label: 'Sharhlar', icon: MessageSquare },
    { id: 'suggestions', label: 'Takliflar', icon: Send },
  ];

  return (
    <aside className="w-72 bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white flex flex-col shadow-2xl">
      <div className="p-8">
        <div className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          <h1 className="text-3xl tracking-tight">Admin</h1>
          <p className="text-sm text-gray-400 mt-1">Panel</p>
        </div>
      </div>
      
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-300 group ${
                    isActive
                      ? 'bg-white text-black shadow-lg transform scale-105'
                      : 'text-gray-400 hover:bg-white/10 hover:text-white hover:translate-x-1'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? '' : 'group-hover:scale-110'}`} />
                  <span className="tracking-wide">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-6 border-t border-gray-800/50">
        <div className="text-xs text-gray-500 text-center">
          © 2025 Admin Panel
        </div>
      </div>
    </aside>
  );
}
