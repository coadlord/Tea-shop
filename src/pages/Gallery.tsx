import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import coffee from "@/assets/karupatti-coffee.webp";
import tea from "@/assets/tea.webp";
import noodles from "@/assets/noodles.jpg";
import eggRoll from "@/assets/egg-roll.webp";
import a1 from "@/assets/ambience-1.jpg";
import a2 from "@/assets/ambience-2.jpg";
import a3 from "@/assets/ambience-3.jpg";
import a4 from "@/assets/ambience-4.jpg";
import a5 from "@/assets/ambience-5.jpg";
import a6 from "@/assets/ambience-6.jpg";

type Tag = "All" | "Food" | "Ambience" | "Drinks";
type Photo = { src: string; alt: string; tag: Exclude<Tag, "All">; span?: string };

const photos: Photo[] = [
  { src: a1, alt: "Cozy interior of Karupatti tea kadai with warm lights", tag: "Ambience", span: "row-span-2" },
  { src: coffee, alt: "Karupatti palm jaggery coffee in glass tumbler", tag: "Drinks" },
  { src: a2, alt: "Pouring frothy karupatti coffee between steel tumblers", tag: "Drinks", span: "row-span-2" },
  { src: noodles, alt: "Three bowls of spicy wok-tossed noodles", tag: "Food" },
  { src: a3, alt: "Stack of palm jaggery (karupatti) blocks on burlap", tag: "Ambience" },
  { src: eggRoll, alt: "Crispy egg roll with cheese and sauce drizzle", tag: "Food", span: "row-span-2" },
  { src: a5, alt: "Steaming masala chai with cinnamon and spices", tag: "Drinks" },
  { src: a4, alt: "Night view of Karupatti tea kadai street stall", tag: "Ambience", span: "row-span-2" },
  { src: tea, alt: "Mint tea served in glass on a wooden table", tag: "Drinks" },
  { src: a6, alt: "Indian street food platter with parottas and curry", tag: "Food", span: "row-span-2" },
];

const tags: Tag[] = ["All", "Food", "Drinks", "Ambience"];

const Gallery = () => {
  const [filter, setFilter] = useState<Tag>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visible = filter === "All" ? photos : photos.filter((p) => p.tag === filter);

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % visible.length)),
    [visible.length]
  );
  const prev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + visible.length) % visible.length)),
    [visible.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, next, prev]);

  return (
    <>
      <section className="pt-36 pb-12 text-center">
        <div className="container">
          <p className="font-display text-xs tracking-[0.4em] text-gold uppercase">— Through Our Lens —</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl text-gradient-gold">Gallery</h1>
          <p className="mt-6 max-w-xl mx-auto font-serif-italic text-xl text-muted-foreground">
            A glimpse into our kadai — flavors, faces, and golden moments.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-5 py-2 rounded-full text-xs tracking-[0.25em] uppercase transition-luxe border ${
                  filter === t
                    ? "bg-gradient-gold text-primary-foreground border-transparent shadow-gold"
                    : "border-gold/30 text-foreground/80 hover:border-gold hover:text-gold"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-4">
            {visible.map((p, i) => (
              <motion.button
                key={p.src + filter}
                onClick={() => setActiveIndex(i)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.4) }}
                className={`group relative overflow-hidden rounded-xl border border-gold/15 hover:border-gold/50 transition-luxe ${p.span ?? ""}`}
                aria-label={`Open photo: ${p.alt}`}
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-luxe group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-noir/10 to-transparent opacity-70 group-hover:opacity-100 transition-luxe" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-luxe">
                  <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
                    <ZoomIn className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
                <span className="absolute bottom-3 left-3 text-[10px] tracking-[0.25em] uppercase text-gold-soft">
                  {p.tag}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[60] bg-noir/95 backdrop-blur-md flex items-center justify-center animate-fade-up"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute top-5 right-5 w-12 h-12 rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-noir transition-luxe flex items-center justify-center"
          >
            <X size={22} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
            className="absolute left-3 md:left-8 w-12 h-12 rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-noir transition-luxe flex items-center justify-center z-10"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
            className="absolute right-3 md:right-8 w-12 h-12 rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-noir transition-luxe flex items-center justify-center z-10"
          >
            <ChevronRight size={24} />
          </button>

          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl w-[92vw] max-h-[85vh] flex flex-col items-center"
          >
            <div className="relative w-full max-h-[75vh] rounded-2xl overflow-hidden border border-gold/30 shadow-gold">
              <img
                src={visible[activeIndex].src}
                alt={visible[activeIndex].alt}
                className="w-full h-full max-h-[75vh] object-contain bg-noir"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="font-serif-italic text-lg text-foreground">{visible[activeIndex].alt}</p>
              <p className="mt-1 text-xs tracking-[0.3em] uppercase text-gold">
                {visible[activeIndex].tag} · {activeIndex + 1} / {visible.length}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Gallery;
