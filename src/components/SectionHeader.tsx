import Ornament from "./Ornament";

const SectionHeader = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) => (
  <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
    {eyebrow && (
      <p className="font-display text-xs tracking-[0.45em] text-gold mb-5 uppercase">
        {eyebrow}
      </p>
    )}
    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-gradient-gold leading-[1.1]">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-5 font-serif-italic text-lg md:text-xl text-muted-foreground">
        {subtitle}
      </p>
    )}
    <Ornament className="mt-8" />
  </div>
);

export default SectionHeader;
