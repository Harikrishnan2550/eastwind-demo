"use client";

import { useEffect, useState } from "react";

interface SolutionItem {
  id: string;
  title: string;
  subLabel: string;
  tagline: string;
  accent: "blue" | "orange";
  description: string;
  detailedContent: string;
  features: string[];
  compliance: string[];
  specs: { label: string; value: string }[];
  benefits: string[];
  applications: string[];
  imageUrl: string;
}

interface IndustryItem {
  id: string;
  name: string;
  riskKicker: string;
  accent: string;
  image: string;
  description: string;
}

interface CorePortfolioItem {
  title: string;
  description: string;
  items: string[];
  icon: string;
}

interface DropdownOption {
  value: string;
  label: string;
}

export default function UnifiedAdminSolutionsPage() {
  const [activeTab, setActiveTab] = useState<"catalog" | "page_layout">("catalog");
  const [solutions, setSolutions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [savingPage, setSavingPage] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 10;

  // TAB 1: SOLUTION ITEM CATALOG MODALS & FORM STATES
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [viewItem, setViewItem] = useState<SolutionItem | null>(null);

  const [formId, setFormId] = useState<string>("");
  const [formTitle, setFormTitle] = useState<string>("");
  const [formSubLabel, setFormSubLabel] = useState<string>("");
  const [formTagline, setFormTagline] = useState<string>("");
  const [formAccent, setFormAccent] = useState<"blue" | "orange">("blue");
  const [formDescription, setFormDescription] = useState<string>("");
  const [formDetailedContent, setFormDetailedContent] = useState<string>("");
  const [formImageUrl, setFormImageUrl] = useState<string>("");
  const [formFeatures, setFormFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState<string>("");
  const [formCompliance, setFormCompliance] = useState<string[]>([]);
  const [complianceInput, setComplianceInput] = useState<string>("");
  const [formBenefits, setFormBenefits] = useState<string[]>([]);
  const [benefitInput, setBenefitInput] = useState<string>("");
  const [formApplications, setFormApplications] = useState<string[]>([]);
  const [applicationInput, setApplicationInput] = useState<string>("");
  const [formSpecs, setFormSpecs] = useState<{ label: string; value: string }[]>([]);
  const [specLabel, setSpecLabel] = useState<string>("");
  const [specValue, setSpecValue] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);

  // TAB 2: DEDICATED /SOLUTIONS PAGE LAYOUT & BANNERS STATE
  const [heroBgImage, setHeroBgImage] = useState<string>("/solution.png");
  const [heroTagline, setHeroTagline] = useState<string>("Ecosystem Engineering Portal");
  const [heroTitle, setHeroTitle] = useState<string>("High-Compliance Engineered Solutions");
  const [heroDescription, setHeroDescription] = useState<string>("Eastwind completely bypasses basic component provisioning to function as an end-to-end technological validator.");
  const [industriesTagline, setIndustriesTagline] = useState<string>("Operating Environments");
  const [industriesTitle, setIndustriesTitle] = useState<string>("Solutions By Operating Industry");
  const [industriesDesc, setIndustriesDesc] = useState<string>("Industrial sectors feature highly specific chemical, thermal, and spatial risks.");
  const [industries, setIndustries] = useState<IndustryItem[]>([
    {
      id: "oil-gas",
      name: "Oil & Gas",
      riskKicker: "HAZARDOUS ATMOSPHERE | ATEX ZONE 0 & ZONE 1",
      accent: "#c22026",
      image: "/predictive_intelligence.webp",
      description: "Securing petrochemical extraction, transport infrastructure, and downstream refining loops."
    },
    {
      id: "petrochemical",
      name: "Petrochemicals",
      riskKicker: "PROCESS HAZARD CONTROL | ZONE 1 & ZONE 2",
      accent: "#f59e0b",
      image: "/industrial_digitalization.webp",
      description: "Optimising downstream chemical refining ecosystems with real-time ML and telemetry."
    }
  ]);

  const [capabilitiesTagline, setCapabilitiesTagline] = useState<string>("Core Expertise");
  const [capabilitiesTitle, setCapabilitiesTitle] = useState<string>("Core Capabilities Portfolio");
  const [capabilitiesDesc, setCapabilitiesDesc] = useState<string>("Eastwind executes complex, multi-disciplinary workflows.");
  const [corePortfolios, setCorePortfolios] = useState<CorePortfolioItem[]>([
    {
      title: "AI, Digitalisation & Data Architecture",
      description: "Advanced data acquisition pipelines running Agentic AI models.",
      items: ["AI infrastructure deployment", "Plant operations enablement"],
      icon: "⚡"
    }
  ]);

  const [gatewayTagline, setGatewayTagline] = useState<string>("Proposal Engineering Intake");
  const [gatewayTitle, setGatewayTitle] = useState<string>("Request Technical Integration Quoting");
  const [gatewayDesc, setGatewayDesc] = useState<string>("Complete the security assessment form below.");
  const [solutionScopeOptions, setSolutionScopeOptions] = useState<DropdownOption[]>([
    { value: "fire-gas", label: "Fire & Gas Instrumentation Grids" },
    { value: "suppression", label: "Clean Agent Suppression Systems" }
  ]);
  const [submitButtonText, setSubmitButtonText] = useState<string>("Submit Solution Blueprint Scope");

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  // Fetch Catalog Solutions (Tab 1)
  const fetchSolutions = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${baseUrl}/api/solutions`);
      if (!res.ok) throw new Error("Failed to fetch solutions");
      const list = await res.json();
      setSolutions(list);
    } catch (err: any) {
      console.error(err);
      setError("Failed to retrieve solution items.");
    }
  };

  // Fetch Solutions Page Layout (Tab 2)
  const fetchSolutionsPageData = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${baseUrl}/api/solutions-page`);
      if (res.ok) {
        const data = await res.json();
        if (data.heroBgImage) setHeroBgImage(data.heroBgImage);
        if (data.heroTagline) setHeroTagline(data.heroTagline);
        if (data.heroTitle) setHeroTitle(data.heroTitle);
        if (data.heroDescription) setHeroDescription(data.heroDescription);
        if (data.industriesTagline) setIndustriesTagline(data.industriesTagline);
        if (data.industriesTitle) setIndustriesTitle(data.industriesTitle);
        if (data.industriesDesc) setIndustriesDesc(data.industriesDesc);
        if (data.industries && data.industries.length > 0) setIndustries(data.industries);
        if (data.capabilitiesTagline) setCapabilitiesTagline(data.capabilitiesTagline);
        if (data.capabilitiesTitle) setCapabilitiesTitle(data.capabilitiesTitle);
        if (data.capabilitiesDesc) setCapabilitiesDesc(data.capabilitiesDesc);
        if (data.corePortfolios && data.corePortfolios.length > 0) setCorePortfolios(data.corePortfolios);
        if (data.gatewayTagline) setGatewayTagline(data.gatewayTagline);
        if (data.gatewayTitle) setGatewayTitle(data.gatewayTitle);
        if (data.gatewayDesc) setGatewayDesc(data.gatewayDesc);
        if (data.solutionScopeOptions && data.solutionScopeOptions.length > 0) setSolutionScopeOptions(data.solutionScopeOptions);
        if (data.submitButtonText) setSubmitButtonText(data.submitButtonText);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      await Promise.all([fetchSolutions(), fetchSolutionsPageData()]);
      setLoading(false);
    }
    loadAll();
  }, []);

  // Save Handlers for Tab 1 Solution Items
  const handleOpenCreate = () => {
    clearMessages();
    setIsEdit(false);
    setFormId("");
    setFormTitle("");
    setFormSubLabel("");
    setFormTagline("");
    setFormAccent("blue");
    setFormDescription("");
    setFormDetailedContent("");
    setFormImageUrl("/products/default-process-instrumentation.png");
    setFormFeatures([]);
    setFormCompliance([]);
    setFormBenefits([]);
    setFormApplications([]);
    setFormSpecs([]);
    setShowModal(true);
  };

  const handleOpenEdit = (item: SolutionItem) => {
    clearMessages();
    setIsEdit(true);
    setFormId(item.id);
    setFormTitle(item.title);
    setFormSubLabel(item.subLabel || "");
    setFormTagline(item.tagline || "");
    setFormAccent(item.accent || "blue");
    setFormDescription(item.description || "");
    setFormDetailedContent(item.detailedContent || "");
    setFormImageUrl(item.imageUrl || "/products/default-process-instrumentation.png");
    setFormFeatures(item.features || []);
    setFormCompliance(item.compliance || []);
    setFormBenefits(item.benefits || []);
    setFormApplications(item.applications || []);
    setFormSpecs(item.specs || []);
    setShowModal(true);
  };

  const handleSaveSolutionItem = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    if (!formTitle.trim()) {
      setError("Solution title is required.");
      return;
    }

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("admin_token");

      const generatedId = formId || formTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

      const payload = {
        id: generatedId,
        title: formTitle.trim(),
        subLabel: formSubLabel.trim(),
        tagline: formTagline.trim(),
        accent: formAccent,
        description: formDescription.trim(),
        detailedContent: formDetailedContent.trim(),
        imageUrl: formImageUrl.trim(),
        features: formFeatures,
        compliance: formCompliance,
        benefits: formBenefits,
        applications: formApplications,
        specs: formSpecs
      };

      const url = isEdit ? `${baseUrl}/api/solutions/${generatedId}` : `${baseUrl}/api/solutions`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save solution item");

      setSuccess(`Solution item "${formTitle}" saved successfully!`);
      setShowModal(false);
      fetchSolutions();
    } catch (err: any) {
      setError(err.message || "Failed to save solution item.");
    }
  };

  const handleDeleteSolutionItem = async (id: string) => {
    clearMessages();
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${baseUrl}/api/solutions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("Failed to delete solution item");
      setSuccess("Solution item deleted!");
      setDeleteTarget(null);
      fetchSolutions();
    } catch (err: any) {
      setError(err.message || "Failed to delete item.");
    }
  };

  // Save Handler for Tab 2 Solutions Page Banners & Content
  const handleSaveSolutionsPageLayout = async () => {
    clearMessages();
    setSavingPage(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("admin_token");

      const payload = {
        heroBgImage,
        heroTagline,
        heroTitle,
        heroDescription,
        industriesTagline,
        industriesTitle,
        industriesDesc,
        industries,
        capabilitiesTagline,
        capabilitiesTitle,
        capabilitiesDesc,
        corePortfolios,
        gatewayTagline,
        gatewayTitle,
        gatewayDesc,
        solutionScopeOptions,
        submitButtonText
      };

      const res = await fetch(`${baseUrl}/api/solutions-page`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to save Solutions Page layout");
      setSuccess("Solutions Page Banners & Layout saved successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to save layout.");
    } finally {
      setSavingPage(false);
    }
  };

  // Image Upload helper
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("admin_token");
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${baseUrl}/api/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error("Image upload failed");
      setter(data.url);
      setSuccess("Image uploaded successfully!");
    } catch (err: any) {
      setError(err.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const filteredSolutions = solutions.filter((s: any) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.description && s.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md border border-orange-200">
              CMS Module
            </span>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Solutions Management Portal</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage individual safety solution items as well as the main /solutions webpage layout.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200 shrink-0">
          <button
            onClick={() => setActiveTab("catalog")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "catalog" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>🛡️ Solution Items Catalog</span>
          </button>
          <button
            onClick={() => setActiveTab("page_layout")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "page_layout" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>📰 /solutions Page Banners & Layout</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-xl flex justify-between items-center">
          <span>⚠️ {error}</span>
          <button onClick={() => setError(null)} className="text-red-500 hover:text-red-800">✕</button>
        </div>
      )}
      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-xl flex justify-between items-center">
          <span>✅ {success}</span>
          <button onClick={() => setSuccess(null)} className="text-emerald-500 hover:text-emerald-800">✕</button>
        </div>
      )}

      {/* ================= TAB 1: SOLUTION CATALOG ITEMS ================= */}
      {activeTab === "catalog" && (
        <div className="space-y-6">
          {/* Explicit Location Indicator Banner */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-xs flex items-center justify-between">
            <div>
              <strong className="block font-bold">📍 Website Location Effect:</strong>
              <span>Items added or edited here update the solution cards on the Homepage Solution Grid, Products Catalog filters, and Footer Links.</span>
            </div>
            <button
              onClick={handleOpenCreate}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold uppercase rounded-lg shadow-md shrink-0 ml-4"
            >
              + Create Solution Item
            </button>
          </div>

          {/* Search Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <input
              type="text"
              placeholder="Search solution items by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md px-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500"
            />
            <span className="text-xs font-mono font-bold text-slate-400">Total: {filteredSolutions.length} Items</span>
          </div>

          {/* Solutions Catalog Table / Grid */}
          {loading ? (
            <div className="p-12 text-center text-slate-400 text-xs font-mono">Loading Solution Catalog...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSolutions.map((item: any) => (
                <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono font-bold uppercase text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                        {item.id}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">Accent: {item.accent || "blue"}</span>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-800">{item.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{item.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                    <button onClick={() => setViewItem(item)} className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg">Details</button>
                    <button onClick={() => handleOpenEdit(item)} className="px-3 py-1.5 text-xs font-bold text-orange-600 bg-orange-50 rounded-lg">Edit</button>
                    <button onClick={() => setDeleteTarget(item.id)} className="px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 rounded-lg">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 2: DEDICATED /SOLUTIONS PAGE LAYOUT & BANNERS ================= */}
      {activeTab === "page_layout" && (
        <div className="space-y-8">
          {/* Explicit Location Indicator Banner */}
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl text-orange-950 text-xs flex items-center justify-between">
            <div>
              <strong className="block font-bold">📍 Website Location Effect:</strong>
              <span>Fields edited here update the Hero Banner, Operating Industry Cards, Core Capabilities Grid, and Project Intake Gateway on the main dedicated webpage at <strong className="underline">http://localhost:3000/solutions</strong>.</span>
            </div>
            <button
              onClick={handleSaveSolutionsPageLayout}
              disabled={savingPage}
              className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase rounded-xl shadow-md shrink-0 ml-4"
            >
              {savingPage ? "Saving Layout..." : "Save Page Layout Changes"}
            </button>
          </div>

          {/* Section 1: Hero Banner */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-800">1. Hero Banner Settings</h2>
              <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">Affects Top of /solutions</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Hero Tagline</label>
                <input type="text" value={heroTagline} onChange={(e) => setHeroTagline(e.target.value)} className="w-full p-2.5 border rounded-lg" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Hero Title</label>
                <input type="text" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} className="w-full p-2.5 border rounded-lg font-bold" />
              </div>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Hero Description</label>
              <textarea rows={3} value={heroDescription} onChange={(e) => setHeroDescription(e.target.value)} className="w-full p-2.5 border rounded-lg text-xs" />
            </div>
          </div>

          {/* Section 2: Operating Industries */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-800">2. Solutions By Operating Industry ({industries.length} Cards)</h2>
              <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">Affects Industry Grid on /solutions</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {industries.map((ind, idx) => (
                <div key={idx} className="p-4 border rounded-xl bg-slate-50 space-y-2">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>{ind.name}</span>
                    <span className="text-orange-600">{ind.id}</span>
                  </div>
                  <textarea rows={2} value={ind.description} onChange={(e) => {
                    const updated = [...industries];
                    updated[idx].description = e.target.value;
                    setIndustries(updated);
                  }} className="w-full p-2 border rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Core Capabilities */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-800">3. Technical Core Capabilities Portfolio ({corePortfolios.length} Cards)</h2>
              <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">Affects Capabilities Section on /solutions</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {corePortfolios.map((cp, idx) => (
                <div key={idx} className="p-4 border rounded-xl bg-slate-50 space-y-2">
                  <strong className="block text-slate-800">{cp.icon} {cp.title}</strong>
                  <textarea rows={2} value={cp.description} onChange={(e) => {
                    const updated = [...corePortfolios];
                    updated[idx].description = e.target.value;
                    setCorePortfolios(updated);
                  }} className="w-full p-2 border rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <button
              onClick={handleSaveSolutionsPageLayout}
              disabled={savingPage}
              className="px-8 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase rounded-xl shadow-lg"
            >
              {savingPage ? "Saving Layout..." : "Save Solutions Page Banners & Layout"}
            </button>
          </div>
        </div>
      )}

      {/* CREATE / EDIT MODAL FOR TAB 1 ITEM */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-800">{isEdit ? "Edit Solution Item" : "Create New Solution Item"}</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 text-lg font-bold">✕</button>
            </div>

            <form onSubmit={handleSaveSolutionItem} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Solution Title *</label>
                <input type="text" required value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="e.g. Fire & Gas Detection Systems" className="w-full p-2.5 border rounded-lg font-bold" />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Overview Description *</label>
                <textarea rows={3} required value={formDescription} onChange={(e) => setFormDescription(e.target.value)} placeholder="Summary description..." className="w-full p-2.5 border rounded-lg" />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-100 font-bold rounded-lg">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-orange-600 text-white font-bold rounded-lg shadow-md">{isEdit ? "Save Item" : "Create Item"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
