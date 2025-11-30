import { useState } from 'react';
import { Edit2, Plus, Save, Trash2 } from 'lucide-react';
import useAbout from '../api/hooks/useAbout';
import { type AboutDataType } from '../components/About';
import AboutPagePopUp from './AboutPagePopUp';

type ToggleState = {
  [id: number]: boolean;
};


export function AboutPage() {
  const [isEditing, setIsEditing] = useState<ToggleState>({});
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    id: 0,
    title_uz: "",
    title_ru: "",
    title_en: "",
    description_uz: "",
    description_ru: "",
    description_en: "",
  });


  const { getAbout } = useAbout()
  const { data } = getAbout()

  const { updateAbout } = useAbout()
  const { mutate } = updateAbout()
  

  const handleToggle = (id: number) => {
    setFormData({ ...formData, id: id })
    setIsEditing({})
    setIsEditing(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };


  const { deleteAbout } = useAbout()
  const { mutate: delAbout } = deleteAbout()
  
  const handleDelete = (id: number) => {
    delAbout(id)
    alert("Del  eted Successfully")
  }
  
  
  const handleSave = () => {
    mutate(formData)
    setIsEditing({});
    setIsEditing({})
    alert("Ma'lumotlar saqlandi!");
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl tracking-tight mb-2 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
            Biz haqimizda
          </h1>
          <p className="text-gray-500">Kompaniya haqida umumiy ma'lumot</p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 bg-gradient-to-r from-black to-gray-800 text-white px-6 py-3 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          Yangi qo'shish
        </button>
      </div>


      <div className='flex flex-col gap-3'>
      {
        data?.map((item: AboutDataType) => (
          <div key={item.id} className="space-y-6">
            <div className="bg-white flex flex-col gap-2 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-lg mb-6 tracking-tight">O'zbek tili</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Sarlavha</label>
                  {isEditing[item.id] ? (
                    <input
                      type="text"
                      value={formData.title_uz}
                      onChange={(e) => setFormData({ ...formData, title_uz: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-xl">{item.title_uz}</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Tavsif</label>
                  {isEditing[item.id] ? (
                    <textarea
                      value={formData.description_uz}
                      onChange={(e) => setFormData({ ...formData, description_uz: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none resize-none"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-xl leading-relaxed">{item.description_uz}</div>
                  )}
                </div>
              </div>

              <h2 className="text-lg mb-6 tracking-tight">Русский язык</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Заголовок</label>
                  {isEditing[item.id] ? (
                    <input
                      type="text"
                      value={formData.title_ru}
                      onChange={(e) => setFormData({ ...formData, title_ru: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-xl">{item.title_ru}</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Описание</label>
                  {isEditing[item.id] ? (
                    <textarea
                      value={formData.description_ru}
                      onChange={(e) => setFormData({ ...formData, description_ru: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none resize-none"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-xl leading-relaxed">{item.description_ru}</div>
                  )}
                </div>
              </div>

              <h2 className="text-lg mb-6 tracking-tight">English</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Title</label>
                  {isEditing[item.id] ? (
                    <input
                      type="text"
                      value={formData.title_en}
                      onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-xl">{item.title_en}</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Description</label>
                  {isEditing[item.id] ? (
                    <textarea
                      value={formData.description_en}
                      onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none resize-none"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-xl leading-relaxed">{item.description_en}</div>
                  )}
                </div>
              </div>
              <div className='flex gap-2 flex-wrap items-center'>
                <div>
                  {isEditing[item.id] ? (
                      <button
                        onClick={() => handleSave()}
                        className="group flex items-center gap-2 bg-gradient-to-r from-black to-gray-800 text-white px-6 py-3 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        <Save className="w-5 h-5" />
                        Saqlash
                      </button>
                    ) : (
                      <button
                        onClick={() => handleToggle(item.id)}
                        className="group flex items-center gap-2 bg-gradient-to-r from-black to-gray-800 text-white px-6 py-3 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        <Edit2 className="w-5 h-5" />
                        Tahrirlash
                      </button>
                    )}
                </div>
                <div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        ))
      }
      </div>
      {
        isOpen? <AboutPagePopUp setIsOpen={setIsOpen} /> : null 
      }
    </div>
  );
}