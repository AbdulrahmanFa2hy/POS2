import { FaSearch } from "react-icons/fa";

// Search Input component
const SearchInput = ({ value, onChange }) => (
  <div className="relative w-full">
    <input
      type="text"
      placeholder="Search menu items..."
      className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 text-primary-900 focus:ring-primary-700 focus:border-primary-700"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
  </div>
);

export default SearchInput;
