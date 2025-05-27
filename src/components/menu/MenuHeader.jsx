import SearchInput from "../common/SearchInput";
import CategoryTabs from "../common/CategoryTabs";

// Utility function to get category title
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
    case "snacks":
      return "Snacks";
    default:
      return "Menu Items";
  }
};

const categories = [
  { id: "pizza", name: "pizza" },
  { id: "main dishes", name: "main dishes" },
  { id: "appetizers", name: "appetizers" },
  { id: "drinks", name: "drinks" },
  { id: "dinner", name: "dinner" },
];

const MenuHeader = ({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="p-2 sm:p-4">
      {/* Categories */}
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      {/* Header and Search */}
      <div className="flex justify-between items-center">
        <h2 className="hidden sm:block sm:text-2xl font-bold mb-3 w-1/2">
          {getCategoryTitle(activeCategory)}
        </h2>
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
      </div>
    </div>
  );
};

export default MenuHeader;
