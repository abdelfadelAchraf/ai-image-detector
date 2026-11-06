export default function Limitations() {
  return (
    <section className="border-t border-paper/20">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-mono text-xs tracking-widest text-signal">LIMITES</h2>
        <div className="mt-6 max-w-2xl border-l-4 border-signal pl-5 text-sm leading-relaxed text-paper/80">
          <p>
            Le modèle a été entraîné sur CIFAKE : des images de 32×32 pixels, de 10 catégories
            d'objets, générées par un seul générateur. Toute image envoyée est réduite à cette
            taille avant l'analyse.
          </p>
          <p className="mt-3">
            Les résultats sur des photos quelconques, des visages ou des images produites par
            d'autres générateurs ne sont donc pas fiables. Ce projet est une démonstration
            académique, pas un outil de vérification.
          </p>
        </div>
      </div>
    </section>
  );
}