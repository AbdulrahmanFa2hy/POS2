import { FaSearch } from "react-icons/fa";

// Menu categories configuration
const MENU_CATEGORIES = [
  {
    id: "pizza",
    label: "Pizza",
    icon: "🍕",
  },
  { id: "dinner", label: "Dinner", icon: "🍛" },
  { id: "lunch", label: "Lunch", icon: "🥘" },
  { id: "snacks", label: "Snacks", icon: "🥨" },
  {
    id: "main",
    label: "Main dishes",
    icon: "🍖",
  },
  {
    id: "appetizers",
    label: "Appetizers",
    icon: "🥪",
  },
  {
    id: "drinks",
    label: "Drinks",
    icon: "🥤",
  },
  {
    id: "salads",
    label: "Salads",
    icon: "🥗",
  },
  {
    id: "desserts",
    label: "Desserts",
    icon: "🍰",
  },
];

const getCategoryTitle = (activeCategory) => {
  switch (activeCategory) {
    case "pizza":
      return "Pizza";
    case "main":
      return "Main Dishes";
    case "appetizers":
      return "Appetizers";
    case "salads":
      return "Salads";
    case "desserts":
      return "Desserts";
    case "dinner":
      return "Dinner";
    case "lunch":
      return "Lunch";
    case "breakfast":
      return "Breakfast";
    case "drinks":
      return "Beverages";
    default:
      return "Menu Items";
  }
};

// Category Button component
const CategoryButton = ({ category, isActive, onClick }) => (
  <button
    className={`px-4 py-2 rounded-md border border-neutral-100 shadow-md flex items-center gap-2 transition-colors duration-200 ${
      isActive
        ? "bg-primary-800 text-white"
        : "bg-white text-neutral-700 hover:bg-neutral-100"
    }`}
    onClick={onClick}
  >
    <span className="text-xl">{category.icon}</span>
    {category.label}
  </button>
);

// Search Input component
const SearchInput = ({ value, onChange }) => (
  <div className="relative mb-3 w-[70%] ml-2 sm:ml-0 sm:w-1/2">
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

const MenuHeader = ({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="p-2 sm:p-4">
      {/* Categories */}
      <div className="flex items-center gap-1 mb-4 flex-wrap">
        {MENU_CATEGORIES.map((category) => (
          <CategoryButton
            key={category.id}
            category={category}
            isActive={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
          />
        ))}
      </div>

      {/* Header and Search */}
      <div className="flex justify-between items-center">
        <h2 className="hidden sm:block sm:text-2xl font-bold mb-3">
          {getCategoryTitle?.()}
        </h2>
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
      </div>
    </div>
  );
};

export default MenuHeader;
