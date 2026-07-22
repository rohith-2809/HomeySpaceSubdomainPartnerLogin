import { useState, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiSearch,
  FiPlus,
  FiX,
  FiFolder,
  FiFileText,
  FiImage,
  FiFilter,
  FiChevronRight,
  FiUploadCloud,
  FiCheck,
  FiHome,
  FiTrash2,
  FiGrid,
  FiList,
  FiMoreVertical,
  FiDownload
} from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi2";
import DashboardLayout from "../../components/DashboardLayout";

/* ── Mock data ── */
const INITIAL_DOCUMENTS = [
  {
    id: 1,
    name: "Project Brochure.pdf",
    size: "2.4 MB",
    updated: "Updated Today",
    icon: "pdf",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    id: 2,
    name: "Master Agreement.docx",
    size: "1.1 MB",
    updated: "Sep 14, 2024",
    icon: "doc",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    id: 3,
    name: "Site_Plan_v2.png",
    size: "4.8 MB",
    updated: "Sep 10, 2024",
    icon: "img",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    id: 4,
    name: "RERA_Approval_Cert.pdf",
    size: "850 KB",
    updated: "Aug 22, 2024",
    icon: "pdf",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    id: 5,
    name: "Cost_Estimation_Q3.xlsx",
    size: "3.2 MB",
    updated: "Aug 18, 2024",
    icon: "xls",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

const ALBUMS = [
  {
    id: 1,
    name: "Site Progress",
    count: 32,
    cover:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Elevations",
    count: 14,
    cover:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Model Flats",
    count: 45,
    cover:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: "Amenities",
    count: 18,
    cover:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=80",
  },
];

/* ── Icon by filetype ── */
function FileIcon({ type, color, bg }) {
  const cls = `w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bg}`;
  if (type === "pdf")
    return (
      <div className={cls}>
        <FiFileText className={`w-5 h-5 ${color}`} />
      </div>
    );
  if (type === "img")
    return (
      <div className={cls}>
        <FiImage className={`w-5 h-5 ${color}`} />
      </div>
    );
  return (
    <div className={cls}>
      <HiOutlineDocumentText className={`w-5 h-5 ${color}`} />
    </div>
  );
}

/* ── Create Folder Modal ── */
function CreateFolderModal({ onClose, onCreate }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate(name.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl animate-scale-in p-6 lg:p-7">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-text-heading">
            Create New Folder
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 text-text-muted transition-colors cursor-pointer"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text-heading">
              Folder Name
            </label>
            <input
              type="text"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Site Progress"
              className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-heading
                         placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20
                         focus:border-primary transition-all"
            />
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-border text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold
                         hover:bg-primary-hover shadow-lg shadow-primary/20
                         disabled:opacity-40 disabled:cursor-not-allowed
                         transition-all duration-200 cursor-pointer"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── File Uploader Modal (Web Centric) ── */
function FileUploaderModal({ onClose, onUpload }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files) => {
    const newFiles = files.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      type: file.type
    }));
    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id) => {
    setSelectedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleUpload = () => {
    onUpload(selectedFiles);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl animate-scale-in p-6 lg:p-8 flex flex-col max-h-[90vh]">
        
        <div className="flex items-center justify-between mb-6 shrink-0">
          <h3 className="text-xl font-bold text-text-heading flex items-center gap-2">
            <FiUploadCloud className="w-6 h-6 text-primary" />
            Upload Documents & Media
          </h3>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 text-text-muted transition-colors">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Drag & Drop Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`shrink-0 flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-8 mb-6 transition-colors duration-200 ${
            isDragging ? "border-primary bg-primary/5" : "border-slate-300 bg-slate-50 hover:bg-slate-100"
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
            <FiUploadCloud className={`w-8 h-8 ${isDragging ? 'text-primary' : 'text-slate-400'}`} />
          </div>
          <p className="text-base font-semibold text-text-heading mb-1">
            Drag & drop files here
          </p>
          <p className="text-sm text-text-muted mb-4">
            or click to browse from your computer
          </p>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-2.5 rounded-xl bg-white border border-border text-sm font-semibold text-text-heading hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
          >
            Browse Files
          </button>
        </div>

        {/* Previews */}
        {selectedFiles.length > 0 && (
          <div className="flex-1 overflow-y-auto min-h-0 bg-slate-50 rounded-xl p-4 border border-border">
            <h4 className="text-sm font-semibold text-text-heading mb-3 flex items-center justify-between">
              <span>Selected Files ({selectedFiles.length})</span>
              <button 
                onClick={() => setSelectedFiles([])}
                className="text-xs text-red-500 hover:text-red-600 font-medium"
              >
                Clear all
              </button>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedFiles.map((f) => (
                <div key={f.id} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-border shadow-sm group">
                  {f.preview ? (
                    <img src={f.preview} alt="preview" className="w-12 h-12 object-cover rounded-lg shrink-0 border border-slate-100" />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                      <FiFileText className="w-5 h-5 text-slate-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-heading truncate" title={f.name}>{f.name}</p>
                    <p className="text-xs text-text-muted">{f.size}</p>
                  </div>
                  <button 
                    onClick={() => removeFile(f.id)} 
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0 opacity-0 group-hover:opacity-100"
                    title="Remove file"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 mt-6 shrink-0 pt-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-border text-sm font-semibold text-text-heading hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={selectedFiles.length === 0}
            className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
          >
            <FiUploadCloud className="w-4 h-4" />
            Upload {selectedFiles.length > 0 ? selectedFiles.length : ""} Files
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════ */
export default function DocumentsGalleryPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("documents"); // 'documents' | 'gallery'
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [showUpload, setShowUpload] = useState(false);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [folders, setFolders] = useState([]);
  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  const handleCreateFolder = (name) => {
    setFolders((prev) => [
      { id: Date.now(), name, count: 0 },
      ...prev,
    ]);
    showToast(`"${name}" folder created`);
  };

  const handleFilesUpload = (uploadedFiles) => {
    // Determine icon based on mime type roughly
    const newDocs = uploadedFiles.map(f => {
      let icon = "doc";
      let color = "text-blue-500";
      let bg = "bg-blue-50";

      if (f.type.includes("pdf")) {
        icon = "pdf";
        color = "text-red-500";
        bg = "bg-red-50";
      } else if (f.type.startsWith("image/")) {
        icon = "img";
        color = "text-violet-500";
        bg = "bg-violet-50";
      } else if (f.type.includes("spreadsheet") || f.type.includes("excel") || f.name.endsWith(".xlsx") || f.name.endsWith(".csv")) {
        icon = "xls";
        color = "text-emerald-600";
        bg = "bg-emerald-50";
      }

      return {
        id: f.id,
        name: f.name,
        size: f.size,
        updated: "Just now",
        icon,
        color,
        bg,
        preview: f.preview
      };
    });

    setDocuments(prev => [...newDocs, ...prev]);
    showToast(`${uploadedFiles.length} file(s) uploaded successfully`);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredDocs = documents.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout
      activeNav="Projects"
      locked={false}
      topBarTitle="Documents & Gallery"
      topBarSubtitle="Manage project files and media"
    >
      <div className="max-w-7xl mx-auto animate-fade-in pb-12">

        {/* ── Web Centric Header & Actions ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => navigate(`/projects/${id}`)}
              className="p-2.5 text-text-muted hover:text-text-heading bg-white border border-border rounded-xl hover:bg-slate-50 transition-colors cursor-pointer shadow-sm"
              aria-label="Back to Project"
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-border rounded-xl text-sm font-medium
                           text-text-heading placeholder:text-text-placeholder focus:outline-none
                           focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              />
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === "gallery" && (
              <button
                onClick={() => setShowCreateFolder(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-xl text-sm font-semibold text-text-heading hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
              >
                <FiFolder className="w-4 h-4 text-primary" />
                New Folder
              </button>
            )}
            <button
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors shadow-md shadow-primary/20 cursor-pointer"
            >
              <FiUploadCloud className="w-4 h-4" />
              Upload Files
            </button>
          </div>
        </div>

        {/* ── Layout Content Area ── */}
        <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden">
          
          {/* Header Tabs */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4 bg-slate-50/50">
            <div className="flex items-center gap-6">
              {["documents", "gallery"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative text-sm font-semibold capitalize pb-1 transition-colors cursor-pointer ${
                    activeTab === tab
                      ? "text-primary"
                      : "text-text-muted hover:text-text-heading"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-primary rounded-t-full" />
                  )}
                </button>
              ))}
            </div>

            {/* View toggles & Filters */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-border rounded-lg text-xs font-medium text-text-heading hover:bg-slate-50 transition-colors cursor-pointer shadow-sm">
                <FiFilter className="w-3.5 h-3.5" />
                Filter
              </button>
              
              {activeTab === "documents" && (
                <div className="flex items-center bg-white border border-border rounded-lg p-0.5 shadow-sm">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                      viewMode === "grid" ? "bg-slate-100 text-primary" : "text-text-muted hover:text-text-heading"
                    }`}
                  >
                    <FiGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                      viewMode === "list" ? "bg-slate-100 text-primary" : "text-text-muted hover:text-text-heading"
                    }`}
                  >
                    <FiList className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-6">
            {/* ─────────── DOCUMENTS TAB ─────────── */}
            {activeTab === "documents" && (
              <div className="animate-fade-in">
                {filteredDocs.length === 0 ? (
                  <div className="py-20 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
                      <FiFileText className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="text-base font-semibold text-text-heading mb-1">
                      No documents found
                    </p>
                    <p className="text-sm text-text-muted max-w-sm">
                      Upload new documents or try adjusting your search criteria.
                    </p>
                    <button 
                      onClick={() => setShowUpload(true)}
                      className="mt-6 px-5 py-2 bg-white border border-border rounded-xl text-sm font-semibold text-text-heading hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
                    >
                      Upload Document
                    </button>
                  </div>
                ) : (
                  <>
                    {/* List View (Table-like) */}
                    {viewMode === "list" && (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-border text-xs uppercase tracking-wider text-text-muted">
                              <th className="pb-3 font-semibold px-4">Name</th>
                              <th className="pb-3 font-semibold px-4">Date Modified</th>
                              <th className="pb-3 font-semibold px-4">Size</th>
                              <th className="pb-3 font-semibold px-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {filteredDocs.map((doc, i) => (
                              <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                                <td className="py-4 px-4 flex items-center gap-3">
                                  {doc.preview ? (
                                    <img src={doc.preview} alt="" className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0" />
                                  ) : (
                                    <FileIcon type={doc.icon} color={doc.color} bg={doc.bg} />
                                  )}
                                  <span className="text-sm font-semibold text-text-heading truncate max-w-[200px] md:max-w-md">{doc.name}</span>
                                </td>
                                <td className="py-4 px-4 text-sm text-text-muted whitespace-nowrap">{doc.updated}</td>
                                <td className="py-4 px-4 text-sm text-text-muted whitespace-nowrap">{doc.size}</td>
                                <td className="py-4 px-4 text-right">
                                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 text-text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                                      <FiDownload className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-text-muted hover:text-text-heading hover:bg-slate-100 rounded-lg transition-colors">
                                      <FiMoreVertical className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Grid View */}
                    {viewMode === "grid" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredDocs.map((doc, i) => (
                          <div
                            key={doc.id}
                            className="flex flex-col p-4 bg-white rounded-2xl border border-border hover:border-primary/40 hover:shadow-md transition-all duration-200 cursor-pointer group"
                          >
                            <div className="flex items-start justify-between mb-4">
                              {doc.preview ? (
                                <img src={doc.preview} alt="" className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0" />
                              ) : (
                                <FileIcon type={doc.icon} color={doc.color} bg={doc.bg} />
                              )}
                              <button className="p-1.5 text-slate-300 hover:text-text-heading hover:bg-slate-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                                <FiMoreVertical className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="mt-auto">
                              <p className="text-sm font-semibold text-text-heading truncate mb-1" title={doc.name}>
                                {doc.name}
                              </p>
                              <div className="flex items-center justify-between text-xs text-text-muted">
                                <span>{doc.size}</span>
                                <span>{doc.updated}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* ─────────── GALLERY TAB ─────────── */}
            {activeTab === "gallery" && (
              <div className="space-y-8 animate-fade-in">
                
                {/* Folders Row */}
                {(folders.length > 0 || ALBUMS.length > 0) && (
                  <div>
                    <h4 className="text-sm font-bold text-text-heading mb-4 flex items-center gap-2">
                      <FiFolder className="w-4 h-4 text-primary" />
                      Albums & Folders
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      
                      {/* User-created folders */}
                      {folders.map((folder) => (
                        <div
                          key={folder.id}
                          className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-border hover:border-primary/40 hover:shadow-sm hover:bg-slate-50 transition-all cursor-pointer group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <FiFolder className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-text-heading truncate">
                              {folder.name}
                            </p>
                            <p className="text-xs text-text-muted">{folder.count} items</p>
                          </div>
                        </div>
                      ))}

                      {/* Default Albums */}
                      {ALBUMS.map((album) => (
                        <div
                          key={album.id}
                          className="relative overflow-hidden rounded-2xl cursor-pointer group aspect-[4/3]"
                        >
                          <img
                            src={album.cover}
                            alt={album.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <p className="text-white text-sm font-bold truncate">{album.name}</p>
                            <p className="text-white/70 text-xs mt-0.5">{album.count} photos</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* All Media Grid */}
                <div>
                  <h4 className="text-sm font-bold text-text-heading mb-4 flex items-center gap-2">
                    <FiImage className="w-4 h-4 text-violet-500" />
                    All Media
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {/* Filter out just images from docs to show here if any, plus mock images */}
                    {filteredDocs.filter(d => d.icon === 'img').map((img, i) => (
                      <div key={`img-${i}`} className="aspect-square rounded-xl overflow-hidden bg-slate-100 group relative border border-border">
                         {img.preview ? (
                            <img src={img.preview} alt={img.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                         ) : (
                           <div className="w-full h-full flex items-center justify-center">
                             <FiImage className="w-8 h-8 text-slate-300" />
                           </div>
                         )}
                         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/40 transition-colors">
                              <FiDownload className="w-5 h-5" />
                            </button>
                         </div>
                      </div>
                    ))}
                    {/* Add a few placeholder masonry items just to show structure */}
                    {[1,2,3,4,5,6].map(i => (
                       <div key={`ph-${i}`} className="aspect-square rounded-xl overflow-hidden bg-slate-100 relative group cursor-pointer">
                          <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&w=300&q=80`} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                       </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

      </div>

      {/* ── Modals ── */}
      {showUpload && (
        <FileUploaderModal
          onClose={() => setShowUpload(false)}
          onUpload={handleFilesUpload}
        />
      )}

      {showCreateFolder && (
        <CreateFolderModal
          onClose={() => setShowCreateFolder(false)}
          onCreate={handleCreateFolder}
        />
      )}

      {/* ── Success Toast ── */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3
                        bg-text-heading text-white text-sm font-medium px-6 py-3.5 rounded-2xl
                        shadow-2xl animate-fade-up whitespace-nowrap">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <FiCheck className="w-3.5 h-3.5" />
          </div>
          {toastMessage}
        </div>
      )}
    </DashboardLayout>
  );
}

