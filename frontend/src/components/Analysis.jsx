import { useEffect, useRef } from "react";
import ModelView from "./ModelView";
import SectionTitle from "./SectionTitle";

const CAPTION = "mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink/60";

export default function Analysis({ src, result }) {
  const sectionRef = useRef(null);
  const { heatmap, label, confidence } = result;

  const isFake = label === "FAKE";
  const verdict = isFake ? "générée par IA" : "réelle";
  const tone = isFake ? "bg-accent" : "bg-ink";
  const score = confidence.toLocaleString("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  // Scroll to this section as soon as it appears
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    sectionRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  return (
    <section ref={sectionRef} className="border-t border-ink/15">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <SectionTitle eyebrow="Analyse détaillée">
          Où le modèle a <em>regardé</em>.
        </SectionTitle>

        {/* Verdict */}
        <div
          role="status"
          aria-live="polite"
          className={`mt-8 flex flex-wrap items-end justify-between gap-4 p-6 text-paper ${tone}`}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-90">Verdict</p>
            <p className="mt-2 font-serif text-5xl font-medium leading-none tracking-tight">
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
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-90">
              Score du modèle
            </p>
            <p className="mt-2 font-serif text-4xl font-medium tabular-nums leading-none">
              {score} %
            </p>
          </div>
        </div>

        {heatmap ? (
          <>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <figure>
                <ModelView src={src} />
                <figcaption className={CAPTION}>Image telle que le modèle la reçoit</figcaption>
              </figure>
              <figure>
                <ModelView src={src} heatmap={heatmap} />
                <figcaption className={CAPTION}>
                  Zones en faveur du verdict « {verdict} »
                </figcaption>
              </figure>
            </div>

            <div className="mt-8 flex items-center gap-4 text-xs uppercase tracking-[0.18em] text-ink/60">
              <span>Influence faible</span>
              <span
                className="h-2 w-32 border border-ink/30"
                style={{ background: "linear-gradient(to right, transparent, var(--color-accent))" }}
              />
              <span>Forte</span>
            </div>

            <ul className="mt-8 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink/70">
              <li>
                La carte est très grossière ({heatmap.size}×{heatmap.size} zones) : le réseau
                réduit fortement l'image avant de décider.
              </li>
              <li>
                Elle est normalisée pour chaque image : la zone la plus marquée est toujours au
                maximum, quelle que soit la force réelle de l'indice.
              </li>
              <li>
                Elle indique où la sortie du modèle est la plus sensible, pas qu'une zone est
                truquée. À interpréter avec prudence.
              </li>
            </ul>
          </>
        ) : (
          <p className="mt-10 text-ink/70">Carte indisponible pour cette analyse.</p>
        )}
      </div>
    </section>
  );
}