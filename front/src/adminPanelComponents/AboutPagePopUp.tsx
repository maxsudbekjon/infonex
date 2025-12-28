import React, { useState } from "react"
import useAbout from "../api/hooks/useAbout"

const AboutPagePopUp = (props: any) => {
  const { setIsOpen } = props
  const [formData, setFormData ] = useState({
    title_ru: "",
    title_en: "",
    title_uz: "",
    description_ru: "",
    description_en: "",
    description_uz: "",
  })

  const { postAbout } = useAbout()
  const { mutate } = postAbout()


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate(formData)

    setFormData({
      title_ru: "",
      title_en: "",
      title_uz: "",
      description_ru: "",
      description_en: "",
      description_uz: "",
    })
    setIsOpen(false)
  }
  
  
  return (
    <>
      <div className="w-full h-full fixed top-0 left-0 bg-[#00000060] flex items-center justify-center">
        <div className="bg-white rounded-[20px] w-full h-full max-w-[600px] max-h-[800px] shadow-lg px-2.5 overflow-auto">
          <button
            onClick={() => setIsOpen(false)}
            className="text-[20px] text-gray-400 hover:text-gray-800 duration-300 p-2 float-right">✕</button>
          <h1 className="text-[30px] mt-7">"Biz haqimizda" yaratish</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <div>
                <label htmlFor="uz_title">O'zbekcha sarlavha</label>
                <input
                    id="uz_title"
                    type="text"
                    onChange={(e) => setFormData({ ...formData, title_uz: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                  />
              </div>
              <div>
                <label htmlFor="uz_description">O'zbekcha ta'rif</label>
                <textarea
                  id="uz_description"
                  onChange={(e) => setFormData({ ...formData, description_uz: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none resize-none"
                />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="ru_title">Русское название</label>
                <input
                    id="ru_title"
                    type="text"
                    onChange={(e) => setFormData({ ...formData, title_ru: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                  />
              </div>
              <div>
                <label htmlFor="ru_description">Русское описание</label>
                <textarea
                  id="ru_description"
                  onChange={(e) => setFormData({ ...formData, description_ru: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none resize-none"
                />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="eng_title">English title</label>
                <input
                    id="eng_title"
                    type="text"
                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none"
                  />
              </div>
              <div>
                <label htmlFor="eng_description">English description</label>
                <textarea
                  id="eng_description"
                  onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none resize-none"
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

export default AboutPagePopUp