import { TrendingUp, Briefcase, FolderOpen, MessageSquare, Send } from 'lucide-react';
import useStats from '../api/hooks/useStats';
import useService from '../api/hooks/useService';
import usePortfolio from '../api/hooks/usePortfolio';
import useComments from '../api/hooks/useComments';
import useProjectSuggestion from '../api/hooks/useProjectSuggestoin';

export function Dashboard() {
  const { getStats } = useStats()
  const { data: analytics } =  getStats()

  const { getService } = useService()
  const { data: service } = getService()

  const { getPortfolio } = usePortfolio()
  const { data: portfolios } = getPortfolio()

  const { getComments } = useComments()
  const { data: comments } = getComments()
  
  const { getSuggestions } = useProjectSuggestion()
  const { data: suggestions } = getSuggestions()

  console.log(comments?.length)
  
  const stats = [
    { label: 'Analitika', value: analytics?.length, icon: TrendingUp, gradient: 'from-gray-900 to-gray-700' },
    { label: 'Xizmatlar', value: service?.length, icon: Briefcase, gradient: 'from-gray-800 to-gray-600' },
    { label: 'Portfolio', value: portfolios?.length, icon: FolderOpen, gradient: 'from-gray-700 to-gray-500' },
    { label: 'Sharhlar', value: comments?.length, icon: MessageSquare, gradient: 'from-gray-600 to-gray-400' },
    { label: 'Takliflar', value: suggestions?.length, icon: Send, gradient: 'from-gray-500 to-gray-300' },
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl tracking-tight mb-2 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
          Bosh sahifa
        </h1>
        <p className="text-gray-500">Umumiy ko'rinish va statistika</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (  
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className={`bg-gradient-to-br ${stat.gradient} text-white p-4 rounded-xl mb-4 shadow-md inline-block`}>
                <Icon className="w-6 h-6" />
              </div>
              
              <div className="text-4xl mb-2 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 tracking-wide">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-br from-black to-gray-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <h2 className="text-2xl text-white mb-4 tracking-tight">Xush kelibsiz 👋</h2>
          <p className="text-gray-300 leading-relaxed max-w-3xl">
            Bu zamonaviy admin panel orqali siz saytingizdagi barcha ma'lumotlarni oson va qulay boshqarishingiz mumkin. 
            Chap tarafdagi menyudan kerakli bo'limni tanlang va ma'lumotlarni boshqaring.
          </p>
        </div>
      </div>
    </div>
  );
}
