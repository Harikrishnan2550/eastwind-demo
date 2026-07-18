"use client";

import { useEffect, useState } from "react";
import InteractivePortfolioSection, { PortfolioItem, toneStyles } from "@/components/InteractivePortfolioSection";
import { getProductImageUrl } from "@/data/productsData";

function getEcosystemProductImage(id: string): string {
  switch (id) {
    case "mimes":
      return "/products/gas-detector.png";
    case "xshielder":
      return "/products/xshielder-phone.png";
    case "tridiagonal":
      return "/products/pressure-transmitter.png";
    case "oneseven":
      return "/products/default-fire-fighting-rescue.png";
    case "nardi":
      return "/products/default-respiratory-protection.png";
    case "tgr":
      return "/products/wireless-converter.png";
    default:
      return "/products/default-explosion-proof-products.png";
  }
}

export default function TechnologyEcosystem() {
  const [products, setProducts] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    async function fetchEcosystem() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${baseUrl}/api/solutions`);
        if (res.ok) {
          const list = await res.json();
          // Filter for the core ecosystem brand IDs
          const ecosystemIds = ["mimes", "xshielder", "tridiagonal", "oneseven", "nardi", "tgr"];
          const filtered = list.filter((s: any) => ecosystemIds.includes(s.id));
          
          // Map backend SolutionItem format to PortfolioItem format
          const mapped: PortfolioItem[] = filtered.map((sol: any) => ({
            id: sol.id,
            name: sol.title,
            category: sol.subLabel || "Industrial Systems Node",
            imageTone: sol.accent === "orange" ? "orange" : "blue",
            overview: [sol.description || "", sol.detailedContent || ""],
            features: sol.features || [],
            applications: sol.applications || [],
            benefits: (sol.specs || []).map((sp: any) => ({
              value: sp.value,
              label: sp.label
            }))
          }));
          setProducts(mapped);
        }
      } catch (error) {
        console.error("Failed to load TechnologyEcosystem from backend:", error);
      }
    }
    fetchEcosystem();
  }, []);

  const handleRequestQuote = (item: PortfolioItem) => {
    const contactSection = document.getElementById("contact-us") || document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      const footerContact = document.querySelector("footer");
      if (footerContact) {
        footerContact.scrollIntoView({ behavior: "smooth" });
      } else {
        alert(`Quote requested for ${item.name}. Our engineering team will contact you shortly.`);
      }
    }
  };

  const handleTalkToExpert = (item: PortfolioItem) => {
    const contactSection = document.getElementById("contact-us") || document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      const footerContact = document.querySelector("footer");
      if (footerContact) {
        footerContact.scrollIntoView({ behavior: "smooth" });
      } else {
        alert(`Connecting you with a technical expert for ${item.name}.`);
      }
    }
  };

  return (
    <InteractivePortfolioSection
      sectionId="ecosystem"
      sectionLabel="Technology Portfolio"
      sectionTitle="Technology Portfolio"
      sectionDesc="Explore the technologies powering our industrial intelligence, safety, mobility, and infrastructure solutions."
      items={products}
      backgroundColor="#F8FAFC"
      cta1Label="Request Quote"
      cta1OnClick={handleRequestQuote}
      cta2Label="Talk To Expert"
      cta2OnClick={handleTalkToExpert}
      renderVisual={(item) => {
        const tone = toneStyles[item.imageTone] || toneStyles.blue;
        // Prioritize custom user image uploads from backend db, fallback to static defaults
        const matchedLocalImg = getEcosystemProductImage(item.id);
        const hasDbImage = item.id === "mimes" || item.id === "xshielder" || item.id === "tridiagonal" || item.id === "oneseven" || item.id === "nardi" || item.id === "tgr";
        
        // Find matching item in products state to retrieve original raw data if available
        const rawImageUrl = products.find((p) => p.id === item.id)?.id;
        const imageUrl = matchedLocalImg;

        return (
          <div className="product-visual min-h-[350px] max-sm:min-h-[280px] rounded-[24px] border border-slate-200/80 bg-slate-950 mb-8.5 relative overflow-hidden flex flex-col justify-between p-8 max-sm:p-6 shadow-md">
            {/* Ambient background glow */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[80px] opacity-[0.16] pointer-events-none transition-all duration-700"
              style={{ backgroundColor: tone.base }}
            />
            
            {/* High-tech tech grid overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

            {/* Top Bar Info */}
            <div className="relative z-10 flex justify-between items-center w-full">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-md">
                {item.name} Core Hardware
              </span>
              <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: tone.base }} />
            </div>

            {/* Floating Product Image Visual */}
            <div className="relative z-10 flex-grow flex items-center justify-center my-4">
              <img 
                src={imageUrl} 
                alt={item.name} 
                className="max-h-[200px] object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.55)] transition-transform duration-500 hover:scale-105 pointer-events-none select-none"
              />
            </div>

            {/* Bottom Specifications Bar */}
            <div className="relative z-10 w-full pt-4 border-t border-white/5 flex flex-wrap gap-2">
              {item.features.slice(0, 3).map((feat) => (
                <span key={feat} className="text-[9px] font-bold uppercase tracking-wider text-slate-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                  {feat}
                </span>
              ))}
            </div>
          </div>
        );
      }}
    />
  );
}
