"use client";

import { useMemo } from "react";

export default function About() {
  const lifecycleSteps = useMemo(() => [
    "Concept Studies & Solution Selection",
    "Safety Systems Integration",
    "Manufacturing & Assembly",
    "Installation & Commissioning",
    "Project Management Leadership",
    "Long-Term After-Sales Support"
  ], []);

  return (
    <section 
      id="about-us" 
      className="relative w-full min-h-screen py-24 max-md:py-12 flex items-center justify-center bg-transparent overflow-hidden"
    >
      {/* Symmetrical Ambient Glow System mimicking the blue/orange dusk horizon */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#1e3e8f]/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#ff2228]/8 blur-[140px] pointer-events-none z-0" />

      {/* Structural Tech Grid Overlay */}
      <div className="industrial-grid absolute inset-0 opacity-[0.02] pointer-events-none z-0" />

      {/* Responsive Documentary Column Grid Layout */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-10 max-sm:px-5 grid grid-cols-1 lg:grid-cols-12 gap-12 max-md:gap-6 items-stretch">
        
        {/* LEFT COLUMN: Premium Documentary Splash Visual */}
        <div className="lg:col-span-5 flex flex-col relative group">
          <div className="relative w-full h-full min-h-[480px] max-lg:min-h-[320px] overflow-hidden rounded-[28px] border border-slate-200/60 shadow-2xl bg-slate-950/10">
            <img
              src="/about.png"
              alt="East Wind Infrastructure Engineering Center"
              className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-101 select-none pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* RIGHT COLUMN: Frosted Glass Information Streams (Pure Black Text) */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-6">
          
          {/* Narrative Overview Panel */}
          <div className="spatial-panel bg-white/80 backdrop-blur-2xl border border-white/75 rounded-[32px] max-md:rounded-2xl p-10 max-sm:p-6 flex flex-col justify-center shadow-lg text-black flex-grow">
            <h2 className="text-[2.6rem] max-md:text-[2rem] max-sm:text-[1.65rem] font-black tracking-tight uppercase leading-[1.1] mb-6 text-black">
              Sustaining Regional Safety Infrastructure
            </h2>
            <p className="text-[1.05rem] max-sm:text-sm text-black leading-relaxed font-normal mb-6">
              East Wind operates as a regional, end-to-end safety solutions provider delivering the complete lifecycle of safety projects across mission-critical infrastructure segments.
            </p>
            <p className="text-sm max-sm:text-xs text-black leading-relaxed font-light opacity-90">
              Our core strength centers on adopting and implementing the latest safety technologies to solve complex, high-risk challenges—improving safety performance while reducing total cost of ownership (TCO) for our clients.
            </p>
          </div>

          {/* Symmetrical Operational Benchmarks & Project Trackers */}
          <div className="spatial-panel bg-white/70 backdrop-blur-2xl border border-white/65 rounded-[32px] max-md:rounded-2xl p-10 max-sm:p-6 flex flex-col justify-center shadow-md text-black">
            
            {/* Quantitative Data Grid */}
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-6 mb-8 border-b border-slate-200/60 pb-8">
              <div className="flex flex-col">
                <span className="text-4xl max-sm:text-3xl font-black font-mono text-[#1e3e8f]">70%</span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-black mt-1">Technical Functions Weight</span>
                <span className="text-[11px] text-black leading-tight mt-1 opacity-90">Dedicated to application engineering, cross-disciplinary integration, workshops, and instrument field services.</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl max-sm:text-3xl font-black font-mono text-[#ff2228]">10+</span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-black mt-1">Certified Personnel Scale</span>
                <span className="text-[11px] text-black leading-tight mt-1 opacity-90">Housing internal multi-disciplinary functions spanning mechanical, electrical, and functional safety architecture.</span>
              </div>
            </div>

            {/* Matrix Deliverables Section */}
            <span className="block text-[10px] font-sans font-bold text-black opacity-60 uppercase tracking-widest mb-4">
              Turnkey Project Lifecycle Delivery Scope:
            </span>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3">
              {lifecycleSteps.map((step) => (
                <div 
                  key={step} 
                  className="flex items-center gap-2.5 py-2.5 px-4 bg-white/60 border border-slate-200/50 rounded-xl text-xs font-bold text-black shadow-3xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff2228] shrink-0" />
                  <span className="truncate">{step}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}