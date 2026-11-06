import { useApiStatus } from "../hooks/useApiStatus";

export default function Header() {
  const online = useApiStatus();
  const label = online === null ? "VÉRIFICATION…" : online ? "API EN LIGNE" : "API HORS LIGNE";
  const dot = online === null ? "bg-paper/40" : online ? "bg-paper" : "bg-signal";

  return (
    <header className="border-b border-paper/20">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <span className="font-mono text-sm font-bold tracking-widest">
          DÉTECTEUR<span className="text-signal">/IA</span>
        </span>
        <span className="flex items-center gap-2 font-mono text-xs text-paper/70">
          <span className={`size-2 ${dot}`} />
          {label}
        </span>
      </div>
    </header>
  );
}