import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#services', label: t('nav.services') },
    { href: '#portfolio', label: t('nav.portfolio') },
    { href: '#testimonials', label: t('nav.testimonials') },
    { href: '#contact', label: t('nav.contact') },
  ];

  const languages = [
    { code: 'uz', label: 'O\'zbekcha', flag: '🇺🇿' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'backdrop-blur-[10px] shadow-sm border-b border-black/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => scrollToSection(e, '#home')} 
            className="flex justify-center items-center space-x-3 group"
          >
            {/* <div className={`w-10 h-10 flex items-center justify-center transition-all duration-500 rounded-xl ${
              isScrolled ? 'bg-black' : 'bg-white'
            } group-hover:scale-110 group-hover:rotate-3`}>
              <span className={`transition-colors duration-300 ${
                isScrolled ? 'text-white' : 'text-black'
              }`} style={{ fontWeight: 600, fontSize: '1rem' }}>TC</span>
            </div> */}
            <img className='w-[170px] object-contain' src="../../public/ChatGPT Image 18 дек. 2025 г., 09_29_50.png" alt="logo" />
            {/* <span className={`hidden sm:block transition-colors text-[20px] duration-300 ${
              isScrolled ? 'text-black' : 'text-[cyan]'
            }`} style={{ fontWeight: 300, letterSpacing: '0.02em' }}>
              Infonex
            </span> */}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`px-4 py-2 transition-all duration-300 relative group text-sm ${
                  isScrolled 
                    ? 'text-gray-600 hover:text-[cyan]' 
                    : 'text-white/80 hover:text-[cyan]'
                }`}
                style={{ fontWeight: 400, letterSpacing: '0.01em' }}
              >
                {link.label}
                <span className={`absolute bottom-0 left-4 right-4 h-px transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                  isScrolled ? 'bg-[cyan]' : 'bg-[cyan]'
                }`} />
              </a>
            ))}
          </div>
              
          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`transition-all duration-300 hover:scale-105 text-xs ${
                    isScrolled 
                      ? 'text-black hover:bg-gray-100' 
                      : 'text-white hover:bg-white/10'
                  }`}
                  style={{ fontWeight: 400, letterSpacing: '0.05em' }}
                >
                  <Globe className="w-4 h-4 mr-2 text-[cyan]" />
                  {language.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-xl border-gray-200">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as any)}
                    className={`cursor-pointer ${
                      language === lang.code ? 'bg-gray-100' : ''
                    }`}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden transition-all duration-300 p-2 rounded-lg ${
                isScrolled ? 'text-black hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-6 bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-lg">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="block py-4 px-4 text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-300 border-l-2 border-transparent hover:border-black"
                style={{ fontWeight: 300 }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};