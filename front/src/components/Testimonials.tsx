import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Quote, Star } from 'lucide-react';
import useComments from '../api/hooks/useComments';
import { StarRating } from './StarRaring';

type CommentType = {
  id: number
  full_name: string
  position_ru: string
  position_uz: string
  position_en: string
  company: string
  comment: string
  stars: number
  created_at: string
  updated_at: string
}

export type CommentTypeSecond = {
  full_name: string
  company: string
  position: string
  comment: string
  stars: number
}

export const Testimonials = () => {
  const [open, setOpen] = useState<boolean>(false);
    const [comment, setComment] = useState<CommentTypeSecond>({
    full_name: "",
    company: "",
    position: "",
    comment: "",
    stars: 0,
  })
  
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px", amount: 0.3 });

  const { getComments } = useComments()
  const { data: testimonials } = getComments();
  
  const handleLanguagePosition = ({ position_ru, position_uz, position_en}: { position_ru: string, position_uz: string, position_en: string }) => {
    switch (language) {
      case 'ru':
        return position_ru;
      case 'uz':
        return position_uz;
      case 'en':
        return position_en;
      default:
        return position_en;
    }
  }

  const toggle = () => {
    setOpen(!open)
  };


  const { postCommentsSecond } = useComments()
  const { mutate, isSuccess } = postCommentsSecond()
  
  
  const handleRatingChange = (rating: number) => {
    setComment(prev => ({ ...prev, stars: rating }));
    console.log("New rating:", rating); // or do anything else with it
  };
  
  useEffect(() => {

    if(isSuccess) {
      setOpen(!open)
    }
    

  },[isSuccess])

  
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    console.log(comment)
    mutate(comment)
  } 

  return (
    <section id="testimonials" className="py-32 bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden" ref={ref}>
      {/* Sophisticated ambient effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [-30, 30, -30],
            y: [-20, 20, -20],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
            x: [30, -30, 30],
            y: [20, -20, 20],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Ultra fine grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-20" />
            <span className="text-xs uppercase tracking-[0.3em] text-cyan-400">
              {t('language') === 'uz' ? 'Fikrlar' : t('language') === 'ru' ? 'Отзывы' : 'Testimonials'}
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-20" />
          </div>
          <h2 className="text-white text-shadow-[0_0_20px] text-shadow-cyan-400 mb-6" style={{ fontWeight: 300, fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            {t('testimonials.title')}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto leading-loose" style={{ fontWeight: 300 }}>
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials?.map((testimonial: CommentType, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/5 backdrop-blur-xl p-8 border hover:shadow-lg hover:shadow-cyan-900 border-white/10 hov er:border-white/20 hover:bg-white/10 transition-all duration-500 group relative overflow-hidden rounded-3xl"
            >
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                {/* Quote icon */}
                <div className="mb-6">
                  <Quote className="w-10 h-10 text-white/10 group-hover:text-white/20 transition-colors duration-300" strokeWidth={1.5} />
                </div>

                {/* Rating stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" strokeWidth={0} />
                  ))}
                </div>

                <p className="text-gray-300 mb-8 leading-relaxed group-hover:text-white transition-colors duration-300" style={{ fontWeight: 300, fontSize: '0.9375rem' }}>
                  "{testimonial.comment}"
                </p>
                
                <div className="border-t border-white/10 pt-6">
                  <p className="text-white mb-1" style={{ fontWeight: 500 }}>
                    {testimonial.full_name}
                  </p>
                  <p className="text-gray-400 text-sm" style={{ fontWeight: 300 }}>
                    {handleLanguagePosition({ position_ru: testimonial.position_ru, position_uz: testimonial.position_uz, position_en: testimonial.position_en })}
                  </p>
                  <p className="text-gray-500 text-xs mt-1" style={{ fontWeight: 300 }}>
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className='w-full flex justify-center mt-[40px]'>
          <button className='px-[25px] border border-[#ffffff4b] bg-[#ffffff1a] rounded-[15px] py-[10px] hover:border-blue-500/20 hover:bg-blue-500/10 duration-300' onClick={() => {toggle()}} >+ Leave a Reviews</button>
        </div>
        <div>
          {
            open?
              <div className="bg-[#0000004f] fixed h-full w-full top-0 left-0 z-1000000000 flex items-center justify-center">
                <div className="max-h-[650px] h-full bg-white max-w-[500px] w-full rounded-[10px] ">
                  <button className='float-right p-[5px]  mr-[10px] mt-[10px] text-[24px] hover:text-black duration-300 text-gray-500' onClick={() => toggle()}>&times;</button>
                  <p className="text-3xl mt-10 ml-5 text-black">Share Your Project Experience</p>
                  <hr className='border-gray-100 mt-[10px]'  />
                  <div className='mt-[20px]'>
                    <form className='px-5 flex flex-col gap-4'>
                      <div className='flex flex-col gap-2'>
                        <label className='text-gray-700' htmlFor="name">Your name</label>
                        <input onChange={(e) => {setComment(prev => ({ ...prev, full_name: e.target.value}))}} className='bg-gray-100 text-black focus:shadow-md duration-300 border p-2.5 border-gray-200 focus:outline-none rounded-[15px] h-[35px]' type="text" id='name' />
                      </div>
                        <div className='flex flex-col gap-2'>
                        <label className='text-gray-700' htmlFor="company">Company</label>
                        <input onChange={(e) => {setComment(prev => ({ ...prev, company: e.target.value}))}} className='bg-gray-100 text-black focus:shadow-md duration-300 border p-2.5 border-gray-200 focus:outline-none rounded-[15px] h-[35px]' type="text" id='position' />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <label className='text-gray-700' htmlFor="position">Position</label>
                        <input onChange={(e) => {setComment(prev => ({ ...prev, position: e.target.value}))}} className='bg-gray-100 text-black border focus:shadow-md duration-300 p-2.5 border-gray-200 focus:outline-none rounded-[15px] h-[35px]' type="text" id='company' />
                      </div>
                      <div>
                        <p className='text-gray-700'>Rating</p>
                        <StarRating 
                        onRatingChange={handleRatingChange}
                          />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <label className='text-gray-700' htmlFor="testimonial">Your testimonial</label>
                        <textarea onChange={(e) => {setComment(prev => ({...prev, comment: e.target.value}))}} className='border text-black resize-none focus:shadow-md duration-300 border-gray-200 focus:outline-none rounded-[15px] bg-gray-100 px-[10px]' id="testimonial"></textarea>
                      </div>
                      <div className='flex gap-2 flex-wrap mt-[20px]' >
                        <button onClick={() => toggle()} className='w-[49%] text-black h-[35px] border hover:border-gray-500 duration-300 hover:bg-gray-50 border-gray-300 rounded-[15px]' >Cancel</button>
                        <button onClick={(e) => handleSubmit(e)} className='w-[49%] h-[35px] hover:bg-[#171717] duration-300 bg-black rounded-[15px] text-white' type="submit">Submit</button>
                      </div>
                    </form>
                  </div>                      

                </div>
              </div>
            : null
          }
        </div>
      </div>
    </section>
  );
};