import { useEffect, useState } from 'react';
import { Trash2, Mail, User, Calendar, Eye, X } from 'lucide-react';
import useProjectSuggestion from '../api/hooks/useProjectSuggestoin';

interface Suggestion {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export function SuggestionsPage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    { id: 1, name: 'Jamshid Rahimov', email: 'jamshid@example.com', message: 'Assalomu alaykum, men sizning xizmatlaringizdan foydalanmoqchiman. Veb sayt ishlab chiqish bo\'yicha narxlarni bilsam bo\'ladi.', created_at: '2025-11-25' },
    { id: 2, name: 'Olga Smirnova', email: 'olga.smirnova@example.com', message: 'Здравствуйте! Хотела бы узнать о ваших услугах по разработке мобильных приложений.', created_at: '2025-11-24' },
  ]);

  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);

  const { getSuggestions, deleteSuggestion } = useProjectSuggestion()
  const { data } = getSuggestions()
  const { mutate: delSuggestion } = deleteSuggestion()

  useEffect(() => {
    setSuggestions(data)
  },[data])

  const handleDelete = (id: number) => {
    if (confirm("Bu taklifni o'chirmoqchimisiz?")) {
      setSuggestions(suggestions.filter(suggestion => suggestion.id !== id));
      delSuggestion(id)
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl tracking-tight mb-2 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">Loyiha takliflari</h1>
        <p className="text-gray-500">Mijozlardan kelgan so'rovlar va takliflar</p>
      </div>

      <div className="space-y-6">
        {suggestions?.map((suggestion, index) => (
          <div key={suggestion.id} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <h3 className="text-xl tracking-tight">{suggestion.name}</h3>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <a href={`mailto:${suggestion.email}`} className="text-sm text-blue-600 hover:underline">{suggestion.email}</a>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm">{suggestion.created_at}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl mb-6">
              <p className="text-gray-700 leading-relaxed">{suggestion.message}</p>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setSelectedSuggestion(suggestion)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300">
                <Eye className="w-4 h-4" />
                To'liq ko'rish
              </button>
              <a href={`mailto:${suggestion.email}`} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm bg-gradient-to-r from-black to-gray-800 text-white rounded-xl hover:shadow-xl transition-all duration-300">
                <Mail className="w-4 h-4" />
                Javob berish
              </a>
              <button onClick={() => handleDelete(suggestion.id)} className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {suggestions?.length === 0 && (
        <div className="bg-white rounded-2xl p-16 text-center shadow-lg">
          <p className="text-gray-500">Hozircha takliflar yo'q</p>
        </div>
      )}

      {selectedSuggestion && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="bg-gradient-to-r from-black to-gray-800 text-white p-8 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl tracking-tight">Taklif tafsilotlari</h2>
                <button onClick={() => setSelectedSuggestion(null)} className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300"><X className="w-6 h-6" /></button>
              </div>
            </div>
            
            <div className="p-8 space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Ism</label>
                <div className="p-4 bg-gray-50 rounded-xl">{selectedSuggestion.name}</div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <a href={`mailto:${selectedSuggestion.email}`} className="text-blue-600 hover:underline">{selectedSuggestion.email}</a>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Xabar</label>
                <div className="p-6 bg-gray-50 rounded-xl leading-relaxed whitespace-pre-wrap">{selectedSuggestion.message}</div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Yuborilgan sana</label>
                <div className="p-4 bg-gray-50 rounded-xl">{selectedSuggestion.created_at}</div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 p-8 border-t-2 border-gray-100">
              <button onClick={() => setSelectedSuggestion(null)} className="px-6 py-3 text-sm bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300">Yopish</button>
              <a href={`mailto:${selectedSuggestion.email}`} className="px-6 py-3 text-sm bg-gradient-to-r from-black to-gray-800 text-white rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105">Javob berish</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
