const API_URL = import.meta.env.VITE_API_URL;

export async function checkHealth() {
  try {
    const res = await fetch(`${API_URL}/health`);
    if (!res.ok) return false;
    const data = await res.json();
    return data.model_loaded === true;
  } catch {
    return false;
  }
}

export async function predictImage(file) {
  const form = new FormData();
  form.append("file", file);

  let res;
  try {
    res = await fetch(`${API_URL}/predict?explain=true`, { method: "POST", body: form });
  } catch {
    throw new Error("Impossible de joindre l'API. Le serveur est-il lancé ?");
  }

  if (!res.ok) {
    let detail = "Erreur du serveur.";
    try {
      const body = await res.json();
      if (typeof body.detail === "string") detail = body.detail;
    } catch {
      /* corps non JSON : on garde le message par défaut */
    }
    throw new Error(detail);
  }
  return res.json();   // { label, confidence, prob_real }
}