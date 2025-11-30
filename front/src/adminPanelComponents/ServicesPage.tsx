import { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import useService from '../api/hooks/useService';
import ServicePagePopUp from './ServicePagePopUp';

interface Service {
  id: number;
  icon: string;
  title_ru: string;
  title_en: string;
  title_uz: string;
  description_ru: string;
  description_en: string;
  description_uz: string;
}

type FormDataServiceType = {
  icon: File | string;
  title_ru: string;
  title_en: string;
  title_uz: string;
  description_ru: string;
  description_en: string;
  description_uz: string;
}

export function ServicesPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [serviceId, setServiceId] = useState<number>(NaN)
  const { getService, deleteService, updateService } = useService()
  const { data: services } = getService()
  const { mutate: delService } = deleteService()
  const { mutate: changeService } = updateService(serviceId)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<FormDataServiceType>({
    icon: '',
    title_ru: '',
    title_en: '',
    title_uz: '',
    description_ru: '',
    description_en: '',
    description_uz: '',
  });

  const openModal = (service?: Service) => {
    if (service) {
      setServiceId(service.id)
      setEditingService(service);
      setFormData({
        icon: service.icon,
        title_ru: service.title_ru,
        title_en: service.title_en,
        title_uz: service.title_uz,
        description_ru: service.description_ru,
        description_en: service.description_en,
        description_uz: service.description_uz,
      });
    } else {
      setEditingService(null);
      setFormData({
        icon: '',
        title_ru: '',
        title_en: '',
        title_uz: '',
        description_ru: '',
        description_en: '',
        description_uz: '',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFormData({ ...formData, icon: file });
    }
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const realForm = new FormData();

    realForm.append("icon", formData.icon);

    realForm.append("title_uz", formData.title_uz || "");
    realForm.append("title_ru", formData.title_ru || "");
    realForm.append("title_en", formData.title_en || "");
    realForm.append("description_uz", formData.description_uz || "");
    realForm.append("description_ru", formData.description_ru || "");
    realForm.append("description_en", formData.description_en || "");


    console.log(realForm)
    // send multipart/form-data
    changeService(realForm as any)
    // reset
    setFormData({
      icon: '',
      title_uz: '',
      title_ru: '',
      title_en: '',
      description_uz: '',
      description_ru: '',
      description_en: '',
    });

    closeModal()
  };
  

  const handleDelete = (id: number) => {
    if (confirm("Bu xizmatni o'chirmoqchimisiz?")) {
      delService(id)
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl tracking-tight mb-2 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
            Xizmatlar
          </h1>
          <p className="text-gray-500">Taqdim etiladigan xizmatlar ro'yxati</p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 bg-gradient-to-r from-black to-gray-800 text-white px-6 py-3 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          Yangi xizmat
        </button>
      </div>
      <div>
        {isOpen? <ServicePagePopUp setIsOpen={setIsOpen} /> : null}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services?.map((service: Service, index: number) => (
          <div 
            key={service.id} 
            className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-600 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500" />
            
            <div className="text-center mb-6 relative z-10">
              <div className='w-full max-h-[300px]'>
                <img src={`http://127.0.0.1:8000${service.icon}`} alt="" className='max-h-[250px] h-full' />
              </div>
              <h3 className="text-xl mb-3 tracking-tight">{service.title_uz}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{service.description_uz}</p>
            </div>
            
            <div className="flex gap-2 relative z-10">
              <button
                onClick={() => openModal(service)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300"
              >
                <Edit2 className="w-4 h-4" />
                Tahrirlash
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
      <form onSubmit={handleSubmit}>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="bg-gradient-to-r from-black to-gray-800 text-white p-8 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl tracking-tight">
                  {editingService ? 'Xizmatni tahrirlash' : 'Yangi xizmat qo\'shish'}
                </h2>
                <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Ikonka</label>
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    className="w-full px-4 py-3 text-center text-3xl bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                    placeholder="🎨"
                    maxLength={2}
                  />
                </div>

                <div className="space-y-4 pt-6 border-t-2 border-gray-100">
                  <h3 className="text-sm text-gray-700 mb-3">O'zbek tili</h3>
                  <input
                    type="text"
                    value={formData.title_uz}
                    onChange={(e) => setFormData({ ...formData, title_uz: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                    placeholder="Xizmat nomi"
                  />
                  <textarea
                    value={formData.description_uz}
                    onChange={(e) => setFormData({ ...formData, description_uz: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none resize-none"
                    placeholder="Qisqacha ta'rif"
                  />
                </div>

                <div className="space-y-4 pt-6 border-t-2 border-gray-100">
                  <h3 className="text-sm text-gray-700 mb-3">Русский язык</h3>
                  <input
                    type="text"
                    value={formData.title_ru}
                    onChange={(e) => setFormData({ ...formData, title_ru: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                    placeholder="Название услуги"
                  />
                  <textarea
                    value={formData.description_ru}
                    onChange={(e) => setFormData({ ...formData, description_ru: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none resize-none"
                    placeholder="Краткое описание"
                  />
                </div>

                <div className="space-y-4 pt-6 border-t-2 border-gray-100">
                  <h3 className="text-sm text-gray-700 mb-3">English</h3>
                  <input
                    type="text"
                    value={formData.title_en}
                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                    placeholder="Service name"
                  />
                  <textarea
                    value={formData.description_en}
                    onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none resize-none"
                    placeholder="Brief description"
                  />
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
                type='submit'
                className="px-6 py-3 text-sm bg-gradient-to-r from-black to-gray-800 text-white rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      </form>
      )}
    </div>
  );
}
