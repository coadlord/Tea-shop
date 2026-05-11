import { motion } from "framer-motion";
import { Coffee, Utensils } from "lucide-react";
import coffeeImg from "@/assets/karupatti-coffee.webp";
import teaImg from "@/assets/tea.webp";
import noodlesImg from "@/assets/noodles.jpg";
import eggRollImg from "@/assets/egg-roll.webp";
import SectionHeader from "@/components/SectionHeader";

const items = [
  { name: "Karupatti Coffee", price: "₹30", img: coffeeImg, tag: "Signature", desc: "Traditional palm jaggery brewed coffee — bold, frothy, soul-warming.", category: "Beverages" },
  { name: "Mint Tea", price: "₹25", img: teaImg, tag: "Refreshing", desc: "Crisp mint leaves steeped in golden karupatti tea.", category: "Beverages" },
  { name: "Noodles", price: "₹80", img: noodlesImg, tag: "Best Seller", desc: "Wok-tossed Indo-Chinese noodles with house spices.", category: "Snacks" },
  { name: "Egg Roll", price: "₹60", img: eggRollImg, tag: "Crowd Favorite", desc: "Crispy egg roll drizzled with cheese and tangy sauce.", category: "Snacks" },
];

const Menu = () => {
  return (
    <>
      <section className="pt-36 pb-12 text-center">
        <div className="container">
          <p className="font-display text-xs tracking-[0.4em] text-gold uppercase">— Curated Menu —</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl text-gradient-gold">Our Offerings</h1>
          <p className="mt-6 max-w-2xl mx-auto font-serif-italic text-xl text-muted-foreground">
            Brewed traditions and crafted bites — every plate tells a story.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Coffee className="text-gold" />
            <h2 className="font-display text-2xl tracking-widest text-foreground uppercase">Beverages</h2>
            <div className="h-px w-16 bg-gradient-to-r from-gold to-transparent" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto">
            {items.filter(i => i.category === "Beverages").map((item, i) => (
              <MenuCard key={item.name} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Utensils className="text-gold" />
            <h2 className="font-display text-2xl tracking-widest text-foreground uppercase">Snacks</h2>
            <div className="h-px w-16 bg-gradient-to-r from-gold to-transparent" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            {items.filter(i => i.category === "Snacks").map((item, i) => (
              <MenuCard key={item.name} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-3xl text-center">
          <SectionHeader eyebrow="Hungry?" title="Order Your Favorites" />
          <a
            href="https://wa.me/918807690116"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-gold text-primary-foreground font-semibold tracking-widest uppercase text-sm shadow-gold hover:scale-105 transition-luxe"
          >
            Order on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
};

const MenuCard = ({ item, index }: { item: typeof items[number]; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    className="group relative grid grid-cols-[130px_1fr] sm:grid-cols-[200px_1fr] rounded-2xl overflow-hidden bg-card border border-gold/15 hover:border-gold/60 hover:shadow-gold transition-luxe hover-lift"
  >
    <div className="relative overflow-hidden">
      <img
        src={item.img}
        alt={item.name}
        loading="lazy"
        className="w-full h-full object-cover transition-luxe duration-700 group-hover:scale-115"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-noir/20 to-card/80" />
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1200 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </div>
    <div className="p-5 sm:p-7 flex flex-col justify-between relative">
      <div>
        <span className="inline-block text-[10px] tracking-[0.25em] uppercase px-3 py-1 rounded-full border border-gold/40 text-gold mb-3 group-hover:bg-gold group-hover:text-noir transition-luxe">
          {item.tag}
        </span>
        <h3 className="font-display text-xl sm:text-2xl text-foreground group-hover:text-gold transition-luxe">{item.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <span className="font-display text-3xl sm:text-4xl text-gradient-gold drop-shadow-[0_0_15px_hsl(var(--gold)/0.4)]">{item.price}</span>
        <div className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
        <svg width="18" height="18" viewBox="0 0 24 24" className="text-gold/60 group-hover:text-gold group-hover:rotate-180 transition-luxe duration-700">
          <path d="M12 2 L13.5 9 L21 10.5 L13.5 12 L12 19 L10.5 12 L3 10.5 L10.5 9 Z" fill="currentColor" />
        </svg>
      </div>
    </div>
  </motion.article>
);


export default Menu;
