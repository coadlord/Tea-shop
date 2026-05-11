import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Sparkles, X } from "lucide-react";
import { z } from "zod";

type Tip = { text: string; cta?: { label: string; to: string } };
type Msg = { id: string; from: "bot" | "user"; text: string; cta?: { label: string; to?: string; href?: string } };

const TIPS_BY_PATH: Record<string, Tip[]> = {
  "/": [
    { text: "Vணக்கம்! I'm Chai — your little karupatti guide ☕", cta: { label: "See our story", to: "/about" } },
    { text: "Curious what's brewing? Peek at our menu.", cta: { label: "Open menu", to: "/menu" } },
    { text: "Snap-worthy moments live in the gallery.", cta: { label: "View gallery", to: "/gallery" } },
  ],
  "/about": [
    { text: "Karupatti = palm jaggery. Naturally sweet, deeply rooted." },
    { text: "Brewed slow. Served warm. Loved daily.", cta: { label: "Try the menu", to: "/menu" } },
  ],
  "/menu": [
    { text: "Pro tip: try the Karupatti Special — it's our signature." },
    { text: "Pure dine-in joy. No delivery, just the real kadai vibe.", cta: { label: "Find us", to: "/contact" } },
  ],
  "/gallery": [
    { text: "Tap any photo to enjoy it full-screen ✨" },
    { text: "Loved a shot? Share it on Instagram!" },
  ],
  "/contact": [
    { text: "Scan the QR with your camera — straight to our doorstep." },
    { text: "Open daily 6 AM – 11 PM. Drop by anytime!" },
  ],
};

// ───────────────────────── FAQ engine ─────────────────────────
type FaqEntry = {
  keywords: string[];
  answer: string;
  cta?: { label: string; to?: string; href?: string };
};

const FAQ: FaqEntry[] = [
  {
    keywords: ["hour", "time", "open", "close", "closing", "timing", "when"],
    answer: "We're open **daily from 6 AM to 11 PM**. Early chai or late-night sip — we've got you. ☕",
    cta: { label: "Get directions", to: "/contact" },
  },
  {
    keywords: ["where", "location", "address", "find", "place", "shop", "kadai", "located"],
    answer: "We're at **Karupatti Tea Kadai, Nagercoil, Tamil Nadu 629003**.",
    cta: { label: "Open on map", href: "https://maps.app.goo.gl/cwJSyEfaDH5tiEFZ6?g_st=ac" },
  },
  {
    keywords: ["signature", "best", "popular", "famous", "must", "recommend", "special", "try"],
    answer: "Our signature is the **Karupatti Special** — palm jaggery brewed into a velvety, naturally sweet tea. A regional favourite.",
    cta: { label: "See full menu", to: "/menu" },
  },
  {
    keywords: ["park", "parking", "vehicle", "bike", "car"],
    answer: "Yes, **street parking is available** right outside the kadai for two-wheelers and cars.",
  },
  {
    keywords: ["delivery", "swiggy", "zomato", "online", "order"],
    answer: "We're **dine-in only** — no online delivery. The real karupatti magic is best enjoyed fresh at the kadai.",
  },
  {
    keywords: ["price", "cost", "rate", "expensive", "cheap"],
    answer: "Our drinks are **wallet-friendly** — most teas range ₹15–₹60. Check the menu for full pricing.",
    cta: { label: "View menu", to: "/menu" },
  },
  {
    keywords: ["menu", "drink", "food", "snack", "items"],
    answer: "We serve a curated lineup of **karupatti teas, coffees and bites**. Take a look!",
    cta: { label: "Open menu", to: "/menu" },
  },
  {
    keywords: ["contact", "phone", "call", "number", "whatsapp"],
    answer: "Call or WhatsApp us at **+91 88076 90116**.",
    cta: { label: "Call now", href: "tel:+918807690116" },
  },
  {
    keywords: ["instagram", "insta", "social", "follow"],
    answer: "Follow us on Instagram **@karupatti_tea_kadai** for daily steam and stories.",
    cta: { label: "Visit Instagram", href: "https://www.instagram.com/karupatti_tea_kadai/" },
  },
  {
    keywords: ["karupatti", "jaggery", "palm", "what is", "meaning"],
    answer: "**Karupatti** is unrefined palm jaggery — naturally sweet, mineral-rich, and a healthier alternative to white sugar. It's the soul of every cup we brew.",
    cta: { label: "Our story", to: "/about" },
  },
  {
    keywords: ["hi", "hello", "hey", "vanakkam", "vணக்கம்"],
    answer: "Vணக்கம்! 👋 Ask me about our **hours, location, signature drink, parking, menu** — or anything tea-related.",
  },
  {
    keywords: ["thank", "thanks", "ok", "okay", "cool", "nice"],
    answer: "Anytime! Sip slow, smile wide. ☕✨",
  },
];

const FALLBACK: Msg = {
  id: "fallback",
  from: "bot",
  text: "Hmm, I don't know that one yet. Try asking about **hours, location, signature drink, parking, menu, delivery** or **contact**.",
};

const findAnswer = (raw: string): Msg => {
  const q = raw.toLowerCase();
  let best: { score: number; entry: FaqEntry | null } = { score: 0, entry: null };
  for (const entry of FAQ) {
    const score = entry.keywords.reduce((s, k) => (q.includes(k) ? s + k.length : s), 0);
    if (score > best.score) best = { score, entry };
  }
  if (!best.entry) return FALLBACK;
  return {
    id: crypto.randomUUID(),
    from: "bot",
    text: best.entry.answer,
    cta: best.entry.cta,
  };
};

const inputSchema = z.string().trim().min(1, "Type a question").max(200, "Question too long");

// Tiny markdown bold renderer (just **word**) — safe, no HTML injection
const renderBold = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i} className="text-gold">{p.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{p}</span>
    )
  );
};

// ───────────────────────── Component ─────────────────────────
const ChaiBot = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [hasNudged, setHasNudged] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const tips = useMemo(() => TIPS_BY_PATH[pathname] ?? TIPS_BY_PATH["/"], [pathname]);
  const tip = tips[tipIndex % tips.length];

  // Auto-nudge once
  useEffect(() => {
    if (hasNudged) return;
    const t = setTimeout(() => {
      setOpen(true);
      setHasNudged(true);
    }, 2200);
    return () => clearTimeout(t);
  }, [hasNudged]);

  // Reset tip on route change
  useEffect(() => { setTipIndex(0); }, [pathname]);

  // Scroll chat to bottom
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const handleAsk = (e?: React.FormEvent) => {
    e?.preventDefault();
    const parsed = inputSchema.safeParse(input);
    if (!parsed.success) {
      setError(parsed.error.errors[0].message);
      return;
    }
    setError(null);
    const userMsg: Msg = { id: crypto.randomUUID(), from: "user", text: parsed.data };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    // Tiny "typing" delay for personality
    setTimeout(() => {
      setMessages((m) => [...m, findAnswer(parsed.data)]);
    }, 350);
  };

  const quickAsk = (q: string) => {
    setMessages((m) => [...m, { id: crypto.randomUUID(), from: "user", text: q }]);
    setTimeout(() => setMessages((m) => [...m, findAnswer(q)]), 250);
  };

  return (
    <div className="fixed bottom-24 right-6 z-40 flex flex-col items-end gap-3 sm:bottom-28">
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 14, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative w-[300px] sm:w-[340px] rounded-2xl border border-gold/30 bg-noir/95 backdrop-blur-xl shadow-deep overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gold/15 bg-gradient-to-r from-gold/10 to-transparent">
              <div className="flex items-center gap-2 text-gold">
                <Sparkles size={14} />
                <p className="text-[11px] tracking-[0.3em] uppercase">Chai · Helper</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close Chai"
                className="w-6 h-6 rounded-full bg-gradient-gold text-primary-foreground flex items-center justify-center shadow-gold hover:scale-110 transition-luxe"
              >
                <X size={12} />
              </button>
            </div>

            {/* Body */}
            <div ref={scrollRef} className="max-h-[320px] overflow-y-auto px-4 py-3 space-y-3">
              {messages.length === 0 && (
                <>
                  <div className="rounded-xl bg-gold/5 border border-gold/20 p-3">
                    <p className="text-sm text-foreground leading-snug">{renderBold(tip.text)}</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      {tip.cta ? (
                        <button
                          onClick={() => { navigate(tip.cta!.to); setOpen(false); }}
                          className="px-3 py-1.5 rounded-full bg-gradient-gold text-primary-foreground text-[10px] font-semibold tracking-widest uppercase shadow-gold hover:scale-105 transition-luxe"
                        >
                          {tip.cta.label}
                        </button>
                      ) : <span />}
                      <button
                        onClick={() => setTipIndex((i) => i + 1)}
                        className="text-[10px] tracking-widest uppercase text-gold/80 hover:text-gold transition-luxe"
                      >
                        Next tip →
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.25em] uppercase text-gold/70 mb-2">Try asking</p>
                    <div className="flex flex-wrap gap-1.5">
                      {["Opening hours?", "Where are you?", "Signature drink?", "Is parking available?"].map((q) => (
                        <button
                          key={q}
                          onClick={() => quickAsk(q)}
                          className="px-2.5 py-1 rounded-full border border-gold/30 text-[10px] text-foreground/90 hover:bg-gold/10 hover:border-gold/60 transition-luxe"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-snug ${
                      m.from === "user"
                        ? "bg-gradient-gold text-primary-foreground rounded-br-sm"
                        : "bg-gold/5 border border-gold/20 text-foreground rounded-bl-sm"
                    }`}
                  >
                    <p>{renderBold(m.text)}</p>
                    {m.cta && (
                      <button
                        onClick={() => {
                          if (m.cta?.to) { navigate(m.cta.to); setOpen(false); }
                          else if (m.cta?.href) window.open(m.cta.href, "_blank", "noopener,noreferrer");
                        }}
                        className="mt-2 inline-flex px-2.5 py-1 rounded-full bg-noir/40 border border-gold/40 text-[10px] tracking-widest uppercase text-gold hover:bg-gold hover:text-noir transition-luxe"
                      >
                        {m.cta.label} →
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleAsk} className="border-t border-gold/15 p-3 bg-noir/60">
              {error && <p className="text-[10px] text-ember mb-1.5">{error}</p>}
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => { setInput(e.target.value); setError(null); }}
                  maxLength={200}
                  placeholder="Ask Chai anything…"
                  className="flex-1 bg-input/60 border border-gold/20 rounded-full px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/40 transition-luxe"
                />
                <button
                  type="submit"
                  aria-label="Send"
                  className="w-9 h-9 rounded-full bg-gradient-gold text-primary-foreground flex items-center justify-center shadow-gold hover:scale-110 transition-luxe"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot */}
      <button onClick={() => setOpen((o) => !o)} aria-label="Open Chai helper" className="group relative">
        <div className="absolute left-1/2 -translate-x-1/2 -top-6 flex gap-1 pointer-events-none">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block w-1 h-4 rounded-full bg-gold/50"
              animate={{ y: [0, -10, -18], opacity: [0, 0.7, 0], scaleX: [1, 1.4, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
            />
          ))}
        </div>
        <span className="absolute inset-0 rounded-full bg-gold/30 blur-xl scale-110 animate-glow-pulse pointer-events-none" />
        <motion.div
          animate={{ y: [0, -4, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-16 h-16 sm:w-[72px] sm:h-[72px]"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_8px_20px_hsl(var(--gold)/0.45)]">
            <defs>
              <linearGradient id="cupGold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--gold))" />
                <stop offset="100%" stopColor="hsl(var(--ember))" />
              </linearGradient>
              <linearGradient id="teaShine" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--noir))" />
                <stop offset="100%" stopColor="hsl(var(--ember) / 0.6)" />
              </linearGradient>
            </defs>
            <ellipse cx="50" cy="86" rx="38" ry="6" fill="url(#cupGold)" opacity="0.85" />
            <path d="M78 50 q18 4 14 22 q-4 14 -20 10" fill="none" stroke="url(#cupGold)" strokeWidth="6" strokeLinecap="round" />
            <path d="M20 38 h60 v22 q0 22 -30 22 q-30 0 -30 -22 z" fill="url(#cupGold)" />
            <ellipse cx="50" cy="40" rx="28" ry="6" fill="url(#teaShine)" />
            <motion.g
              animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
              transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1] }}
              style={{ transformOrigin: "50px 60px" }}
            >
              <circle cx="40" cy="60" r="3.2" fill="hsl(var(--noir))" />
              <circle cx="60" cy="60" r="3.2" fill="hsl(var(--noir))" />
              <circle cx="41" cy="59" r="1" fill="hsl(var(--background))" />
              <circle cx="61" cy="59" r="1" fill="hsl(var(--background))" />
            </motion.g>
            <path d="M42 70 q8 6 16 0" fill="none" stroke="hsl(var(--noir))" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="32" cy="68" r="2.5" fill="hsl(var(--ember) / 0.6)" />
            <circle cx="68" cy="68" r="2.5" fill="hsl(var(--ember) / 0.6)" />
          </svg>
        </motion.div>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full glass-noir border border-gold/30 text-[10px] tracking-widest uppercase text-gold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-luxe pointer-events-none">
          {open ? "Hide chat" : "Ask Chai"}
        </span>
      </button>
    </div>
  );
};

export default ChaiBot;
