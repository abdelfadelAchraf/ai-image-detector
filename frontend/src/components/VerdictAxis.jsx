export default function VerdictAxis({ probReal, isFake }) {
  const position = Math.min(Math.max(probReal, 0), 1) * 100;
  const marker = isFake ? "bg-accent" : "bg-ink";
  const raw = probReal.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      <div className="flex justify-between text-xs font-semibold uppercase tracking-[0.2em]">
        <span>Générée</span>
        <span>Réelle</span>
      </div>

      <div className="relative mt-3 h-6">
        <div className="absolute inset-0 flex">
          <div className="w-1/2 bg-accent/15" />
          <div className="w-1/2 bg-ink/10" />
        </div>
        <div className="absolute inset-y-0 left-1/2 w-px bg-ink/60" />
        <div
          className={`absolute -inset-y-1 w-1.5 -translate-x-1/2 ${marker}`}
          style={{ left: `${position}%` }}
        />
      </div>

      <div className="mt-2 grid grid-cols-3 text-xs text-ink/60">
        <span>0</span>
        <span className="text-center">seuil 0,5</span>
        <span className="text-right">1</span>
      </div>

      <p className="mt-3 text-xs text-ink/60">Sortie brute du modèle : {raw}</p>
    </div>
  );
}