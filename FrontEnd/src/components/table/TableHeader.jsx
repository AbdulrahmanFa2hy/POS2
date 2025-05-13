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
              seatingType === "indoor"
                ? "bg-primary-600 text-white"
                : "bg-white text-neutral-700"
            }`}
            onClick={() => setSeatingType("indoor")}
          >
            Indoor
          </button>
          <button
            className={`py-2 px-4 rounded-lg transition-colors ${
              seatingType === "outdoor"
                ? "bg-primary-600 text-white"
                : "bg-white text-neutral-700"
            }`}
            onClick={() => setSeatingType("outdoor")}
          >
            Outdoor
          </button>
        </div>

        {/* Date and time display */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
          <div className="bg-white rounded-lg px-4 py-2 flex items-center gap-2">
            <FaCalendarAlt className="text-neutral-500" />
            <span>{currentDate}</span>
          </div>

          <div className="bg-white rounded-lg px-4 py-2 flex items-center gap-2">
            <FaClock className="text-neutral-500" />
            <span>{currentTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
