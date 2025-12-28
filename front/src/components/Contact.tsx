import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import useProjectSuggestion from '../api/hooks/useProjectSuggestoin';

export const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px", amount: 0.3 });

  
  const { postSuggestion } = useProjectSuggestion();
  const { mutate } = postSuggestion();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: () => {
        toast.success(t('contact.success'));
        setFormData({ name: '', email: '', message: '' });
      },
      onError: () => {
        toast.error(t('contact.error'));
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-32 bg-white relative overflow-hidden" ref={ref}>
      {/* Ultra subtle texture */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="mb-6" style={{ fontWeight: 300, fontSize: 'clamp(2rem, 5vw, 3rem)' }}>{t('contact.title')}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{t('contact.subtitle')}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: isInView ? 0.2 : 0, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div>
              <h3 className="mb-4" style={{ fontWeight: 500, fontSize: '1.5rem' }}>
                {t('language') === 'uz' ? "Bog'lanish" : t('language') === 'ru' ? 'Связаться' : 'Get in touch'}
              </h3>
              <p className="text-gray-600 leading-loose" style={{ fontWeight: 300 }}>
                {t('language') === 'uz' 
                  ? "Loyihangiz haqida gaplashishga tayyormiz."
                  : t('language') === 'ru'
                  ? 'Готовы обсудить ваш проект.'
                  : "Ready to discuss your project."}
              </p>
            </div>

            <div className="space-y-6">
              <motion.div 
                className="flex items-start space-x-4 group cursor-pointer"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center group-hover:bg-linear-to-r from-blue-700 to-cyan-600 transition-all duration-300">
                  <Mail className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1 tracking-wide" style={{ fontWeight: 400 }}>Email</p>
                  <p className="text-black" style={{ fontWeight: 400 }}>info@techcraft.uz</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-4 group cursor-pointer"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center group-hover:bg-linear-to-r from-blue-700 to-cyan-600 transition-all duration-300">
                  <Phone className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1 tracking-wide" style={{ fontWeight: 400 }}>
                    {t('language') === 'uz' ? 'Telefon' : t('language') === 'ru' ? 'Телефон' : 'Phone'}
                  </p>
                  <p className="text-black" style={{ fontWeight: 400 }}>+998 71 123 45 67</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-4 group cursor-pointer"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center group-hover:bg-linear-to-r from-blue-700 to-cyan-600 transition-all duration-300">
                  <MapPin className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1 tracking-wide" style={{ fontWeight: 400 }}>
                    {t('language') === 'uz' ? 'Manzil' : t('language') === 'ru' ? 'Адрес' : 'Address'}
                  </p>
                  <p className="text-black" style={{ fontWeight: 400 }}>Tashkent, Uzbekistan</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: isInView ? 0.3 : 0, ease: [0.16, 1, 0.3, 1] }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder={t('contact.name')}
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-gray-200 focus:border-2 focus:shadow-lg focus:shadow-cyan-200 focus:border-cyan-500/50 transition-colors rounded-2xl bg-white h-12"
                    style={{ fontWeight: 300 }}
                  />
                </div>

                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder={t('contact.email')}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-gray-200 focus:border-2 focus:shadow-lg focus:shadow-cyan-200 focus:border-cyan-500/50 transition-colors rounded-2xl bg-white h-12"
                    style={{ fontWeight: 300 }}
                  />
                </div>
              </div>

              <div>
                <Textarea
                  name="message"
                  placeholder={t('contact.message')}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="border-gray-200 focus:border-2 focus:shadow-lg focus:shadow-cyan-200 focus:border-cyan-500/50 resize-none transition-colors rounded-2xl bg-white"
                  style={{ fontWeight: 300 }}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full md:w-auto bg-[#05051d] text-white hover:bg-gray-800 transition-all duration-300 group shadow-lg hover:shadow-xl rounded-2xl px-10 h-12"
                style={{ fontWeight: 400, letterSpacing: '0.02em' }}
              >
                {t('contact.submit')}
                <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};