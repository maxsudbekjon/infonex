import { useState } from "react";
import usePortfolio from "../api/hooks/usePortfolio";
import { X } from "lucide-react";

interface Portfolio {
  image: File | string;
  link: string;
  field_uz: string;
  field_ru: string;
  field_en: string;
  title_uz: string;
  title_ru: string;
  title_en: string;
}


const PortfoliPopUp = (props: any) => {
  const { setIsOpen } = props
  

   const [formData, setFormData] = useState<Portfolio>({
      image: '',
      link: '',
      field_en: '',
      field_ru: '',
      field_uz: '',
      title_uz: '',
      title_ru: '',
      title_en: '',
    });
  
  const [preview, setPreview] = useState<string | null>(null);

  const { postPortfolio } = usePortfolio()
  const { mutate: addPortfolio } = postPortfolio()
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file)); // preview only
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const realForm = new FormData();

    realForm.append("image", formData.image);

    realForm.append("link", formData.link || "");
    realForm.append("title_uz", formData.title_uz || "");
    realForm.append("title_ru", formData.title_ru || "");
    realForm.append("title_en", formData.title_en || "");
    realForm.append("field_uz", formData.field_uz || "");
    realForm.append("field_ru", formData.field_ru || "");
    realForm.append("field_en", formData.field_en || "");


    // send multipart/form-data
    addPortfolio(realForm as any)
    // reset
    setFormData({
      image: '',
      link: '',
      field_en: '',
      field_ru: '',
      field_uz: '',
      title_uz: '',
      title_ru: '',
      title_en: '',
    });
    setPreview(null);
    setIsOpen(false)
  };


  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="bg-gradient-to-r from-black to-gray-800 text-white p-8 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl tracking-tight">
                  Loyihani tahrirlash
                </h2>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300">
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
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-4 pt-6 border-t-2 border-gray-100">
                <h3 className="text-sm text-gray-700 mb-3">O'zbek tili</h3>
                <input
                  type="text"
                  onChange={(e) => setFormData({ ...formData, field_uz: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                  placeholder="Soha"
                />
                <input
                  type="text"
                  onChange={(e) => setFormData({ ...formData, title_uz: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                  placeholder="Loyiha nomi"
                />
              </div>

              <div className="space-y-4 pt-6 border-t-2 border-gray-100">
                <h3 className="text-sm text-gray-700 mb-3">Русский язык</h3>
                <input
                  type="text"
                  onChange={(e) => setFormData({ ...formData, field_ru: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                  placeholder="Область"
                />
                <input
                  type="text"
                  onChange={(e) => setFormData({ ...formData, title_ru: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                  placeholder="Название проекта"
                />
              </div>

              <div className="space-y-4 pt-6 border-t-2 border-gray-100">
                <h3 className="text-sm text-gray-700 mb-3">English</h3>
                <input
                  type="text"
                  onChange={(e) => setFormData({ ...formData, field_en: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                  placeholder="Field"
                />
                <input
                  type="text"
                  onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                  placeholder="Project name"
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
          </div>
        </form>
      </div>
    </>
  )
}

export default PortfoliPopUp