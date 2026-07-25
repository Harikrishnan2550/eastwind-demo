export function formatImageUrl(
  url?: string,
  fallback: string = "/products/default-fire-fighting-rescue.png"
): string {
  if (!url || !url.trim()) return fallback;
  const trimmed = url.trim();

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("data:")) {
    return trimmed;
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  if (trimmed.startsWith("/uploads/")) {
    return `${baseUrl}${trimmed}`;
  }

  if (!trimmed.startsWith("/")) {
    return `/${trimmed}`;
  }

  return trimmed;
}
