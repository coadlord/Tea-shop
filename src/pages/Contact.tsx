import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Phone, MapPin, Mail, MessageCircle, Send, Navigation, QrCode, Instagram } from "lucide-react";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";
import SectionHeader from "@/components/SectionHeader";

const MAP_URL = "https://maps.app.goo.gl/cwJSyEfaDH5tiEFZ6?g_st=ac";

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().email("Invalid email").max(160),
  message: z.string().trim().min(5, "Message too short").max(800),
});

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent! We'll be in touch soon.");
      setForm({ name: "", email: "", message: "" });
      setLoading(false);
    }, 700);
  };

  return (
    <>
      <section className="pt-36 pb-12 text-center">
        <div className="container">
          <p className="font-display text-xs tracking-[0.4em] text-gold uppercase">— Get In Touch —</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl text-gradient-gold">Visit · Call · Sip</h1>
          <p className="mt-6 max-w-xl mx-auto font-serif-italic text-xl text-muted-foreground">
            We'd love to brew you a cup. Reach out anytime.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container grid gap-10 lg:grid-cols-5">
          {/* CONTACT INFO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-6"
          >
            {[
              { icon: Phone, label: "Call Us", value: "+91 88076 90116", href: "tel:+918807690116" },
              { icon: Instagram, label: "Chat with us", value: "@karupatti_tea_kadai", href: "https://www.instagram.com/karupatti_tea_kadai/" },
              { icon: MapPin, label: "Location", value: "Nagercoil, Tamil Nadu", href: MAP_URL },
              { icon: Mail, label: "Hours", value: "Daily · 6 AM – 11 PM" },
            ].map((c) => {
              const Inner = (
                <div className="group flex items-start gap-4 p-6 rounded-2xl bg-card/60 border border-gold/15 hover:border-gold/50 hover:shadow-gold transition-luxe">
                  <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold shrink-0">
                    <c.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.25em] uppercase text-gold">{c.label}</p>
                    <p className="mt-1 text-foreground font-medium">{c.value}</p>
                  </div>
                </div>
              );
              return c.href ? (
                <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block">
                  {Inner}
                </a>
              ) : (
                <div key={c.label}>{Inner}</div>
              );
            })}

            <a
              href="https://wa.me/918807690116"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-full bg-gradient-gold text-primary-foreground font-semibold tracking-widest uppercase text-sm shadow-gold hover:scale-[1.02] transition-luxe"
            >
              <MessageCircle size={18} />
              Message on WhatsApp
            </a>
          </motion.div>

          {/* FORM */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 p-8 md:p-10 rounded-2xl bg-card/60 backdrop-blur border border-gold/20 shadow-deep space-y-6"
          >
            <h2 className="font-display text-3xl text-gradient-gold">Send a Message</h2>
            <div>
              <label className="block text-xs tracking-[0.25em] uppercase text-gold mb-2">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={80}
                className="w-full px-4 py-3 rounded-lg bg-input border border-gold/20 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-luxe text-foreground"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.25em] uppercase text-gold mb-2">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={160}
                className="w-full px-4 py-3 rounded-lg bg-input border border-gold/20 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-luxe text-foreground"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.25em] uppercase text-gold mb-2">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                maxLength={800}
                className="w-full px-4 py-3 rounded-lg bg-input border border-gold/20 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-luxe text-foreground resize-none"
                placeholder="Tell us what's on your mind..."
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-gold text-primary-foreground font-semibold tracking-widest uppercase text-sm shadow-gold hover:scale-105 transition-luxe disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
              <Send size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.form>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <SectionHeader eyebrow="Find Us" title="On The Map" />

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {/* MAP EMBED */}
            <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-gold/20 shadow-deep">
              <iframe
                title="Karupatti Tea Kadai — Nagercoil"
                src="https://www.google.com/maps?q=Karupatti+Tea+Kadai,+Nagercoil,+Tamil+Nadu+629003&output=embed"
                className="w-full h-[460px] grayscale-[30%] contrast-110"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* DIRECTIONS + QR */}
            <div className="flex flex-col gap-6">
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-gradient-gold text-primary-foreground font-semibold tracking-widest uppercase text-sm shadow-gold hover:scale-[1.02] transition-luxe"
              >
                <Navigation size={18} className="transition-transform group-hover:translate-x-1" />
                Get Directions
              </a>

              <div className="flex-1 p-6 rounded-2xl bg-card/60 backdrop-blur border border-gold/20 shadow-deep flex flex-col items-center text-center">
                <div className="flex items-center gap-2 text-gold">
                  <QrCode size={16} />
                  <p className="text-xs tracking-[0.3em] uppercase">Scan to Visit</p>
                </div>
                <div className="mt-5 p-4 rounded-xl bg-gold/95 shadow-gold">
                  <QRCodeSVG
                    value={MAP_URL}
                    size={170}
                    bgColor="transparent"
                    fgColor="hsl(var(--noir))"
                    level="M"
                  />
                </div>
                <p className="mt-5 font-serif-italic text-sm text-muted-foreground">
                  Point your camera to navigate straight to our tea kadai.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
