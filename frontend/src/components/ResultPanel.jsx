import VerdictAxis from "./VerdictAxis";

export default function ResultPanel({ result }) {
  const isFake = result.label === "FAKE";
  const tone = isFake ? "border-accent text-accent" : "border-ink text-ink";
  const score = result.confidence.toLocaleString("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return (
    <div role="status" aria-live="polite" className={`border-t-4 pt-5 ${tone}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">Verdict</p>
      <p className="mt-3 font-serif text-5xl font-medium leading-none tracking-tight">
        {isFake ? (
          <>
            Générée <em>par IA</em>
          </>
        ) : (
          <>
            Image <em>réelle</em>
          </>
        )}
      </p>

      <div className="mt-8 flex items-baseline justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.2em]">Score du modèle</span>
        <span className="font-serif text-4xl font-medium tabular-nums">{score} %</span>
      </div>

      <div className="mt-6 text-ink">
        <VerdictAxis probReal={result.prob_real} isFake={isFake} />
      </div>

      <p className="mt-5 text-xs leading-relaxed text-ink/60">
        Ce score est la sortie du modèle, pas une probabilité garantie. Il peut être élevé
        même si le verdict est faux.
      </p>
    </div>
  );
}