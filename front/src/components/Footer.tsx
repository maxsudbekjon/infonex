import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

export const Footer = () => {
  const { language, t } = useLanguage();

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: {
      title: { uz: 'Xizmatlar', ru: 'Услуги', en: 'Services' },
      links: [
        { label: { uz: 'Veb Dasturlash', ru: 'Веб-разработка', en: 'Web Development' }, href: '#services' },
        { label: { uz: 'Mobil Ilovalar', ru: 'Мобильные приложения', en: 'Mobile Apps' }, href: '#services' },
        { label: { uz: 'UI/UX Dizayn', ru: 'UI/UX дизайн', en: 'UI/UX Design' }, href: '#services' },
        { label: { uz: 'API Integratsiya', ru: 'API интеграция', en: 'API Integration' }, href: '#services' },
      ]
    },
    company: {
      title: { uz: 'Kompaniya', ru: 'Компания', en: 'Company' },
      links: [
        { label: { uz: 'Biz haqimizda', ru: 'О нас', en: 'About Us' }, href: '#about' },
        { label: { uz: 'Portfolio', ru: 'Портфолио', en: 'Portfolio' }, href: '#portfolio' },
        { label: { uz: 'Fikrlar', ru: 'Отзывы', en: 'Testimonials' }, href: '#testimonials' },
        { label: { uz: 'Aloqa', ru: 'Контакты', en: 'Contact' }, href: '#contact' },
      ]
    }
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Ultra fine grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-10 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              {/* <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <span className="text-black" style={{ fontWeight: 600 }}>TC</span>
              </div> */}
              <img className='w-[150px] object-contain' src="../../public/ChatGPT Image 18 дек. 2025 г., 09_29_50.png" alt="logo" />
            </div>
            <p className="text-gray-400 mb-8 max-w-md leading-loose" style={{ fontWeight: 300, fontSize: '0.9375rem' }}>
              {language === 'uz' 
                ? "Premium dasturiy yechimlari. Sizning tasavvuringizni aniqlik bilan hayotga."
                : language === 'ru'
                ? 'Премиум программные решения. Воплощаем ваше видение с точностью.'
                : 'Premium software solutions. Building your vision with precision.'}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:info@techcraft.uz" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 group">
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                <span className="text-sm" style={{ fontWeight: 300 }}>info@techcraft.uz</span>
              </a>
              <a href="tel:+998711234567" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 group">
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                <span className="text-sm" style={{ fontWeight: 300 }}>+998 71 123 45 67</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-sm" style={{ fontWeight: 300 }}>Tashkent, Uzbekistan</span>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-white mb-6" style={{ fontWeight: 500, fontSize: '0.9375rem', letterSpacing: '0.05em' }}>
              {footerLinks.services.title[language]}
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.links.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-all duration-300 text-sm inline-flex items-center group"
                    style={{ fontWeight: 300 }}
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label[language]}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white mb-6" style={{ fontWeight: 500, fontSize: '0.9375rem', letterSpacing: '0.05em' }}>
              {footerLinks.company.title[language]}
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.links.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-all duration-300 text-sm inline-flex items-center group"
                    style={{ fontWeight: 300 }}
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label[language]}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-gray-500 text-xs text-center md:text-left" style={{ fontWeight: 300 }}>
              © {currentYear} TechCraft. {language === 'uz' ? 'Barcha huquqlar himoyalangan.' : language === 'ru' ? 'Все права защищены.' : 'All rights reserved.'}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-500 group"
                  >
                    <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};