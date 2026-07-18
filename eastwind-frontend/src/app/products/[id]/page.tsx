// src/app/products/[id]/page.tsx

import Link from "next/link";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { productsDb, getProductImageUrl, ProductItem } from "@/data/productsData";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/products`);
    if (!res.ok) return [];
    const list = await res.json();
    return list.map((product: any) => ({
      id: product.id,
    }));
  } catch (error) {
    console.error("Failed to generate static params for products:", error);
    return [];
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  let product: ProductItem | null = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/products/${id}`, {
      cache: "no-store"
    });
    if (res.ok) {
      product = await res.json();
    }
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-white text-slate-900 font-mono text-xs grid place-items-center">
        Product system node parameter empty // Inventory catalog route error.
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className={`${poppins.className} bg-white text-slate-800 antialiased w-full overflow-x-hidden`}>

        {/* ── SECTION 1: CINEMATIC SYSTEM SPLASH HERO ── */}
        <div className="w-full bg-slate-950 pt-[200px] pb-24 flex items-center border-b border-slate-900 relative">
          <div className="absolute inset-0 bg-[#080c14]" />
          <div className="industrial-grid absolute inset-0 opacity-[0.03] pointer-events-none z-10" />
          
          {/* Cinematic Background Product Image */}
          <div 
            className="absolute right-0 bottom-0 top-0 w-full md:w-[48%] opacity-[0.38] pointer-events-none select-none z-10 bg-contain bg-no-repeat bg-right-bottom mix-blend-screen"
            style={{ 
              backgroundImage: `url(${getProductImageUrl(product)})`,
              filter: "brightness(1.3) contrast(1.1)"
            }}
          />

          <div className="relative max-w-[1240px] w-full mx-auto px-6 z-20">
            <div className="flex flex-col items-start gap-3 mb-4">
              <span className="text-[0.68rem] font-mono font-bold uppercase tracking-[0.25em] px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/70">
                {product.brand}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-extrabold uppercase text-white tracking-tight leading-tight mb-4 max-w-4xl m-0">
              {product.name}
            </h1>
            
            <p className="text-md text-white/60 font-mono tracking-widest uppercase m-0">
              CATALOGUE ROUTE NODE // {product.slug}
            </p>
          </div>
        </div>

        {/* ── SECTION 2: PRODUCT OVERVIEW & KEY FEATURES ── */}
        <div className="w-full bg-white pt-20 pb-12">
          <div className="max-w-[1240px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Block: Narrative Overview */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[0.68rem] font-bold uppercase tracking-[0.22em] block mb-2 text-[#1e3e8f]">
                  Asset Classification
                </span>
                <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight m-0">
                  Product Overview
                </h2>
              </div>
              <p className="text-[1.05rem] text-slate-600 leading-relaxed font-normal m-0">
                {product.description}
              </p>
              <blockquote className="border-l-2 border-[#c22026] pl-4 py-1 m-0 bg-slate-50/80 rounded-r-xl">
                <p className="text-xs text-slate-500 font-light leading-relaxed m-0">
                  This component profile forms an integral sub-element of East Wind&apos;s larger hazardous area integration safety networks deployed across Middle Eastern critical infrastructure arrays.
                </p>
              </blockquote>
            </div>

            {/* Right Block: Core Hardware Features */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[0.68rem] font-bold uppercase tracking-[0.22em] block mb-2 text-[#1e3e8f]">
                  Engineering Framework
                </span>
                <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-tight m-0">
                  Key Technical Features
                </h3>
              </div>
              <ul className="flex flex-col gap-4 pl-0 list-none m-0">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50/40 font-light text-[0.92rem] text-slate-650 leading-relaxed">
                    <span className="mt-[5px] w-5 h-5 rounded-full flex-shrink-0 grid place-items-center bg-[#1e3e8f]/10">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="#1e3e8f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="flex-1">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* ── SECTION 3: DATASHEET SPECIFICATIONS GRID ── */}
        <div className="w-full bg-white py-12">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="border-t border-slate-200/80 pt-12">
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.22em] block mb-6 text-[#1e3e8f]">
                Technical Data Sheet
              </span>
              
              <div className="overflow-hidden border border-slate-200/80 rounded-2xl shadow-xs">
                <table className="w-full border-collapse text-left bg-white m-0">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200/80">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-1/3">Parameter Reference</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-2/3">Validated Performance Metric</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {product.specifications.map((spec) => (
                      <tr key={spec.label} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4.5 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{spec.label}</td>
                        <td className="px-6 py-4.5 text-[0.9rem] font-medium text-slate-800">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 4: PROCUREMENT INTAKE CTA LINK ── */}
        <div className="w-full bg-white pt-12 pb-24">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="relative overflow-hidden rounded-2xl p-8 md:p-12 bg-slate-950">
              <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-white tracking-tight leading-snug m-0">
                    Request Commercial Quotation
                  </h3>
                  <p className="text-white/60 text-sm font-light m-0">
                    Submit your asset specification requirements to our estimation channel to secure customized bulk supply models or equipment rental loops.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[0.8rem] font-bold uppercase tracking-wider no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg text-slate-950 flex-shrink-0"
                >
                  Contact Estimation Desk
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}