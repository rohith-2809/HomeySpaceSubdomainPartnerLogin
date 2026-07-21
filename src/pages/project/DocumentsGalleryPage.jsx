import { useState } from "react";
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
} from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi2";
import DashboardLayout from "../../components/DashboardLayout";

/* ── Mock data ── */
const DOCUMENTS = [
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
  const cls = `w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${bg}`;
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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative w-full sm:max-w-sm bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl animate-fade-up p-6 sm:p-7">
        {/* Handle */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-slate-200 sm:hidden" />

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-text-heading">
            Create New Folder
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 text-text-muted transition-colors cursor-pointer"
          >
            <FiX className="w-4 h-4" />
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

          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full py-3.5 rounded-xl bg-primary text-white text-sm font-semibold
                       hover:bg-primary-hover shadow-lg shadow-primary/20
                       disabled:opacity-40 disabled:cursor-not-allowed
                       transition-all duration-200 cursor-pointer"
          >
            Create Folder
          </button>
        </form>
      </div>
    </div>
  );
}

/* ── Upload Options Modal (Web Layout) ── */
function UploadOptionsModal({ onClose, onCreateFolder }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-0">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl animate-scale-in p-6 lg:p-8">
        
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-text-heading">
            Upload Options
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 text-text-muted transition-colors cursor-pointer"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Create Folder */}
          <button
            onClick={() => {
              onClose();
              onCreateFolder();
            }}
            className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-border hover:border-primary hover:bg-primary/5 transition-all group cursor-pointer text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white text-primary transition-colors">
              <FiFolder className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-text-heading group-hover:text-primary transition-colors">
                Create Folder
              </p>
              <p className="text-xs text-text-muted mt-1">Organize your photos</p>
            </div>
          </button>

          {/* Upload Files */}
          <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-border hover:border-violet-500 hover:bg-violet-50 transition-all group cursor-pointer text-center">
            <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center group-hover:bg-violet-500 group-hover:text-white text-violet-500 transition-colors">
              <FiUploadCloud className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-text-heading group-hover:text-violet-600 transition-colors">
                Upload Files
              </p>
              <p className="text-xs text-text-muted mt-1">Documents, images &amp; more</p>
            </div>
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
  const [showUpload, setShowUpload] = useState(false);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [folders, setFolders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [createdFolderName, setCreatedFolderName] = useState(null); // success toast

  const handleCreateFolder = (name) => {
    setFolders((prev) => [
      { id: Date.now(), name, count: 0 },
      ...prev,
    ]);
    setCreatedFolderName(name);
    setTimeout(() => setCreatedFolderName(null), 3000);
  };

  const filteredDocs = DOCUMENTS.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout
      activeNav="Projects"
      locked={false}
      topBarTitle="Documents & Gallery"
      topBarSubtitle="Contracts and media"
    >
      <div className="max-w-3xl mx-auto animate-fade-in">

        {/* ── Unified Search Bar ── */}
        <div className="relative mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 text-text-muted hover:text-text-heading rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Home"
          >
            <FiHome className="w-5 h-5" />
          </button>
          
          <input
            type="text"
            placeholder="Search Documents & Gallery..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-3.5 bg-white border border-border rounded-full text-sm font-medium
                       text-text-heading placeholder:text-text-placeholder focus:outline-none
                       focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
          />
          
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <FiSearch className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* ── Tab Switcher ── */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl mb-6 w-fit">
          {["documents", "gallery"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all duration-200 cursor-pointer ${
                activeTab === tab
                  ? "bg-primary text-white shadow-sm"
                  : "text-text-muted hover:text-text-heading"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* ─────────── DOCUMENTS TAB ─────────── */}
        {activeTab === "documents" && (
          <div className="space-y-4 animate-fade-in">
            {/* Filter Row */}
            <div className="flex items-center justify-end mb-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-xl text-sm font-medium text-text-muted hover:border-slate-300 hover:text-text-heading transition-all cursor-pointer">
                <FiFilter className="w-4 h-4" />
                Filter
              </button>
            </div>

            {/* Section label */}
            <p className="text-xs font-bold text-text-muted uppercase tracking-widest px-0.5">
              All Documents
            </p>

            {/* Document list */}
            <div className="space-y-2">
              {filteredDocs.map((doc, i) => (
                <div
                  key={doc.id}
                  className={`flex items-center gap-4 p-4 bg-white rounded-2xl border border-border
                              hover:border-primary/30 hover:shadow-sm transition-all duration-200 cursor-pointer
                              animate-fade-up`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <FileIcon type={doc.icon} color={doc.color} bg={doc.bg} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text-heading truncate">
                      {doc.name}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">
                      {doc.size} • {doc.updated}
                    </p>
                  </div>
                  <FiChevronRight className="w-4 h-4 text-text-placeholder shrink-0" />
                </div>
              ))}

              {filteredDocs.length === 0 && (
                <div className="py-16 flex flex-col items-center gap-3 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                    <FiFileText className="w-7 h-7 text-text-muted" />
                  </div>
                  <p className="text-sm font-semibold text-text-heading">
                    No documents found
                  </p>
                  <p className="text-xs text-text-muted">
                    Try a different search term
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─────────── GALLERY TAB ─────────── */}
        {activeTab === "gallery" && (
          <div className="space-y-6 animate-fade-in">

            {/* ── Albums Section ── */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-text-muted uppercase tracking-widest">
                  Albums
                </p>
                <button className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors cursor-pointer">
                  See all
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Default albums */}
                {ALBUMS.map((album, i) => (
                  <div
                    key={album.id}
                    className={`relative overflow-hidden rounded-2xl cursor-pointer group
                                animate-fade-up`}
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="aspect-[4/3] bg-slate-200">
                      <img
                        src={album.cover}
                        alt={album.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-sm font-bold">{album.name}</p>
                      <p className="text-white/70 text-xs">{album.count} photos</p>
                    </div>
                  </div>
                ))}

                {/* User-created folders */}
                {folders.map((folder, i) => (
                  <div
                    key={folder.id}
                    className={`flex flex-col items-center justify-center gap-2 aspect-[4/3] rounded-2xl
                                border-2 border-dashed border-primary/30 bg-primary/5 cursor-pointer
                                hover:border-primary/60 hover:bg-primary/10 transition-all duration-200
                                animate-scale-in`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                      <FiFolder className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm font-semibold text-text-heading text-center px-2 truncate w-full text-center">
                      {folder.name}
                    </p>
                    <p className="text-xs text-text-muted">0 photos</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Floating Action Button ── */}
        <button
          onClick={() => setShowUpload(true)}
          className="fixed bottom-8 right-6 sm:right-8 w-14 h-14 rounded-full bg-primary text-white
                     flex items-center justify-center shadow-xl shadow-primary/30
                     hover:bg-primary-hover hover:shadow-2xl hover:shadow-primary/40
                     hover:-translate-y-0.5 active:translate-y-0 active:scale-95
                     transition-all duration-200 cursor-pointer z-30"
          aria-label="Upload or create folder"
        >
          <FiPlus className="w-6 h-6" />
        </button>

        {/* ── Bottom Back Button ── */}
        <div className="pt-4 border-t border-border mt-8">
          <button
            type="button"
            onClick={() => navigate(`/projects/${id}`)}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6
                       rounded-xl bg-transparent border border-border text-text-body text-sm font-semibold
                       hover:bg-slate-50 hover:text-text-heading hover:-translate-y-px active:translate-y-0 active:scale-[0.99]
                       transition-all duration-300 cursor-pointer group"
          >
            <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300" />
            Back to Project
          </button>
        </div>

      </div>

      {/* ── Upload Options Modal ── */}
      {showUpload && (
        <UploadOptionsModal
          onClose={() => setShowUpload(false)}
          onCreateFolder={() => setShowCreateFolder(true)}
        />
      )}

      {/* ── Create Folder Modal ── */}
      {showCreateFolder && (
        <CreateFolderModal
          onClose={() => setShowCreateFolder(false)}
          onCreate={handleCreateFolder}
        />
      )}

      {/* ── Success Toast ── */}
      {createdFolderName && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5
                        bg-text-heading text-white text-sm font-medium px-5 py-3 rounded-2xl
                        shadow-xl animate-fade-up whitespace-nowrap">
          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
            <FiCheck className="w-3 h-3" />
          </div>
          "{createdFolderName}" folder created
        </div>
      )}
    </DashboardLayout>
  );
}
