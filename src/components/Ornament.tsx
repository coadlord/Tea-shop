const Ornament = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center gap-3 text-gold ${className}`}>
    <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/70" />
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gold animate-spin-slow">
      <path d="M12 2 L13.5 9 L21 10.5 L13.5 12 L12 19 L10.5 12 L3 10.5 L10.5 9 Z" fill="currentColor" opacity="0.7" />
      <circle cx="12" cy="11" r="1.4" fill="hsl(var(--background))" />
    </svg>
    <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/70" />
  </div>
);

export default Ornament;
