import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => (
  <a
    href="https://wa.me/918807690116"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="group fixed bottom-6 right-6 z-40"
  >
    <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-gold text-primary-foreground shadow-gold animate-glow-pulse pulse-ring transition-luxe group-hover:scale-110">
      <MessageCircle size={24} fill="currentColor" />
    </span>
    <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full glass-noir border border-gold/30 text-xs tracking-widest uppercase text-gold whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-luxe pointer-events-none">
      Chat with us
    </span>
  </a>
);

export default FloatingWhatsApp;
