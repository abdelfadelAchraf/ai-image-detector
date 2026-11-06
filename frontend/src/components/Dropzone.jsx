import { useState } from "react";

export default function Dropzone({ onFile }) {
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onFile(file);
    e.target.value = "";   // permet de re-choisir le même fichier
  };

  return (
    <label
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed p-8 text-center transition-colors focus-within:outline-2 focus-within:outline-signal ${
        dragging ? "border-signal bg-signal/10" : "border-paper/40 hover:border-paper"
      }`}
    >
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        className="sr-only"
      />
      <span className="font-mono text-5xl text-signal" aria-hidden="true">+</span>
      <span className="font-mono text-sm font-bold uppercase tracking-widest">
        Déposer une image
      </span>
      <span className="font-mono text-xs text-paper/60">
        ou cliquer pour parcourir
        <br />
        JPG, PNG, WebP — 5 Mo max
      </span>
    </label>
  );
}