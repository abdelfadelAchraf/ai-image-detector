export default function SectionTitle({ eyebrow, children }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight sm:text-4xl">
        {children}
      </h2>
    </div>
  );
}