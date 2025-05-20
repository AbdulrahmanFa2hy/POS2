import { useState, useRef, useEffect } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isWithinInterval,
  isSameMonth,
} from "date-fns";
import {
  RiCalendarLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiArrowDownSLine,
} from "react-icons/ri";

function DatePicker({ onDateChange }) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateClick = (date) => {
    if (!startDate || (startDate && endDate)) {
      // Start new range
      setStartDate(date);
      setEndDate(null);
      handleDateChange(date, null);
    } else {
      // Complete the range
      if (date < startDate) {
        setStartDate(date);
        setEndDate(startDate);
        handleDateChange(date, startDate);
      } else {
        setEndDate(date);
        handleDateChange(startDate, date);
      }
    }
  };

  const handleDateChange = (start, end) => {
    if (start && end) {
      const formattedStart = format(start, "d MMM, yyyy");
      const formattedEnd = format(end, "d MMM, yyyy");
      onDateChange(`${formattedStart} - ${formattedEnd}`);
    } else if (start) {
      onDateChange(format(start, "d MMM, yyyy"));
    } else {
      onDateChange("");
    }
  };

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    onDateChange("");
  };

  const handleClose = () => {
    setIsCalendarOpen(false);
  };

  const getDisplayDate = () => {
    if (!startDate) return "Select Date";
    if (!endDate) return format(startDate, "d MMM, yyyy");
    return `${format(startDate, "d MMM")} - ${format(endDate, "d MMM")}`;
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const isInRange = (date) => {
    if (!startDate) return false;
    if (!endDate && hoverDate) {
      return isWithinInterval(date, {
        start: startDate < hoverDate ? startDate : hoverDate,
        end: startDate < hoverDate ? hoverDate : startDate,
      });
    }
    if (endDate) {
      return isWithinInterval(date, {
        start: startDate,
        end: endDate,
      });
    }
    return false;
  };

  const getDayClassName = (date) => {
    const baseClass =
      "w-9 h-9 rounded-full flex items-center justify-center text-sm transition-colors";
    const isSelected =
      (startDate && isSameDay(date, startDate)) ||
      (endDate && isSameDay(date, endDate));
    const isInCurrentMonth = isSameMonth(date, currentDate);

    if (isSelected) {
      return `${baseClass} bg-primary-700 text-white font-medium`;
    }
    if (isInRange(date)) {
      return `${baseClass} bg-primary-100 text-primary-700`;
    }
    if (!isInCurrentMonth) {
      return `${baseClass} text-neutral-300`;
    }
    return `${baseClass} hover:bg-neutral-100 text-primary-800`;
  };

  return (
    <div className="relative" ref={calendarRef}>
      <button
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        className="flex items-center space-x-2 border border-primary-700 rounded-lg px-4 py-2 bg-white hover:bg-neutral-100 transition-colors min-w-[200px]"
      >
        <RiCalendarLine className="text-primary-800" />
        <span className="text-primary-800 flex-1 text-left">
          {getDisplayDate()}
        </span>
        <RiArrowDownSLine
          className={`text-primary-800 transition-transform duration-200 ${
            isCalendarOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isCalendarOpen && (
        <div className="absolute right-0 mt-2 p-4 bg-white rounded-lg shadow-lg border border-neutral-200 z-10 animate-fade-in min-w-[280px]">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrevMonth}
              className="p-1 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <RiArrowLeftSLine className="w-5 h-5 text-primary-700" />
            </button>
            <span className="text-primary-800 font-medium">
              {format(currentDate, "MMMM yyyy")}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <RiArrowRightSLine className="w-5 h-5 text-primary-700" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
              <div
                key={day}
                className="w-9 h-9 flex items-center justify-center text-xs font-medium text-primary-600"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {monthDays.map((date) => (
              <button
                key={date.toISOString()}
                onClick={() => handleDateClick(date)}
                onMouseEnter={() => setHoverDate(date)}
                onMouseLeave={() => setHoverDate(null)}
                className={getDayClassName(date)}
              >
                {format(date, "d")}
              </button>
            ))}
          </div>

          <div className="mt-4 flex justify-between">
            <button
              onClick={handleClear}
              className="text-sm text-primary-700 hover:text-primary-800 font-medium"
            >
              Clear
            </button>
            <button
              onClick={handleClose}
              className="text-sm text-primary-700 hover:text-primary-800 font-medium"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DatePicker;
