import { useCallback, useEffect, useState } from "react";
import { predictImage } from "../api/detector";
import { validateFile } from "../utils/validation";

const MIN_SCAN_MS = 2200;   // durée minimale de l'animation (purement visuelle)
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// status : "idle" -> "ready" -> "scanning" -> "done"
export function useDetector() {
  const [status, setStatus] = useState("idle");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // libère l'URL de l'aperçu quand elle change ou au démontage
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const selectFile = useCallback((f) => {
    const problem = validateFile(f);
    if (problem) {
      setError(problem);
      return;
    }
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
    setResult(null);
    setError(null);
    setStatus("ready");
  }, []);

  const analyze = useCallback(async () => {
    if (!file) return;
    setStatus("scanning");
    setError(null);
    try {
      const [data] = await Promise.all([predictImage(file), sleep(MIN_SCAN_MS)]);
      setResult(data);
      setStatus("done");
    } catch (err) {
      setError(err.message);
      setStatus("ready");   // l'utilisateur peut réessayer
    }
  }, [file]);

  const reset = useCallback(() => {
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    setStatus("idle");
  }, []);

  return { status, previewUrl, result, error, selectFile, analyze, reset };
}