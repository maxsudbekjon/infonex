import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import useStats from '../api/hooks/useStats';


type StatType = {
  id: number
  label_ru: string
  label_uz: string
  label_en: string
  value: number
  suffix: string
}

export const Stats = () => {
  const { language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px", amount: 0.3 });

  const { getStats } = useStats()
  const { data } = getStats()


  const handleLanguageLabel = ({ label_en, label_ru, label_uz}: { label_en: string, label_ru: string, label_uz: string }) => {
    switch (language) {
      case 'ru':
        return label_ru;
      case 'uz':
        return label_uz;
      default:
        return label_en;
  }
  }

  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden" ref={ref}>
      {/* Subtle ambient light */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/5 rounded-3xl overflow-hidden p-[1px]"
        >
          {data?.map((stat: StatType, index: number) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              transition={{ 
                duration: 0.5, 
                delay: isInView ? index * 0.08 : 0,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <div className="bg-black/40 backdrop-blur-sm p-10 text-center relative overflow-hidden">
                <div className="relative z-10">
                  <div
                    className="text-5xl mb-3 tracking-tight text-white tabular-nums"
                    style={{ fontWeight: 200, fontVariantNumeric: 'tabular-nums' }}
                  >
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm text-gray-400 tracking-wide" style={{ fontWeight: 400 }}>
                    {handleLanguageLabel({label_en: stat.label_en, label_ru: stat.label_ru, label_uz: stat.label_uz})}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};