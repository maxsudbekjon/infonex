import { useState } from "react"
import useService from "../api/hooks/useService"
import { X } from "lucide-react"

type ServiceType = {
  icon: File | string
  title_uz: string
  title_ru: string
  title_en: string
  description_uz: string
  description_ru: string
  description_en: string
}


const ServicePagePopUp = (props: any) => {
  const { setIsOpen } = props


  const [formData, setFormData] = useState<ServiceType>({
      icon: '',
      title_uz: '',
      title_ru: '',
      title_en: '',
      description_uz: '',
      description_ru: '',
      description_en: '',
    });
  
  const [preview, setPreview] = useState<string | null>(null);

  const { postService } = useService()
  const { mutate: addService } = postService()

  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFormData({ ...formData, icon: file });
      setPreview(URL.createObjectURL(file)); // preview only
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


    // send multipart/form-data
    addService(realForm as any)
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
    setPreview(null);
    setIsOpen(false)
  };
  

  
  

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="bg-gradient-to-r from-black to-gray-800 text-white p-8 rounded-t-3xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl tracking-tight">
                Yangi xizmat qo\'shish
              </h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
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
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 text-sm bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                className="px-6 py-3 text-sm bg-gradient-to-r from-black to-gray-800 text-white rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Saqlash
              </button>
            </div>
          </form>
        </div>
      </div> 
    </>
  )
}

export default ServicePagePopUp