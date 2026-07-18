"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const metrics = [
    {
      value: "70%",
      label: "Technical Functions Weight",
      desc: "Applications engineering, hardware assembly projects, instrument service, and predictive AI loops.",
      accent: "#1e3e8f" // East Wind Blue
    },
    {
      value: "10+",
      label: "Engineers & Technicians",
      desc: "Highly trained, certified local technical workforce executing complex regional deployments.",
      accent: "#c22026" // East Wind Red
    },
    {
      value: "KSA",
      label: "Central Integration Facilities",
      desc: "Based in Dammam, featuring engineering office rooms, assembly workshops, and calibration labs.",
      accent: "#1e3e8f"
    }
  ];

  const positioning = [
    {
      title: "Regional Safety Leader",
      text: "Recognized as one of the region’s premier providers of high-end, complex industrial safety systems."
    },
    {
      title: "HCIS Standard Authority",
      text: "Trusted engineering partner executing projects certified to SAF-01, SAF-12, and SASO directives."
    },
    {
      title: "Lifecycle Ownership",
      text: "We take full responsibility from early conceptual hazard studies to system integration and lifetime support."
    }
  ];

  // Engineering disciplines from Section 6 of Company Profile
  const disciplines = [
    {
      title: "Project Management",
      desc: "Rigorous execution, delivery leadership, and interface coordination across multi-vendor networks.",
      accent: "#1e3e8f",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      title: "QA/QC & Compliance",
      desc: "Assuring design safety factors, testing verification logs, and international standard conformance.",
      accent: "#c22026",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Structural Engineering",
      desc: "Blast deflection modeling and thermal isolation calculations for heavy protective enclosures.",
      accent: "#1e3e8f",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: "Instrumentation Engineering",
      desc: "Loop diagrams, calibration parameters, and field transmitter mesh networks alignment.",
      accent: "#c22026",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
        </svg>
      )
    },
    {
      title: "Electrical Engineering",
      desc: "Hazardous area classifications, load calculations, and electrical protection wiring.",
      accent: "#1e3e8f",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Fire & Gas Engineering",
      desc: "Wired and wireless SIL-rated detection loop mapping, warning alarms, and telemetry integration.",
      accent: "#c22026",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.172a3 3 0 01.17-4.242 3.965 3.965 0 00-1.41-1.41 3 3 0 013.078-4.072 3.965 3.965 0 003.078 3.078 3 3 0 01-4.916 6.646z" />
        </svg>
      )
    },
    {
      title: "HVAC Engineering",
      desc: "Overpressure control dampers, automated gas isolation loops, and explosion-proof air cooling.",
      accent: "#1e3e8f",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l.707-.707m2.808 13.019a4 4 0 115.656 0M9 10h.01M15 10h.01M21 21v-3a2 2 0 00-2-2H5a2 2 0 00-2 2v3" />
        </svg>
      )
    },
    {
      title: "Safety Engineering",
      desc: "Functional safety analysis, hazard mapping, and toxic refuge atmosphere maintenance loops.",
      accent: "#c22026",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Telecommunications",
      desc: "Multi-hop mesh radio telemetry, emergency call routing, and inter-agency gateway bridges.",
      accent: "#1e3e8f",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      title: "HSE Engineering",
      desc: "Comprehensive site safety programs, Zone 1 mobile permitted checklists, and HSE consultancy.",
      accent: "#c22026",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen relative z-10 w-full overflow-x-clip text-slate-800 bg-white antialiased">
        
        {/* About Hero Section */}
        <section className="relative pt-[220px] pb-[160px] overflow-hidden border-b border-white/5 min-h-[600px] flex items-center bg-slate-950 w-full">
          
          {/* Absolute edge-pinning layout logic with programmatic cover-bleed matching */}
          <img
            src="/about_hero_bg.png?v=3"
            alt="Mission Critical Safety Infrastructure Background"
            className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none brightness-[1.15] scale-102 z-0"
          />

          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080c14]/95 via-[#080c14]/80 to-[#080c14]/25 max-md:from-[#080c14]/95 max-md:to-[#080c14]/75 z-10" />
          
          {/* Industrial grid for layout structure */}
          <div className="industrial-grid absolute inset-0 opacity-[0.02] pointer-events-none z-10" />

          <div className="max-w-[1400px] w-full mx-auto px-10 max-sm:px-5 relative z-20">
            <div className="max-w-[700px] space-y-4">
              <span className="inline-block text-[#c22026] text-xs font-bold uppercase tracking-[0.25em]">
                Company Overview
              </span>
              <h1 className="text-[2.6rem] max-md:text-[2.1rem] max-sm:text-[1.8rem] leading-[1.15] uppercase font-extrabold tracking-tight text-white m-0">
                Mission-Critical Safety Infrastructure
              </h1>
              <p className="text-[0.95rem] text-slate-200 leading-relaxed font-light max-w-[620px] m-0">
                East Wind is a specialized safety solutions provider in Saudi Arabia, delivering the entire lifecycle of engineered projects.
              </p>
            </div>
          </div>
        </section>

        {/* Narrative & Facility Showcase Section */}
        <section className="py-28 max-w-[1400px] mx-auto px-10 max-sm:px-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Narrative Details */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <span className="text-xs font-bold text-[#c22026] uppercase tracking-[0.2em]">
                Operational Strength
              </span>
              <h2 className="text-[2.6rem] leading-[1.1] font-extrabold uppercase text-slate-900 tracking-tight">
                Our Core Safety Mandate
              </h2>
              <p className="text-[1.08rem] text-slate-650 leading-relaxed font-normal">
                East Wind operates with a core strength centered on implementing advanced, cyber-physical safety technologies to address high-risk industrial safety challenges. We take full regional ownership of engineered packages, ensuring that refinery control rooms, offshore platforms, and hazardous factories are protected against thermal, kinetic, and chemical events.
              </p>
              <p className="text-sm text-slate-500 leading-relaxed font-light">
                By integrating smart IoT sensors, intrinsically safe Zone 1 mobile devices, and physics-informed neural network analytics, we help major industrial plants shift from reactive emergency firefighting to proactive, automated safety control loops. This unified approach drastically lowers client Total Cost of Ownership (TCO) while guaranteeing absolute safety compliance.
              </p>

              {/* Core market position bullets */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100 mt-4">
                {positioning.map((pos, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <h4 className="text-[0.85rem] font-bold text-[#1e3e8f] uppercase tracking-wider">
                      {pos.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed m-0 font-medium">
                      {pos.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Premium Image Container */}
            <div className="lg:col-span-5 relative flex justify-center">
              {/* Decorative coordinate grid border backdrop */}
              <div className="absolute -inset-4 rounded-[32px] border border-slate-200/60 pointer-events-none z-0" />
              <div className="absolute top-2 right-4 font-mono text-[9px] text-[#1e3e8f] select-none tracking-widest z-20 bg-white/95 py-1 px-3 rounded-full border border-slate-200 shadow-3xs">
                SYS.FACILITY.IMG.01
              </div>

              {/* Main Facility Showcase Image Card */}
              <div className="relative z-10 w-full h-[440px] max-sm:h-[320px] p-2 bg-white border border-slate-200 shadow-md rounded-[28px] overflow-hidden group">
                <img
                  src="/analyzer_shelter.webp"
                  alt="East Wind Central Integration Facilities"
                  className="w-full h-full object-cover rounded-[20px] transition-transform duration-[1200ms] hover:scale-103"
                />
              </div>
            </div>

          </div>
        </section>

        {/* Corporate Metrics Section */}
        <section className="py-24 bg-[#f8fafc] border-t border-b border-slate-200/60 relative">
          <div className="industrial-grid absolute inset-0 opacity-[0.02] pointer-events-none" />
          
          <div className="max-w-[1400px] mx-auto px-10 max-sm:px-5">
            <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-8">
              {metrics.map((metric, idx) => (
                <div 
                  key={idx}
                  className="spatial-panel p-8 bg-white/80 border border-slate-200 rounded-[28px] hover:shadow-md hover:border-slate-350 transition-all duration-300 flex flex-col justify-between"
                  style={{ borderLeft: `5px solid ${metric.accent}` }}
                >
                  <div>
                    <span className="block text-[3.2rem] font-mono font-black leading-none mb-3" style={{ color: metric.accent }}>
                      {metric.value}
                    </span>
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 mb-2">
                      {metric.label}
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed m-0 font-medium">
                      {metric.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specialized Multi-Disciplinary Engineering Matrix */}
        <section className="py-28 max-w-[1400px] mx-auto px-10 max-sm:px-5">
          <div className="mb-20 max-w-[800px]">
            <span className="block text-xs font-bold text-[#c22026] uppercase tracking-[0.2em] mb-3">
              Technical Capabilities
            </span>
            <h2 className="text-[2.8rem] max-sm:text-[2rem] font-extrabold uppercase text-slate-900 tracking-tight mb-4">
              Multi-Disciplinary Engineering Team
            </h2>
            <p className="text-slate-550 font-semibold text-sm">
              We execute complex safety projects through a coordinate network of engineering disciplines, ensuring full conformance with quality control parameters and local civil regulations.
            </p>
          </div>

          {/* Interactive Capabilities Grid */}
          <div className="grid grid-cols-5 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-6">
            {disciplines.map((disc, idx) => {
              const isBlue = disc.accent === "#1e3e8f";
              
              // Dynamic hover variables
              const hoverBorder = isBlue ? "hover:border-[#1e3e8f]/60" : "hover:border-[#c22026]/60";
              const hoverShadow = isBlue 
                ? "hover:shadow-[0_22px_45px_-10px_rgba(30,62,143,0.12),0_4px_10px_-5px_rgba(30,62,143,0.05)]"
                : "hover:shadow-[0_22px_45px_-10px_rgba(194,32,38,0.10),0_4px_10px_-5px_rgba(194,32,38,0.04)]";
              const badgeBg = isBlue ? "bg-[#1e3e8f]/8 text-[#1e3e8f]" : "bg-[#c22026]/8 text-[#c22026]";

              return (
                <div
                  key={idx}
                  className={`spatial-panel p-8 bg-white/90 border border-slate-200/80 rounded-[28px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 flex flex-col justify-between group ${hoverBorder} ${hoverShadow}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      {/* Premium Circle Icon Badge */}
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 shadow-3xs ${badgeBg}`}>
                        {disc.icon}
                      </div>
                      <span className="font-mono text-[9px] text-slate-400 font-bold">
                        ENG.0{idx + 1}
                      </span>
                    </div>
                    
                    <h4 className="text-[0.88rem] font-bold text-slate-900 uppercase tracking-tight mb-2.5 transition-colors duration-300" style={{ color: disc.accent }}>
                      {disc.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed m-0 font-medium">
                      {disc.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Contact Proposal Block */}
        <section className="py-24 bg-transparent border-t border-slate-100">
          <div className="max-w-[1000px] mx-auto px-10 max-sm:px-5">
            <div className="spatial-panel p-12 max-md:p-6 bg-slate-900 border border-slate-800 rounded-[32px] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="industrial-grid absolute inset-0 opacity-[0.02] pointer-events-none" />
              
              <div className="relative z-10 max-w-[550px]">
                <h3 className="text-2xl font-black uppercase tracking-tight mb-3">
                  Partner with East Wind Arabia
                </h3>
                <p className="text-slate-350 leading-relaxed text-xs m-0">
                  Ready to draft a safety layout or request an onsite calibration analysis? Speak directly to our integration team at Dammam to outline your project scope.
                </p>
              </div>

              <div className="relative z-10 shrink-0">
                <Link
                  href="/enquire"
                  className="py-3.5 px-8 text-xs font-bold uppercase tracking-wider text-white bg-[#c22026] hover:bg-white hover:text-slate-900 rounded-full inline-flex items-center gap-2 shadow-md transition-all duration-300"
                >
                  Consult an Engineer
                  <span className="font-bold">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </main>
    </>
  );
}