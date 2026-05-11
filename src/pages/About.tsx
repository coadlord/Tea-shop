import { motion } from "framer-motion";
import { Sparkles, Heart, Target, Eye } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import teaImg from "@/assets/tea.webp";
import coffeeImg from "@/assets/karupatti-coffee.webp";

const About = () => {
  return (
    <>
      {/* PAGE HERO */}
      <section className="pt-36 pb-16 text-center">
        <div className="container">
          <p className="font-display text-xs tracking-[0.4em] text-gold uppercase">— Our Heritage —</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl text-gradient-gold">Our Story</h1>
          <p className="mt-6 max-w-2xl mx-auto font-serif-italic text-xl text-muted-foreground">
            From a roadside flame to a beloved Kanyakumari ritual.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="py-16">
        <div className="container grid gap-12 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-deep border border-gold/20">
              <img src={coffeeImg} alt="Karupatti palm jaggery coffee" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden md:block w-40 aspect-square rounded-2xl overflow-hidden border border-gold/30 shadow-gold">
              <img src={teaImg} alt="Karupatti tea" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <Sparkles className="w-8 h-8 text-gold mb-4" />
            <h2 className="font-display text-3xl md:text-4xl text-foreground leading-tight">
              The Soul of <span className="text-gradient-gold">Naatu Karupatti</span>
            </h2>
            <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Karupatti Coffee was born from a simple dream — to revive the traditional taste of <span className="text-gold">palm jaggery</span> brewed coffee that once warmed every South Indian home. In a world overrun by sugar, we returned to the source: handcrafted naatu karupatti from the palm groves of Tamil Nadu.
              </p>
              <p>
                Each cup carries the smoky sweetness of jaggery, the boldness of native coffee, and the warmth of a place that feels like home. We're more than a tea kadai — we're a memory you can taste.
              </p>
              <p className="font-serif-italic text-lg text-gold-soft">
                "Where every sip tells a story of tradition."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-24 mt-12 bg-noir-soft/40 border-y border-gold/10">
        <div className="container">
          <SectionHeader eyebrow="What Drives Us" title="Mission & Vision" />

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {[
              {
                icon: Target,
                title: "Our Mission",
                text: "To deliver authentic palm jaggery flavors with a modern, premium experience — preserving heritage in every brew while crafting moments worth returning for.",
              },
              {
                icon: Eye,
                title: "Our Vision",
                text: "To become the most loved local tea brand of Tamil Nadu — a destination where tradition, taste, and togetherness meet under one warm roof.",
              },
            ].map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="group relative p-10 rounded-2xl bg-card/60 border border-gold/15 hover:border-gold/50 hover:shadow-gold transition-luxe"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold mb-6">
                  <b.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-2xl text-gold">{b.title}</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">{b.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24">
        <div className="container">
          <SectionHeader eyebrow="Our Promise" title="Crafted with Heart" />
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              { title: "Pure Ingredients", text: "Naatu karupatti sourced from trusted Tamil Nadu farms." },
              { title: "Slow Brewed", text: "Every cup steeped with patience and traditional craft." },
              { title: "Local Roots", text: "Made by Kanyakumari, for the soul of Kanyakumari." },
            ].map((v) => (
              <div key={v.title} className="text-center p-8 rounded-2xl border border-gold/15 hover:border-gold/40 transition-luxe">
                <Heart className="w-6 h-6 text-gold mx-auto mb-4" />
                <h3 className="font-display text-xl text-foreground">{v.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
