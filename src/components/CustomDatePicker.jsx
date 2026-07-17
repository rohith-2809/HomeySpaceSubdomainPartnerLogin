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
  const [viewMode, setViewMode] = useState("date"); // "date", "month", "year"

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
    if (viewMode === "year") {
      setViewDate(new Date(currentYear - 12, currentMonth, 1));
    } else if (viewMode === "month") {
      setViewDate(new Date(currentYear - 1, currentMonth, 1));
    } else {
      setViewDate(new Date(currentYear, currentMonth - 1, 1));
    }
  };

  const handleNextMonth = () => {
    if (viewMode === "year") {
      setViewDate(new Date(currentYear + 12, currentMonth, 1));
    } else if (viewMode === "month") {
      setViewDate(new Date(currentYear + 1, currentMonth, 1));
    } else {
      setViewDate(new Date(currentYear, currentMonth + 1, 1));
    }
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
            
            <div className="flex items-center gap-1 text-[15px] font-semibold text-text-heading">
              {viewMode === "date" && (
                <>
                  <button type="button" onClick={() => setViewMode("month")} className="hover:text-primary transition-colors px-1 py-0.5 rounded-md hover:bg-slate-50">{MONTHS[currentMonth]}</button>
                  <button type="button" onClick={() => setViewMode("year")} className="hover:text-primary transition-colors px-1 py-0.5 rounded-md hover:bg-slate-50">{currentYear}</button>
                </>
              )}
              {viewMode === "month" && (
                <button type="button" onClick={() => setViewMode("year")} className="hover:text-primary transition-colors px-1 py-0.5 rounded-md hover:bg-slate-50">{currentYear}</button>
              )}
              {viewMode === "year" && (
                <span>{currentYear - 4} - {currentYear + 7}</span>
              )}
            </div>

            <button 
              type="button" 
              onClick={handleNextMonth}
              className="p-1 text-text-muted hover:text-text-heading hover:bg-slate-100 rounded-md transition-colors"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Date View */}
          {viewMode === "date" && (
            <>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS_OF_WEEK.map(day => (
                  <div key={day} className="w-8 h-8 flex items-center justify-center text-[13px] font-medium text-text-placeholder">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {gridCells}
              </div>
            </>
          )}

          {/* Month View */}
          {viewMode === "month" && (
            <div className="grid grid-cols-3 gap-2 py-2">
              {MONTHS.map((month, idx) => (
                <button
                  key={month}
                  type="button"
                  onClick={() => {
                    setViewDate(new Date(currentYear, idx, 1));
                    setViewMode("date");
                  }}
                  className={`py-2 rounded-xl text-sm font-medium transition-colors
                              ${currentMonth === idx ? "bg-primary text-white" : "text-text-heading hover:bg-slate-100"}`}
                >
                  {month.slice(0, 3)}
                </button>
              ))}
            </div>
          )}

          {/* Year View */}
          {viewMode === "year" && (
            <div className="grid grid-cols-3 gap-2 py-2">
              {Array.from({ length: 12 }).map((_, i) => {
                const year = currentYear - 4 + i;
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() => {
                      setViewDate(new Date(year, currentMonth, 1));
                      setViewMode("month");
                    }}
                    className={`py-2 rounded-xl text-sm font-medium transition-colors
                                ${currentYear === year ? "bg-primary text-white" : "text-text-heading hover:bg-slate-100"}`}
                  >
                    {year}
                  </button>
                );
              })}
            </div>
          )}

        </div>
      )}
    </div>
  );
}
