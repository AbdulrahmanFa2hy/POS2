import { RiSearchLine } from "react-icons/ri";
import DatePicker from "./DatePicker";

function HistoryHeader({ searchTerm, onSearchChange, onDateChange }) {
  return (
    <header className="bg-white border-b border-neutral-200 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="w-full max-w-xl relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <RiSearchLine className="text-primary-800" />
          </div>
          <input
            type="text"
            placeholder="Search Order Code"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-primary-800 placeholder:text-primary-800 rounded-lg focus:ring-1 text-primary-700 caret-primary-700 focus:ring-primary-700 focus:border-primary-700 focus:outline-none transition-all"
          />
        </div>

        <DatePicker onDateChange={onDateChange} />
      </div>
    </header>
  );
}

export default HistoryHeader;
