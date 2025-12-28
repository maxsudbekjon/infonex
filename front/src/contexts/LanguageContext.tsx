import { createContext, useContext, useState, type ReactNode } from 'react';

type Language = 'uz' | 'ru' | 'en';

interface Translations {
  [key: string]: {
    uz: string;
    ru: string;
    en: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Translations = {
  // Navbar
  'nav.home': { uz: 'Bosh sahifa', ru: 'Главная', en: 'Home' },
  'nav.about': { uz: 'Biz haqimizda', ru: 'О нас', en: 'About' },
  'nav.services': { uz: 'Xizmatlar', ru: 'Услуги', en: 'Services' },
  'nav.portfolio': { uz: 'Portfolio', ru: 'Портфолио', en: 'Portfolio' },
  'nav.testimonials': { uz: 'Fikrlar', ru: 'Отзывы', en: 'Testimonials' },
  'nav.contact': { uz: 'Aloqa', ru: 'Контакты', en: 'Contact' },
  
  // Hero
  'hero.company': { uz: 'Infonex', ru: 'Infonex', en: 'Infonex' },
  'herosubtitle.second': {uz: 'Biz Oʻzbekiston, MDH, Yevropa va AQSh uchun kengaytiriladigan veb va mobil dasturiy taʼminot, AI integratsiyasi va shaxsiy korporativ tizimlarni yaratamiz.', ru: 'Мы разрабатываем масштабируемое веб- и мобильное программное обеспечение, интегрируем решения на основе искусственного интеллекта и создаем индивидуальные корпоративные системы для Узбекистана, стран СНГ, Европы и США.', en: 'We craft scalable web & mobile software, AI integrations and custom enterprise systems for Uzbekistan, CIS, Europe, and the US.'},
  'hero.second': {uz: 'Texnologiyadan tashqari qurish', ru: 'Стройте за пределами технологий', en: 'Build Beyond Technology'},
  'hero.slogan': { uz: 'Biz sizning tasavvuringizni aniqlik bilan quramiz', ru: 'Мы воплощаем ваше видение с точностью', en: 'We build your vision with precision' },
  'hero.cta': { uz: 'Loyihangizni muhokama qiling', ru: 'Обсудить ваш проект', en: 'Discuss your project' },
  'hero.cta.second': {uz: 'Portfolioni ko\'rish', ru: 'Посмотреть портфолио', en: 'See Portfolio'},
  // About
  'about.title': { uz: 'Biz haqimizda', ru: 'О нас', en: 'About Us' },
  'about.subtitle': { uz: 'Innovatsiya va mukammallikka intilish', ru: 'Стремление к инновациям и совершенству', en: 'Driven by innovation and excellence' },
  'about.description': { uz: "O'zbekistonda joylashgan TechCraft Solutions — mijozlar uchun zamonaviy veb va mobil ilovalar ishlab chiqarishga ixtisoslashgan dasturiy ta'minot ishlab chiqish kompaniyasi. Biz dizayn, ishlab chiqish va texnik xizmat ko'rsatishning har bir bosqichida aniqlik va professionallikni ta'minlaymiz.", ru: 'TechCraft Solutions — компания по разработке программного обеспечения из Узбекистана, специализирующаяся на создании современных веб- и мобильных приложений для клиентов. Мы обеспечиваем точность и профессионализм на каждом этапе — от проектирования до разработки и технического обслуживания.', en: 'Based in Uzbekistan, TechCraft Solutions is a software development company specializing in building modern web and mobile applications for clients worldwide. We ensure precision and professionalism at every stage — from design to development and maintenance.' },
  'about.mission.title': { uz: 'Bizning missiyamiz', ru: 'Наша миссия', en: 'Our Mission' },
  'about.mission.text': { uz: 'Mijozlar tasavvurini aniq va mukammal dasturiy yechimlarga aylantirish', ru: 'Превращать видение клиентов в точные и превосходные программные решения', en: 'Transform client vision into precise and excellent software solutions' },
  'about.expertise.title': { uz: 'Tajriba', ru: 'Опыт', en: 'Expertise' },
  'about.expertise.text': { uz: "10+ yillik tajriba, 50+  muvaffaqiyatli loyiha, global mijozlar bilan hamkorlik", ru: '10+ лет опыта, 50+ успешных проектов, партнерство с глобальными клиентами', en: '10+ years experience, 50+ successful projects, global client partnerships' },
  
  // Services
  'services.title': { uz: 'Xizmatlarimiz', ru: 'Наши услуги', en: 'Our Services' },
  'services.subtitle': { uz: 'Keng qamrovli dasturiy yechimlarga ixtisoslashganmiz', ru: 'Специализируемся на комплексных программных решениях', en: 'Comprehensive software solutions tailored to your needs' },
  'services.web.title': { uz: 'Veb dasturlash', ru: 'Веб-разработка', en: 'Web Development' },
  'services.web.desc': { uz: "Zamonaviy texnologiyalar yordamida kengaytiriladigan, yuqori samarali veb-ilovalar", ru: 'Масштабируемые, высокопроизводительные веб-приложения с использованием современных технологий', en: 'Scalable, high-performance web applications using modern technologies' },
  'services.mobile.title': { uz: 'Mobil ilovalar', ru: 'Мобильные приложения', en: 'Mobile Apps' },
  'services.mobile.desc': { uz: 'iOS va Android uchun native va cross-platform mobil yechimlari', ru: 'Нативные и кросс-платформенные мобильные решения для iOS и Android', en: 'Native and cross-platform mobile solutions for iOS and Android' },
  'services.uiux.title': { uz: 'UI/UX Dizayn', ru: 'UI/UX дизайн', en: 'UI/UX Design' },
  'services.uiux.desc': { uz: 'Foydalanuvchilar uchun chiroyli va intuitiv interfeys dizayni', ru: 'Красивый и интуитивный дизайн интерфейса для пользователей', en: 'Beautiful, intuitive interface design centered on user experience' },
  'services.api.title': { uz: 'API Integratsiya', ru: 'API интеграция', en: 'API Integration' },
  'services.api.desc': { uz: "Uchinchi tomon xizmatlari va ma'lumotlar manbalari bilan muammosiz integratsiya", ru: 'Бесшовная интеграция со сторонними сервисами и источниками данных', en: 'Seamless integration with third-party services and data sources' },
  'services.maintenance.title': { uz: "Texnik xizmat ko'rsatish", ru: 'Техническая поддержка', en: 'Maintenance' },
  'services.maintenance.desc': { uz: "Doimiy texnik qo'llab-quvvatlash va ilovalaringizni yangilash", ru: 'Постоянная поддержка и обновления для ваших приложений', en: 'Ongoing support and updates to keep your applications running smoothly' },
  
  // Portfolio
  'portfolio.title': { uz: 'Portfolio', ru: 'Портфолио', en: 'Portfolio' },
  'portfolio.subtitle': { uz: 'Muvaffaqiyatli loyihalarimiz', ru: 'Наши успешные проекты', en: 'Our successful projects' },
  
  // Testimonials
  'testimonials.title': { uz: 'Mijozlar fikrlari', ru: 'Отзывы клиентов', en: 'Client Testimonials' },
  'testimonials.subtitle': { uz: 'Mijozlarimiz biz haqimizda nima deyishadi', ru: 'Что говорят наши клиенты', en: 'What our clients say about us' },
  
  // Contact
  'contact.title': { uz: 'Loyihangizni boshlang', ru: 'Начните свой проект', en: 'Start Your Project' },
  'contact.subtitle': { uz: "Biz bilan bog'laning va bepul konsultatsiya oling", ru: 'Свяжитесь с нами и получите бесплатную консультацию', en: 'Get in touch and receive a free consultation' },
  'contact.name': { uz: 'Ismingiz', ru: 'Ваше имя', en: 'Your Name' },
  'contact.email': { uz: 'Email', ru: 'Email', en: 'Email' },
  'contact.company': { uz: 'Kompaniya', ru: 'Компания', en: 'Company' },
  'contact.message': { uz: 'Loyiha haqida', ru: 'О проекте', en: 'Project Details' },
  'contact.submit': { uz: 'Taklif yuborish', ru: 'Отправить запрос', en: 'Send Request' },
  'contact.success': { uz: "So'rov yuborildi! Tez orada bog'lanamiz.", ru: 'Запрос отправлен! Мы свяжемся с вами в ближайшее время.', en: 'Request sent! We will contact you shortly.' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
