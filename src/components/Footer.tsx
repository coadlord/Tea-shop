import { Link } from "react-router-dom";
import { Instagram, Facebook, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="relative mt-32 border-t border-gold/15 bg-noir-soft/60">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div className="container py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={logo} alt="Karupatti Coffee logo" className="h-16 w-auto drop-shadow-[0_0_20px_hsl(var(--gold)/0.4)]" />
          <p className="mt-4 font-serif-italic text-lg text-gold-soft">The Essence of Naatu Karupatti</p>
          <p className="mt-3 text-sm text-muted-foreground max-w-md">
            A traditional palm jaggery tea experience brewed with love in Kanyakumari. Crafted to revive the soul of authentic South Indian flavors.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm tracking-[0.25em] text-gold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-gold transition-luxe">Home</Link></li>
            <li><Link to="/about" className="hover:text-gold transition-luxe">About</Link></li>
            <li><Link to="/menu" className="hover:text-gold transition-luxe">Menu</Link></li>
            <li><Link to="/gallery" className="hover:text-gold transition-luxe">Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition-luxe">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm tracking-[0.25em] text-gold mb-4">Reach Us</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-gold mt-0.5" />
              <span>Kanyakumari, Tamil Nadu</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-gold" />
              <a href="tel:+918807690116" className="hover:text-gold transition-luxe">+91 88076 90116</a>
            </li>
            <li className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/karupatti_tea_kadai/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full border border-gold/30 hover:bg-gold hover:text-noir transition-luxe"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="p-2 rounded-full border border-gold/30 hover:bg-gold hover:text-noir transition-luxe"
              >
                <Facebook size={16} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gold/10">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Karupatti Coffee. All rights reserved.</p>
          <p className="font-serif-italic">Brewed with tradition · Served with pride</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
