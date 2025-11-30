import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { Target, Award } from 'lucide-react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import useAbout from '../api/hooks/useAbout';


export type AboutDataType = {
  id: number
  title_ru: string
  title_uz: string
  title_en: string
  description_ru: string
  description_uz: string
  description_en: string
  created_at: string
  updated_at: string
}

export const About = () => {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px", amount: 0.3 });


  const { getAbout } = useAbout()
  const { data: aboutData } = getAbout();
  
  
  const handleLanguageTitle = ({ title_ru, title_uz, title_en}: { title_ru: string, title_uz: string, title_en: string }) => {
    switch (language) {
      case 'ru':
        return title_ru;
      case 'uz':
        return title_uz;
      case 'en':
        return title_en;
      default:
        return title_en;
    }
  }

  const handleLanguageDescription = ({ description_ru, description_uz, description_en }: { description_ru: string, description_uz: string, description_en: string }) => {
    switch (language) {
      case 'ru':
        return description_ru;
      case 'uz':
        return description_uz;
      case 'en':
        return description_en;
      default:
        return description_en;
    }
  }

  return (
    <section id="about" className="py-32 bg-white relative overflow-hidden" ref={ref}>
      {/* Decorative background elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-gradient-to-l from-gray-100 to-transparent rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-gradient-to-r from-gray-100 to-transparent rounded-full blur-3xl opacity-50" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <span className="text-xs uppercase tracking-[0.3em] text-gray-400">
              {t('language') === 'uz' ? 'Biz haqimizda' : t('language') === 'ru' ? 'О компании' : 'About Company'}
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </motion.div>
          <h2 className="mb-6" style={{ fontWeight: 300, fontSize: 'clamp(2rem, 5vw, 3rem)' }}>{t('about.title')}</h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-loose" style={{ fontWeight: 300 }}>
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {
            aboutData?.map((item: AboutDataType) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className="relative p-8 border border-gray-200 hover:border-black transition-colors duration-300 rounded-2xl">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-black rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="mb-3">{handleLanguageTitle({title_ru: item.title_ru, title_uz: item.title_uz, title_en: item.title_en})}</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {handleLanguageDescription({description_ru: item.description_ru, description_uz: item.description_uz, description_en: item.description_en})}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          }

        </div>
      </div>
    </section>
  );
};