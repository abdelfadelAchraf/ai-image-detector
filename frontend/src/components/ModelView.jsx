import { useEffect, useRef } from "react";

const FALLBACK_ACCENT = "#c4300f";

// lit la couleur d'accent dans le CSS pour garder une seule source de vérité
function accentRgb() {
  const css =
    getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim() ||
    FALLBACK_ACCENT;
  let hex = css.replace("#", "");
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  let n = parseInt(hex, 16);
  if (Number.isNaN(n)) n = parseInt(FALLBACK_ACCENT.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export default function ModelView({ src, heatmap = null }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !heatmap) return;

    const { size, values } = heatmap;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    const [r, g, b] = accentRgb();
    const image = ctx.createImageData(size, size);

    values.forEach((row, y) =>
      row.forEach((v, x) => {
        const i = (y * size + x) * 4;
        image.data[i] = r;
        image.data[i + 1] = g;
        image.data[i + 2] = b;
        image.data[i + 3] = Math.round(v * 0.85 * 255);   // opacité proportionnelle à l'influence
      })
    );
    ctx.putImageData(image, 0, 0);
  }, [heatmap]);

  return (
    <div className="relative aspect-square w-full overflow-hidden border border-ink bg-ink/5">
      {/* object-fill : l'image est étirée en carré, comme dans le prétraitement de l'API */}
      <img
        src={src}
        alt="Image telle que la reçoit le modèle"
        className="absolute inset-0 h-full w-full object-fill"
      />
      {heatmap && (
        // petit canvas étiré en CSS : le navigateur interpole entre les zones
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
      )}
    </div>
  );
}