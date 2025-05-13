import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import TableHeader from "../components/table/TableHeader";
import TableGrid from "../components/table/TableGrid";
import TableSidebar from "../components/table/TableSidebar";
import { fetchTables, selectTable } from "../store/tableSlice";

// Sample reservations data for demo
const reservationsData = [
  { id: 1, table: "1", name: "Ali Adel", people: 4, time: "2:30pm" },
  { id: 2, table: "2", name: "Gamal Mohamed", people: 4, time: "2:30pm" },
  { id: 3, table: "5", name: "Youssef Karam", people: 4, time: "2:30pm" },
  { id: 4, table: "1", name: "Gamal Mohamed", people: 4, time: "3:30pm" },
  { id: 5, table: "2", name: "Waleed Osama", people: 4, time: "3:30pm" },
  { id: 6, table: "6", name: "Waleed Osama", people: 4, time: "3:30pm" },
];

const TablePage = () => {
  const [seatingType, setSeatingType] = useState("indoor");
  // Set tableSidebarOpen to false by default on small screens and true on large screens and up
  const [tableSidebarOpen, setTableSidebarOpen] = useState(
    window.innerWidth >= 1024
  );
  const location = useLocation();
  const dispatch = useDispatch();

  // Get tables data from Redux store
  const { tables, loading, error } = useSelector((state) => state.table);

  // Fetch tables when component mounts
  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

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
    dispatch(selectTable(tableId));
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
        <TableHeader
          seatingType={seatingType}
          setSeatingType={setSeatingType}
        />

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <div className="flex-1 overflow-y-auto ">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <p>Loading tables...</p>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-red-500">Error: {error}</p>
              </div>
            ) : (
              <TableGrid tables={tables} onSelectTable={handleSelectTable} />
            )}
          </div>
        </div>
      </div>

      {/* Right sidebar toggle button */}
      <button
        onClick={toggleRightSidebar}
        className="fixed top-[22%] right-0 z-10 bg-white h-20 p-1 rounded-md shadow-lg text-primary-600 lg:hidden"
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
        <TableSidebar reservations={reservationsData} />
      </div>
    </div>
  );
};

export default TablePage;
