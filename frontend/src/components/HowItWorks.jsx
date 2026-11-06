const STEPS = [
  { n: "01", title: "Déposez", text: "Choisissez une image JPG, PNG ou WebP de 5 Mo maximum." },
  {
    n: "02",
    title: "Analyse",
    text: "L'image est réduite à 32×32 pixels puis traitée par un réseau EfficientNetB0 affiné.",
  },
  {
    n: "03",
    title: "Verdict",
    text: "Le modèle indique réelle ou générée, avec un score compris entre 50 et 100 %.",
  },
];

const STATS = [
  { value: "96,7 %", label: "Exactitude sur le jeu de test" },
  { value: "0,995", label: "AUC (courbe ROC)" },
  { value: "19 962", label: "Images de test" },
];

function Grid({ items, render }) {
  return (
    <div className="grid gap-px bg-paper/20 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.label ?? item.n} className="bg-ink p-6">
          {render(item)}
        </div>
      ))}
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="border-t border-paper/20">
      <div className="mx-auto max-w-5xl space-y-12 px-6 py-16">
        <div>
          <h2 className="font-mono text-xs tracking-widest text-signal">COMMENT ÇA MARCHE</h2>
          <div className="mt-6">
            <Grid
              items={STEPS}
              render={(s) => (
                <>
                  <p className="font-mono text-3xl font-black text-signal">{s.n}</p>
                  <p className="mt-3 font-bold uppercase tracking-wide">{s.title}</p>
                  <p className="mt-2 text-sm text-paper/70">{s.text}</p>
                </>
              )}
            />
          </div>
        </div>

        <div>
          <h2 className="font-mono text-xs tracking-widest text-signal">PERFORMANCES MESURÉES SUR CIFAKE</h2>
          <div className="mt-6">
            <Grid
              items={STATS}
              render={(s) => (
                <>
                  <p className="text-4xl font-black">{s.value}</p>
                  <p className="mt-2 font-mono text-xs text-paper/70">{s.label}</p>
                </>
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
}