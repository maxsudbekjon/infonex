import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import useService from '../api/hooks/useService';

type ServiceType = {
  id: number
  icon: string
  title_ru: string
  title_uz: string
  title_en: string
  description_ru: string
  description_uz: string
  description_en: string
  created_at: string
  updated_at: string
}


export const Services = () => {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px", amount: 0.2 });

  const { getService } = useService();
  const { data: services } = getService();
  console.log(services);



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
    <section id="services" className="py-32 bg-gray-50 relative overflow-hidden" ref={ref}>
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            <span className="text-xs uppercase tracking-[0.3em] text-cyan-400">
              {t('language') === 'uz' ? 'Xizmatlar' : t('language') === 'ru' ? 'Услуги' : 'Services'}
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          </div>
          <h2 style={{ fontWeight: 300, fontSize: 'clamp(2rem, 5vw, 3rem)' }}>{t('services.title')}</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service: ServiceType, index: number) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ 
                duration: 0.5, 
                delay: isInView ? index * 0.1 : 0,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="group relative"
            >
              <div className="bg-white border border-gray-100 rounded-3xl p-8 hover:border-gray-200 hover:shadow-xl hover:shadow-cyan-200 transition-all duration-500 h-full">
                <motion.div 
                  className="w-14 h-14 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <img src={`http://127.0.0.1:8000${service.icon}`}  />
                </motion.div>
                <h3 className="mb-4" style={{ fontWeight: 500, fontSize: '1.25rem' }}>{handleLanguageTitle({title_ru: service.title_ru, title_uz: service.title_uz, title_en: service.title_en})}</h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontWeight: 300 }}>{handleLanguageDescription({description_ru: service.description_ru, description_uz: service.description_uz, description_en: service.description_en})}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};