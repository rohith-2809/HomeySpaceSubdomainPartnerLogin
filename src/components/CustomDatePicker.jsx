import { useState, useRef, useEffect } from "react";
import { FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function CustomDatePicker({ value, onChange, placeholder = "Select date" }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Parse initial value or use current date for the calendar view
  const initialDate = value ? new Date(value) : new Date();
  const [viewDate, setViewDate] = useState(initialDate);

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleSelectDate = (day) => {
    // Format to YYYY-MM-DD
    const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onChange(formattedDate);
    setIsOpen(false);
  };

  // Generate grid cells
  const gridCells = [];
  // Empty cells for days before the 1st
  for (let i = 0; i < firstDayOfMonth; i++) {
    gridCells.push(<div key={`empty-${i}`} className="w-8 h-8" />);
  }
  // Actual days
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isSelected = value === dateStr;

    gridCells.push(
      <button
        key={day}
        type="button"
        onClick={() => handleSelectDate(day)}
        className={`w-8 h-8 flex items-center justify-center rounded-[10px] text-sm font-medium transition-all duration-200
                    ${isSelected 
                      ? "bg-primary text-white shadow-md shadow-primary/20" 
                      : "text-text-heading hover:bg-slate-100"
                    }`}
      >
        {day}
      </button>
    );
  }

  // Format display value for the input field
  const displayValue = value 
    ? new Date(value).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
    : "";

  return (
    <div className="relative group" ref={containerRef}>
      {/* ── Input Trigger ── */}
      <div 
        className="relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FiCalendar className={`w-4 h-4 transition-colors ${isOpen ? "text-primary" : "text-text-muted group-hover:text-primary"}`} />
        </div>
        <input
          type="text"
          readOnly
          value={displayValue}
          placeholder={placeholder}
          className={`w-full pl-11 pr-4 py-3 bg-white border rounded-xl text-sm text-text-heading
                     focus:outline-none transition-all cursor-pointer
                     ${isOpen ? "border-primary ring-2 ring-primary/20" : "border-border"}`}
        />
      </div>

      {/* ── Calendar Popup ── */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 p-4 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-border z-50 animate-fade-up w-[280px]">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-4 px-1">
            <button 
              type="button" 
              onClick={handlePrevMonth}
              className="p-1 text-text-muted hover:text-text-heading hover:bg-slate-100 rounded-md transition-colors"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-[15px] font-semibold text-text-heading">
              {MONTHS[currentMonth]} {currentYear}
            </span>
            <button 
              type="button" 
              onClick={handleNextMonth}
              className="p-1 text-text-muted hover:text-text-heading hover:bg-slate-100 rounded-md transition-colors"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS_OF_WEEK.map(day => (
              <div key={day} className="w-8 h-8 flex items-center justify-center text-[13px] font-medium text-text-placeholder">
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {gridCells}
          </div>

        </div>
      )}
    </div>
  );
}
