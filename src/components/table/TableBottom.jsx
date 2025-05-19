const TableBottom = () => {
  return (
    <div className="flex flex-col justify-center sm:flex-row sm:justify-between items-center pl-4 pb-4 pt-8 absolute bottom-0 left-0">
      {/* Status Legend */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 sm:w-6 sm:h-6 rounded bg-free"></div>
          <span className="text-sm">Free</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 sm:w-6 sm:h-6 rounded bg-completed"></div>
          <span className="text-sm">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-4 sm:w-6 sm:h-6 flex items-center justify-center border border-primary-600 rounded">
            <div className="w-3 h-1 bg-primary-600 rounded"></div>
          </div>
          <span className="text-sm">Number of chairs</span>
        </div>
      </div>
    </div>
  );
};

export default TableBottom;
