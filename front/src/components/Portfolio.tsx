import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useInView } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowUpRight } from 'lucide-react';
import usePortfolio from '../api/hooks/usePortfolio';
import { StarRating } from './StarRaring';
import useComments from '../api/hooks/useComments';



type ProjectType = {
  id: number
  image: string
  field_ru: string
  field_uz: string
  field_en: string
  title_ru: string
  title_uz: string
  title_en: string
  link: string
  created_at: string
  updated_at: string
}

export type CommentType = {
  full_name: string
  company: string
  position: string
  comment: string
  stars: number
  project: number
}

export const Portfolio = () => {
  const [open, setOpen] = useState<{ [key: number]: boolean }>({});
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px", amount: 0.2 });

  const [comment, setComment] = useState<CommentType>({
    full_name: "",
    company: "",
    position: "",
    comment: "",
    stars: 0,
    project: 0,
  })

  const { getPortfolio } = usePortfolio();
  const { data: projects } = getPortfolio();


  const toggle = (index: number) => {
    setComment(prev => ({...prev, project: index}))
    setOpen(prev => ({
      ...prev,
      [index]: !prev[index], // toggle just this one
    }));
  };
  
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

  const handleLanguageField = ({ field_ru, field_uz, field_en }: { field_ru: string, field_uz: string, field_en: string }) => {
    switch (language) {
      case 'ru':
        return field_ru;
      case 'uz':
        return field_uz;
      case 'en':
        return field_en;
      default:
        return field_en;
    }
  }

  const { postComments } = useComments()
  const { mutate, isSuccess } = postComments()

  
  
  useEffect(() => {
    if(isSuccess) {
      setOpen({})
    }
  },[isSuccess])
  
  
  const handleRatingChange = (rating: number) => {
    setComment(prev => ({ ...prev, stars: rating }));
    console.log("New rating:", rating); // or do anything else with it
  };
  
  
  const handleSubmit = ({e, id}: {e:  React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number}) => {
    e.preventDefault()
    console.log(comment)
    mutate(comment)
  } 
  

  return (
    <section id="portfolio" className="py-32 bg-gray-50 relative overflow-hidden" ref={ref}>
      {/* Ultra subtle texture */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <span className="text-xs uppercase tracking-[0.3em] text-gray-400">
              {t('language') === 'uz' ? 'Portfolio' : t('language') === 'ru' ? 'Портфолио' : 'Portfolio'}
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>
          <h2 className="mb-6" style={{ fontWeight: 300, fontSize: 'clamp(2rem, 5vw, 3rem)' }}>{t('portfolio.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-loose" style={{ fontWeight: 300 }}>
            {t('portfolio.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project: ProjectType, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity:   0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-500">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <ImageWithFallback
                    src={`http://127.0.0.1:8000${project.image}`}
                    alt={handleLanguageTitle({ title_ru: project.title_ru, title_uz: project.title_uz, title_en: project.title_en })}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Hover content */}
                  <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="text-xs text-white/80 mb-2 tracking-wide" style={{ fontWeight: 400 }}>
                        {handleLanguageField({ field_ru: project.field_ru, field_uz: project.field_uz, field_en: project.field_en })}
                      </div>
                      <h3 className="text-white flex items-center gap-2" style={{ fontSize: '1.125rem', fontWeight: 500 }}>
                        {handleLanguageTitle({ title_ru: project.title_ru, title_uz: project.title_uz, title_en: project.title_en })}
                        <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                      </h3>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="text-xs text-gray-500 mb-2 tracking-wide" style={{ fontWeight: 400 }}>
                    {handleLanguageField({ field_ru: project.field_ru, field_uz: project.field_uz, field_en: project.field_en })}
                  </div>
                  <h3 className="text-gray-900 group-hover:text-black transition-colors" style={{ fontSize: '1.125rem', fontWeight: 500 }}>
                    {handleLanguageTitle({ title_ru: project.title_ru, title_uz: project.title_uz, title_en: project.title_en })}
                  </h3>
                </div>

                <button onClick={() => toggle(project.id)} className='w-[90%] hover:cursor-pointer h-10 mb-5 ml-[5%] border border-gray-300 text-gray-400 hover:border-gray-500 hover:text-gray-600 duration-300 rounded-[10px] '>Review This Project</button>
              </div>
              {
                open[project.id]? 
                  <div className="bg-[#0000004f] fixed h-full w-full top-0 left-0 z-1000000000 flex items-center justify-center">
                    <div className="max-h-[650px] h-full bg-white max-w-[500px] w-full rounded-[10px] ">
                      <button className='float-right p-[5px]  mr-[10px] mt-[10px] text-[24px] hover:text-black duration-300 text-gray-500' onClick={() => toggle(project.id)}>&times;</button>
                      <p className="text-3xl mt-10 ml-5">Share Your Project Experience</p>
                      <p className='ml-5 text-gray-500'>{handleLanguageTitle({ title_ru: project.title_ru, title_uz: project.title_uz, title_en: project.title_en })}</p>
                      <hr className='border-gray-100 mt-[10px]'  />
                      <div className='mt-[20px]'>
                        <form className='px-5 flex flex-col gap-4'>
                          <div className='flex flex-col gap-2'>
                            <label className='text-gray-700' htmlFor="name">Your name</label>
                            <input onChange={(e) => {setComment(prev => ({ ...prev, full_name: e.target.value}))}} className='bg-gray-100 focus:shadow-md duration-300 border p-2.5 border-gray-200 focus:outline-none rounded-[15px] h-[35px]' type="text" id='name' />
                          </div>
                           <div className='flex flex-col gap-2'>
                            <label className='text-gray-700' htmlFor="company">Company</label>
                            <input onChange={(e) => {setComment(prev => ({ ...prev, company: e.target.value}))}} className='bg-gray-100 focus:shadow-md duration-300 border p-2.5 border-gray-200 focus:outline-none rounded-[15px] h-[35px]' type="text" id='position' />
                          </div>
                          <div className='flex flex-col gap-2'>
                            <label className='text-gray-700' htmlFor="position">Position</label>
                            <input onChange={(e) => {setComment(prev => ({ ...prev, position: e.target.value}))}} className='bg-gray-100 border focus:shadow-md duration-300 p-2.5 border-gray-200 focus:outline-none rounded-[15px] h-[35px]' type="text" id='company' />
                          </div>
                          <div>
                            <p className='text-gray-700'>Rating</p>
                            <StarRating 
                            onRatingChange={handleRatingChange}
                             />
                          </div>
                          <div className='flex flex-col'>
                            <label htmlFor="testimonial">Your testimonial</label>
                            <textarea onChange={(e) => {setComment(prev => ({...prev, comment: e.target.value}))}} className='border resize-none focus:shadow-md duration-300 border-gray-200 focus:outline-none rounded-[15px] bg-gray-100 px-[10px]' id="testimonial"></textarea>
                          </div>
                          <div className='flex gap-2 flex-wrap mt-[20px]' >
                            <button onClick={() => toggle(project.id)} className='w-[49%] h-[35px] border hover:border-gray-500 duration-300 hover:bg-gray-50 border-gray-300 rounded-[15px]' >Cancel</button>
                            <button onClick={(e) => handleSubmit({e: e, id: project.id})} className='w-[49%] h-[35px] hover:bg-[#171717] duration-300 bg-black rounded-[15px] text-white' type="submit">Submit</button>
                          </div>
                        </form>
                      </div>                      

                    </div>
                  </div>
                : null
              }
              
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};