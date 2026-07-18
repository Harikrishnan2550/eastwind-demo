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

export default function AdminSolutionsPage() {
  const [solutions, setSolutions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Modal states
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [viewItem, setViewItem] = useState<SolutionItem | null>(null);

  // Form states
  const [formId, setFormId] = useState<string>("");
  const [formTitle, setFormTitle] = useState<string>("");
  const [formSubLabel, setFormSubLabel] = useState<string>("");
  const [formTagline, setFormTagline] = useState<string>("");
  const [formAccent, setFormAccent] = useState<"blue" | "orange">("blue");
  const [formDescription, setFormDescription] = useState<string>("");
  const [formDetailedContent, setFormDetailedContent] = useState<string>("");
  const [formImageUrl, setFormImageUrl] = useState<string>("");

  // Array states
  const [formFeatures, setFormFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState<string>("");
  const [formCompliance, setFormCompliance] = useState<string[]>([]);
  const [complianceInput, setComplianceInput] = useState<string>("");
  const [formBenefits, setFormBenefits] = useState<string[]>([]);
  const [benefitInput, setBenefitInput] = useState<string>("");
  const [formApplications, setFormApplications] = useState<string[]>([]);
  const [applicationInput, setApplicationInput] = useState<string>("");

  // Specs states
  const [formSpecs, setFormSpecs] = useState<{ label: string; value: string }[]>([]);
  const [specLabel, setSpecLabel] = useState<string>("");
  const [specValue, setSpecValue] = useState<string>("");

  const [uploading, setUploading] = useState<boolean>(false);

  const fetchSolutions = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${baseUrl}/api/solutions`);
      if (!res.ok) throw new Error("Failed to fetch solutions");
      const list = await res.json();
      setSolutions(list);
    } catch (err: any) {
      console.error(err);
      setError("Failed to retrieve solutions from active database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

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
    setFormImageUrl("");
    setFormFeatures([]);
    setFormCompliance([]);
    setFormBenefits([]);
    setFormApplications([]);
    setFormSpecs([]);
    setShowModal(true);
  };

  const handleOpenEdit = (item: any) => {
    clearMessages();
    setIsEdit(true);
    setFormId(item.id);
    setFormTitle(item.title);
    setFormSubLabel(item.subLabel || "");
    setFormTagline(item.tagline || "");
    setFormAccent(item.accent || "blue");
    setFormDescription(item.description || "");
    setFormDetailedContent(item.detailedContent || "");
    setFormImageUrl(item.imageUrl || "");
    setFormFeatures(item.features || []);
    setFormCompliance(item.compliance || []);
    setFormBenefits(item.benefits || []);
    setFormApplications(item.applications || []);
    setFormSpecs(item.specs || []);
    setShowModal(true);
  };

  const addArrayItem = (input: string, setInput: any, list: string[], setList: any) => {
    if (input.trim()) {
      setList([...list, input.trim()]);
      setInput("");
    }
  };

  const removeArrayItem = (idx: number, list: string[], setList: any) => {
    setList(list.filter((_, i) => i !== idx));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("admin_token");
      
      const res = await fetch(`${baseUrl}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Image upload failed");

      setFormImageUrl(data.url);
      setSuccess("Image file successfully uploaded.");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to upload image file.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    if (!formId || !formTitle || !formTagline || !formDescription) {
      setError("Please fill in all required parameters.");
      return;
    }

    const payload = {
      id: formId.trim().toLowerCase().replace(/\s+/g, "-"),
      title: formTitle.trim(),
      subLabel: formSubLabel.trim(),
      tagline: formTagline.trim(),
      accent: formAccent,
      description: formDescription.trim(),
      detailedContent: formDetailedContent.trim(),
      features: formFeatures,
      compliance: formCompliance,
      benefits: formBenefits,
      applications: formApplications,
      specs: formSpecs,
      imageUrl: formImageUrl
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("admin_token");

      let res;
      if (isEdit) {
        res = await fetch(`${baseUrl}/api/solutions/${payload.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch(`${baseUrl}/api/solutions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save operation failed");

      setSuccess(`Solution '${payload.title}' successfully ${isEdit ? "updated" : "created"}.`);
      setShowModal(false);
      fetchSolutions();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to save solution to database.");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    clearMessages();

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("admin_token");

      const res = await fetch(`${baseUrl}/api/solutions/${deleteTarget}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete operation failed");

      setSuccess("Solution deleted successfully.");
      setDeleteTarget(null);
      fetchSolutions();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to delete solution.");
      setDeleteTarget(null);
    }
  };

  const filteredSolutions = solutions.filter(item => 
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tagline?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const totalItems = filteredSolutions.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const paginatedSolutions = filteredSolutions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6 font-sans text-white select-none">
      
      {/* Title Header */}
      <div className="flex justify-between items-center w-full">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight m-0 text-white">Solution Verticals</h2>
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">Manage industrial solutions and telemetry platforms</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 py-3 px-6 rounded-full bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-sky-600/10 active:translate-y-0.5"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Solution Vertical
        </button>
      </div>

      {/* Notifications */}
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-2xl text-xs">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-2xl text-xs">
          {success}
        </div>
      )}

      {/* Search Input Bar */}
      <div className="relative max-w-md w-full">
        <span className="absolute left-4 top-3 text-slate-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search solutions by title, tagline or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-xs text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none transition-all font-medium"
        />
      </div>

      {/* Solutions Table Card */}
      <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden backdrop-blur-md">
        {loading ? (
          <div className="py-24 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Loading dynamic database records...</p>
          </div>
        ) : solutions.length === 0 ? (
          <div className="py-20 text-center text-slate-400 text-xs font-medium">
            No solution verticals registered in this database. Click &quot;Add Solution Vertical&quot; to begin.
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full border-collapse text-left m-0">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5">
                  <th className="px-6 py-4.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Solution Code (ID)</th>
                  <th className="px-6 py-4.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Solution Title</th>
                  <th className="px-6 py-4.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Tagline</th>
                  <th className="px-6 py-4.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Accent Accent</th>
                  <th className="px-6 py-4.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {paginatedSolutions.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="px-6 py-4 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{item.id}</td>
                    <td className="px-6 py-4 text-xs font-bold text-slate-100 max-w-xs truncate">{item.title}</td>
                    <td className="px-6 py-4 text-xs font-semibold text-slate-400 max-w-sm truncate">{item.tagline}</td>
                    <td className="px-6 py-4 text-xs font-semibold">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        item.accent === "orange" 
                          ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" 
                          : "bg-sky-500/10 text-sky-500 border border-sky-500/20"
                      }`}>
                        {item.accent}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right flex items-center justify-end gap-2.5">
                      <button
                        onClick={() => setViewItem(item)}
                        className="py-2 px-4 rounded-xl text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-500/5 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer border border-emerald-500/20"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="py-2 px-4 rounded-xl text-[10px] font-bold uppercase tracking-wider text-sky-400 bg-sky-500/5 hover:bg-sky-500 hover:text-white transition-all cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteTarget(item.id)}
                        className="py-2 px-4 rounded-xl text-[10px] font-bold uppercase tracking-wider text-rose-500 bg-rose-50/5 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border-t border-white/5 bg-white/[0.01]">
                <span className="text-xs text-slate-400 font-medium">
                  Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, totalItems)} to {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} of {totalItems} entries
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="py-1.5 px-3.5 rounded-xl border border-white/10 hover:border-white/20 text-[10px] font-bold uppercase tracking-wider text-slate-300 disabled:opacity-30 disabled:pointer-events-none hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-7.5 h-7.5 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                        currentPage === page
                          ? "bg-sky-600 text-white shadow-md shadow-sky-600/10"
                          : "border border-white/10 hover:border-white/20 text-slate-300 hover:bg-white/5"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="py-1.5 px-3.5 rounded-xl border border-white/10 hover:border-white/20 text-[10px] font-bold uppercase tracking-wider text-slate-300 disabled:opacity-30 disabled:pointer-events-none hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* CRUD MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-white/10 w-full max-w-3xl rounded-[32px] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-8 border-b border-white/5 flex-shrink-0">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white m-0">
                {isEdit ? `Configure Solution: ${formId}` : "Create Solution Vertical"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/5 text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Form Content */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-8 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block pl-1">Solution Slug Code ID *</label>
                  <input
                    type="text"
                    required
                    disabled={isEdit}
                    placeholder="e.g. smart-gas-telemetry"
                    value={formId}
                    onChange={(e) => setFormId(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900 border border-white/5 rounded-2xl text-xs text-white placeholder-slate-650 focus:border-sky-500 focus:outline-none transition-colors font-medium disabled:opacity-45"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block pl-1">Solution Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter visual title"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900 border border-white/5 rounded-2xl text-xs text-white placeholder-slate-650 focus:border-sky-500 focus:outline-none transition-colors font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block pl-1">Sublabel category classifier</label>
                  <input
                    type="text"
                    placeholder="e.g. Wireless F&G Telemetry System"
                    value={formSubLabel}
                    onChange={(e) => setFormSubLabel(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900 border border-white/5 rounded-2xl text-xs text-white placeholder-slate-650 focus:border-sky-500 focus:outline-none transition-colors font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block pl-1">Tagline banner *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter solution tagline summary statement"
                    value={formTagline}
                    onChange={(e) => setFormTagline(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900 border border-white/5 rounded-2xl text-xs text-white placeholder-slate-650 focus:border-sky-500 focus:outline-none transition-colors font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block pl-1">Theme Accent Color</label>
                  <select
                    value={formAccent}
                    onChange={(e) => setFormAccent(e.target.value as any)}
                    className="w-full px-4 py-3 bg-slate-900 border border-white/5 rounded-2xl text-xs text-white focus:border-sky-500 focus:outline-none cursor-pointer"
                  >
                    <option value="blue" className="bg-slate-950">Blue Accent Theme</option>
                    <option value="orange" className="bg-slate-950">Orange Accent Theme</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block pl-1">Introductory Summary *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Enter short description"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-white/5 rounded-2xl text-xs text-white placeholder-slate-650 focus:border-sky-500 focus:outline-none transition-colors font-medium"
                />
              </div>

              {/* Detailed Content */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block pl-1">Detailed Technical content / Specifications summary</label>
                <textarea
                  rows={4}
                  placeholder="Enter full technical copy or layout specifications"
                  value={formDetailedContent}
                  onChange={(e) => setFormDetailedContent(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-white/5 rounded-2xl text-xs text-white placeholder-slate-650 focus:border-sky-500 focus:outline-none transition-colors font-medium resize-y font-mono"
                />
              </div>

              {/* Image Upload Area */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block pl-1">Banner Image URL</label>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-8">
                    <input
                      type="text"
                      placeholder="e.g. /uploads/image.png"
                      value={formImageUrl}
                      onChange={(e) => setFormImageUrl(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-900 border border-white/5 rounded-2xl text-xs text-white placeholder-slate-650 focus:border-sky-500 focus:outline-none transition-colors font-medium"
                    />
                  </div>
                  <div className="md:col-span-4 relative">
                    <input
                      type="file"
                      id="solution-file-upload"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="solution-file-upload"
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border border-dashed border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider bg-sky-500/5 hover:bg-sky-500/10 cursor-pointer"
                    >
                      {uploading ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                          Upload File
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              {/* Dynamic Features Bullet List */}
              <div className="space-y-3 pt-3 border-t border-white/5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block pl-1">Compliance Certifications</span>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Enter certification (e.g. UL, FM, ATEX)"
                    value={complianceInput}
                    onChange={(e) => setComplianceInput(e.target.value)}
                    className="flex-1 px-4 py-3 bg-slate-900 border border-white/5 rounded-2xl text-xs text-white focus:border-sky-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => addArrayItem(complianceInput, setComplianceInput, formCompliance, setFormCompliance)}
                    className="px-5 py-3 rounded-2xl bg-slate-800 text-xs font-bold uppercase tracking-wider hover:bg-slate-700 cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formCompliance.map((item, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-slate-300">
                      {item}
                      <button
                        type="button"
                        onClick={() => removeArrayItem(idx, formCompliance, setFormCompliance)}
                        className="text-rose-500 hover:text-rose-450 border-none bg-transparent cursor-pointer font-bold"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Features bullets */}
              <div className="space-y-3 pt-3 border-t border-white/5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block pl-1">Highlights & Capabilities</span>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Enter feature highlight"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    className="flex-1 px-4 py-3 bg-slate-900 border border-white/5 rounded-2xl text-xs text-white focus:border-sky-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => addArrayItem(featureInput, setFeatureInput, formFeatures, setFormFeatures)}
                    className="px-5 py-3 rounded-2xl bg-slate-800 text-xs font-bold uppercase tracking-wider hover:bg-slate-700 cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <ul className="flex flex-col gap-2 pl-0 list-none m-0">
                  {formFeatures.map((item, idx) => (
                    <li key={idx} className="flex justify-between items-center px-4 py-3 bg-white/[0.01] border border-white/5 rounded-xl text-xs">
                      <span className="text-slate-350">{item}</span>
                      <button
                        type="button"
                        onClick={() => removeArrayItem(idx, formFeatures, setFormFeatures)}
                        className="text-rose-500 hover:text-rose-400 font-bold uppercase text-[9px] tracking-wider cursor-pointer border-none bg-transparent"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Form submit/cancel */}
              <div className="pt-6 border-t border-white/5 flex justify-end gap-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 rounded-full text-slate-400 border border-white/10 hover:border-white/20 text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold uppercase tracking-wider cursor-pointer transition-all shadow-lg shadow-sky-600/10"
                >
                  {isEdit ? "Update Solution" : "Save Solution"}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-white/10 p-8 rounded-3xl w-full max-w-md text-center space-y-6">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-500 text-lg mx-auto">
              ⚠️
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white uppercase tracking-tight m-0">Confirm Solution Deletion</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light m-0">
                Are you sure you want to permanently delete solution vertical `{deleteTarget}`? This edits the public verticals directory immediately.
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-5 py-2.5 rounded-full border border-white/10 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Abort
              </button>
              <button
                onClick={handleDelete}
                className="px-7 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Delete Vertical
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODAL OVERLAY */}
      {viewItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200/80 w-full max-w-2xl rounded-[32px] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="h-16 flex items-center justify-between px-8 border-b border-slate-100 flex-shrink-0">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 m-0">
                Solution Details Node: {viewItem.id}
              </h3>
              <button
                onClick={() => setViewItem(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 border border-slate-200 text-slate-400 hover:text-slate-700 cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              
              {/* Solution Info Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {viewItem.imageUrl && (
                  <div className="md:col-span-1 border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 aspect-square flex items-center justify-center p-2">
                    <img 
                      src={viewItem.imageUrl.startsWith("/uploads/") 
                        ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}${viewItem.imageUrl}` 
                        : viewItem.imageUrl
                      } 
                      alt={viewItem.title} 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                )}
                
                <div className={`${viewItem.imageUrl ? "md:col-span-2" : "md:col-span-3"} space-y-4`}>
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">Solution Title</span>
                    <h2 className="text-base font-bold text-slate-900 m-0 mt-0.5">{viewItem.title}</h2>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">Sub Label</span>
                      <p className="text-xs text-slate-700 font-medium m-0 mt-0.5">{viewItem.subLabel}</p>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">Color Tone Theme</span>
                      <p className="text-xs text-slate-700 font-medium m-0 mt-0.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          viewItem.accent === "orange" ? "bg-orange-100 text-orange-700" : "bg-sky-100 text-sky-700"
                        }`}>
                          {viewItem.accent}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">Tagline Subheading</span>
                    <p className="text-xs text-slate-700 font-semibold m-0 mt-0.5">{viewItem.tagline}</p>
                  </div>
                </div>
              </div>

              {/* Description & Detailed Content */}
              <div className="border-t border-slate-100 pt-6 space-y-4">
                <div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">Brief Description</span>
                  <p className="text-xs text-slate-650 leading-relaxed font-light m-0">{viewItem.description}</p>
                </div>
                {viewItem.detailedContent && (
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">Detailed Technical Overview</span>
                    <p className="text-xs text-slate-650 leading-relaxed font-light m-0">{viewItem.detailedContent}</p>
                  </div>
                )}
              </div>

              {/* Features & Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-slate-100 pt-6">
                <div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-3">Core Features</span>
                  {viewItem.features && viewItem.features.length > 0 ? (
                    <ul className="space-y-2 pl-0 list-none m-0 text-xs text-slate-650">
                      {viewItem.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-400 font-light m-0">No features specified.</p>
                  )}
                </div>

                <div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-3">Key Benefits</span>
                  {viewItem.benefits && viewItem.benefits.length > 0 ? (
                    <ul className="space-y-2 pl-0 list-none m-0 text-xs text-slate-650">
                      {viewItem.benefits.map((ben, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                          <span>{ben}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-400 font-light m-0">No benefits cataloged.</p>
                  )}
                </div>
              </div>

              {/* Applications Tags & Compliance */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-slate-100 pt-6">
                <div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">Industry Sectors (Applications)</span>
                  {viewItem.applications && viewItem.applications.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {viewItem.applications.map((app, idx) => (
                        <span key={idx} className="px-2 py-1 rounded bg-slate-100 text-[10px] font-semibold text-slate-600">
                          {app}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 font-light m-0">No sectors assigned.</p>
                  )}
                </div>

                <div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">Compliance Standards</span>
                  {viewItem.compliance && viewItem.compliance.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {viewItem.compliance.map((comp, idx) => (
                        <span key={idx} className="px-2 py-1 rounded bg-orange-50 text-[10px] font-semibold text-orange-700">
                          {comp}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 font-light m-0">No standards specified.</p>
                  )}
                </div>
              </div>

              {/* Specifications Matrix */}
              <div className="border-t border-slate-100 pt-6">
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-3">Specifications Matrix</span>
                {viewItem.specs && viewItem.specs.length > 0 ? (
                  <div className="border border-slate-200 rounded-2xl overflow-hidden">
                    <table className="w-full border-collapse text-left m-0 text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="px-5 py-2.5 font-bold text-slate-600">Parameter</th>
                          <th className="px-5 py-2.5 font-bold text-slate-600">Value Rating</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {viewItem.specs.map((spec, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50">
                            <td className="px-5 py-2.5 font-bold text-slate-500 tracking-wider text-[10px] uppercase">{spec.label}</td>
                            <td className="px-5 py-2.5 text-slate-800 font-semibold">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 font-light m-0">No specifications registered.</p>
                )}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="h-16 flex items-center justify-end px-8 border-t border-slate-100 flex-shrink-0 bg-slate-50">
              <button
                type="button"
                onClick={() => setViewItem(null)}
                className="px-6 py-2.5 rounded-full bg-slate-850 text-white hover:bg-slate-700 text-xs font-bold uppercase tracking-wider cursor-pointer transition-all"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
