import Analysis from "./Analysis";
import Button from "./Button";
import Dropzone from "./Dropzone";
import ResultPanel from "./ResultPanel";
import Scanner from "./Scanner";
import { useDetector } from "../hooks/useDetector";

export default function Hero() {
  const { status, previewUrl, result, error, selectFile, analyze, reset } = useDetector();

  return (
    <>
      <section className="mx-auto grid max-w-5xl gap-14 px-6 py-16 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Vérification d'image
          </p>
          <h1 className="mt-5 font-serif text-5xl font-medium leading-[0.95] tracking-tight sm:text-7xl">
            Réelle ou <em className="text-accent">générée par IA</em>&nbsp;?
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-ink/70">
            Déposez une image. Un réseau EfficientNetB0 l'analyse et donne son verdict,
            accompagné d'un score.
          </p>
        </div>

        <div>
          {status === "idle" ? (
            <Dropzone onFile={selectFile} />
          ) : (
            <div className="space-y-5">
              <Scanner src={previewUrl} active={status === "scanning"} />

              {status === "ready" && (
                <div className="flex flex-wrap gap-3">
                  <Button onClick={analyze}>Analyser l'image</Button>
                  <Button variant="secondary" onClick={reset}>Changer d'image</Button>
                </div>
              )}

              {status === "scanning" && (
                <p className="text-xs font-semibold uppercase tracking-[0.2em]">
                  Analyse en cours<span className="animate-pulse">_</span>
                </p>
              )}

              {status === "done" && (
                <>
                  <ResultPanel result={result} />
                  <Button variant="secondary" onClick={reset}>Analyser une autre image</Button>
                </>
              )}
            </div>
          )}

          {error && (
            <p
              role="alert"
              className="mt-5 border-l-4 border-accent pl-3 text-sm font-medium text-accent"
            >
              {error}
            </p>
          )}
        </div>
      </section>

      {status === "done" && <Analysis src={previewUrl} result={result} />}
    </>
  );
}