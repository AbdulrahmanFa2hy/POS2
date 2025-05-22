import { useState, useEffect } from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

const TableHeader = ({ seatingType, setSeatingType }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  // Get and format current date and time
  useEffect(() => {
    // Set current date
    const now = new Date();
    const options = { year: "numeric", month: "short", day: "numeric" };
    setCurrentDate(now.toLocaleDateString("en-US", options));

    // Update time immediately and then every minute
    const updateTime = () => {
      const timeNow = new Date();
      const timeOptions = { hour: "numeric", minute: "2-digit", hour12: true };
      setCurrentTime(timeNow.toLocaleTimeString("en-US", timeOptions));
    };

    updateTime(); // Call immediately

    // Update time every minute
    const intervalId = setInterval(updateTime, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="px-4 sm:px-16 lg:px-6 py-4 sm:py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Seating type selection */}
        <div className="flex gap-2 justify-center md:justify-start">
          <button
            className={`py-2 px-4 rounded-lg transition-colors ${
              seatingType === "inside"
                ? "bg-primary-700 text-white"
                : "bg-white text-primary-800 border border-primary-800"
            }`}
            onClick={() => setSeatingType("inside")}
          >
            Indoor
          </button>
          <button
            className={`py-2 px-4 rounded-lg transition-colors ${
              seatingType === "outside"
                ? "bg-primary-700 text-white"
                : "bg-white text-primary-800 border border-primary-800"
            }`}
            onClick={() => setSeatingType("outside")}
          >
            Outdoor
          </button>
        </div>

        {/* Date and time display */}
        <div className="hidden md:flex flex-wrap items-center justify-center md:justify-start gap-2">
          <div className="bg-neutral-100 text-primary-800 border border-primary-800 rounded-lg px-4 py-2 flex items-center gap-2">
            <FaCalendarAlt className="text-primary-800" />
            <span>{currentDate}</span>
          </div>

          <div className="bg-neutral-100 text-primary-800 border border-primary-800 rounded-lg px-4 py-2 flex items-center gap-2">
            <FaClock className="text-primary-800" />
            <span>{currentTime}</span>
          </div>
        </div>

        {/* Status Indicators */}
        {/* <div className="flex justify-center gap-2 sm:gap-3">
          <div className="inline-flex items-center px-2 sm:px-3 py-1 bg-danger-50 text-danger-600 opacity-90 text-sm font-medium rounded-full">
            Reserved (3)
          </div>
          <div className="inline-flex items-center px-2 sm:px-3 py-1 bg-warning-50 text-warning-600 opacity-90 text-sm font-medium rounded-full">
            In progress (3)
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TableHeader;
