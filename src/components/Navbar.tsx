import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/menu", label: "Menu" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-luxe ${
        scrolled
          ? "bg-noir/85 backdrop-blur-xl border-b border-gold/15 shadow-deep"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Karupatti Coffee Tea Kadai logo"
            className="h-12 w-auto transition-luxe group-hover:scale-105 drop-shadow-[0_0_15px_hsl(var(--gold)/0.4)]"
          />
          <div className="hidden sm:block leading-tight">
            <div className="font-display text-sm tracking-[0.25em] text-gold">KARUPATTI</div>
            <div className="font-serif-italic text-xs text-muted-foreground">Tea Kadai</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `relative px-5 py-2 text-sm tracking-widest uppercase transition-luxe ${
                  isActive ? "text-gold" : "text-foreground/80 hover:text-gold"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 bottom-1 h-px bg-gradient-gold transition-all duration-500 ${
                      isActive ? "w-6" : "w-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <a
          href="https://www.instagram.com/karupatti_tea_kadai/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center px-5 py-2.5 text-xs font-semibold tracking-widest uppercase rounded-full bg-gradient-gold text-primary-foreground shadow-gold hover:scale-105 transition-luxe"
        >
          Follow Us
        </a>

        <button
          className="md:hidden text-gold p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-noir/95 backdrop-blur-xl border-t border-gold/15 animate-fade-up">
          <nav className="container py-6 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `px-4 py-3 text-sm tracking-widest uppercase rounded-md transition-luxe ${
                    isActive ? "text-gold bg-gold/5" : "text-foreground/80 hover:text-gold"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a
              href="https://www.instagram.com/karupatti_tea_kadai/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 px-5 py-3 text-center text-xs font-semibold tracking-widest uppercase rounded-full bg-gradient-gold text-primary-foreground shadow-gold"
            >
              Follow Us
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
