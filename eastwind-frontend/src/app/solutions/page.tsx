"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
  riskKicker: string;
  accent: string;
  image: string;
  description: string;
  icon?: React.ReactNode;
}

interface CorePortfolio {
  title: string;
  description: string;
  items: string[];
  icon: string;
}

interface DropdownOption {
  value: string;
  label: string;
}

interface SolutionsPageConfig {
  heroBgImage: string;
  heroTagline: string;
  heroTitle: string;
  heroDescription: string;
  industriesTagline: string;
  industriesTitle: string;
  industriesDesc: string;
  industries: IndustryData[];
  capabilitiesTagline: string;
  capabilitiesTitle: string;
  capabilitiesDesc: string;
  corePortfolios: CorePortfolio[];
  partnersTagline: string;
  partnersTitle: string;
  partnersDesc: string;
  partners: string[];
  gatewayTagline: string;
  gatewayTitle: string;
  gatewayDesc: string;
  solutionScopeOptions: DropdownOption[];
  submitButtonText: string;
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

const defaultPageConfig: SolutionsPageConfig = {
  heroBgImage: "/application.png",
  heroTagline: "ENGINEERED SAFETY & INDUSTRIAL INFRASTRUCTURE",
  heroTitle: "MIDDLE EAST SAFETY SOLUTIONS",
  heroDescription: "Eastwind Arabia supplies high-compliance fire fighting, respiratory protection, wireless gas detection, and process instrumentation modules across Saudi Arabia and the GCC.",
  industriesTagline: "Operating Environments",
  industriesTitle: "Solutions By Operating Industry",
  industriesDesc: "Industrial sectors feature highly specific chemical, thermal, and spatial risks. We build multi-layered mitigation loops engineered to perform reliably inside harsh conditions.",
  industries: [
    {
      id: "oil-gas",
      name: "Oil & Gas",
      riskKicker: "HAZARDOUS ATMOSPHERE | ATEX ZONE 0 & ZONE 1",
      accent: "#c22026",
      image: "/predictive_intelligence.webp",
      description: "Securing petrochemical extraction, transport infrastructure, and downstream refining loops through intrinsically safe telemetry, explosion isolation, and toxic gas environment management."
    },
    {
      id: "petrochemical",
      name: "Petrochemicals",
      riskKicker: "PROCESS HAZARD CONTROL | ZONE 1 & ZONE 2",
      accent: "#f59e0b",
      image: "/industrial_digitalization.webp",
      description: "Optimising downstream chemical refining ecosystems with real-time Physics-Informed ML, predictive anomaly diagnostics, and high-fidelity wireless telemetry layers."
    },
    {
      id: "civil-defense",
      name: "Civil Defense",
      riskKicker: "TACTICAL EMERGENCY INCIDENT COMMAND",
      accent: "#ef4444",
      image: "/emergency_vehicle.webp",
      description: "Equipping public safety, civil protection, and regional defense forces with heavy tactical command apparatus, specialized life-support vehicles, and optimized foam suppression networks."
    },
    {
      id: "marine",
      name: "Marine & Offshore",
      riskKicker: "OFFSHORE ARCHITECTURE | ABS & DNV COMPLIANT",
      accent: "#1e3e8f",
      image: "/thermal_ehouse.webp",
      description: "Providing deepwater infrastructure defense, automated hull breach stabilization tracking, and extreme salt-atmosphere corrosive protection systems."
    },
    {
      id: "utility-power",
      name: "Utility & Power",
      riskKicker: "CRITICAL GRID SAFETY MARGIN | IEEE & IEC CERTIFIED",
      accent: "#10b981",
      image: "/wireless_monitoring.webp",
      description: "Hardening continental power distribution grids, high-output electrical substations, and water transformation architectures through high-noise immune telemetry and physical containment monitoring."
    }
  ],
  capabilitiesTagline: "Core Expertise",
  capabilitiesTitle: "Core Capabilities Portfolio",
  capabilitiesDesc: "Eastwind executes complex, multi-disciplinary workflows through structural, instrumentation, and fire safety engineering domains to assure unified system performance.",
  corePortfolios: [
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
  ],
  partnersTagline: "Global Integration",
  partnersTitle: "Integrated Technology Partners",
  partnersDesc: "We securely assimilate components from verified global market leaders into unified, field-ready physical frameworks.",
  partners: [
    "Dräger", "Empel", "Nardi", "Mimes", "One Seven", "Sieon", "Xshielder",
    "Nittan", "FlamePro", "E2S", "Schneider", "CRI", "CEJN", "Polyhose",
    "Keiconnections", "Leader", "Tridiagonal", "Phoenix", "Pepperl+Fuchs",
    "Guttor", "Paratech", "Panam", "Atexxor", "Thermocable"
  ],
  gatewayTagline: "Enquiry Gateway",
  gatewayTitle: "Initiate Solution Proposal Request",
  gatewayDesc: "Our regional infrastructure engineering office coordinates directly with technical site operators to map out field constraints, balance topologies, and deploy high-compliance certified safety systems.",
  solutionScopeOptions: [
    { value: "ai-digitalization", label: "AI, Digitalisation & Data" },
    { value: "firefighting", label: "Tactical Response Fleet Systems" },
    { value: "gas-detection", label: "Fire & Gas Topology Loops" },
    { value: "suppression", label: "Extinguishing & Simulator Skids" },
    { value: "wireless", label: "Industrial Wireless Mesh Networks" },
    { value: "services", label: "Specialised Field Services" }
  ],
  submitButtonText: "Submit Request"
};

const defaultIndustrySolutionsMap: Record<string, { name: string; items: string[] }[]> = {
  "oil-gas": [
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
  ],
  "oil-and-gas": [
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
  ],
  "smart-industrial-facilities": [
    {
      name: "Factory Digitalization & IIoT",
      items: ["Smart factories", "Plant Ai", "Wireless data acquisition"]
    },
    {
      name: "Wireless Systems & Gas Safety",
      items: ["SIL2 wireless gas detection systems", "ISA 100, LUARA, HART, Wireless systems"]
    },
    {
      name: "Emergency Response & Operations",
      items: ["Emergency response solution", "Plant OPS"]
    }
  ],
  "petrochemical": [
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
  ],
  "civil-defence": [
    {
      name: "Fleet & Specialized Vehicles",
      items: ["Asset management systems AI integrated fire trucks", "Rescue intervention truck (RIV)", "SCBA trucks", "CBRN Vehicles"]
    },
    {
      name: "Extinguishing & Incident Response",
      items: ["Compressed air form system (CAFS)", "Emergency response system"]
    }
  ],
  "civil-defense": [
    {
      name: "Fleet & Specialized Vehicles",
      items: ["Asset management systems AI integrated fire trucks", "Rescue intervention truck (RIV)", "SCBA trucks", "CBRN Vehicles"]
    },
    {
      name: "Extinguishing & Incident Response",
      items: ["Compressed air form system (CAFS)", "Emergency response system"]
    }
  ],
  "marine-operations": [
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
  ],
  "marine": [
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
  ],
  "utilities-and-power": [
    {
      name: "Grid Telemetry & Sampling",
      items: ["Sampling systems", "Wireless infrastructure", "Smart Facility", "Digital mobility Xshilder"]
    },
    {
      name: "Thermal & Physical Containment",
      items: ["Analyzer shelters", "Explosion proof design consultancy"]
    }
  ],
  "utility-power": [
    {
      name: "Grid Telemetry & Infrastructure",
      items: ["Sampling systems", "Wireless infrastructure", "Smart Facility", "Digital mobility Xshilder"]
    }
  ],
  "defence-and-border-security": [
    {
      name: "Secure Telemetry & Modules",
      items: ["Wireless data acquisition", "Digital mobility Xshielder", "TGR"]
    },
    {
      name: "Blast Isolation & Tactical Shielding",
      items: ["LER", "Analyzer shelters", "Explosion proof design consultancy"]
    }
  ],
  "defense": [
    {
      name: "Secure Telemetry & Modules",
      items: ["Wireless data acquisition", "Digital mobility Xshielder", "TGR"]
    },
    {
      name: "Blast Isolation & Tactical Shielding",
      items: ["LER", "Analyzer shelters", "Explosion proof design consultancy"]
    }
  ]
};

function getMatchingIndustryId(catParam: string | null, industries: IndustryData[]): string | null {
  if (!catParam) return null;
  const clean = catParam.toLowerCase().trim();

  // 1. Direct ID match
  const direct = industries.find((ind) => ind.id.toLowerCase() === clean);
  if (direct) return direct.id;

  // 2. Alias / Partial matches
  if (clean.includes("oil")) {
    return industries.find((ind) => ind.id.toLowerCase().includes("oil"))?.id || "oil-gas";
  }
  if (clean.includes("smart") || clean.includes("facility") || clean.includes("petro")) {
    return (
      industries.find((ind) => {
        const id = ind.id.toLowerCase();
        const name = ind.name.toLowerCase();
        return id.includes("smart") || id.includes("petro") || name.includes("smart") || name.includes("petro");
      })?.id || "petrochemical"
    );
  }
  if (clean.includes("civil")) {
    return industries.find((ind) => ind.id.toLowerCase().includes("civil"))?.id || "civil-defense";
  }
  if (clean.includes("marine") || clean.includes("offshore")) {
    return industries.find((ind) => ind.id.toLowerCase().includes("marine") || ind.id.toLowerCase().includes("offshore"))?.id || "marine";
  }
  if (clean.includes("util") || clean.includes("power")) {
    return industries.find((ind) => ind.id.toLowerCase().includes("util") || ind.id.toLowerCase().includes("power"))?.id || "utility-power";
  }
  if (clean.includes("defen") || clean.includes("security")) {
    return industries.find((ind) => ind.id.toLowerCase().includes("defen") || ind.id.toLowerCase().includes("security"))?.id || "defense";
  }

  // 3. Name match
  const nameMatch = industries.find(
    (ind) => ind.name.toLowerCase().includes(clean) || clean.includes(ind.name.toLowerCase())
  );
  if (nameMatch) return nameMatch.id;

  return null;
}

function SolutionsPageContent() {
  const searchParams = useSearchParams();
  const urlCat = searchParams.get("cat") || searchParams.get("id") || searchParams.get("tab") || searchParams.get("category");

  const [pageConfig, setPageConfig] = useState<SolutionsPageConfig>(defaultPageConfig);
  const [activeTab, setActiveTab] = useState<string>(() => {
    const matched = getMatchingIndustryId(urlCat, defaultPageConfig.industries);
    return matched || "oil-gas";
  });
  const [hoveredSolution, setHoveredSolution] = useState<string | null>(null);
  const [solutionsList, setSolutionsList] = useState<any[]>([]);

  useEffect(() => {
    if (urlCat && pageConfig.industries.length > 0) {
      const matched = getMatchingIndustryId(urlCat, pageConfig.industries);
      if (matched) {
        setActiveTab(matched);
      }
    }
  }, [urlCat, pageConfig.industries]);

  useEffect(() => {
    async function loadData() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        
        // Fetch Solutions Page Configuration with cache-busting
        const pageRes = await fetch(`${baseUrl}/api/solutions-page?t=${Date.now()}`, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache"
          }
        });
        if (pageRes.ok) {
          const data = await pageRes.json();
          const loadedIndustries = data.industries && data.industries.length > 0 ? data.industries : defaultPageConfig.industries;
          setPageConfig({
            heroBgImage: data.heroBgImage || defaultPageConfig.heroBgImage,
            heroTagline: data.heroTagline || defaultPageConfig.heroTagline,
            heroTitle: data.heroTitle || defaultPageConfig.heroTitle,
            heroDescription: data.heroDescription || defaultPageConfig.heroDescription,
            industriesTagline: data.industriesTagline || defaultPageConfig.industriesTagline,
            industriesTitle: data.industriesTitle || defaultPageConfig.industriesTitle,
            industriesDesc: data.industriesDesc || defaultPageConfig.industriesDesc,
            industries: loadedIndustries,
            capabilitiesTagline: data.capabilitiesTagline || defaultPageConfig.capabilitiesTagline,
            capabilitiesTitle: data.capabilitiesTitle || defaultPageConfig.capabilitiesTitle,
            capabilitiesDesc: data.capabilitiesDesc || defaultPageConfig.capabilitiesDesc,
            corePortfolios: data.corePortfolios && data.corePortfolios.length > 0 ? data.corePortfolios : defaultPageConfig.corePortfolios,
            partnersTagline: data.partnersTagline || defaultPageConfig.partnersTagline,
            partnersTitle: data.partnersTitle || defaultPageConfig.partnersTitle,
            partnersDesc: data.partnersDesc || defaultPageConfig.partnersDesc,
            partners: data.partners && data.partners.length > 0 ? data.partners : defaultPageConfig.partners,
            gatewayTagline: data.gatewayTagline || defaultPageConfig.gatewayTagline,
            gatewayTitle: data.gatewayTitle || defaultPageConfig.gatewayTitle,
            gatewayDesc: data.gatewayDesc || defaultPageConfig.gatewayDesc,
            solutionScopeOptions: data.solutionScopeOptions && data.solutionScopeOptions.length > 0 ? data.solutionScopeOptions : defaultPageConfig.solutionScopeOptions,
            submitButtonText: data.submitButtonText || defaultPageConfig.submitButtonText,
          });

          const matched = getMatchingIndustryId(urlCat, loadedIndustries);
          if (matched) {
            setActiveTab(matched);
          } else if (!urlCat) {
            setActiveTab(loadedIndustries[0].id);
          }
        }

        // Fetch Individual Solutions Catalog
        const solRes = await fetch(`${baseUrl}/api/solutions`);
        if (solRes.ok) {
          const list = await solRes.json();
          setSolutionsList(list);
        }
      } catch (err) {
        console.error("Failed to load solutions page configuration:", err);
      }
    }
    loadData();
  }, [urlCat]);

  const activeIndustry = pageConfig.industries.find((ind) => ind.id === activeTab) || pageConfig.industries[0] || defaultPageConfig.industries[0];

  const activeIndustrySolutions = solutionsList.filter((sol) => {
    const apps = (sol.applications || []).map((a: string) => a.toLowerCase());
    const cleanTab = activeTab.toLowerCase();

    if (cleanTab.includes("oil")) return apps.some((a: string) => a.includes("oil") || a.includes("gas"));
    if (cleanTab.includes("smart") || cleanTab.includes("petro") || cleanTab.includes("facility")) return apps.some((a: string) => a.includes("petro") || a.includes("smart") || a.includes("facility"));
    if (cleanTab.includes("civil")) return apps.some((a: string) => a.includes("civil") || a.includes("defense"));
    if (cleanTab.includes("marine") || cleanTab.includes("offshore")) return apps.some((a: string) => a.includes("marine") || a.includes("offshore"));
    if (cleanTab.includes("util") || cleanTab.includes("power")) return apps.some((a: string) => a.includes("util") || a.includes("power"));
    if (cleanTab.includes("defen") || cleanTab.includes("security")) return apps.some((a: string) => a.includes("defen") || a.includes("security"));

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

  const fallbackDefaults =
    defaultIndustrySolutionsMap[activeIndustry.id] ||
    defaultIndustrySolutionsMap[activeTab] ||
    (activeTab.includes("civil") ? defaultIndustrySolutionsMap["civil-defence"] :
     activeTab.includes("smart") || activeTab.includes("petro") ? defaultIndustrySolutionsMap["smart-industrial-facilities"] :
     activeTab.includes("marine") ? defaultIndustrySolutionsMap["marine-operations"] :
     activeTab.includes("util") || activeTab.includes("power") ? defaultIndustrySolutionsMap["utilities-and-power"] :
     activeTab.includes("defen") || activeTab.includes("security") ? defaultIndustrySolutionsMap["defence-and-border-security"] :
     defaultIndustrySolutionsMap["oil-and-gas"]);

  const displaySolutions = Object.keys(groupedSolutions).length > 0 
    ? Object.entries(groupedSolutions).map(([name, items]) => ({
        name,
        items: items.map((i) => ({ name: i.title, id: i.id }))
      }))
    : fallbackDefaults.map((s) => ({
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
        
        {/* Ambient Glow System */}
        <div className="absolute top-[20%] left-1/4 w-[500px] h-[500px] rounded-full bg-[#1e3e8f]/5 blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-[30%] right-1/4 w-[600px] h-[600px] rounded-full bg-[#ff2228]/4 blur-[140px] pointer-events-none z-0" />
        <div className="industrial-grid absolute inset-0 opacity-[0.015] pointer-events-none z-0" />

        {/* Dynamic Hero Section */}
        <section className="relative pt-[220px] pb-[160px] overflow-hidden border-b border-white/5 min-h-[600px] flex items-center bg-slate-950 w-full z-10">
          <img
            src={pageConfig.heroBgImage}
            alt={pageConfig.heroTitle}
            className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none brightness-[0.85] scale-101 z-0"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#080c14]/90 via-[#080c14]/65 to-[#080c14]/15 max-md:from-[#080c14]/90 max-md:to-[#080c14]/65 z-10" />
          <div className="industrial-grid absolute inset-0 opacity-[0.02] pointer-events-none z-10" />

          <div className="max-w-[1400px] w-full mx-auto px-10 max-sm:px-5 relative z-20">
            <div className="max-w-[750px] space-y-4">
              <span className="inline-block text-[#c22026] text-xs font-bold uppercase tracking-[0.25em]">
                {pageConfig.heroTagline}
              </span>
              <h1 className="text-[2.6rem] max-md:text-[2.1rem] max-sm:text-[1.8rem] leading-[1.15] uppercase font-extrabold tracking-tight text-white m-0">
                {pageConfig.heroTitle}
              </h1>
              <p className="text-[0.95rem] text-slate-200 leading-relaxed font-light m-0">
                {pageConfig.heroDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Section 1: Solution Mapping Area */}
        <section id="industry-solutions" className="py-24 max-w-[1400px] mx-auto px-10 max-sm:px-5 z-10 relative">
          
          <div className="border-b border-slate-200/60 pb-12 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c22026]">{pageConfig.industriesTagline}</span>
              <h2 className="text-3xl font-extrabold uppercase text-slate-900 tracking-tight">{pageConfig.industriesTitle}</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md">
              {pageConfig.industriesDesc}
            </p>
          </div>

          {/* Premium Fluid Segmented Switch */}
          <div className="flex overflow-x-auto no-scrollbar md:flex-wrap p-1.5 bg-slate-100/80 border border-slate-200/60 backdrop-blur-md rounded-xl gap-1 max-w-4xl mx-auto mb-16 relative z-20 max-sm:justify-start shadow-sm">
            {pageConfig.industries.map((ind) => {
              const isActive = activeTab === ind.id;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveTab(ind.id)}
                  className="flex items-center justify-center gap-2.5 py-3 px-5 text-xs font-mono uppercase tracking-wider transition-all duration-300 rounded-lg relative flex-1 min-w-[140px] shrink-0 cursor-pointer"
                >
                  <span className={`relative z-10 flex items-center gap-2 ${isActive ? 'text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-800'}`}>
                    <span>{ind.name}</span>
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="spatialActiveTabHighlight"
                      className="absolute inset-0 bg-white border border-slate-200/80 rounded-lg shadow-sm"
                      style={{ borderBottom: `2px solid ${activeIndustry.accent || '#c22026'}` }}
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
              
              {/* Left Wing: Overview Card */}
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
                    style={{ borderColor: `${activeIndustry.accent || '#c22026'}50`, color: activeIndustry.accent || '#c22026' }}
                  >
                    <span>{activeIndustry.riskKicker}</span>
                  </div>
                </div>

                {/* Sub-system Narrative Container */}
                <div className="p-6 bg-white border border-slate-200/60 rounded-xl flex-grow flex flex-col justify-center space-y-3 relative overflow-hidden shadow-3xs">
                  <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: activeIndustry.accent || '#c22026' }} />
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
                        backgroundImage: isHovered ? `radial-gradient(circle at 10% 10%, ${activeIndustry.accent || '#c22026'}0f, transparent 70%)` : 'none'
                      }}
                    >
                      <div className="space-y-4 relative z-10">
                        <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                          <h4 
                            className="text-xs font-mono font-bold text-slate-850 uppercase tracking-wider transition-colors duration-300"
                            style={{ color: isHovered ? activeIndustry.accent || '#c22026' : '' }}
                          >
                            {sol.name}
                          </h4>
                        </div>
                        
                        <ul className="space-y-3 pl-0 list-none m-0">
                          {sol.items.map((item: any, itemIdx: number) => {
                            const isService = ["hse-consultancy", "explosion-proof-design"].includes(item.id || "");
                            const isProduct = ["fire-truck", "one-seven-cafs", "sione-hood", "gas-detector", "smoke-detector", "heat-detector", "temp-transmitter", "pressure-transmitter", "diving-chambers", "cascade-system", "scba-system", "nardi-compressor"].includes(item.id || "");
                            const path = item.id 
                              ? (isService ? `/services/${item.id}` : isProduct ? `/products/${item.id}` : `/solutions/${item.id}`)
                              : null;

                            return (
                              <li key={itemIdx} className="flex items-start gap-3 text-xs text-slate-650 group-hover:text-slate-800 transition-colors">
                                <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: activeIndustry.accent || '#c22026' }} />
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

        {/* Section 2: Framework Competence / Core Capabilities */}
        <section className="py-24 bg-[#f8fafc] border-t border-b border-slate-200/60 relative z-10">
          <div className="max-w-[1400px] mx-auto px-10 max-sm:px-5">
            
            <div className="mb-20 max-w-3xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em]">{pageConfig.capabilitiesTagline}</span>
              <h2 className="text-3xl font-extrabold uppercase text-slate-900 tracking-tight">{pageConfig.capabilitiesTitle}</h2>
              <p className="text-sm text-slate-600 leading-relaxed pt-2">
                {pageConfig.capabilitiesDesc}
              </p>
            </div>

            {/* Spatial Grid Framework Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {pageConfig.corePortfolios.map((portfolio, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white border border-slate-200 hover:border-slate-350 transition-all duration-300 rounded-xl group flex flex-col justify-between relative overflow-hidden shadow-3xs hover:shadow-md"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
                      <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-sm shadow-inner group-hover:scale-110 transition-transform duration-300">
                        {portfolio.icon || "⚡"}
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

        {/* Section 3: Tech Ecosystem / Technology Partners */}
        <section className="py-24 max-w-[1400px] mx-auto px-10 max-sm:px-5 z-10 relative">
          
          <div className="mb-14 text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c22026]">{pageConfig.partnersTagline}</span>
            <h2 className="text-2xl font-extrabold uppercase text-slate-900 tracking-tight">{pageConfig.partnersTitle}</h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              {pageConfig.partnersDesc}
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-w-5xl mx-auto">
            {pageConfig.partners.map((partner) => (
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
                  {pageConfig.gatewayTagline}
                </span>
                <h3 className="text-[2.2rem] max-md:text-[1.8rem] max-sm:text-[1.45rem] font-extrabold uppercase text-slate-900 tracking-tight leading-none m-0">
                  {pageConfig.gatewayTitle}
                </h3>
                <p className="text-sm max-sm:text-xs text-slate-500 font-normal leading-relaxed m-0">
                  {pageConfig.gatewayDesc}
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
                        {pageConfig.industries.map((ind) => (
                          <option key={ind.id} value={ind.id}>
                            {ind.name}
                          </option>
                        ))}
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
                        {pageConfig.solutionScopeOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
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
                    {pageConfig.submitButtonText}
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

export default function SolutionsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-sm font-mono">
        Loading Solutions...
      </div>
    }>
      <SolutionsPageContent />
    </Suspense>
  );
}