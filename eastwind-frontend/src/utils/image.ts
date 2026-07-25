export function formatImageUrl(
  url?: string,
  fallback: string = "/products/default-fire-fighting-rescue.png"
): string {
  if (!url || !url.trim()) return fallback;
  const trimmed = url.trim();

  // 1. Data URLs or absolute HTTP/HTTPS URLs
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("data:")) {
    return trimmed;
  }

  // 2. Smart base URL detection for local vs production
  let baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

  if (typeof window !== "undefined") {
    const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    
    if (isLocal) {
      // Local development fallback
      baseUrl = baseUrl || "http://localhost:5000";
    } else {
      // Production deployment:
      // If NEXT_PUBLIC_API_URL points to localhost or is empty, use relative path (/uploads/...)
      // which seamlessly routes via Next.js proxy or production server domain
      if (!baseUrl || baseUrl.includes("localhost") || baseUrl.includes("127.0.0.1")) {
        baseUrl = "";
      }
    }
  } else {
    if (!baseUrl || baseUrl.includes("localhost")) {
      baseUrl = "http://localhost:5000";
    }
  }

  baseUrl = baseUrl.replace(/\/+$/, "");

  if (trimmed.startsWith("/uploads/")) {
    return baseUrl ? `${baseUrl}${trimmed}` : trimmed;
  }

  if (trimmed.startsWith("uploads/")) {
    return baseUrl ? `${baseUrl}/${trimmed}` : `/${trimmed}`;
  }

  if (!trimmed.startsWith("/")) {
    return `/${trimmed}`;
  }

  return trimmed;
}
