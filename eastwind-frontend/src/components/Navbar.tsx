"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type AccordionKey = "applications" | "services" | "solutions";

interface NavItem {
  name: string;
  href: string;
}

interface SolutionCategory {
  id: string;
  name: string;
  href: string;
  description: string;
  accent: string;
  items: { name: string; href: string }[];
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

  // Dynamic Solution Categories from Admin CMS
  useEffect(() => {
    async function fetchDynamicSolutions() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${baseUrl}/api/solutions`, { cache: "no-store" });
        if (res.ok) {
          const solutionsData = await res.json();
          if (Array.isArray(solutionsData) && solutionsData.length > 0) {
            const dynamicCategories: SolutionCategory[] = solutionsData.map((sol: any) => ({
              id: sol.id || sol.slug,
              name: sol.title,
              href: `/solutions/${sol.id || sol.slug}`,
              description: sol.subLabel || sol.tagline || sol.description || "High-compliance engineered solution",
              accent: sol.accent === "blue" ? "#1e3e8f" : "#c22026",
              items: (sol.features || []).slice(0, 5).map((f: string) => ({
                name: f,
                href: `/solutions/${sol.id || sol.slug}`
              }))
            }));
            setCategoriesList(dynamicCategories);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch dynamic navbar solution categories:", err);
      }
    }
    fetchDynamicSolutions();
  }, []);

  // 6 Solution Categories & their associated products/sub-solutions
  const [categoriesList, setCategoriesList] = useState<SolutionCategory[]>([
    {
      id: "oil-gas",
      name: "Oil & Gas Industry",
      href: "/solutions/oil-and-gas",
      description: "Intelligent Hydrocarbon Operations & Intrinsic Wireless Systems",
      accent: "#1e3e8f",
      items: [
        { name: "End-End ISA 100 Wireless Gas Detection", href: "/solutions/oil-and-gas" },
        { name: "Plant Operations (Plant OPS)", href: "/solutions/oil-and-gas" },
        { name: "TGR (Temporary Refuge Chamber)", href: "/solutions/oil-and-gas" },
        { name: "Tank Farm Fire Fighting", href: "/solutions/oil-and-gas" },
        { name: "LER & Analyzer Shelters", href: "/solutions/oil-and-gas" },
        { name: "Digital Mobility-X Shielder", href: "/solutions/oil-and-gas" },
      ],
    },
    {
      id: "marine-offshore",
      name: "Marine Operations",
      href: "/solutions/marine-offshore",
      description: "Harsh Deepwater Infrastructure Resilience & Damage Control",
      accent: "#b45309",
      items: [
        { name: "Damage Control Systems", href: "/solutions/marine-offshore" },
        { name: "Wireless Data Acquisition", href: "/solutions/marine-offshore" },
        { name: "H2S Shelter Rental & Air Loops", href: "/solutions/marine-offshore" },
        { name: "Temporary Refuge Chambers (TGR)", href: "/solutions/marine-offshore" },
        { name: "Decompression Chambers", href: "/solutions/marine-offshore" },
        { name: "Air Loops & Breathing Air Cascades", href: "/solutions/marine-offshore" },
      ],
    },
    {
      id: "utilities-power",
      name: "Utilities & Power",
      href: "/solutions/utility-power",
      description: "Critical Grid Asset Safeguarding & Thermal Monitoring",
      accent: "#1e3e8f",
      items: [
        { name: "Sampling Systems (SWAS)", href: "/solutions/utility-power" },
        { name: "Wireless Infrastructure", href: "/solutions/utility-power" },
        { name: "Smart Facilities", href: "/solutions/utility-power" },
        { name: "Digital Mobility (Xshielder)", href: "/solutions/utility-power" },
      ],
    },
    {
      id: "defense-security",
      name: "Defense & Border Security",
      href: "/solutions/civil-defense",
      description: "National Level Security & Blast-Resistant Modules",
      accent: "#b45309",
      items: [
        { name: "Secure Wireless Telemetry", href: "/solutions/civil-defense" },
        { name: "Blast-Resistant Guard Shelters", href: "/solutions/civil-defense" },
        { name: "Tactical Cyber Defense", href: "/solutions/civil-defense" },
        { name: "HCIS Approved Fencing", href: "/solutions/civil-defense" },
      ],
    },
    {
      id: "civil-defense",
      name: "Civil Defense",
      href: "/solutions/civil-defense",
      description: "Metropolitan Safety Infrastructure & Emergency Vehicles",
      accent: "#c22026",
      items: [
        { name: "Asset Management Systems", href: "/solutions/civil-defense" },
        { name: "Rescue Intervention Vehicles (RIV)", href: "/solutions/civil-defense" },
        { name: "CAFS Systems", href: "/solutions/civil-defense" },
        { name: "SCBA Support Trucks", href: "/solutions/civil-defense" },
        { name: "CBRN Emergency Response Systems", href: "/solutions/civil-defense" },
      ],
    },
    {
      id: "smart-facilities",
      name: "Smart Industrial Facilities",
      href: "/solutions/petrochemicals",
      description: "Automated Facility Health & Process Reliability Diagnostics",
      accent: "#c22026",
      items: [
        { name: "Smart Factories", href: "/solutions/petrochemicals" },
        { name: "Plant AI Diagnostics", href: "/solutions/petrochemicals" },
        { name: "Wireless Data Acquisition", href: "/solutions/petrochemicals" },
        { name: "SIL2 Wireless Gas Detection", href: "/solutions/petrochemicals" },
        { name: "Wireless Systems (ISA100, LoRa)", href: "/solutions/petrochemicals" },
        { name: "Emergency Response Solutions", href: "/solutions/petrochemicals" },
      ],
    },
  ]);

  const [hoveredCategoryIdx, setHoveredCategoryIdx] = useState<number | null>(null);
  const [mobileSubAccordion, setMobileSubAccordion] = useState<string | null>(null);

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
        <Link href="/" className="brand-link inline-flex items-center no-underline shrink-0">
          <div className={`transition-all duration-300 ${
            showTransparent
              ? "bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/80 shadow-md"
              : "bg-transparent"
          }`}>
            <img
              src="/logo.png"
              alt="East Wind Energy Arabia"
              className="h-9 sm:h-11 w-auto max-w-[150px] sm:max-w-none object-contain shrink-0"
            />
          </div>
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

          {/* Solutions Dropdown - 6 Solution Categories with hoverable products list */}
          <div className="nav-dropdown relative group/nav">
            <button
              type="button"
              onClick={() => {
                const next = activeDropdown === "solutions" ? null : "solutions";
                setActiveDropdown(next);
              }}
              className={`nav-link-dropdown inline-flex items-center gap-1.25 px-3.5 py-2 text-[0.76rem] font-extrabold uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer ${
                showTransparent ? "text-white/90 hover:text-white hover:bg-white/10" : "text-slate-700 hover:text-[#1e3e8f] hover:bg-slate-100"
              } ${activeDropdown === "solutions" ? (showTransparent ? "text-white bg-white/15" : "text-[#1e3e8f] bg-slate-100") : ""}`}
            >
              Solutions {renderChevron(activeDropdown === "solutions")}
            </button>
            {activeDropdown === "solutions" && (
              <div
                onMouseLeave={() => setHoveredCategoryIdx(null)}
                className={`dropdown-container absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 bg-white/95 border border-slate-200/80 rounded-[28px] shadow-2xl z-[150] backdrop-blur-xl transition-all duration-300 overflow-hidden p-4 ${
                  hoveredCategoryIdx !== null ? "w-[640px] max-w-[90vw]" : "w-[280px]"
                }`}
              >
                {hoveredCategoryIdx === null ? (
                  /* Compact View: 6 Categories Only (No blank space) */
                  <div className="flex flex-col gap-1 w-full">
                    {categoriesList.map((cat, idx) => (
                      <Link
                        key={cat.id}
                        href={cat.href}
                        onMouseEnter={() => setHoveredCategoryIdx(idx)}
                        onClick={() => {
                          setActiveDropdown(null);
                          setHoveredCategoryIdx(null);
                          setMobileMenuOpen(false);
                        }}
                        className="group/cat min-h-[40px] flex items-center justify-between gap-2 px-3 py-2 rounded-xl no-underline text-slate-700 hover:bg-slate-100 hover:text-[#1e3e8f] transition-all duration-200"
                      >
                        <div className="flex flex-col min-w-0">
                          <span className="text-[0.82rem] font-extrabold leading-tight truncate">
                            {cat.name}
                          </span>
                          <span className="text-[0.64rem] font-medium text-slate-400 truncate">
                            {cat.items.length} Products & Solutions
                          </span>
                        </div>
                        <span className="text-[0.9rem] font-bold text-slate-300 group-hover/cat:text-[#c22026] group-hover/cat:translate-x-1 transition-all">
                          ›
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  /* Expanded View: Categories on Left, Products on Right */
                  <div className="grid grid-cols-12 gap-3 items-stretch w-full">
                    {/* Left Column: 6 Categories */}
                    <div className="col-span-5 border-r border-slate-100 pr-2 flex flex-col gap-1">
                      {categoriesList.map((cat, idx) => {
                        const isHovered = hoveredCategoryIdx === idx;
                        return (
                          <Link
                            key={cat.id}
                            href={cat.href}
                            onMouseEnter={() => setHoveredCategoryIdx(idx)}
                            onClick={() => {
                              setActiveDropdown(null);
                              setHoveredCategoryIdx(null);
                              setMobileMenuOpen(false);
                            }}
                            className={`group/cat min-h-[40px] flex items-center justify-between gap-2 px-3 py-2 rounded-xl no-underline transition-all duration-200 ${
                              isHovered
                                ? "bg-slate-100 text-[#1e3e8f] shadow-sm"
                                : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                          >
                            <div className="flex flex-col min-w-0">
                              <span className="text-[0.82rem] font-extrabold leading-tight truncate">
                                {cat.name}
                              </span>
                              <span className="text-[0.64rem] font-medium text-slate-400 truncate">
                                {cat.items.length} Products & Solutions
                              </span>
                            </div>
                            <span
                              className={`text-[0.9rem] font-bold transition-transform duration-200 ${
                                isHovered ? "text-[#c22026] translate-x-1" : "text-slate-300 group-hover/cat:text-slate-400"
                              }`}
                            >
                              ›
                            </span>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Right Column: Associated Products */}
                    <div className="col-span-7 pl-2 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                          <div className="flex flex-col min-w-0">
                            <span className="text-[0.62rem] font-bold tracking-wider uppercase text-slate-400">
                              Category Products
                            </span>
                            <span className="text-[0.88rem] font-black text-[#1e3e8f] truncate">
                              {categoriesList[hoveredCategoryIdx]?.name}
                            </span>
                          </div>
                          <Link
                            href={categoriesList[hoveredCategoryIdx]?.href || "#"}
                            onClick={() => {
                              setActiveDropdown(null);
                              setHoveredCategoryIdx(null);
                              setMobileMenuOpen(false);
                            }}
                            className="text-[0.68rem] font-bold text-[#c22026] hover:underline whitespace-nowrap ml-2"
                          >
                            Overview →
                          </Link>
                        </div>

                        <div className="flex flex-col gap-1 max-h-[250px] overflow-y-auto pr-1">
                          {categoriesList[hoveredCategoryIdx]?.items.map((item, itemIdx) => (
                            <Link
                              key={itemIdx}
                              href={item.href}
                              onClick={() => {
                                setActiveDropdown(null);
                                setHoveredCategoryIdx(null);
                                setMobileMenuOpen(false);
                              }}
                              className="group/subitem flex items-center justify-between p-2 rounded-lg text-slate-700 hover:text-[#1e3e8f] hover:bg-slate-50 no-underline transition-all duration-200"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/subitem:bg-[#c22026] transition-colors flex-shrink-0" />
                                <span className="text-[0.78rem] font-bold leading-tight truncate">
                                  {item.name}
                                </span>
                              </div>
                              <span className="text-slate-300 text-[0.8rem] group-hover/subitem:text-[#c22026] group-hover/subitem:translate-x-0.5 transition-all flex-shrink-0">
                                ›
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
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
                <div className="flex flex-col gap-2 mt-1.5 p-2 border border-slate-200/40 rounded-xl bg-white/70 shadow-inner">
                  {categoriesList.map((cat) => {
                    const isSubOpen = mobileSubAccordion === cat.id;
                    return (
                      <div key={cat.id} className="flex flex-col border border-slate-100 rounded-lg overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setMobileSubAccordion(isSubOpen ? null : cat.id)}
                          className="w-full min-h-[38px] flex items-center justify-between px-3 bg-slate-50/90 text-slate-800 text-[0.82rem] font-bold cursor-pointer"
                        >
                          <span>{cat.name}</span>
                          <span className={`text-[0.7rem] transition-transform ${isSubOpen ? "rotate-90 text-[#c22026]" : "text-slate-400"}`}>
                            ▶
                          </span>
                        </button>
                        {isSubOpen && (
                          <div className="flex flex-col gap-1 p-2 bg-white">
                            <Link
                              href={cat.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="px-2 py-1 text-[0.76rem] font-bold text-[#c22026] hover:underline"
                            >
                              Overview Page →
                            </Link>
                            {cat.items.map((item, i) => (
                              <Link
                                key={i}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="min-h-[32px] flex items-center px-2.5 rounded text-slate-600 no-underline text-[0.78rem] font-medium hover:text-[#1e3e8f] hover:bg-slate-50"
                              >
                                • {item.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
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