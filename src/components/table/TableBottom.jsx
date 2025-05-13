import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const TableBottom = () => {
  const navigate = useNavigate();
  const selectedTable = useSelector((state) => state.table.selectedTable);

  const handleReservation = () => {
    if (selectedTable) {
      // Navigate to menu page with selected table info
      navigate(`/menu?table=${selectedTable}`);
    } else {
      alert("Please select a table first");
    }
  };

  return (
    <div className="flex flex-col justify-center sm:flex-row sm:justify-between items-center flex-wrap pt-10 pb-4">
      {/* Status Legend */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 sm:w-6 sm:h-6 rounded bg-free"></div>
          <span className="text-sm">Free</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 sm:w-6 sm:h-6 rounded bg-inProgress"></div>
          <span className="text-sm">In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 sm:w-6 sm:h-6 rounded bg-completed"></div>
          <span className="text-sm">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-4 sm:w-6 sm:h-6 flex items-center justify-center border border-primary-600 rounded">
            <div className="w-3 h-1 bg-primary-600 rounded"></div>
          </div>
          <span className="text-sm">Number of chairs</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 md:mt-0 flex justify-center md:justify-end gap-4">
        <button
          className={`px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 transition-colors ${
            !selectedTable && "cursor-not-allowed bg-primary-300"
          } text-sm`}
          onClick={handleReservation}
          disabled={!selectedTable}
          title={`${selectedTable ? "book table" : "select table first"}`}
        >
          Reservation
        </button>
        <button
          className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors text-sm"
          onClick={() => navigate("/table")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TableBottom;
