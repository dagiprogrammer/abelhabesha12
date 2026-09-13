import React, { useState } from 'react';
import { MessageCircle, Send, Mail, X, PhoneCall } from 'lucide-react';
import { STORE_INFO } from '../data/categories';
import { Language } from '../types';

interface FloatingContactProps {
  language: Language;
}

export function FloatingContact({ language }: FloatingContactProps) {
  const [isOpen, setIsOpen] = useState(false);

  const labels = {
    en: {
      help: 'Chat with Us',
      close: 'Close',
      whatsapp: 'WhatsApp',
      whatsappSub: 'Quick direct chat',
      telegram: 'Telegram',
      telegramSub: '@AbelDesignChat',
      email: 'Email Us',
      emailSub: 'info@abelhabesha.com.et',
    },
    am: {
      help: 'ያነጋግሩን',
      close: 'ዝጋ',
      whatsapp: 'ዋትስአፕ (WhatsApp)',
      whatsappSub: 'ቀጥታ መልዕክት',
      telegram: 'ቴሌግራም (Telegram)',
      telegramSub: '@AbelDesignChat',
      email: 'ኢሜይል',
      emailSub: 'info@abelhabesha.com.et',
    },
    ti: {
      help: 'ርኸቡና',
      close: 'ዕጾ',
      whatsapp: 'ዋትስኣፕ (WhatsApp)',
      whatsappSub: 'ቀጥታ መልእኽቲ',
      telegram: 'ቴሌግራም (Telegram)',
      telegramSub: '@AbelDesignChat',
      email: 'ኢሜይል',
      emailSub: 'info@abelhabesha.com.et',
    },
  }[language] || {
    help: 'Chat with Us',
    close: 'Close',
    whatsapp: 'WhatsApp',
    whatsappSub: 'Quick direct chat',
    telegram: 'Telegram',
    telegramSub: '@AbelDesignChat',
    email: 'Email Us',
    emailSub: 'info@abelhabesha.com.et',
  };

  return (
    <aside 
      aria-label="Contact channels"
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5 pointer-events-none"
    >
      {/* Contact Channels Stack */}
      <div 
        className={`flex flex-col items-end gap-2 transition-all duration-300 pointer-events-auto ${
          isOpen 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none sm:opacity-100 sm:translate-y-0 sm:scale-100 sm:pointer-events-auto'
        }`}
      >
        {/* Email Button */}
        <a
          href={STORE_INFO.emailUrl}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2.5 bg-white hover:bg-[#8B0000] text-[#2D241E] hover:text-white px-3 py-2 rounded-full shadow-lg border border-[#EAD8C0] transition-all duration-200 transform hover:-translate-x-1"
          title={labels.email}
          aria-label={labels.email}
        >
          <span className="text-xs font-semibold hidden sm:inline-block px-1">
            {labels.email}
          </span>
          <div className="w-9 h-9 rounded-full bg-[#8B0000] text-white flex items-center justify-center shadow-xs group-hover:bg-white group-hover:text-[#8B0000] transition-colors">
            <Mail className="w-4 h-4" />
          </div>
        </a>

        {/* Telegram Button */}
        <a
          href={STORE_INFO.telegramUrl}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2.5 bg-white hover:bg-[#29B6F6] text-[#2D241E] hover:text-white px-3 py-2 rounded-full shadow-lg border border-[#EAD8C0] transition-all duration-200 transform hover:-translate-x-1"
          title={labels.telegram}
          aria-label={labels.telegram}
        >
          <span className="text-xs font-semibold hidden sm:inline-block px-1">
            {labels.telegram}
          </span>
          <div className="w-9 h-9 rounded-full bg-[#29B6F6] text-white flex items-center justify-center shadow-xs group-hover:bg-white group-hover:text-[#29B6F6] transition-colors">
            <Send className="w-4 h-4" />
          </div>
        </a>

        {/* WhatsApp Button */}
        <a
          href={STORE_INFO.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2.5 bg-white hover:bg-[#25D366] text-[#2D241E] hover:text-white px-3 py-2 rounded-full shadow-lg border border-[#EAD8C0] transition-all duration-200 transform hover:-translate-x-1"
          title={labels.whatsapp}
          aria-label={labels.whatsapp}
        >
          <span className="text-xs font-semibold hidden sm:inline-block px-1">
            {labels.whatsapp}
          </span>
          <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs group-hover:bg-white group-hover:text-[#25D366] transition-colors">
            <MessageCircle className="w-4 h-4" />
          </div>
        </a>
      </div>

      {/* Mobile Toggle Button (Visible on mobile screens to toggle channels) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden pointer-events-auto w-12 h-12 rounded-full bg-[#8B0000] text-white shadow-xl flex items-center justify-center border-2 border-[#C5A059] active:scale-95 transition-transform"
        aria-label={isOpen ? labels.close : labels.help}
        title={isOpen ? labels.close : labels.help}
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <div className="relative flex items-center justify-center">
            <PhoneCall className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#25D366] rounded-full ring-2 ring-white"></span>
          </div>
        )}
      </button>
    </aside>
  );
}
