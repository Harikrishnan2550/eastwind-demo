"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface SolutionDetail {
  name: string;
  items: string[];
}

interface IndustryData {
  id: string;
  name: string;
  icon: React.ReactNode;
  riskKicker: string;
  description: string;
  solutions: SolutionDetail[];
  image: string;
  accent: string;
}

const itemSlugMap: Record<string, string> = {
  "End-End ISA 100 wireless gas detection system": "gas-detection",
  "Plant OPS": "mimes",
  "Air loops systems": "breathing-air-cascade-systems",
  "Wireless data acquisition": "mimes",
  "TGR(temporary refuge chamber)": "temporary-refuge-shelters",
  "LER": "temporary-refuge-shelters",
  "Analyzer shelters": "mimes",
  "Tank farm fire fighting": "oneseven",
  "Digital mobility-x shielder": "xshielder",
  "H2s shelter rental": "breathing-air-cascade-systems",
  "Breathing air cascade system": "breathing-air-cascade-systems",
  "HSE consultancy": "hse-consultancy",
  "Explosion proof design consultancy": "explosion-proof-design",
  "Smart factories": "tridiagonal",
  "Plant Ai": "tridiagonal",
  "SIL2 wireless gas detection systems": "gas-detection",
  "ISA 100, LUARA, HART, Wireless systems": "mimes",
  "Emergency response solution": "oneseven",
  "Asset management systems AI integrated fire trucks": "fire-truck",
  "Rescue intervention truck (RIV)": "fire-truck",
  "SCBA trucks": "fire-truck",
  "CBRN Vehicles": "fire-truck",
  "Compressed air form system (CAFS)": "one-seven-cafs",
  "Emergency response system": "oneseven",
  "Damage control system": "diving-chambers",
  "TGR": "temporary-refuge-shelters",
  "DE Compression champeers": "diving-chambers",
  "Wireless data acquisition and LAUARA 1SA 100, WIRELESS HART": "mimes",
  "Digital mobility Xshielder": "xshielder",
  "H2S shelter rental": "breathing-air-cascade-systems",
  "Breathing air cascade solution": "breathing-air-cascade-systems",
  "Sampling systems": "flow-metering-skids",
  "Wireless infrastructure": "mimes",
  "Smart Facility": "mimes",
  "Digital mobility Xshilder": "xshielder"
};

export default function SolutionsPage() {
  const [activeTab, setActiveTab] = useState<string>("oil-gas");
  const [hoveredSolution, setHoveredSolution] = useState<string | null>(null);

  const industries: IndustryData[] = [
    {
      id: "oil-gas",
      name: "Oil & Gas",
      riskKicker: "HAZARDOUS ATMOSPHERE | ATEX ZONE 0 & ZONE 1",
      accent: "#c22026", // East Wind Red
      image: "/predictive_intelligence.webp",
      description: "Securing petrochemical extraction, transport infrastructure, and downstream refining loops through intrinsically safe telemetry, explosion isolation, and toxic gas environment management.",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.656 48.656 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3M3 12l3 3m-3-3-3 3M19.5 12a48.11 48.11 0 0 1-.34 9m-14.32 0c-.017-.22-.032-.441-.046-.662M4.5 12H19" />
        </svg>
      ),
      solutions: [
        {
          name: "Wireless & Telemetry Systems",
          items: ["End-End ISA 100 wireless gas detection system", "Plant OPS", "Air loops systems", "Wireless data acquisition"]
        },
        {
          name: "Containment & Safety Infrastructure",
          items: ["TGR(temporary refuge chamber)", "LER", "Analyzer shelters"]
        },
        {
          name: "Fire Fighting & Operations",
          items: ["Tank farm fire fighting", "Digital mobility-x shielder", "H2s shelter rental", "Breathing air cascade system"]
        },
        {
          name: "Engineering & Risk Consultancy",
          items: ["HSE consultancy", "Explosion proof design consultancy"]
        }
      ]
    },
    {
      id: "petrochemical",
      name: "Petrochemicals",
      riskKicker: "PROCESS HAZARD CONTROL | ZONE 1 & ZONE 2",
      accent: "#f59e0b", // Amber/Gold
      image: "/industrial_digitalization.webp",
      description: "Optimising downstream chemical refining ecosystems with real-time Physics-Informed ML, predictive anomaly diagnostics, and high-fidelity wireless telemetry layers.",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M12 3a9 9 0 0 1 9 9m-9-9a9 9 0 0 0-9 9m9 9a9 9 0 0 1 9-9m-9 9a9 9 0 0 0-9-9" />
        </svg>
      ),
      solutions: [
        {
          name: "Factory Digitalization",
          items: ["Smart factories", "Plant Ai", "Wireless data acquisition"]
        },
        {
          name: "Wireless Systems & Gas Safety",
          items: ["SIL2 wireless gas detection systems", "ISA 100, LUARA, HART, Wireless systems"]
        },
        {
          name: "Emergency Operations",
          items: ["Emergency response solution"]
        }
      ]
    },
    {
      id: "civil-defense",
      name: "Civil Defense",
      riskKicker: "TACTICAL EMERGENCY INCIDENT COMMAND",
      accent: "#ef4444", // Red/Orange
      image: "/emergency_vehicle.webp",
      description: "Equipping public safety, civil protection, and regional defense forces with heavy tactical command apparatus, specialized life-support vehicles, and optimized foam suppression networks.",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.617 3.064a5.976 5.976 0 0 1-2.903 2.903c-.674.987-1.796 1.617-3.064 1.617a5.976 5.976 0 0 1-3.064-1.617 5.976 5.976 0 0 1-2.903-2.903C2.63 14.39 shadow-sm" />
        </svg>
      ),
      solutions: [
        {
          name: "Fleet & Specialized Vehicles",
          items: ["Asset management systems AI integrated fire trucks", "Rescue intervention truck (RIV)", "SCBA trucks", "CBRN Vehicles"]
        },
        {
          name: "Extinguishing & Incident Response",
          items: ["Compressed air form system (CAFS)", "Emergency response system"]
        }
      ]
    },
    {
      id: "marine",
      name: "Marine & Offshore",
      riskKicker: "OFFSHORE ARCHITECTURE | ABS & DNV COMPLIANT",
      accent: "#1e3e8f", // East Wind Blue
      image: "/thermal_ehouse.webp",
      description: "Providing deepwater infrastructure defense, automated hull breach stabilization tracking, and extreme salt-atmosphere corrosive protection systems.",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 3.75-3.75V15m-19.5 0A4.5 4.5 0 0 1 6.75 10.5H18a3.75 3.75 0 0 1 3.75 3.75V15M2.25 15V12a4.5 4.5 0 0 1 4.5-4.5H18A3.75 3.75 0 0 1 21.75 11.25V15" />
        </svg>
      ),
      solutions: [
        {
          name: "Vessel Containment & Integrity",
          items: ["Damage control system", "TGR", "DE Compression champeers"]
        },
        {
          name: "Wireless & Telecom Infrastructures",
          items: ["Wireless data acquisition and LAUARA 1SA 100, WIRELESS HART", "Digital mobility Xshielder", "Plant OPS"]
        },
        {
          name: "Field Services & Rentals",
          items: ["H2S shelter rental", "Air loops systems", "Breathing air cascade solution"]
        }
      ]
    },
    {
      id: "utility-power",
      name: "Utility & Power",
      riskKicker: "CRITICAL GRID SAFETY MARGIN | IEEE & IEC CERTIFIED",
      accent: "#10b981", // Emerald
      image: "/wireless_monitoring.webp",
      description: "Hardening continental power distribution grids, high-output electrical substations, and water transformation architectures through high-noise immune telemetry and physical containment monitoring.",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      solutions: [
        {
          name: "Grid Telemetry & Infrastructure",
          items: ["Sampling systems", "Wireless infrastructure", "Smart Facility", "Digital mobility Xshilder"]
        }
      ]
    }
  ];

  const corePortfolios = [
    {
      title: "AI, Digitalisation & Data Architecture",
      description: "Advanced data acquisition pipelines running Agentic AI models to enable automated predictive asset diagnostics.",
      items: [
        "AI infrastructure deployment for volatile processing contexts",
        "Plant operations enablement utilizing operational Agentic AI",
        "Process parameter optimization and predictive engineering analysis",
        "Data acquisition topologies facilitating rapid AI framework execution"
      ],
      icon: "⚡"
    },
    {
      title: "Tactical Response Integration",
      description: "Complete design engineering, manufacturing, and systems calibration for highly tailored safety fleets.",
      items: [
        "Heavy emergency industrial fire trucks and fluid tanker units",
        "SCBA mobile compressed air cylinder recharging trucks",
        "Rapid intervention vehicles (RIV) for tactical site access",
        "Amphibious extreme-terrain safety equipment and clinical units"
      ],
      icon: "⚙️"
    },
    {
      title: "Fire & Gas Detection Topologies",
      description: "Intelligent field instrumentation grids built to pass strict SIL 2 and SIL 3 risk parameters.",
      items: [
        "Fixed and portable multi-point toxic gas detection infrastructure",
        "Visual and acoustic emergency alerting networks",
        "Multi-spectrum optical flame monitoring instruments",
        "Linear thermal cables and localized smoke detection arrays"
      ],
      icon: "👁️"
    },
    {
      title: "Extinguishing & Lifecycle Simulation",
      description: "Clean agent containment systems paired with high-fidelity operator training platforms.",
      items: [
        "Novec 1230, CO2, and Inergen absolute suppression setups",
        "Virtual reality and kinetic hot-fire training simulator modules",
        "High-capacity automated foam concentrate skid engineering",
        "Underground energy pipeline physical protection systems"
      ],
      icon: "🛡️"
    },
    {
      title: "Industrial Wireless Environments",
      description: "Eliminating hazardous civil field cabling through robust, self-healing mesh communication paths.",
      items: [
        "SIL 2 capable self-configuring wireless data radio fields",
        "Wireless tracking loops for dense field instrumentation systems",
        "ATEX Zone 0 certified radio transmitter configurations",
        "Multi-hop WirelessHART & ISA100 structural mesh routing"
      ],
      icon: "🛰️"
    },
    {
      title: "Specialised Lifecycles & Field Services",
      description: "Multi-disciplinary lifecycle management from conceptual studies to laboratory field calibrations.",
      items: [
        "Concept development, system design layouts, and HSE consulting",
        "Comprehensive H2S fleet rental assets and breathing air packs",
        "Operational operator certifications tailored to client locations",
        "Torque, pressure, thermal, and electrical field calibration loops"
      ],
      icon: "🔬"
    }
  ];

  const partners = [
    "Dräger", "Empel", "Nardi", "Mimes", "One Seven", "Sieon", "Xshielder",
    "Nittan", "FlamePro", "E2S", "Schneider", "CRI", "CEJN", "Polyhose",
    "Keiconnections", "Leader", "Tridiagonal", "Phoenix", "Pepperl+Fuchs",
    "Guttor", "Paratech", "Panam", "Atexxor", "Thermocable"
  ];

  const activeIndustry = industries.find((ind) => ind.id === activeTab) || industries[0];

  const [solutionsList, setSolutionsList] = useState<any[]>([]);

  useEffect(() => {
    async function loadSolutions() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${baseUrl}/api/solutions`);
        if (res.ok) {
          const list = await res.json();
          setSolutionsList(list);
        }
      } catch (err) {
        console.error("Failed to load solutions database catalog:", err);
      }
    }
    loadSolutions();
  }, []);

  const activeIndustrySolutions = solutionsList.filter((sol) => {
    const apps = sol.applications || [];
    if (activeTab === "oil-gas") return apps.includes("Oil & Gas");
    if (activeTab === "petrochemical") return apps.includes("Petrochemicals");
    if (activeTab === "civil-defense") return apps.includes("Defense") || apps.includes("Civil Defense");
    if (activeTab === "marine") return apps.includes("Offshore") || apps.includes("Marine");
    if (activeTab === "utility-power") return apps.includes("Utilities");
    return false;
  });

  const groupedSolutions: Record<string, any[]> = {};
  activeIndustrySolutions.forEach((sol) => {
    const cat = sol.subLabel || "General Systems";
    if (!groupedSolutions[cat]) {
      groupedSolutions[cat] = [];
    }
    groupedSolutions[cat].push(sol);
  });

  const displaySolutions = Object.keys(groupedSolutions).length > 0 
    ? Object.entries(groupedSolutions).map(([name, items]) => ({
        name,
        items: items.map((i) => ({ name: i.title, id: i.id }))
      }))
    : activeIndustry.solutions.map((s) => ({
        name: s.name,
        items: s.items.map((it) => {
          const slug = itemSlugMap[it];
          return { name: it, id: slug };
        })
      }));

  return (
    <>
      <Navbar />

      <main className="min-h-screen relative z-10 w-full overflow-x-clip text-slate-800 bg-white antialiased">
        
        {/* Symmetrical Ambient Glow System */}
        <div className="absolute top-[20%] left-1/4 w-[500px] h-[500px] rounded-full bg-[#1e3e8f]/5 blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-[30%] right-1/4 w-[600px] h-[600px] rounded-full bg-[#ff2228]/4 blur-[140px] pointer-events-none z-0" />

        {/* Structural Tech Grid Overlay */}
        <div className="industrial-grid absolute inset-0 opacity-[0.015] pointer-events-none z-0" />

        {/* Cinematic Hero Section - Updated layout matching image_6f023c.png removal request */}
        <section className="relative pt-[220px] pb-[160px] overflow-hidden border-b border-white/5 min-h-[600px] flex items-center bg-slate-950 w-full z-10">
          
          <img
            src="/solution.png"
            alt="Industrial Fire Safety Infrastructure System"
            className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none brightness-[0.85] scale-101 z-0"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#080c14]/90 via-[#080c14]/65 to-[#080c14]/15 max-md:from-[#080c14]/90 max-md:to-[#080c14]/65 z-10" />
          <div className="industrial-grid absolute inset-0 opacity-[0.02] pointer-events-none z-10" />

          <div className="max-w-[1400px] w-full mx-auto px-10 max-sm:px-5 relative z-20">
            <div className="max-w-[750px] space-y-4">
              <span className="inline-block text-[#c22026] text-xs font-bold uppercase tracking-[0.25em]">
                Ecosystem Engineering Portal
              </span>
              <h1 className="text-[2.6rem] max-md:text-[2.1rem] max-sm:text-[1.8rem] leading-[1.15] uppercase font-extrabold tracking-tight text-white m-0">
                High-Compliance Engineered Solutions
              </h1>
              <p className="text-[0.95rem] text-slate-200 leading-relaxed font-light m-0">
                Eastwind completely bypasses basic component provisioning to function as an end-to-end technological validator. We formulate high-risk protective frameworks that isolate hazards, guarantee regional operational safety, and structurally reduce asset TCO.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1: Solution Mapping Area */}
        <section id="industry-solutions" className="py-24 max-w-[1400px] mx-auto px-10 max-sm:px-5 z-10 relative">
          
          <div className="border-b border-slate-200/60 pb-12 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c22026]">Operating Environments</span>
              <h2 className="text-3xl font-extrabold uppercase text-slate-900 tracking-tight">Solutions By Operating Industry</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md">
              Industrial sectors feature highly specific chemical, thermal, and spatial risks. We build multi-layered mitigation loops engineered to perform reliably inside harsh conditions.
            </p>
          </div>

          {/* Premium Fluid Segmented Switch */}
          <div className="flex overflow-x-auto no-scrollbar md:flex-wrap p-1.5 bg-slate-100/80 border border-slate-200/60 backdrop-blur-md rounded-xl gap-1 max-w-4xl mx-auto mb-16 relative z-20 max-sm:justify-start shadow-sm">
            {industries.map((ind) => {
              const isActive = activeTab === ind.id;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveTab(ind.id)}
                  className="flex items-center justify-center gap-2.5 py-3 px-5 text-xs font-mono uppercase tracking-wider transition-all duration-300 rounded-lg relative flex-1 min-w-[140px] shrink-0 cursor-pointer"
                >
                  <span className={`relative z-10 flex items-center gap-2 ${isActive ? 'text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-800'}`}>
                    {ind.icon}
                    <span>{ind.name}</span>
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="spatialActiveTabHighlight"
                      className="absolute inset-0 bg-white border border-slate-200/80 rounded-lg shadow-sm"
                      style={{ borderBottom: `2px solid ${activeIndustry.accent}` }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Spatial Interactive Content Block */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndustry.id}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              
              {/* Left Wing: Geometric Overview Deck */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                
                {/* Image Component with Layer Depth Overlays */}
                <div className="relative h-64 lg:h-80 border border-slate-200/60 bg-slate-50 p-1.5 rounded-xl overflow-hidden group shadow-md">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-100 via-transparent to-transparent z-10" />
                  <div className="absolute inset-0 border border-slate-200/40 z-20 pointer-events-none m-2 rounded-lg" />
                  <img
                    src={activeIndustry.image}
                    alt={activeIndustry.name}
                    className="w-full h-full object-cover filter contrast-[1.02] brightness-100 group-hover:scale-103 transition-all duration-[1200ms] ease-out rounded-lg"
                  />
                  <div 
                    className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center bg-[#080c14]/90 border px-3 py-1.5 font-mono text-[9px] tracking-widest rounded-lg backdrop-blur-md"
                    style={{ borderColor: `${activeIndustry.accent}50`, color: activeIndustry.accent }}
                  >
                    <span>{activeIndustry.riskKicker}</span>
                  </div>
                </div>

                {/* Sub-system Narrative Container */}
                <div className="p-6 bg-white border border-slate-200/60 rounded-xl flex-grow flex flex-col justify-center space-y-3 relative overflow-hidden shadow-3xs">
                  <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: activeIndustry.accent }} />
                  <h3 className="text-md font-bold text-slate-900 uppercase tracking-tight pl-2">
                    {activeIndustry.name} Control Parameters
                  </h3>
                  <p className="text-xs text-slate-650 leading-relaxed pl-2 font-medium">
                    {activeIndustry.description}
                  </p>
                </div>
              </div>

              {/* Right Wing: High-Performance Solution Grid Matrix */}
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {displaySolutions.map((sol) => {
                  const isHovered = hoveredSolution === sol.name;
                  return (
                    <div
                      key={sol.name}
                      onMouseEnter={() => setHoveredSolution(sol.name)}
                      onMouseLeave={() => setHoveredSolution(null)}
                      className="p-6 bg-slate-50/50 border border-slate-200/60 hover:border-slate-350 hover:bg-slate-50/80 rounded-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between group shadow-3xs hover:shadow-md"
                      style={{
                        backgroundImage: isHovered ? `radial-gradient(circle at 10% 10%, ${activeIndustry.accent}0f, transparent 70%)` : 'none'
                      }}
                    >
                      <div className="space-y-4 relative z-10">
                        <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                          <h4 
                            className="text-xs font-mono font-bold text-slate-850 uppercase tracking-wider transition-colors duration-300"
                            style={{ color: isHovered ? activeIndustry.accent : '' }}
                          >
                            {sol.name}
                          </h4>
                        </div>
                        
                        <ul className="space-y-3 pl-0 list-none m-0">
                          {sol.items.map((item, itemIdx) => {
                            const isService = ["hse-consultancy", "explosion-proof-design"].includes(item.id || "");
                            const isProduct = ["fire-truck", "one-seven-cafs", "sione-hood", "gas-detector", "smoke-detector", "heat-detector", "temp-transmitter", "pressure-transmitter", "diving-chambers", "cascade-system", "scba-system", "nardi-compressor"].includes(item.id || "");
                            const path = item.id 
                              ? (isService ? `/services/${item.id}` : isProduct ? `/products/${item.id}` : `/solutions/${item.id}`)
                              : null;

                            return (
                              <li key={itemIdx} className="flex items-start gap-3 text-xs text-slate-650 group-hover:text-slate-800 transition-colors">
                                <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: activeIndustry.accent }} />
                                {path ? (
                                  <Link href={path} className="hover:text-sky-600 hover:underline transition-colors font-medium">
                                    {item.name}
                                  </Link>
                                ) : (
                                  <span>{item.name}</span>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>

            </motion.div>
          </AnimatePresence>
        </section>

        {/* Section 2: Framework Competence */}
        <section className="py-24 bg-[#f8fafc] border-t border-b border-slate-200/60 relative z-10">
          <div className="max-w-[1400px] mx-auto px-10 max-sm:px-5">
            
            <div className="mb-20 max-w-3xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Core Expertise</span>
              <h2 className="text-3xl font-extrabold uppercase text-slate-900 tracking-tight">Core Capabilities Portfolio</h2>
              <p className="text-sm text-slate-600 leading-relaxed pt-2">
                Eastwind executes complex, multi-disciplinary workflows through structural, instrumentation, and fire safety engineering domains to assure unified system performance.
              </p>
            </div>

            {/* Spatial Grid Framework Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {corePortfolios.map((portfolio, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white border border-slate-200 hover:border-slate-350 transition-all duration-300 rounded-xl group flex flex-col justify-between relative overflow-hidden shadow-3xs hover:shadow-md"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
                      <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-sm shadow-inner group-hover:scale-110 transition-transform duration-300">
                        {portfolio.icon}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 group-hover:text-[#c22026] transition-colors duration-300">
                        {portfolio.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-mono leading-relaxed min-h-[32px]">
                        {portfolio.description}
                      </p>
                    </div>

                    <ul className="space-y-2.5 pl-0 list-none pt-4 border-t border-slate-200/60">
                      {portfolio.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2.5 text-xs text-slate-600 font-mono leading-normal">
                          <span className="text-[#c22026] select-none shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Section 3: Tech Ecosystem */}
        <section className="py-24 max-w-[1400px] mx-auto px-10 max-sm:px-5 z-10 relative">
          
          <div className="mb-14 text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c22026]">Global Integration</span>
            <h2 className="text-2xl font-extrabold uppercase text-slate-900 tracking-tight">Integrated Technology Partners</h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              We securely assimilate components from verified global market leaders into unified, field-ready physical frameworks.
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-w-5xl mx-auto">
            {partners.map((partner) => (
              <div
                key={partner}
                className="bg-white border border-slate-200 hover:border-slate-350 py-3.5 px-4 rounded-xl text-slate-600 hover:text-[#1e3e8f] hover:bg-[#1e3e8f]/5 text-center font-mono text-[10px] uppercase tracking-wider transition-all duration-300 cursor-default select-none shadow-3xs hover:shadow-sm"
              >
                {partner}
              </div>
            ))}
          </div>

        </section>

        {/* Section 4: Solution Form Request Platform */}
        <section id="enquire-form" className="py-24 bg-white border-t border-slate-200/60 relative z-10">
          <div className="industrial-grid absolute inset-0 opacity-[0.015] pointer-events-none" />
          
          <div className="max-w-[1000px] mx-auto px-10 max-md:px-6 max-sm:px-4">
            <div className="p-12 max-md:p-8 max-sm:p-6 bg-[#f8fafc] border border-slate-200 rounded-[32px] max-sm:rounded-[24px] relative overflow-hidden shadow-sm">
              
              <div className="mb-12 space-y-3 max-w-2xl">
                <span className="block text-xs font-bold text-[#c22026] uppercase tracking-[0.25em]">
                  Enquiry Gateway
                </span>
                <h3 className="text-[2.2rem] max-md:text-[1.8rem] max-sm:text-[1.45rem] font-extrabold uppercase text-slate-900 tracking-tight leading-none m-0">
                  Initiate Solution Proposal Request
                </h3>
                <p className="text-sm max-sm:text-xs text-slate-500 font-normal leading-relaxed m-0">
                  Our regional infrastructure engineering office coordinates directly with technical site operators to map out field constraints, balance topologies, and deploy high-compliance certified safety systems.
                </p>
              </div>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-md:gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 font-bold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Identified Site Engineer Name"
                      className="w-full h-12 px-4 rounded-xl bg-white border border-slate-200 text-slate-800 font-mono text-xs focus:outline-none focus:border-[#c22026] focus:ring-1 focus:ring-[#c22026]/20 transition-all duration-300 placeholder:text-slate-400"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 font-bold">
                      Corporate Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="engineer@enterprise.com.sa"
                      className="w-full h-12 px-4 rounded-xl bg-white border border-slate-200 text-slate-800 font-mono text-xs focus:outline-none focus:border-[#c22026] focus:ring-1 focus:ring-[#c22026]/20 transition-all duration-300 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-md:gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-700 font-bold">
                      Operational Sector
                    </label>
                    <div className="relative">
                      <select
                        className="w-full h-12 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-mono text-xs focus:outline-none focus:border-[#c22026] transition-all appearance-none cursor-pointer"
                        defaultValue=""
                      >
                        <option value="" disabled>Select industry classification...</option>
                        <option value="oil-gas">Oil & Gas Infrastructure</option>
                        <option value="petrochemical">Petrochemical Operations</option>
                        <option value="civil-defense">Civil Defense Command</option>
                        <option value="marine">Marine & Offshore Platforms</option>
                        <option value="utility-power">Utility & Electrical Grids</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 text-[10px]">▼</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 font-bold">
                      Primary Solution Scope
                    </label>
                    <div className="relative">
                      <select
                        className="w-full h-12 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-mono text-xs focus:outline-none focus:border-[#c22026] transition-all appearance-none cursor-pointer"
                        defaultValue=""
                      >
                        <option value="" disabled>Select capability tier...</option>
                        <option value="ai-digitalization">AI, Digitalisation & Data</option>
                        <option value="firefighting">Tactical Response Fleet Systems</option>
                        <option value="gas-detection">Fire & Gas Topology Loops</option>
                        <option value="suppression">Extinguishing & Simulator Skids</option>
                        <option value="wireless">Industrial Wireless Mesh Networks</option>
                        <option value="services">Specialised Field Services</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 text-[10px]">▼</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 font-bold">
                    Project Scope & Environmental Constraints
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Specify physical area classifications, target gas exposure matrices, thermal limitations, or regulatory HCIS code scopes..."
                    className="w-full p-4 rounded-xl bg-white border border-slate-200 text-slate-800 font-mono text-xs focus:outline-none focus:border-[#c22026] focus:ring-1 focus:ring-[#c22026]/20 transition-all resize-y placeholder:text-slate-400"
                  />
                </div>

                <div className="pt-2 flex justify-end max-sm:justify-start">
                  <button
                    type="submit"
                    className="w-full sm:w-auto py-3.5 px-10 text-xs font-bold uppercase tracking-wider text-white bg-[#c22026] hover:bg-[#1e3e8f] rounded-full inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer font-mono"
                  >
                    Submit Request
                    <span className="font-bold">→</span>
                  </button>
                </div>
              </form>

            </div>
          </div>
        </section>
        
        <Footer />
      </main>
    </>
  );
}