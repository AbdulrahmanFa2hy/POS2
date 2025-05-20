const TableBottom = ({ freeTables, occupiedTables }) => {
  return (
    <div className="flex flex-wrap gap-4 bg-neutral-50 w-full pb-4 pt-8 xl:fixed bottom-0">
      {/* Status Legend */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 sm:w-6 sm:h-6 rounded bg-free"></div>
        <span className="text-sm">Free ({freeTables.length})</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 sm:w-6 sm:h-6 rounded bg-completed"></div>
        <span className="text-sm">Booked ({occupiedTables.length})</span>
      </div>
    </div>
  );
};

export default TableBottom;
