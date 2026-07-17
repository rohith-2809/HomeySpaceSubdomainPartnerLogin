import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function CustomSelect({ value, onChange, options, placeholder = "Select option" }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative" ref={containerRef}>
      {/* ── Trigger ── */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 bg-white border rounded-xl text-sm flex items-center justify-between
                   focus:outline-none transition-all cursor-pointer
                   ${isOpen ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-slate-300"}`}
      >
        <span className={selectedOption ? "text-text-heading" : "text-text-placeholder"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180 text-primary" : "text-text-muted"}`} />
      </div>

      {/* ── Dropdown Popup ── */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-xl shadow-[0_8px_30px_-10px_rgba(0,0,0,0.12)] border border-border z-50 animate-fade-in overflow-hidden py-1.5">
          {options.map((option) => {
            const isSelected = value === option.value;
            return (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`px-4 py-2.5 text-sm cursor-pointer transition-colors flex items-center
                            ${isSelected 
                              ? "bg-primary/10 text-primary font-semibold" 
                              : "text-text-body hover:bg-slate-50 hover:text-text-heading"
                            }`}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
