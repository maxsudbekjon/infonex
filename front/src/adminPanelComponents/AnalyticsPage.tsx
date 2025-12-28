import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import useStats from '../api/hooks/useStats';

interface AnalyticsItem {
  id: number;
  value: number;
  suffix: string;
  label_ru: string;
  label_en: string;
  label_uz: string;
}

export function AnalyticsPage() {
  const [items, setItems] = useState<AnalyticsItem[]>([
    { id: 1, value: 500, suffix: '+', label_ru: 'Проекты', label_en: 'Projects', label_uz: 'Loyihalar' },
    { id: 2, value: 98, suffix: '%', label_ru: 'Успех', label_en: 'Success', label_uz: 'Muvaffaqiyat' },
    { id: 3, value: 1000, suffix: '+', label_ru: 'Клиенты', label_en: 'Clients', label_uz: 'Mijozlar' },
    { id: 4, value: 15, suffix: '+', label_ru: 'Лет опыта', label_en: 'Years experience', label_uz: 'Yillik tajriba' },
  ]);


  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { getStats } = useStats()
  const { data: stats } = getStats()

  
  
  useEffect(() => {
    setItems(stats)
  },[stats])
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AnalyticsItem | null>();
  const [formData, setFormData] = useState({
    id: 0,
    value: 0,
    suffix: '',
    label_ru: '',
    label_en: '',
    label_uz: '',
  }); 
  
  const [postFormData, setPostFormData] = useState({
    value: 0,
    suffix: '',
    label_ru: '',
    label_en: '',
    label_uz: '',
  }); 

  

  const { updateStats, postStats } = useStats()
  const { mutate } = updateStats()
  const { mutate: addStat } = postStats()

  const openModal = (item?: AnalyticsItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        id: item.id,
        value: item.value,
        suffix: item.suffix,
        label_ru: item.label_ru,
        label_en: item.label_en,
        label_uz: item.label_uz,
      });
    } else {
      setEditingItem(null);
      setFormData({id: 0, value: 0, suffix: '', label_ru: '', label_en: '', label_uz: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSave = () => {
    mutate(formData)
    closeModal();
  };

  const handleSubmit = () => {
   addStat(postFormData) 
   setIsOpen(false)
  }

  const { deleteStat } = useStats()
  const { mutate: deleteAnlaytic } = deleteStat()


  const handleDelete = (id: number) => {
    if (confirm("Bu ma'lumotni o'chirmoqchimisiz?")) {
      setItems(items.filter(item => item.id !== id));
    }
    deleteAnlaytic(id)
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl tracking-tight mb-2 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
            Analitika
          </h1>
          <p className="text-gray-500">Statistik raqamlar va ko'rsatkichlar</p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 bg-gradient-to-r from-black to-gray-800 text-white px-6 py-3 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          Yangi qo'shish
        </button>
        <div className='fixed z-1000'>
          {isOpen? 
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
                <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp">
                  <div className="bg-gradient-to-r from-black to-gray-800 text-white p-8 rounded-t-3xl">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl tracking-tight">
                        Yangi ma'lumot qo'shish
                      </h2>
                      <button 
                        onClick={() => setIsOpen(false)} 
                        className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2 text-gray-700">Raqam</label>
                        <input
                          type="number"
                          value={postFormData.value}
                          onChange={(e) => setPostFormData({ ...postFormData, value: parseInt(e.target.value) || 0 })}
                          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                          required
                          placeholder="500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm mb-2 text-gray-700">Qo'shimcha</label>
                        <input
                          type="text"
                          value={postFormData.suffix}
                          onChange={(e) => setPostFormData({ ...postFormData, suffix: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                          placeholder="+"
                          required
                          maxLength={2}
                        />
                      </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t-2 border-gray-100">
                      <div>
                        <label className="block text-sm mb-2 text-gray-700">O'zbek tilida</label>
                        <input
                          type="text"
                          value={postFormData.label_uz}
                          onChange={(e) => setPostFormData({ ...postFormData, label_uz: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                          placeholder="Loyihalar"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm mb-2 text-gray-700">Rus tilida</label>
                        <input
                          type="text"
                          value={postFormData.label_ru}
                          onChange={(e) => setPostFormData({ ...postFormData, label_ru: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                          placeholder="Проекты"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm mb-2 text-gray-700">Ingliz tilida</label>
                        <input
                          type="text"
                          value={postFormData.label_en}
                          onChange={(e) => setPostFormData({ ...postFormData, label_en: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                          placeholder="Projects"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-4 p-8 border-t-2 border-gray-100">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-6 py-3 text-sm bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300"
                    >
                      Bekor qilish
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-3 text-sm bg-gradient-to-r from-black to-gray-800 text-white rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      Saqlash
                    </button>
                  </div>
                </div>
              </div>
           : null}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items?.map((item, index) => (
          <div 
            key={item.id} 
            className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-600 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500" />
            
            <div className="text-center mb-6 relative z-10">
              <div className="text-5xl mb-3 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                {item.value}{item.suffix}
              </div>
              <div className="text-sm text-gray-600">{item.label_uz}</div>
            </div>
            
            <div className="flex gap-2 relative z-10">
              <button
                onClick={() => openModal(item)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300"
              >
                <Edit2 className="w-4 h-4" />
                Tahrirlash
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp">
            <div className="bg-gradient-to-r from-black to-gray-800 text-white p-8 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl tracking-tight">
                  {editingItem ? "Ma'lumotni tahrirlash" : "Yangi ma'lumot qo'shish"}
                </h2>
                <button 
                  onClick={closeModal} 
                  className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Raqam</label>
                  <input
                    type="number"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                    placeholder="500"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700">Qo'shimcha</label>
                  <input
                    type="text"
                    value={formData.suffix}
                    onChange={(e) => setFormData({ ...formData, suffix: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                    placeholder="+"
                    maxLength={2}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t-2 border-gray-100">
                <div>
                  <label className="block text-sm mb-2 text-gray-700">O'zbek tilida</label>
                  <input
                    type="text"
                    value={formData.label_uz}
                    onChange={(e) => setFormData({ ...formData, label_uz: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                    placeholder="Loyihalar"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700">Rus tilida</label>
                  <input
                    type="text"
                    value={formData.label_ru}
                    onChange={(e) => setFormData({ ...formData, label_ru: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                    placeholder="Проекты"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700">Ingliz tilida</label>
                  <input
                    type="text"
                    value={formData.label_en}
                    onChange={(e) => setFormData({ ...formData, label_en: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                    placeholder="Projects"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 p-8 border-t-2 border-gray-100">
              <button
                onClick={closeModal}
                className="px-6 py-3 text-sm bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 text-sm bg-gradient-to-r from-black to-gray-800 text-white rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
