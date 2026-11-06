const CORNERS = [
  "left-2 top-2 border-l-2 border-t-2",
  "right-2 top-2 border-r-2 border-t-2",
  "bottom-2 left-2 border-b-2 border-l-2",
  "bottom-2 right-2 border-b-2 border-r-2",
];

export default function Scanner({ src, active }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden border border-paper/30 bg-ink">
      <img
        src={src}
        alt="Image à analyser"
        className={`h-full w-full object-contain transition-opacity ${active ? "opacity-70" : ""}`}
      />

      {active && (
        <>
          <div className="scan-grid pointer-events-none absolute inset-0" />
          <div className="animate-scan motion-reduce:animate-none pointer-events-none absolute inset-x-0 top-0">
            <div className="scan-trail absolute inset-x-0 bottom-0 h-20" />
            <div className="scan-line h-0.5" />
          </div>
        </>
      )}

      {CORNERS.map((position) => (
        <span
          key={position}
          className={`pointer-events-none absolute size-5 border-signal ${position}`}
        />
      ))}
    </div>
  );
}