"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface FooterSolutionLink {
  name: string;
  href: string;
}

interface ContactInfoData {
  hqTitle: string;
  hqAddress: string;
  hubTitle: string;
  hubAddress: string;
  telephone: string;
  email: string;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [solutions, setSolutions] = useState<FooterSolutionLink[]>([
    { name: "Oil & Gas Industry", href: "/solutions/oil-and-gas" },
    { name: "Petrochemical Infrastructure", href: "/solutions/petrochemicals" },
    { name: "Civil Defense & Military", href: "/solutions/civil-defense" },
    { name: "Marine & Offshore Platforms", href: "/solutions/marine-offshore" },
    { name: "Utility & Power Grids", href: "/solutions/utility-power" }
  ]);

  const [contactInfo, setContactInfo] = useState<ContactInfoData>({
    hqTitle: "Al Khobar Headquarters",
    hqAddress: "King Faisal West Road, Bandariyah District, Al Khobar, Kingdom of Saudi Arabia",
    hubTitle: "Riyadh Technology Hub",
    hubAddress: "Olaya District, Riyadh, Kingdom of Saudi Arabia",
    telephone: "+966 13 889 XXXX",
    email: "info@eastwindsafety.com"
  });

  useEffect(() => {
    async function fetchFooterData() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        // Fetch dynamic contact settings
        const contactRes = await fetch(`${baseUrl}/api/contact-settings`);
        if (contactRes.ok) {
          const contactData = await contactRes.json();
          const info = Array.isArray(contactData)
            ? contactData.find((item: any) => item.id === "contact_info") || contactData[0]
            : contactData;
          if (info) {
            setContactInfo({
              hqTitle: info.hqTitle || "Al Khobar Headquarters",
              hqAddress: info.hqAddress || "King Faisal West Road, Bandariyah District, Al Khobar, KSA",
              hubTitle: info.hubTitle || "Riyadh Technology Hub",
              hubAddress: info.hubAddress || "Olaya District, Riyadh, KSA",
              telephone: info.telephone || "+966 13 889 XXXX",
              email: info.email || "info@eastwindsafety.com"
            });
          }
        }

        // Fetch dynamic solutions links
        const solutionsRes = await fetch(`${baseUrl}/api/solutions`);
        if (solutionsRes.ok) {
          const solData = await solutionsRes.json();
          if (Array.isArray(solData) && solData.length > 0) {
            const mapped = solData.slice(0, 5).map((sol: any) => ({
              name: sol.title || sol.name,
              href: `/solutions#${sol.id}`
            }));
            setSolutions(mapped);
          }
        }
      } catch (err) {
        console.error("Footer dynamic data fetch fallback:", err);
      }
    }

    fetchFooterData();
  }, []);

  return (
    <footer className="w-full bg-white/80 backdrop-blur-3xl saturate-[160%] border-t border-white/90 rounded-none py-[100px] px-10 max-sm:px-5 relative overflow-hidden mt-0 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.85),0_-20px_50px_-15px_rgba(15,23,42,0.05)] z-10">
      {/* High-Tech Industrial Grid Backdrop Overlay */}
      <div className="industrial-grid absolute inset-0 opacity-[0.02] pointer-events-none z-0" />

      <div className="max-w-[1400px] mx-auto grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-[60px] lg:gap-0 mb-20 relative z-10">
        
        {/* Column 1: Brand & Mission */}
        <div className="col-span-2 max-lg:col-span-1 lg:pr-[60px]">
          <div className="flex items-center gap-3 mb-6">
            <img
              src="/logo.png"
              alt="East Wind Energy Arabia"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </div>
          <p 
            className="text-[0.95rem] text-slate-650 mb-8 max-w-[480px] leading-relaxed m-0 font-light"
            style={{ fontFamily: "var(--font-poppins), var(--font-sans), sans-serif" }}
          >
            Sales, renting, and servicing of world-class safety products and engineered solutions for the Marine, Oil & Gas, Petrochemical, and Civil Defense sectors.
          </p>
          <div className="flex gap-4">
            <span 
              className="inline-flex items-center gap-2.5 text-[0.72rem] font-bold tracking-wider border border-slate-200/50 py-2.5 px-4 bg-white/95 rounded-full text-slate-800 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300"
              style={{ fontFamily: "var(--font-poppins), var(--font-sans), sans-serif" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c22026] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c22026]"></span>
              </span>
              Certified Marine & Industrial Safety Partner
            </span>
          </div>
        </div>

        {/* Column 2: Dynamic Solutions Navigation Links */}
        <div>
          <span 
            className="block mb-6 text-slate-900 uppercase text-[0.75rem] font-bold tracking-[0.25em]"
            style={{ fontFamily: "var(--font-poppins), var(--font-sans), sans-serif" }}
          >
            Safety Solutions
          </span>
          <ul className="list-none flex flex-col gap-3.5 text-[0.88rem] p-0 m-0">
            {solutions.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href} 
                  className="group/lnk text-slate-650 hover:text-[#c22026] no-underline transition-colors duration-300 flex items-center font-normal text-[0.88rem]"
                  style={{ fontFamily: "var(--font-poppins), var(--font-sans), sans-serif" }}
                >
                  <span className="inline-block transition-all duration-300 transform -translate-x-1 opacity-0 group-hover/lnk:translate-x-0 group-hover/lnk:opacity-100 mr-1 text-[#c22026] font-bold text-[0.9rem] leading-none">
                    ›
                  </span>
                  <span className="transition-transform duration-300 group-hover/lnk:translate-x-1">
                    {link.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Dynamic Operations & Contact Info */}
        <div className="lg:border-l lg:border-slate-200/50 lg:pl-[60px]">
          <span 
            className="block mb-6 text-slate-900 uppercase text-[0.75rem] font-bold tracking-[0.25em]"
            style={{ fontFamily: "var(--font-poppins), var(--font-sans), sans-serif" }}
          >
            Operations
          </span>
          <div className="flex flex-col gap-5 text-[0.88rem] text-slate-660">
            <div className="flex gap-4 items-start">
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-50 border border-slate-100 shadow-sm shrink-0 mt-0.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#1e3e8f]">
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <strong className="text-slate-900 block mb-1 font-semibold" style={{ fontFamily: "var(--font-poppins), var(--font-sans), sans-serif" }}>
                  {contactInfo.hqTitle}
                </strong>
                <span style={{ fontFamily: "var(--font-poppins), var(--font-sans), sans-serif" }} className="leading-relaxed font-light text-slate-600 block text-[0.85rem]">
                  {contactInfo.hqAddress}
                </span>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-50 border border-slate-100 shadow-sm shrink-0 mt-0.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#c22026]">
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <strong className="text-slate-900 block mb-1 font-semibold" style={{ fontFamily: "var(--font-poppins), var(--font-sans), sans-serif" }}>
                  {contactInfo.hubTitle}
                </strong>
                <span style={{ fontFamily: "var(--font-poppins), var(--font-sans), sans-serif" }} className="leading-relaxed font-light text-slate-600 block text-[0.85rem]">
                  {contactInfo.hubAddress}
                </span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-5 flex gap-4 items-start">
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-50 border border-slate-100 shadow-sm shrink-0 mt-0.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#c22026]">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <strong className="text-slate-900 block mb-1 font-semibold" style={{ fontFamily: "var(--font-poppins), var(--font-sans), sans-serif" }}>
                  Contact Portal
                </strong>
                <span style={{ fontFamily: "var(--font-poppins), var(--font-sans), sans-serif" }} className="leading-relaxed font-light text-slate-600 block text-[0.85rem]">
                  Email: <a href={`mailto:${contactInfo.email}`} className="text-[#c22026] hover:text-[#1e3e8f] transition-colors duration-300 no-underline font-semibold">{contactInfo.email}</a><br />
                  Tel: {contactInfo.telephone}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Section */}
      <div className="max-w-[1400px] mx-auto pt-10 border-t border-slate-200/50 flex flex-wrap justify-between items-center gap-6 text-[0.8rem] text-slate-500 relative z-10">
        <div style={{ fontFamily: "var(--font-poppins), var(--font-sans), sans-serif" }} className="font-light">
          © {currentYear} East Wind Safety. All rights reserved. Premium Safety Products & Solutions Integrator.
        </div>
        <div className="flex gap-6">
          {[
            { name: "Marine & Industrial Compliance", href: "/solutions" },
            { name: "Privacy Policy", href: "/about" },
            { name: "Admin Portal", href: "/admin/login" }
          ].map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              className="group/lnk text-slate-650 hover:text-[#c22026] no-underline transition-colors duration-300 flex items-center font-normal text-[0.88rem]"
              style={{ fontFamily: "var(--font-poppins), var(--font-sans), sans-serif" }}
            >
              <span className="inline-block transition-all duration-300 transform -translate-x-1 opacity-0 group-hover/lnk:translate-x-0 group-hover/lnk:opacity-100 mr-1 text-[#c22026] font-bold text-[0.9rem] leading-none">
                ›
              </span>
              <span className="transition-transform duration-300 group-hover/lnk:translate-x-1">
                {link.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}