import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Star, Quote, Coffee, Leaf, Award } from "lucide-react";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/hero-bg.jpg";
import coffeeImg from "@/assets/karupatti-coffee.webp";
import noodlesImg from "@/assets/noodles.jpg";
import eggRollImg from "@/assets/egg-roll.webp";
import SectionHeader from "@/components/SectionHeader";
import Marquee from "@/components/Marquee";

const popular = [
  { name: "Karupatti Coffee", price: "₹30", img: coffeeImg, desc: "Traditional palm jaggery brew, frothy and earthy.", tag: "Signature" },
  { name: "Noodles", price: "₹80", img: noodlesImg, desc: "Wok-tossed spicy noodles, the local crowd-favorite.", tag: "Best Seller" },
  { name: "Egg Roll", price: "₹60", img: eggRollImg, desc: "Crispy, drizzled with house sauce and cheese.", tag: "Crowd Favorite" },
];

const reviews = [
  { name: "Arun K.", text: "The Karupatti coffee took me back to my grandmother's kitchen. Pure nostalgia in a glass.", stars: 5 },
  { name: "Meera S.", text: "A hidden gem in Kanyakumari. Cozy vibe, late-night noodles, and unforgettable tea.", stars: 5 },
  { name: "Vignesh R.", text: "Authentic, warm, and beautifully crafted. The egg roll is unreal.", stars: 5 },
];

const stats = [
  { icon: Coffee, value: "12K+", label: "Cups Brewed" },
  { icon: Leaf, value: "100%", label: "Naatu Karupatti" },
  { icon: Award, value: "4.9★", label: "Local Rating" },
];

const Home = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const logoY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden noise">
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 bg-cover bg-center scale-125"
          initial={{ scale: 1.4, opacity: 0 }}
          animate={{ scale: 1.25, opacity: 1 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }} />
        </motion.div>
        <div className="absolute inset-0 bg-[image:var(--gradient-hero-overlay)]" />
        <div className="absolute inset-0 bg-[image:var(--gradient-radial-gold)]" />

        {/* Steam particles */}
        <div className="pointer-events-none absolute inset-x-0 top-1/3 flex justify-center gap-8 opacity-60">
          {[0, 0.6, 1.2, 1.8].map((d, i) => (
            <span
              key={i}
              className="block w-2 h-12 rounded-full bg-gradient-to-t from-gold/0 via-gold/30 to-transparent animate-steam"
              style={{ animationDelay: `${d}s` }}
            />
          ))}
        </div>

        <motion.div
          style={{ y: logoY, opacity: logoOpacity }}
          className="relative z-10 container text-center pt-24 pb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <img
              src={logo}
              alt="Karupatti Coffee Tea Kadai"
              className="w-full max-w-2xl drop-shadow-[0_0_80px_hsl(var(--gold)/0.55)] animate-float"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-2 font-serif-italic text-xl md:text-2xl shimmer-text"
          >
            The Essence of Naatu Karupatti
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-6 max-w-xl mx-auto text-muted-foreground"
          >
            A heritage tea kadai in the heart of Kanyakumari — where palm jaggery meets premium craft.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-gold text-primary-foreground font-semibold tracking-widest uppercase text-sm shadow-gold hover:scale-105 transition-luxe overflow-hidden"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <span className="relative">Visit Us</span>
              <ArrowRight size={16} className="relative transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-gold/40 text-gold font-semibold tracking-widest uppercase text-sm hover:bg-gold/10 hover:border-gold transition-luxe"
            >
              View Menu
            </Link>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/60 text-xs tracking-[0.4em] uppercase animate-float">
          ↓ Scroll ↓
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee items={["Naatu Karupatti", "Brewed in Kanyakumari", "Since Tradition", "Pure Palm Jaggery"]} />

      {/* STATS */}
      <section className="py-20">
        <div className="container grid grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="text-center p-4 md:p-8 rounded-2xl glass-noir border border-gold/15 hover-lift"
            >
              <s.icon className="w-6 h-6 md:w-8 md:h-8 text-gold mx-auto mb-3" />
              <div className="font-display text-2xl md:text-4xl text-gradient-gold">{s.value}</div>
              <div className="mt-2 text-[10px] md:text-xs tracking-[0.25em] uppercase text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* POPULAR */}
      <section className="py-24 md:py-32 relative noise">
        <div className="container">
          <SectionHeader
            eyebrow="— Signature Picks —"
            title="Loved by Locals"
            subtitle="Three timeless flavors that define our kadai"
          />

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {popular.map((item, i) => (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-2xl overflow-hidden bg-card border border-gold/15 hover:border-gold/60 transition-luxe shadow-deep hover-lift"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-luxe duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-noir/70 backdrop-blur border border-gold/40 text-[10px] tracking-[0.25em] uppercase text-gold">
                    {item.tag}
                  </span>
                  {/* Sweep shine */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1200 bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
                </div>
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <div className="flex items-end justify-between">
                    <h3 className="font-display text-xl text-foreground group-hover:text-gold transition-luxe">{item.name}</h3>
                    <span className="font-display text-2xl text-gradient-gold">{item.price}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <span className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-luxe ring-1 ring-inset ring-gold/40" />
              </motion.article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-sm tracking-[0.3em] uppercase text-gold story-link"
            >
              Explore Full Menu <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24 bg-noir-soft/40 border-y border-gold/10 relative noise">
        <div className="container">
          <SectionHeader eyebrow="— Voices of Our Patrons —" title="Brewed with Love" />

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {reviews.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="relative p-8 rounded-2xl glass-noir border border-gold/15 hover:border-gold/50 transition-luxe hover-lift"
              >
                <Quote className="absolute -top-4 left-6 w-10 h-10 text-gold/40" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.stars }).map((_, idx) => (
                    <Star key={idx} size={14} className="fill-gold text-gold drop-shadow-[0_0_6px_hsl(var(--gold)/0.6)]" />
                  ))}
                </div>
                <p className="font-serif-italic text-lg text-foreground/90 leading-relaxed">"{r.text}"</p>
                <p className="mt-6 text-sm tracking-widest uppercase text-gold">— {r.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="py-24">
        <div className="container">
          <SectionHeader eyebrow="— Find Us —" title="Visit Our Kadai" subtitle="Tucked inside the lanes of Kanyakumari" />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="mt-12 rounded-2xl overflow-hidden border border-gold/20 shadow-deep relative"
          >
            <iframe
              title="Karupatti Tea Kadai — Nagercoil"
              src="https://www.google.com/maps?q=Karupatti+Tea+Kadai,+Nagercoil,+Tamil+Nadu+629003&output=embed"
              className="w-full h-[420px] grayscale-[40%] contrast-110"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/30 rounded-2xl" />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
