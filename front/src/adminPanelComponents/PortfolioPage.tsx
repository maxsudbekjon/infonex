import { useState } from 'react';
import { Plus, Edit2, Trash2, X, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import usePortfolio from '../api/hooks/usePortfolio';
import PortfoliPopUp from './PortfoliPopUp';

interface Portfolio {
  id: number;
  image: File | string;
  link: string;
  field_uz: string;
  field_ru: string;
  field_en: string;
  title_uz: string;
  title_ru: string;
  title_en: string;
}

type FormDataPortfolio = {
  image: File | string;
  link: string;
  field_uz: string;
  field_ru: string;
  field_en: string;
  title_uz: string;
  title_ru: string;
  title_en: string;
}

export function PortfolioPage() {
  
  const [portfolioId, setPortfolioId] = useState<number>(NaN)
  
  const { getPortfolio, updatePortfolio, deletePortfolio } = usePortfolio()
  const { mutate: changePortfolio } = updatePortfolio(portfolioId)
  const { data: projects } = getPortfolio()
  const { mutate: delPortfolio } = deletePortfolio()



  
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Portfolio | null>(null);
  const [formData, setFormData] = useState<FormDataPortfolio>({
    image: '',
    link: '',
    field_uz: '',
    field_ru: '',
    field_en: '',
    title_uz: '',
    title_ru: '',
    title_en: '',
  });

  const openModal = (project?: Portfolio) => {
    if (project) {
      setPortfolioId(project.id)
      setEditingProject(project);
      setFormData(prev => ({...prev, 
        link: project.link,
        field_uz: project.field_uz,
        field_ru: project.field_ru,
        field_en: project.field_en,
        title_uz: project.title_uz,
        title_ru: project.title_ru,
        title_en: project.title_en,
      }));
    } else {
      setEditingProject(null);
      setFormData({ image: '', link: '', field_uz: '', field_ru: '', field_en: '', title_uz: '', title_ru: '', title_en: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const realForm = new FormData();

    realForm.append("image", formData.image);
    realForm.append("link", formData.link || "")
    realForm.append("title_uz", formData.title_uz || "");
    realForm.append("title_ru", formData.title_ru || "");
    realForm.append("title_en", formData.title_en || "");
    realForm.append("field_uz", formData.field_uz || "");
    realForm.append("field_ru", formData.field_ru || "");
    realForm.append("field_en", formData.field_en || "");


    console.log(realForm)
    // send multipart/form-data
    changePortfolio(realForm as any)
    // reset
    setFormData({
      image: '',
      link: '',
      title_uz: '',
      title_ru: '',
      title_en: '',
      field_uz: '',
      field_ru: '',
      field_en: '',
    });

    closeModal()
  };
  
  

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Bu loyihani o'chirmoqchimisiz?")) {
      delPortfolio(id)
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl tracking-tight mb-2 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
            Portfolio
          </h1>
          <p className="text-gray-500">Bajarilgan loyihalar ro'yxati</p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 bg-gradient-to-r from-black to-gray-800 text-white px-6 py-3 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          Yangi loyiha
        </button>
      </div>
      <div>
        {isOpen? <PortfoliPopUp setIsOpen={setIsOpen} /> : null}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: Portfolio, index: number) => (
          <div 
            key={project.id} 
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              <ImageWithFallback
                src={`http://127.0.0.1:8000${project.image}`}
                alt={project.title_uz}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider">{project.field_uz}</div>
              <h3 className="text-xl mb-4 tracking-tight">{project.title_uz}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(project)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300"
                >
                  <Edit2 className="w-4 h-4" />
                  Tahrirlash
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-xs text-gray-500 hover:text-black mt-3 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Loyihani ko'rish
              </a>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="bg-gradient-to-r from-black to-gray-800 text-white p-8 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl tracking-tight">
                    {editingProject ? 'Loyihani tahrirlash' : 'Yangi loyiha qo\'shish'}
                  </h2>
                  <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Loyiha rasmi (URL)</label>
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700">Loyiha havolasi</label>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                    placeholder="https://example.com"
                  />
                </div>

                <div className="space-y-4 pt-6 border-t-2 border-gray-100">
                  <h3 className="text-sm text-gray-700 mb-3">O'zbek tili</h3>
                  <input
                    type="text"
                    value={formData.field_uz}
                    onChange={(e) => setFormData({ ...formData, field_uz: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                    placeholder="Soha"
                  />
                  <input
                    type="text"
                    value={formData.title_uz}
                    onChange={(e) => setFormData({ ...formData, title_uz: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                    placeholder="Loyiha nomi"
                  />
                </div>

                <div className="space-y-4 pt-6 border-t-2 border-gray-100">
                  <h3 className="text-sm text-gray-700 mb-3">Русский язык</h3>
                  <input
                    type="text"
                    value={formData.field_ru}
                    onChange={(e) => setFormData({ ...formData, field_ru: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                    placeholder="Область"
                  />
                  <input
                    type="text"
                    value={formData.title_ru}
                    onChange={(e) => setFormData({ ...formData, title_ru: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                    placeholder="Название проекта"
                  />
                </div>

                <div className="space-y-4 pt-6 border-t-2 border-gray-100">
                  <h3 className="text-sm text-gray-700 mb-3">English</h3>
                  <input
                    type="text"
                    value={formData.field_en}
                    onChange={(e) => setFormData({ ...formData, field_en: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                    placeholder="Field"
                  />
                  <input
                    type="text"
                    value={formData.title_en}
                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                    placeholder="Project name"
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
          </form>
        </div>
      )}
    </div>
  );
}
