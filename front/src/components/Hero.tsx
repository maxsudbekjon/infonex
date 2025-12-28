import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';

export const Hero = () => {
  const { t } = useLanguage();

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPortfolio = () => {
    const element = document.querySelector("#portfolio")
    console.log(element)
    if(element){
      element.scrollIntoView({ behavior: 'smooth'})
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Sophisticated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_65%)]" />
        <motion.div
          className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [-50, 50, -50],
            y: [-30, 30, -30],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.04) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.6, 0.4],
            x: [50, -50, 50],
            y: [30, -30, 30],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Ultra fine grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      {/* Minimal corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32">
        <div className="absolute top-8 left-8 w-16 h-1 bg-white/10" />
        <div className="absolute top-8 left-8 w-1 h-16 bg-white/10" />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32">
        <div className="absolute bottom-8 right-8 w-16 h-1 bg-white/10" />
        <div className="absolute bottom-8 right-8 w-1 h-16 bg-white/10" />
      </div>

      {/* <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
        <div className='p-70  bg-blue-600 absolute left-1/2 -translate-x-1/2 top-1/2 rounded-[50%] rounded-b-[20%] opacity-15 z-[-2] blur-[90px] -translate-y-1/2'></div>
        <motion.h1
          className="text-white mb-8 group text-shadow-[0_0_25px] text-shadow-[#00e5ff]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            transition: 'letter-spacing 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          whileHover={{ letterSpacing: '0.05em' }}
        >
          {t('hero.company')}
        </motion.h1>
          <motion.p
            className="text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: '1.125rem', fontWeight: 300 }}
          >
            {t('hero.slogan')}
          </motion.p>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Button
                onClick={scrollToContact}
                className="bg-white text-black
                    bg-gradient-to-r from-cyan-400 to-blue-500
                    shadow-[0_0_25px_rgba(0,229,255,0.6)]
                    hover:shadow-[0_0_40px_rgba(0,229,255,0.9)]
                    transition-all hover:bg-gray-100  duration-300 group  shadow-[#003caa] hover:shadow-cyan-800 rounded-full px-8 py-6 relative overflow-hidden"
                style={{ fontWeight: 500, letterSpacing: '0.02em' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('hero.cta')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>
            <div className='bg-blue-500 rounded-[50%] bg-linear-to-b from-blue-700 to-blue-500 blur-[20px] px-20 py-5'></div>
          </div>
        </motion.div>
      </div> */}
      <div className='max-w-6xl flex w-full border justify-between'>
        <div className='max-w-[500px] flex flex-col gap-7'>
          <h1 className='font-bold text-[70px] text-white leading-18 tracking-tight' >{t('hero.second')}</h1>
          <p className='text-white text-[20px]'>{t('herosubtitle.second')}</p>
          <div className='flex gap-2 items-center'>
            <Button
              onClick={scrollToContact}
              className="bg-white text-white
                  bg-linear-to-r from-[#0051ff] via-[#2600ff] to-[#3400c2]
                  shadow-[0_0_25px_rgba(0,229,255,0.6)]
                  hover:shadow-[0_0_40px_rgba(0,229,255,0.9)]
                  transition-all hover:bg-gray-100  duration-300 group  shadow-[#003caa] hover:shadow-cyan-800 rounded-[10px] px-8 py-6 relative overflow-hidden"
              style={{ fontWeight: 500, letterSpacing: '0.02em' }}
            >
              <span className="relative font-bold text-[18px] z-10 flex items-center gap-2">
                {t('hero.cta')}
                {/* <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> */}
              </span>
            </Button>
            <Button
              onClick={scrollToPortfolio}
              className="py-3 px-8 text-[18px] text-white font-bold rounded-[10px]"
              style={{ fontWeight: 500, letterSpacing: '0.02em' }}
            >
              <span className="relative font-bold text-[18px] z-10 flex items-center gap-2">
                {t('hero.cta.second')}
                {/* <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> */}
              </span>
            </Button>
          </div>
        </div>
        <div className='relative h-auto md:block hidden max-w-[600px] w-full'>
          <img className='max-w-[700px] absolute z-2 w-full' src="../../public/Screenshot_2025-12-18_at_09.56.49-removebg-preview.png" alt="" />
          <div className='w-[80%] bg-blue-600 h-[90%] rounded-[40%] blur-[70px] opacity-40  absolute top-1/2 z-1 left-1/2 -translate-x-1/2 -translate-y-1/2'></div>
        </div>
      </div>
      <div>

      </div>

      {/* Minimal scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-16 bg-linear-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
};