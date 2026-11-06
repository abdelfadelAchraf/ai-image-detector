const VARIANTS = {
  primary: "bg-signal text-ink hover:bg-paper",
  secondary: "border border-paper/40 text-paper hover:border-paper",
};

export default function Button({ variant = "primary", className = "", ...props }) {
  return (
    <button
      type="button"
      className={`px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest transition-colors disabled:opacity-40 ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  );
}