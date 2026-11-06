export const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_SIZE = 5 * 1024 * 1024; // 5 Mo

export function validateFile(file) {
  if (!file) return "Aucun fichier sélectionné.";
  if (!ALLOWED_TYPES.includes(file.type)) return "Format non supporté. Utilisez JPG, PNG ou WebP.";
  if (file.size > MAX_SIZE) return "Fichier trop volumineux (5 Mo maximum).";
  return null;
}