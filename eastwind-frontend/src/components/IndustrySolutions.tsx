"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import InteractivePortfolioSection, { PortfolioItem } from "./InteractivePortfolioSection";

interface IndustryItem extends PortfolioItem {
  num: string;
  riskFactor: string;
  accent: string;
  accentLight: string;
  accentBorder: string;
  icon: React.ReactNode;
}

const initialIndustries: IndustryItem[] = [
  {
    id: "oil-gas",
    name: "Oil & Gas",
    category: "Intelligent Hydrocarbon Operations",
    imageTone: "blue",
    overview: ["From upstream wellheads to downstream refineries, we deploy intrinsically safe instrumentation, wireless gas loops, and predictive AI analytics to prevent catastrophes and ensure continuous uptime."],
    features: ["End-to-End ISA 100 wireless gas detection", "Plant Operations (Plant OPS)", "TGR (temporary refuge chamber)"],
    applications: ["CLASSIFICATION: ZONE 0 HAZARDS"],
    benefits: [{ value: "0.8s", label: "Hazard Propagation Detection Latency" }],
    num: "01",
    riskFactor: "CLASSIFICATION: ZONE 0 HAZARDS",
    accent: "#1e3e8f",
    accentLight: "rgba(30,62,143,0.06)",
    accentBorder: "rgba(30,62,143,0.22)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z" />
      </svg>
    ),
    solutions: [
      { name: "End-End ISA 100 Wireless Gas Detection", href: "/solutions/oil-and-gas" },
      { name: "Plant Operations (Plant OPS)", href: "/solutions/oil-and-gas" },
      { name: "TGR(temporary refuge chamber)", href: "/solutions/oil-and-gas" },
      { name: "Tank farm fire fighting", href: "/solutions/oil-and-gas" },
      { name: "LER & Analyzer shelters", href: "/solutions/oil-and-gas" },
      { name: "Digital mobility-x shielder", href: "/solutions/oil-and-gas" },
    ],
  },
  {
    id: "offshore",
    name: "Marine Operations",
    category: "Harsh Deepwater Infrastructure Resilience",
    imageTone: "orange",
    overview: ["Offshore platforms and marine vessels face extreme salt atmospheres and remote operating conditions. We provide robust damage control systems, air loops, and high-expansion foam systems for rapid extinguishing."],
    features: ["One Seven Deck CAFS Systems", "TGR Acoustic Emission Sensors", "Xshielder Industrial Cybersecurity"],
    applications: ["CLASSIFICATION: EXPLOSIVE DECK HAZARDS"],
    benefits: [{ value: "99.85%", label: "Remote Telemetry Link Uptime" }],
    num: "02",
    riskFactor: "CLASSIFICATION: EXPLOSIVE DECK HAZARDS",
    accent: "#b45309",
    accentLight: "rgba(180,83,9,0.06)",
    accentBorder: "rgba(180,83,9,0.22)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20h20M6 20v-8h12v8M12 12V4h6v8M4 20l4-4M20 20l-4-4" />
      </svg>
    ),
    solutions: [
      { name: "Damage Control Systems", href: "/solutions/marine-offshore" },
      { name: "Wireless Data Acquisition", href: "/solutions/marine-offshore" },
      { name: "H2S Shelter Rental & Air Loops", href: "/solutions/marine-offshore" },
      { name: "Temporary Refuge Chambers (TGR)", href: "/solutions/marine-offshore" },
      { name: "Decompression Chambers", href: "/solutions/marine-offshore" },
      { name: "Air Loops & Breathing Air Cascades", href: "/solutions/marine-offshore" },
    ],
  },
  {
    id: "utilities",
    name: "Utilities & Power",
    category: "Critical Grid Asset Safeguarding",
    imageTone: "blue",
    overview: ["Securing electrical substations, gas pipelines, and water treatment systems. We deploy structural integrity modules, distributed cyber-physical safety systems, and automated thermal monitoring."],
    features: ["E-House Blast-Rated Substations", "Thermal Anomaly Infrared Cameras", "MIMES Wireless Substation Network"],
    applications: ["CLASSIFICATION: GRID INTERDEPENDENCY"],
    benefits: [{ value: "0.2s", label: "Automatic Transformer Trip-Out Isolation" }],
    num: "03",
    riskFactor: "CLASSIFICATION: GRID INTERDEPENDENCY",
    accent: "#1e3e8f",
    accentLight: "rgba(30,62,143,0.06)",
    accentBorder: "rgba(30,62,143,0.22)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    solutions: [
      { name: "Sampling Systems (SWAS)", href: "/solutions/utility-power" },
      { name: "Wireless Infrastructure", href: "/solutions/utility-power" },
      { name: "Smart Facilities", href: "/solutions/utility-power" },
      { name: "Digital Mobility (Xshielder)", href: "/solutions/utility-power" },
    ],
  },
  {
    id: "defense",
    name: "Defense & Border Security",
    category: "National Level Asset Hardening",
    imageTone: "orange",
    overview: ["Providing high-grade perimeter defense, secure wireless telemetry backbones, and blast-resistant modular security offices that adhere to Saudi Military Security Standards."],
    features: ["HCIS Approved Fencing Integrations", "Blast-Resistant Modular Guard Shelters", "Xshielder Tactical Cyber Defense"],
    applications: ["CLASSIFICATION: HIGH-GRADE SECURITY"],
    benefits: [{ value: "100%", label: "HCIS SEC-02 Compliance Certification" }],
    num: "04",
    riskFactor: "CLASSIFICATION: HIGH-GRADE SECURITY",
    accent: "#b45309",
    accentLight: "rgba(180,83,9,0.06)",
    accentBorder: "rgba(180,83,9,0.22)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    solutions: [
      { name: "Secure Wireless Telemetry", href: "/solutions/civil-defense" },
      { name: "Blast-Resistant Guard Shelters", href: "/solutions/civil-defense" },
      { name: "Tactical Cyber Defense", href: "/solutions/civil-defense" },
      { name: "HCIS Approved Fencing", href: "/solutions/civil-defense" },
    ],
  },
  {
    id: "civil-defense",
    name: "Civil Defense",
    category: "Metropolitan Safety Infrastructure",
    imageTone: "red",
    overview: ["Equipping fire departments and municipal services with state-of-the-art emergency command systems, high-efficiency water-saving CAFS vehicles, and smart responder telemetry."],
    features: ["Rosenbauer Specialized Cabins", "One Seven CAFS Tactical Systems", "Intrinsically Safe Crew Telemetry"],
    applications: ["CLASSIFICATION: URBAN HAZARD MITIGATION"],
    benefits: [{ value: "-80%", label: "Water Usage Reduction in Extinguishing" }],
    num: "05",
    riskFactor: "CLASSIFICATION: URBAN HAZARD MITIGATION",
    accent: "#991b1b",
    accentLight: "rgba(153,27,27,0.06)",
    accentBorder: "rgba(153,27,27,0.22)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
    solutions: [
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
    category: "Automated Facility Health & Security",
    imageTone: "red",
    overview: ["Deploying enterprise digital twins, automated AI permit-to-work checklists, and wireless acoustic leak sensors inside modern petrochemical plants and factories to maximize safety."],
    features: ["Tridiagonal Machine Learning Diagnostics", "Nardi Compressed Gases Systems", "Smart Digital Permit-to-Work Tracking"],
    applications: ["CLASSIFICATION: PROCESS RELIABILITY"],
    benefits: [{ value: "42%", label: "Preventive Maintenance Cost Reduction" }],
    num: "06",
    riskFactor: "CLASSIFICATION: PROCESS RELIABILITY",
    accent: "#991b1b",
    accentLight: "rgba(153,27,27,0.06)",
    accentBorder: "rgba(153,27,27,0.22)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 21H2V3l7 4v3l7-4v3l6-4v18z M17 14h2v2h-2z M12 14h2v2h-2z M7 14h2v2h-2z" />
      </svg>
    ),
    solutions: [
      { name: "Smart Factories", href: "/solutions/petrochemicals" },
      { name: "Plant AI Diagnostics", href: "/solutions/petrochemicals" },
      { name: "Wireless Data Acquisition", href: "/solutions/petrochemicals" },
      { name: "SIL2 Wireless Gas Detection", href: "/solutions/petrochemicals" },
      { name: "Wireless Systems (ISA100, LoRa)", href: "/solutions/petrochemicals" },
      { name: "Emergency Response Solutions", href: "/solutions/petrochemicals" },
    ],
  },
];

// ─── Telemetry Hub Visual ────────────────────────────────────────────────────

function TelemetryHubVisual({
  activeId,
  setActiveId,
  items,
}: {
  activeId: string;
  setActiveId: (id: string) => void;
  items: PortfolioItem[];
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const nodeCoords = [
    { x: 520, y: 280 },
    { x: 410, y: 393 },
    { x: 190, y: 393 },
    { x: 80,  y: 280 },
    { x: 190, y: 167 },
    { x: 410, y: 167 },
  ] as const;

  return (
    <div
      className="relative w-full h-full flex justify-center items-center rounded-[24px] overflow-hidden min-h-[190px]"
      style={{
        background: "linear-gradient(150deg, #ffffff 0%, #f4f7fd 50%, #edf1fa 100%)",
        border: "1px solid rgba(255,255,255,0.95)",
        boxShadow:
          "0 0 0 1px rgba(30,62,143,0.08), 0 16px 40px -12px rgba(30,62,143,0.14), 0 1px 2px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1)",
      }}
    >
      {/* Subtle inner color grading overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 10%, rgba(56,130,243,0.06) 0%, transparent 50%), radial-gradient(ellipse at 10% 90%, rgba(226,232,245,0.5) 0%, transparent 50%)",
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(30,62,143,0.07) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Top accent rule */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[24px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, rgba(30,62,143,0.25) 40%, rgba(180,83,9,0.18) 70%, transparent 90%)",
        }}
      />

      <div className="relative w-full max-w-[780px] aspect-[800/370] h-auto p-2">
        <svg viewBox="-100 95 800 370" className="w-full h-full overflow-visible">
          <defs>
            <radialGradient id="hubGradientPremium" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#f4f7fd" />
              <stop offset="100%" stopColor="#e8eef8" />
            </radialGradient>
            <radialGradient id="hubRingGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(30,62,143,0.12)" />
              <stop offset="100%" stopColor="rgba(30,62,143,0.03)" />
            </radialGradient>
            <filter id="hubShadowPremium" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="8" floodColor="rgba(30,62,143,0.12)" />
            </filter>
            <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="inactiveNodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#eef2fc" />
            </linearGradient>
          </defs>

          {/* Guide lines */}
          <line x1="300" y1="100" x2="300" y2="460" stroke="rgba(30,62,143,0.04)" strokeWidth="1" strokeDasharray="3 9" />
          <line x1="50"  y1="280" x2="550" y2="280" stroke="rgba(30,62,143,0.04)" strokeWidth="1" strokeDasharray="3 9" />

          {/* Orbit rings */}
          <ellipse cx="300" cy="280" rx="260" ry="155" stroke="rgba(30,62,143,0.03)" fill="none" strokeWidth="1" />
          <ellipse cx="300" cy="280" rx="220" ry="130" stroke="rgba(30,62,143,0.07)" fill="none" strokeWidth="1" strokeDasharray="5 8" />
          <ellipse cx="300" cy="280" rx="150" ry="90"  stroke="rgba(30,62,143,0.04)" fill="none" strokeWidth="1" />

          {/* Animated orbit particles */}
          <circle r="2.5" fill="rgba(30,62,143,0.30)">
            <animateMotion dur="18s" repeatCount="indefinite" path="M 80,280 A 220,130 0 1,0 520,280 A 220,130 0 1,0 80,280" />
          </circle>
          <circle r="2" fill="rgba(180,83,9,0.28)">
            <animateMotion dur="26s" repeatCount="indefinite" begin="-9s" path="M 80,280 A 220,130 0 1,0 520,280 A 220,130 0 1,0 80,280" />
          </circle>
          <circle r="1.5" fill="rgba(153,27,27,0.22)">
            <animateMotion dur="32s" repeatCount="indefinite" begin="-15s" path="M 80,280 A 220,130 0 1,1 520,280 A 220,130 0 1,1 80,280" />
          </circle>

          {/* Connector lines */}
          {items.map((indItem, idx) => {
            const ind = indItem as IndustryItem;
            const lit = activeId === ind.id || hoveredId === ind.id;
            const coords = nodeCoords[idx];
            return (
              <line
                key={`line-${ind.id}`}
                x1="300" y1="280" x2={coords.x} y2={coords.y}
                stroke={lit ? ind.accent : "rgba(30,62,143,0.08)"}
                strokeWidth={lit ? "2" : "1"}
                strokeDasharray={lit ? "4 4" : "none"}
                opacity={lit ? 1 : 0.7}
                style={{ transition: "stroke 300ms, stroke-width 300ms, opacity 300ms" }}
              />
            );
          })}

          {/* Hub outer pulse ring */}
          <circle cx="300" cy="280" r="72" fill="none" stroke="url(#hubRingGrad)" strokeWidth="1.5" />
          {/* Hub backdrop rings */}
          <circle cx="300" cy="280" r="66" fill="rgba(255,255,255,0.55)" stroke="rgba(30,62,143,0.06)" strokeWidth="1" />
          <circle cx="300" cy="280" r="58"
            fill="url(#hubGradientPremium)"
            stroke="rgba(30,62,143,0.18)"
            strokeWidth="1.5"
            filter="url(#hubShadowPremium)"
          />
          {/* Hub inner accent ring */}
          <circle cx="300" cy="280" r="52" fill="none" stroke="rgba(30,62,143,0.07)" strokeWidth="1" strokeDasharray="3 5" />

          {/* Hub labels */}
          <text x="300" y="258" textAnchor="middle" fontSize="7.5" fontFamily="monospace" fontWeight="800" letterSpacing="2.5" fill="rgba(30,62,143,0.28)">INDUSTRIAL</text>
          <text x="300" y="273" textAnchor="middle" fontSize="7.5" fontFamily="monospace" fontWeight="800" letterSpacing="2.5" fill="rgba(30,62,143,0.28)">INTELLIGENCE</text>
          <text x="300" y="291" textAnchor="middle" fontSize="8" fontFamily="monospace" fontWeight="900" letterSpacing="3" fill="rgba(30,62,143,0.70)">PLATFORM</text>

          {/* Node circles */}
          {items.map((indItem, idx) => {
            const ind = indItem as IndustryItem;
            const lit = activeId === ind.id || hoveredId === ind.id;
            const coords = nodeCoords[idx];
            return (
              <g
                key={`node-${ind.id}`}
                onClick={() => setActiveId(ind.id)}
                onMouseEnter={() => setHoveredId(ind.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="cursor-pointer"
              >
                {/* Hit area */}
                <circle cx={coords.x} cy={coords.y} r="52" fill="transparent" />

                {/* Outer pulse ring */}
                {lit && (
                  <circle
                    cx={coords.x} cy={coords.y} r="34"
                    fill="none"
                    stroke={ind.accent}
                    strokeWidth="1.5"
                    opacity="0.12"
                  />
                )}

                {/* Mid ring on hover */}
                {lit && (
                  <circle
                    cx={coords.x} cy={coords.y} r="28"
                    fill="none"
                    stroke={ind.accent}
                    strokeWidth="1"
                    opacity="0.22"
                    strokeDasharray="3 4"
                  />
                )}

                {/* Main node circle */}
                <circle
                  cx={coords.x} cy={coords.y} r="22"
                  fill={lit ? "#ffffff" : "url(#inactiveNodeGrad)"}
                  stroke={lit ? ind.accent : "rgba(30,62,143,0.12)"}
                  strokeWidth={lit ? "2" : "1.5"}
                  style={{
                    transition: "all 0.3s ease",
                    filter: lit
                      ? `drop-shadow(0 4px 12px ${ind.accent}25)`
                      : "drop-shadow(0 2px 4px rgba(30,62,143,0.08))",
                  }}
                />

                {/* Node inner accent fill */}
                {lit && (
                  <circle
                    cx={coords.x} cy={coords.y} r="22"
                    fill={ind.accentLight}
                  />
                )}

                {/* Icon */}
                <g
                  transform={`translate(${coords.x - 9}, ${coords.y - 9})`}
                  style={{
                    color: lit ? ind.accent : "#000000",
                    transition: "color 300ms",
                  }}
                >
                  {ind.icon}
                </g>
              </g>
            );
          })}
        </svg>

        {/* Node labels */}
        <div className="absolute inset-0 pointer-events-none select-none hidden md:block">
          {items.map((indItem, idx) => {
            const ind = indItem as IndustryItem;
            const lit = activeId === ind.id || hoveredId === ind.id;

            let labelStyle: React.CSSProperties = {};
            switch (idx) {
              case 0: labelStyle = { left: "calc(77.5% + 28px)", top: "50%", transform: "translateY(-50%)", textAlign: "left" }; break;
              case 1: labelStyle = { left: "calc(63.75% + 18px)", top: "calc(80.5% + 10px)", textAlign: "left" }; break;
              case 2: labelStyle = { right: "calc(100% - 36.25% + 18px)", top: "calc(80.5% + 10px)", textAlign: "right" }; break;
              case 3: labelStyle = { right: "calc(100% - 22.5% + 28px)", top: "50%", transform: "translateY(-50%)", textAlign: "right" }; break;
              case 4: labelStyle = { right: "calc(100% - 36.25% + 18px)", bottom: "calc(100% - 19.5% + 10px)", textAlign: "right" }; break;
              case 5: labelStyle = { left: "calc(63.75% + 18px)", bottom: "calc(100% - 19.5% + 10px)", textAlign: "left" }; break;
            }
            return (
              <div
                key={`label-${ind.id}`}
                style={{
                  ...labelStyle,
                  color: lit ? ind.accent : "rgba(71,85,105,0.78)",
                  transition: "color 300ms",
                }}
                className="absolute pointer-events-auto cursor-pointer font-sans tracking-tight leading-tight max-w-[130px] text-[0.85rem] font-bold"
                onClick={() => setActiveId(ind.id)}
                onMouseEnter={() => setHoveredId(ind.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {ind.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Solution Cards ──────────────────────────────────────────────────────────

function SolutionCards({ activeItem }: { activeItem: IndustryItem }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [showMoreModal, setShowMoreModal] = useState<boolean>(false);

  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setShowMoreModal(false);
  }, [activeItem.id]);

  // Lock body & html scroll when modal is active to prevent page scrolling in the background
  useEffect(() => {
    if (showMoreModal) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [showMoreModal]);

  const solutions = activeItem.solutions || [];
  const displaySolutions = solutions.slice(0, 6);

  return (
    <div className="w-full h-full py-2 px-1 max-sm:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 auto-rows-max">
        {displaySolutions.map((solution, i) => {
          const isHovered = hoveredIdx === i;

          return (
            <a
              key={solution.name}
              href={solution.href}
              className="group relative overflow-hidden flex flex-col justify-between"
              style={{
                padding: "16px 16px 14px 20px",
                minHeight: "94px",
                borderRadius: "16px",
                // Crystalline card face — four-stop grade reads as polished material
                background: isHovered
                  ? "#ffffff"
                  : "linear-gradient(145deg, #ffffff 0%, #f9fbfe 40%, #f3f6fc 75%, #edf1f9 100%)",
                border: isHovered
                  ? `1px solid ${activeItem.accentBorder}`
                  : "1px solid rgba(203,215,235,0.6)",
                // Multi-layer depth: contact shadow + diffused halo + two inset highlights
                boxShadow: isHovered
                  ? `0 4px 16px rgba(30,62,143,0.10),
                     0 8px 32px rgba(30,62,143,0.07),
                     0 1px 3px rgba(0,0,0,0.05),
                     inset 0 1px 0 rgba(255,255,255,1),
                     inset 0 0 0 0.5px rgba(255,255,255,0.8)`
                  : `0 1px 2px rgba(30,62,143,0.04),
                     0 2px 8px rgba(30,62,143,0.03),
                     inset 0 1px 0 rgba(255,255,255,0.95),
                     inset 0 0 0 0.5px rgba(255,255,255,0.6)`,
                transform: isHovered ? "translateY(-3px)" : "translateY(0)",
                // Spring overshoot on lift — premium micro-interaction feel
                transition:
                  "transform 280ms cubic-bezier(.22,.68,0,1.2), box-shadow 280ms ease, background 280ms ease, border-color 280ms ease",
                textDecoration: "none",
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* ── Top sheen: light refraction line across the crown ── */}
              <div
                className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                style={{
                  borderRadius: "16px 16px 0 0",
                  background:
                    "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.92) 38%, rgba(255,255,255,0.72) 68%, transparent 95%)",
                }}
              />

              {/* ── Corner tonal grade — always-on, very subtle ── */}
              <div
                className="absolute inset-0 pointer-events-none rounded-[16px]"
                style={{
                  background:
                    "radial-gradient(ellipse at 100% 0%, rgba(226,234,250,0.45) 0%, transparent 55%)",
                }}
              />

              {/* ── Left accent bar with sector-colored glow on hover ── */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[16px]"
                style={{
                  background: isHovered
                    ? `linear-gradient(180deg, ${activeItem.accent} 0%, ${activeItem.accent}55 100%)`
                    : "linear-gradient(180deg, rgba(203,213,230,0.35) 0%, rgba(203,213,230,0.12) 100%)",
                  boxShadow: isHovered ? `2px 0 14px ${activeItem.accent}30` : "none",
                  transition: "background 280ms ease, box-shadow 280ms ease",
                }}
              />

              {/* ── Inner radial glow — sector-tinted flood from left ── */}
              <div
                className="absolute inset-0 pointer-events-none rounded-[16px]"
                style={{
                  opacity: isHovered ? 1 : 0,
                  background: `radial-gradient(ellipse at 0% 60%, ${activeItem.accentLight} 0%, transparent 65%)`,
                  transition: "opacity 280ms ease",
                }}
              />

              {/* ── Card content ── */}
              <div className="flex items-start justify-between gap-2.5 relative z-10">
                <div className="flex flex-col gap-[5px]">
                  {/* Sequence index */}
                  <span
                    className="text-[9px] font-mono font-bold tracking-[0.20em]"
                    style={{
                      color: isHovered ? activeItem.accent : "rgba(148,163,184,0.65)",
                      transition: "color 260ms ease",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Solution name */}
                  <h4
                    className="text-[13.5px] font-bold tracking-tight leading-snug m-0"
                    style={{
                      color: isHovered ? "#0f172a" : "#475569",
                      transition: "color 260ms ease",
                    }}
                  >
                    {solution.name}
                  </h4>
                </div>

                {/* ── Arrow button — ring + halo system ── */}
                <div
                  className="flex items-center justify-center w-7 h-7 rounded-full shrink-0 mt-[2px]"
                  style={{
                    background: isHovered
                      ? activeItem.accentLight
                      : "linear-gradient(145deg, #ffffff 0%, #f0f4fb 100%)",
                    border: isHovered
                      ? `1px solid ${activeItem.accentBorder}`
                      : "1px solid rgba(203,213,230,0.65)",
                    boxShadow: isHovered
                      ? `0 0 0 3px ${activeItem.accentLight}, 0 1px 4px rgba(0,0,0,0.04)`
                      : "0 1px 3px rgba(0,0,0,0.04)",
                    transform: isHovered ? "translateX(2px)" : "translateX(0)",
                    transition: "all 260ms ease",
                  }}
                >
                  <svg
                    className="w-[9px] h-[9px]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                    style={{
                      color: isHovered ? activeItem.accent : "rgba(148,163,184,0.6)",
                      transition: "color 260ms ease",
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* ── Shimmer underline — sweeps left→right on hover ── */}
              <div
                className="absolute bottom-0 left-4 right-4 h-[1.5px] rounded-sm origin-left"
                style={{
                  background: `linear-gradient(90deg, ${activeItem.accent}72 0%, ${activeItem.accent}20 60%, transparent 100%)`,
                  transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                  transition: "transform 340ms cubic-bezier(.22,.68,0,1.1)",
                }}
              />
            </a>
          );
        })}
      </div>
      {solutions.length > 6 && (
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={() => setShowMoreModal(true)}
            style={{
              borderColor: activeItem.accentBorder,
              color: activeItem.accent,
            }}
            className="py-2.5 px-6 rounded-full border bg-white hover:bg-slate-50/50 text-[11px] font-extrabold uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:shadow active:scale-95 flex items-center gap-1.5"
          >
            + More Solutions ({solutions.length - 6} more)
          </button>
        </div>
      )}

      {/* Solutions List Overlay Modal rendered via Portal to break stacking contexts */}
      {showMoreModal && isMounted && createPortal(
        <div 
          className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4"
          style={{ overscrollBehavior: "contain" }}
        >
          <div 
            className="bg-white border border-slate-200/80 w-full max-w-2xl rounded-[32px] shadow-2xl relative p-8 max-h-[85vh] flex flex-col text-slate-800 font-sans"
            style={{ overscrollBehavior: "contain" }}
          >
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-shrink-0">
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Operating Industry Sector</span>
                <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 m-0" style={{ color: activeItem.accent }}>
                  All {activeItem.name} Solutions
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowMoreModal(false)}
                className="w-9 h-9 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable list grid with overscroll containment */}
            <div className="overflow-y-auto py-5 flex-grow pr-1" style={{ overscrollBehavior: "contain" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {solutions.map((solution, idx) => (
                  <a
                    key={`modal-${solution.name}`}
                    href={solution.href}
                    className="group p-4 bg-slate-50/50 hover:bg-white border border-slate-200/60 hover:border-slate-300 rounded-2xl flex items-center justify-between transition-all hover:-translate-y-0.5 hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono font-bold text-slate-400">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[13.5px] font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                        {solution.name}
                      </span>
                    </div>
                    <span className="w-6 h-6 rounded-full border border-slate-200/50 bg-white group-hover:bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-slate-700 text-[10px] font-bold transition-all">
                      ›
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Close Button Footer */}
            <div className="pt-4 border-t border-slate-100 flex justify-end flex-shrink-0">
              <button
                type="button"
                onClick={() => setShowMoreModal(false)}
                className="py-2.5 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border border-slate-200/60"
              >
                Close Portal
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

// ─── Page Section ────────────────────────────────────────────────────────────

export default function IndustrySolutions() {
  const [industries, setIndustries] = useState<IndustryItem[]>(initialIndustries);

  useEffect(() => {
    async function loadDynamicSolutions() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const [solutionsRes, appsRes] = await Promise.all([
          fetch(`${baseUrl}/api/solutions`),
          fetch(`${baseUrl}/api/applications`)
        ]);

        if (solutionsRes.ok && appsRes.ok) {
          const fetchedSolutions = await solutionsRes.json();
          const fetchedApps = await appsRes.json();
          
          const updated = initialIndustries.map((ind) => {
            // Find matching application record in the database
            const dbApp = fetchedApps.find((a: any) => a.id === ind.id);

            const matching = fetchedSolutions.filter((sol: any) => {
              const apps: string[] = (sol.applications || []).map((a: string) => a.toLowerCase());
              
              if (ind.id === "oil-gas") {
                return apps.some(a => 
                  a.includes("oil & gas") || 
                  a.includes("oil and gas") || 
                  a.includes("refining") || 
                  a.includes("refinery") || 
                  a.includes("hydrocarbon") || 
                  a.includes("drilling") || 
                  a.includes("pipeline") || 
                  a.includes("wellhead")
                );
              }
              if (ind.id === "offshore") {
                return apps.some(a => 
                  a.includes("offshore") || 
                  a.includes("marine") || 
                  a.includes("deepwater") || 
                  a.includes("diving") || 
                  a.includes("vessel") || 
                  a.includes("deck")
                );
              }
              if (ind.id === "utilities") {
                return apps.some(a => 
                  a.includes("utilities") || 
                  a.includes("utility") || 
                  a.includes("power") || 
                  a.includes("grid") || 
                  a.includes("water") || 
                  a.includes("desalination")
                );
              }
              if (ind.id === "defense") {
                return apps.some(a => 
                  a.includes("defense") || 
                  a.includes("border") || 
                  a.includes("security") || 
                  a.includes("military") || 
                  a.includes("national security")
                );
              }
              if (ind.id === "civil-defense") {
                return apps.some(a => 
                  a.includes("civil defense") || 
                  a.includes("fire brigade") || 
                  a.includes("hazmat") || 
                  a.includes("responder") || 
                  a.includes("rescue") || 
                  a.includes("emergency")
                );
              }
              if (ind.id === "smart-facilities") {
                return apps.some(a => 
                  a.includes("facilities") || 
                  a.includes("facility") || 
                  a.includes("petrochemical") || 
                  a.includes("chemical") || 
                  a.includes("factory") || 
                  a.includes("substation") || 
                  a.includes("cracker") || 
                  a.includes("polymer")
                );
              }
              return false;
            });

            // Map matching solutions to format
            const dynamicSolutions = matching.map((sol: any) => ({
              name: sol.title,
              href: `/solutions/${sol.id}`
            }));

            return {
              ...ind,
              name: dbApp ? dbApp.title : ind.name,
              category: dbApp ? dbApp.category : ind.category,
              overview: dbApp ? [dbApp.overview] : ind.overview,
              accent: dbApp ? dbApp.accentHex : ind.accent,
              solutions: dynamicSolutions.length > 0 ? dynamicSolutions : ind.solutions
            };
          });

          setIndustries(updated);
        }
      } catch (error) {
        console.error("Failed to load homepage solutions and applications dynamically:", error);
      }
    }
    loadDynamicSolutions();
  }, []);

  const handleScrollToContact = (_item: PortfolioItem) => {
    const contactSection =
      document.getElementById("contact-us") || document.querySelector("footer");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <InteractivePortfolioSection
      sectionId="solutions"
      sectionLabel="Sector Specific Operations"
      sectionTitle="Solutions by Industry"
      sectionDesc="We adapt our core capabilities to the specific compliance and threat profiles of the Middle East's primary infrastructure sectors."
      items={industries}
      backgroundColor="#ffffff"
      isDark={false}
      cta1Label="Request Consultation"
      cta1OnClick={handleScrollToContact}
      cta2Label="Speak to Specialist"
      cta2OnClick={handleScrollToContact}
      renderVisual={(item, tone, state) => (
        <TelemetryHubVisual
          activeId={state.activeId}
          setActiveId={state.setActiveId}
          items={state.items}
        />
      )}
      hideSidebar={true}
      isFullHeight={false}
      hideOverview={true}
      renderSolutions={(activeItem: IndustryItem) => (
        <SolutionCards activeItem={activeItem} />
      )}
    />
  );
}