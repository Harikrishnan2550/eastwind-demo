"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type AccordionKey = "applications" | "services" | "solutions";

interface NavItem {
  name: string;
  href: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<AccordionKey | null>(null);
  const [solutionsExpanded, setSolutionsExpanded] = useState<boolean>(false);
  const navRef = useRef<HTMLElement>(null);
  
  const [mobileAccordions, setMobileAccordions] = useState<Record<AccordionKey, boolean>>({
    applications: false,
    services: false,
    solutions: false,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setSolutionsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const showTransparent = isHomepage && !isScrolled;

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const getHeroThreshold = () => window.innerHeight * 0.5;
    const initialThreshold = isHomepage ? getHeroThreshold() : 18;
    let localIsScrolled = lastScrollY > initialThreshold;
    let localIsVisible = true;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroThreshold = getHeroThreshold();
      const threshold = isHomepage ? heroThreshold : 18;

      const nextScrolled = currentScrollY > threshold;
      if (nextScrolled !== localIsScrolled) {
        localIsScrolled = nextScrolled;
        setIsScrolled(nextScrolled);
      }

      let nextVisible = localIsVisible;
      if (mobileMenuOpen) {
        nextVisible = true;
      } else if (isHomepage && currentScrollY <= heroThreshold) {
        nextVisible = true;
      } else if (currentScrollY <= 50) {
        nextVisible = true;
      } else if (currentScrollY > lastScrollY) {
        nextVisible = false; 
      } else {
        nextVisible = true; 
      }

      if (nextVisible !== localIsVisible) {
        localIsVisible = nextVisible;
        setIsVisible(nextVisible);
      }

      lastScrollY = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen, isHomepage]);

  const toggleMobileAccordion = (key: AccordionKey) => {
    setMobileAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Mapped dynamically to Solutions by Industry (Page 1)
  const [solutionsList, setSolutionsList] = useState<NavItem[]>([
    { name: "Oil & Gas Industry", href: "/solutions/oil-and-gas" },
    { name: "Petrochemical Infrastructure", href: "/solutions/petrochemicals" },
    { name: "Civil Defense & Military", href: "/solutions/civil-defense" },
    { name: "Marine & Offshore Platforms", href: "/solutions/marine-offshore" },
    { name: "Utility & Power Grids", href: "/solutions/utility-power" },
  ]);

  // Mapped dynamically to Technical Applications (Page 2)
  const [applicationsList, setApplicationsList] = useState<NavItem[]>([
    { name: "Industry Digitalisation", href: "/applications/industry-digitalisation" },
    { name: "Wireless Data Acquisition", href: "/applications/wireless-data-acquisition" },
    { name: "AI Predictive Analytics", href: "/applications/ai-predictive-analytics" },
    { name: "Fire & Rescue Systems", href: "/applications/fire-rescue-systems" },
    { name: "Explosion-Proof Mobility", href: "/applications/explosion-proof-mobility" },
    { name: "Breathing & Asset Protection", href: "/applications/breathing-protection" },
  ]);

  // Mapped dynamically to Services & Consultancy segments (Page 2 & 3)
  const [servicesList, setServicesList] = useState<NavItem[]>([
    { name: "Explosion-Proof System Design", href: "/services/explosion-proof-design" },
    { name: "HSE & Risk Consultancy", href: "/services/hse-consultancy" },
    { name: "Digitalisation Consultancy", href: "/services/digitalisation-consultancy" },
    { name: "Fire & Gas Mapping Services", href: "/services/fire-gas-mapping" },
    { name: "Electromechanical Automation", href: "/services/electromechanical-automation" },
    { name: "Power Optimisation Support", href: "/services/power-optimisation" },
  ]);

  useEffect(() => {
    async function fetchNavbarData() {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      
      // Fetch solutions
      try {
        const res = await fetch(`${baseUrl}/api/solutions`);
        if (res.ok) {
          const list = await res.json();
          const mapped = list.map((item: any) => ({
            name: item.title,
            href: `/solutions/${item.id}`,
          }));
          if (mapped.length > 0) {
            setSolutionsList(mapped);
          }
        }
      } catch (err) {
        console.error("Navbar failed to fetch solutions:", err);
      }

      // Fetch applications
      try {
        const res = await fetch(`${baseUrl}/api/applications`);
        if (res.ok) {
          const list = await res.json();
          const mapped = list.map((item: any) => ({
            name: item.title,
            href: `/applications/${item.id}`,
          }));
          if (mapped.length > 0) {
            setApplicationsList(mapped);
          }
        }
      } catch (err) {
        console.error("Navbar failed to fetch applications:", err);
      }

      // Fetch services
      try {
        const res = await fetch(`${baseUrl}/api/services`);
        if (res.ok) {
          const list = await res.json();
          const mapped = list.map((item: any) => ({
            name: item.title,
            href: `/services/${item.id}`,
          }));
          if (mapped.length > 0) {
            setServicesList(mapped);
          }
        }
      } catch (err) {
        console.error("Navbar failed to fetch services:", err);
      }
    }
    
    fetchNavbarData();
  }, []);




  const renderChevron = (isActive: boolean) => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-180 ${isActive ? "rotate-180" : "rotate-0"}`}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );

  const renderDropdownLinks = (items: NavItem[]) => (
    <div className="flex flex-col gap-1">
      {items.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={() => {
            setActiveDropdown(null);
            setSolutionsExpanded(false);
            setMobileMenuOpen(false);
          }}
          className="group/item min-h-[34px] flex items-center justify-between gap-2.5 p-[7px_10px] rounded-xl text-slate-600 no-underline text-[0.78rem] font-bold leading-tight transition-all duration-300 hover:text-[#1e3e8f] hover:bg-slate-50 hover:translate-x-1"
        >
          <span>{item.name}</span>
          <span className="dropdown-arrow text-slate-400 text-[1rem] leading-none group-hover/item:text-[#c22026] group-hover/item:translate-x-0.5 transition-all duration-300">
            ›
          </span>
        </Link>
      ))}
    </div>
  );

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[100] w-full flex justify-center pointer-events-none transition-all duration-300 ${
        showTransparent ? "py-0" : "py-4 max-sm:py-2"
      }`}
      style={{
        transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, -110%, 0)",
      }}
    >
      <div
        className={`pointer-events-auto flex items-center justify-between gap-4 transition-all duration-300 relative ${
          showTransparent
            ? "w-full px-10 max-sm:px-5 py-5 bg-transparent border-b border-white/5 shadow-none rounded-none backdrop-blur-none scale-100"
            : `w-[calc(100%-48px)] max-sm:w-[calc(100%-24px)] max-w-[1240px] px-6 rounded-full backdrop-blur-2xl border ${
                isScrolled
                  ? "py-1.5 bg-white/80 saturate-[160%] border-white/70 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_12px_36px_rgba(15,23,42,0.08)] scale-[0.985]"
                  : "py-2.5 bg-white/70 saturate-[150%] border-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_8px_30px_rgba(15,23,42,0.06)]"
              }`
        }`}
      >
        <Link href="/" className={`brand-link inline-flex items-center gap-2.5 no-underline ${showTransparent ? "text-white" : "text-[#1e3e8f]"}`}>
          <span className={`brand-mark w-[38px] h-[38px] grid place-items-center rounded-xl border shadow-sm transition-colors ${
            showTransparent ? "bg-slate-900/60 border-white/10" : "bg-white/95 border-white/80"
          }`}>
            <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
              <path d="M35 15C20 25 10 45 10 65c0 13 8 20 15 20-5-10-7-25-2-40 5-15 12-25 12-30Z" fill="#1E3E8F" />
              <path d="M52 20C37 30 27 50 27 70c0 10 5 15 10 15-5-7-7-20 0-35 7-15 15-25 15-30Z" fill="#C22026" />
            </svg>
          </span>
          <span className="brand-copy flex flex-col justify-center gap-0.5 relative">
            <span className={`brand-name text-[0.98rem] font-black leading-none ${showTransparent ? "text-white" : "text-[#1e3e8f]"}`}>
              East Wind
            </span>
            <span className="flex items-center gap-1.5">
              <span className={`brand-subtitle text-[0.58rem] font-bold leading-none tracking-[0.14em] uppercase ${showTransparent ? "text-white/80" : "text-[#c22026]"}`}>
                Safety Arabia
              </span>
              <span className="relative flex h-1.5 w-1.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${showTransparent ? "bg-white" : "bg-[#c22026]"}`}></span>
                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${showTransparent ? "bg-white/90" : "bg-[#c22026]"}`}></span>
              </span>
            </span>
          </span>
        </Link>

        {/* Desktop Navigation Link Cluster */}
        <nav className="desktop-nav hidden lg:flex items-center justify-center gap-1.5" aria-label="Primary navigation">
          <Link
            href="/"
            className={`nav-link relative group/nav px-3.5 py-2 text-[0.76rem] font-extrabold uppercase no-underline tracking-wider rounded-full transition-all duration-200 ${
              showTransparent ? "text-white/90 hover:text-white hover:bg-white/10" : "text-slate-700 hover:text-[#1e3e8f] hover:bg-slate-100"
            }`}
          >
            <span>Home</span>
            <span className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full opacity-0 scale-50 group-hover/nav:opacity-100 group-hover/nav:scale-100 transition-all duration-300 ${showTransparent ? "bg-white" : "bg-[#c22026]"}`} />
          </Link>

          <Link
            href="/about"
            className={`nav-link relative group/nav px-3.5 py-2 text-[0.76rem] font-extrabold uppercase no-underline tracking-wider rounded-full transition-all duration-200 ${
              showTransparent ? "text-white/90 hover:text-white hover:bg-white/10" : "text-slate-700 hover:text-[#1e3e8f] hover:bg-slate-100"
            }`}
          >
            <span>About</span>
            <span className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full opacity-0 scale-50 group-hover/nav:opacity-100 group-hover/nav:scale-100 transition-all duration-300 ${showTransparent ? "bg-white" : "bg-[#c22026]"}`} />
          </Link>

          {/* Solutions Dropdown - Operating Industries served */}
          <div className="nav-dropdown relative group/nav">
            <button
              type="button"
              onClick={() => {
                const next = activeDropdown === "solutions" ? null : "solutions";
                setActiveDropdown(next);
                if (!next) setSolutionsExpanded(false);
              }}
              className={`nav-link-dropdown inline-flex items-center gap-1.25 px-3.5 py-2 text-[0.76rem] font-extrabold uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer ${
                showTransparent ? "text-white/90 hover:text-white hover:bg-white/10" : "text-slate-700 hover:text-[#1e3e8f] hover:bg-slate-100"
              } ${activeDropdown === "solutions" ? (showTransparent ? "text-white bg-white/15" : "text-[#1e3e8f] bg-slate-100") : ""}`}
            >
              Solutions {renderChevron(activeDropdown === "solutions")}
            </button>
            {activeDropdown === "solutions" && (
              solutionsExpanded ? (
                <div className="dropdown-container absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 p-6 bg-white/95 border border-slate-200/80 rounded-[28px] shadow-2xl z-[150] backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 w-max">
                  <div className="flex gap-6 items-stretch">
                    {Array.from({ length: Math.ceil(solutionsList.length / 10) }).map((_, colIdx) => {
                      const chunk = solutionsList.slice(colIdx * 10, (colIdx + 1) * 10);
                      return (
                        <div key={colIdx} className="w-56 flex flex-col gap-1">
                          {renderDropdownLinks(chunk)}
                        </div>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    onClick={() => setSolutionsExpanded(false)}
                    className="self-end py-1.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-650 rounded-lg text-[0.72rem] font-extrabold uppercase cursor-pointer transition-colors border border-slate-200/60"
                  >
                    Show Less
                  </button>
                </div>
              ) : (
                <div className="dropdown-container absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-64 p-4.5 bg-white/95 border border-slate-200/80 rounded-[24px] shadow-xl z-[150] backdrop-blur-xl">
                  <span className="dropdown-section-title block text-[#c22026] text-[0.66rem] font-bold tracking-widest uppercase mb-2.5">Operating Industries</span>
                  {renderDropdownLinks(solutionsList.slice(0, 10))}
                  {solutionsList.length > 10 && (
                    <button
                      type="button"
                      onClick={() => setSolutionsExpanded(true)}
                      className="w-full mt-2.5 py-2 px-3 border border-dashed border-orange-500/30 hover:border-orange-500 rounded-xl text-orange-650 hover:bg-orange-50/50 text-[0.76rem] font-bold text-center cursor-pointer transition-all"
                    >
                      + More Solutions
                    </button>
                  )}
                </div>
              )
            )}
          </div>

          {/* Applications Dropdown - Technical Scopes / Capabilities */}
          <div className="nav-dropdown relative group/nav">
            <button
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === "applications" ? null : "applications")}
              className={`nav-link-dropdown inline-flex items-center gap-1.25 px-3.5 py-2 text-[0.76rem] font-extrabold uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer ${
                showTransparent ? "text-white/90 hover:text-white hover:bg-white/10" : "text-slate-700 hover:text-[#1e3e8f] hover:bg-slate-100"
              } ${activeDropdown === "applications" ? (showTransparent ? "text-white bg-white/15" : "text-[#1e3e8f] bg-slate-100") : ""}`}
            >
              Applications {renderChevron(activeDropdown === "applications")}
            </button>
            {activeDropdown === "applications" && (
              <div className="dropdown-container absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-64 p-4.5 bg-white/95 border border-slate-200/80 rounded-[24px] shadow-xl z-[150] backdrop-blur-xl">
                <span className="dropdown-section-title block text-[#c22026] text-[0.66rem] font-bold tracking-widest uppercase mb-2.5">Technical Scopes</span>
                {renderDropdownLinks(applicationsList)}
              </div>
            )}
          </div>

          {/* Services Dropdown - Engineering Services / Consultancy */}
          <div className="nav-dropdown relative group/nav">
            <button
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === "services" ? null : "services")}
              className={`nav-link-dropdown inline-flex items-center gap-1.25 px-3.5 py-2 text-[0.76rem] font-extrabold uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer ${
                showTransparent ? "text-white/90 hover:text-white hover:bg-white/10" : "text-slate-700 hover:text-[#1e3e8f] hover:bg-slate-100"
              } ${activeDropdown === "services" ? (showTransparent ? "text-white bg-white/15" : "text-[#1e3e8f] bg-slate-100") : ""}`}
            >
              Services {renderChevron(activeDropdown === "services")}
            </button>
            {activeDropdown === "services" && (
              <div className="dropdown-container absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-64 p-4.5 bg-white/95 border border-slate-200/80 rounded-[24px] shadow-xl z-[150] backdrop-blur-xl">
                <span className="dropdown-section-title block text-[#c22026] text-[0.66rem] font-bold tracking-widest uppercase mb-2.5">Engineering Scopes</span>
                {renderDropdownLinks(servicesList)}
              </div>
            )}
          </div>



          <Link
            href="/contact"
            className={`nav-link relative group/nav px-3.5 py-2 text-[0.76rem] font-extrabold uppercase no-underline tracking-wider rounded-full transition-all duration-200 ${
              showTransparent ? "text-white/90 hover:text-white hover:bg-white/10" : "text-slate-700 hover:text-[#1e3e8f] hover:bg-slate-100"
            }`}
          >
            <span>Contact</span>
            <span className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full opacity-0 scale-50 group-hover/nav:opacity-100 group-hover/nav:scale-100 transition-all duration-300 ${showTransparent ? "bg-white" : "bg-[#c22026]"}`} />
          </Link>
        </nav>

        <div className="nav-actions hidden lg:flex items-center">
          <Link
            href="/enquire"
            className="group/btn relative overflow-hidden min-h-[38px] px-5 inline-flex items-center justify-center rounded-full bg-[#c22026] text-white no-underline text-[0.76rem] font-extrabold uppercase tracking-wider transition-all duration-300 hover:bg-[#1e3e8f] shadow-sm whitespace-nowrap"
          >
            <span>Enquire Now</span>
            <span className="ml-1.5 transition-transform duration-300 transform group-hover/btn:translate-x-1 font-bold text-[0.8rem]">
              →
            </span>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className={`mobile-menu-button flex lg:hidden w-10 h-10 items-center justify-center border rounded-full cursor-pointer shadow-sm transition-all duration-200 ${
            showTransparent ? "border-white/20 bg-white/10 text-white" : "border-slate-200 bg-white/80 text-slate-800"
          }`}
          aria-expanded={mobileMenuOpen}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Accordion Panel */}
      {mobileMenuOpen && (
        <div className={`mobile-menu-panel pointer-events-auto flex lg:hidden fixed left-4 right-4 max-h-[calc(100vh-96px)] overflow-y-auto p-4.5 flex-col gap-2.5 border border-white/80 rounded-[24px] bg-white/95 shadow-2xl z-[150] backdrop-blur-xl ${
          showTransparent ? "top-[82px]" : "top-[70px]"
        }`}>
          <div className="industrial-grid absolute inset-0 opacity-[0.015] pointer-events-none rounded-[24px]" />
          
          <div className="relative z-10 flex flex-col gap-2.5">
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)} 
              className="w-full min-h-[44px] flex items-center justify-between px-4 border border-slate-200/50 rounded-xl bg-slate-50/50 text-slate-800 text-[0.88rem] font-bold no-underline"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              onClick={() => setMobileMenuOpen(false)} 
              className="w-full min-h-[44px] flex items-center justify-between px-4 border border-slate-200/50 rounded-xl bg-slate-50/50 text-slate-800 text-[0.88rem] font-bold no-underline"
            >
              About Us
            </Link>

            {/* Mobile Solutions Section */}
            <div>
              <button 
                type="button" 
                onClick={() => toggleMobileAccordion("solutions")} 
                className="w-full min-h-[44px] flex items-center justify-between px-4 border border-slate-200/50 rounded-xl bg-slate-50/50 text-slate-800 text-[0.88rem] font-bold cursor-pointer"
              >
                <span>Solutions</span>
                {renderChevron(mobileAccordions.solutions)}
              </button>
              {mobileAccordions.solutions && (
                <div className="flex flex-col gap-1 mt-1.5 p-2 border border-slate-200/40 rounded-xl bg-white/70 shadow-inner">
                  {solutionsList.map((item) => (
                    <Link 
                      key={item.name} 
                      href={item.href} 
                      onClick={() => setMobileMenuOpen(false)} 
                      className="min-h-[36px] flex items-center px-3 rounded-lg text-slate-600 no-underline text-[0.82rem] font-semibold"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Applications Section */}
            <div>
              <button 
                type="button" 
                onClick={() => toggleMobileAccordion("applications")} 
                className="w-full min-h-[44px] flex items-center justify-between px-4 border border-slate-200/50 rounded-xl bg-slate-50/50 text-slate-800 text-[0.88rem] font-bold cursor-pointer"
              >
                <span>Applications</span>
                {renderChevron(mobileAccordions.applications)}
              </button>
              {mobileAccordions.applications && (
                <div className="flex flex-col gap-1 mt-1.5 p-2 border border-slate-200/40 rounded-xl bg-white/70 shadow-inner">
                  {applicationsList.map((item) => (
                    <Link 
                      key={item.name} 
                      href={item.href} 
                      onClick={() => setMobileMenuOpen(false)} 
                      className="min-h-[36px] flex items-center px-3 rounded-lg text-slate-600 no-underline text-[0.82rem] font-semibold"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Services Section */}
            <div>
              <button 
                type="button" 
                onClick={() => toggleMobileAccordion("services")} 
                className="w-full min-h-[44px] flex items-center justify-between px-4 border border-slate-200/50 rounded-xl bg-slate-50/50 text-slate-800 text-[0.88rem] font-bold cursor-pointer"
              >
                <span>Services</span>
                {renderChevron(mobileAccordions.services)}
              </button>
              {mobileAccordions.services && (
                <div className="flex flex-col gap-1 mt-1.5 p-2 border border-slate-200/40 rounded-xl bg-white/70 shadow-inner">
                  {servicesList.map((item) => (
                    <Link 
                      key={item.name} 
                      href={item.href} 
                      onClick={() => setMobileMenuOpen(false)} 
                      className="min-h-[36px] flex items-center px-3 rounded-lg text-slate-600 no-underline text-[0.82rem] font-semibold"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>



            <Link 
              href="/contact" 
              onClick={() => setMobileMenuOpen(false)} 
              className="w-full min-h-[44px] flex items-center justify-between px-4 border border-slate-200/50 rounded-xl bg-slate-50/50 text-slate-800 text-[0.88rem] font-bold no-underline"
            >
              Contact Us
            </Link>

            <Link 
              href="/enquire" 
              onClick={() => setMobileMenuOpen(false)} 
              className="min-h-[40px] inline-flex items-center justify-center px-5 rounded-full bg-[#c22026] text-white no-underline text-[0.82rem] font-extrabold uppercase tracking-wider mt-2 shadow-sm"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}