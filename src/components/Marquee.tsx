const Marquee = ({ items }: { items: string[] }) => {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-gold/15 bg-noir-soft/60 py-6">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
      <div className="flex gap-12 animate-marquee whitespace-nowrap min-w-max">
        {loop.map((item, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="font-display text-2xl md:text-3xl tracking-[0.25em] uppercase text-gold-soft/80">
              {item}
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" className="text-gold shrink-0">
              <path d="M12 2 L13.5 9 L21 10.5 L13.5 12 L12 19 L10.5 12 L3 10.5 L10.5 9 Z" fill="currentColor" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
