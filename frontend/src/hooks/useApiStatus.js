import { useEffect, useState } from "react";
import { checkHealth } from "../api/detector";

// null = vérification en cours, true = en ligne, false = hors ligne
export function useApiStatus() {
  const [online, setOnline] = useState(null);

  useEffect(() => {
    let cancelled = false;
    checkHealth().then((ok) => {
      if (!cancelled) setOnline(ok);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return online;
}