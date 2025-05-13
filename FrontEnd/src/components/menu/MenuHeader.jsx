import { FaSearch } from "react-icons/fa";

const MenuHeader = ({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  getCategoryTitle,
}) => {
  return (
    <div className="p-2 sm:p-8">
      <div className="flex items-center gap-4 mb-8 flex-wrap">
        <button
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            activeCategory === "pizza"
              ? "bg-primary-600 text-white"
              : "bg-white text-neutral-700"
          }`}
          onClick={() => setActiveCategory("pizza")}
        >
          <span className="text-xl">🍕</span>
          Pizza
        </button>
        <button
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            activeCategory === "main"
              ? "bg-primary-600 text-white"
              : "bg-white text-neutral-700"
          }`}
          onClick={() => setActiveCategory("main")}
        >
          <span className="text-xl">🍽️</span>
          Main dishes
        </button>
        <button
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            activeCategory === "appetizers"
              ? "bg-primary-600 text-white"
              : "bg-white text-neutral-700"
          }`}
          onClick={() => setActiveCategory("appetizers")}
        >
          <span className="text-xl">🥗</span>
          Appetizers
        </button>
        <button
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            activeCategory === "drinks"
              ? "bg-primary-600 text-white"
              : "bg-white text-neutral-700"
          }`}
          onClick={() => setActiveCategory("drinks")}
        >
          <span className="text-xl">🥤</span>
          Drinks
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="hidden sm:block sm:text-2xl font-bold mb-6">
          {getCategoryTitle && getCategoryTitle()}
        </h2>
        <div className="relative mb-6 w-[70%] s ml-2 sm:ml-0 sm:w-1/2">
          <input
            type="text"
            placeholder="Search menu items..."
            className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
        </div>
      </div>
    </div>
  );
};

export default MenuHeader;
