import { useState, useRef, useEffect } from "react";
import { format, addDays, subDays } from "date-fns";
import { RiSearchLine, RiCalendarLine, RiArrowDownSLine } from "react-icons/ri";

function Header({ searchTerm, onSearchChange, selectedDate, onDateChange }) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleDateSelection = (newDate) => {
    onDateChange(newDate);
    setIsCalendarOpen(false);
  };

  const today = new Date();
  const dateOptions = [
    format(subDays(today, 2), "d MMM, yyyy"),
    format(subDays(today, 1), "d MMM, yyyy"),
    format(today, "d MMM, yyyy"),
    format(addDays(today, 1), "d MMM, yyyy"),
    format(addDays(today, 2), "d MMM, yyyy"),
  ];

  return (
    <header className="bg-white border-b border-neutral-200 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="w-full max-w-xl relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <RiSearchLine className="text-neutral-400" />
          </div>
          <input
            type="text"
            placeholder="Search Order Code"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
          />
        </div>

        <div className="relative" ref={calendarRef}>
          <button
            onClick={toggleCalendar}
            className="flex items-center space-x-2 border border-neutral-300 rounded-lg px-4 py-2 bg-white hover:bg-neutral-50 transition-colors"
          >
            <RiCalendarLine className="text-neutral-500" />
            <span>{selectedDate}</span>
            <RiArrowDownSLine
              className={`text-neutral-500 transition-transform duration-200 ${
                isCalendarOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isCalendarOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-neutral-200 z-10 animate-fade-in">
              <div className="p-3">
                <p className="text-sm font-medium text-neutral-500 mb-2">
                  Select Date
                </p>
                <div className="space-y-1">
                  {dateOptions.map((date) => (
                    <button
                      key={date}
                      onClick={() => handleDateSelection(date)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedDate === date
                          ? "bg-primary-100 text-primary-700"
                          : "hover:bg-neutral-100"
                      }`}
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
