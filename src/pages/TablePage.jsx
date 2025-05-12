import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import Header from "../components/Header";
import TableGrid from "../components/TableGrid";
import ReservationList from "../components/ReservationList";

// Sample data
const tablesData = [
  { id: 1, name: "T1", status: "free", chairs: 2 },
  { id: 2, name: "T2", status: "completed", chairs: 3 },
  { id: 3, name: "T3", status: "inProgress", chairs: 2 },
  { id: 4, name: "T2", status: "completed", chairs: 2 },
  { id: 5, name: "T1", status: "free", chairs: 2 },
  { id: 6, name: "T3", status: "inProgress", chairs: 4 },
  { id: 7, name: "T1", status: "free", chairs: 4 },
  { id: 8, name: "T2", status: "completed", chairs: 3 },
  { id: 9, name: "T3", status: "inProgress", chairs: 4 },
];

const reservationsData = [
  { id: 1, table: "T1", name: "Ali Adel", people: 4, time: "2:30pm" },
  { id: 2, table: "T2", name: "Ali Adel", people: 4, time: "2:30pm" },
  { id: 3, table: "T5", name: "Ali Adel", people: 4, time: "2:30pm" },
  { id: 4, table: "T1", name: "Ali Adel", people: 4, time: "3:30pm" },
  { id: 5, table: "T2", name: "Ali Adel", people: 4, time: "3:30pm" },
  { id: 6, table: "T6", name: "Ali Adel", people: 4, time: "3:30pm" },
];

const TablePage = () => {
  const [seatingType, setSeatingType] = useState("indoor");
  // selectedTable will be used for future functionality to handle table operations
  const [selectedTable, setSelectedTable] = useState(null); // eslint-disable-line no-unused-vars
  // Set rightSidebarOpen to false by default on small screens and true on large screens and up
  const [tableSidebarOpen, setTableSidebarOpen] = useState(
    window.innerWidth >= 1024
  );
  const location = useLocation();

  // Check window size on initial render and set sidebar state accordingly
  useEffect(() => {
    const handleResize = () => {
      // On large screens and up (lg breakpoint is typically 1024px), auto-open the sidebar
      setTableSidebarOpen(window.innerWidth >= 1024);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handler right away to set initial state
    handleResize();

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar when location changes (page navigation)
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setTableSidebarOpen(false);
    }
  }, [location]);

  const handleSelectTable = (tableId) => {
    setSelectedTable(tableId);
  };

  const toggleRightSidebar = () => {
    setTableSidebarOpen(!tableSidebarOpen);
  };

  return (
    <div className="h-full flex justify-between relative">
      {/* Overlay for right sidebar when open on mobile */}
      {tableSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleRightSidebar}
        />
      )}

      <div className="flex flex-col w-full">
        <Header seatingType={seatingType} setSeatingType={setSeatingType} />

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <div className="flex-1 overflow-y-auto pb-8">
            <TableGrid tables={tablesData} onSelectTable={handleSelectTable} />
          </div>
        </div>
      </div>

      {/* Right sidebar toggle button */}
      <button
        onClick={toggleRightSidebar}
        className="fixed top-[26%] right-0 z-50 bg-white p-2 rounded-lg shadow-md text-[#1e62b3] lg:hidden"
      >
        {tableSidebarOpen ? <FaTimes /> : <FaArrowLeft />}
      </button>

      {/* Reservation list - right sidebar */}
      <div
        className={`
        ${tableSidebarOpen ? "translate-x-0" : "translate-x-full"} 
        lg:translate-x-0 
        fixed lg:relative lg:block 
        w-96 max-w-[85vw] lg:max-w-none 
        border-t lg:border-t-0 lg:border-l border-neutral-200 
        bg-white
        overflow-y-auto h-[100vh] 
        right-0 z-50
        transition-transform duration-300 ease-in-out
      `}
      >
        <ReservationList reservations={reservationsData} />
      </div>
    </div>
  );
};

export default TablePage;
