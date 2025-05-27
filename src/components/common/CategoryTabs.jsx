import { FaPizzaSlice } from "react-icons/fa";
import { GiHotMeal, GiCupcake } from "react-icons/gi";
import { BiDrink } from "react-icons/bi";

function CategoryTabs({ categories, activeCategory, setActiveCategory }) {
  // Map of category icons
  const categoryIcons = {
    pizza: <FaPizzaSlice />,
    "main dishes": <GiHotMeal />,
    appetizers: <GiCupcake />,
    drinks: <BiDrink />,
    dinner: <GiHotMeal />,
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
            activeCategory === category.id
              ? "bg-primary-800 text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveCategory(category.id)}
        >
          <span className="text-lg">{categoryIcons[category.id]}</span>
          <span className="font-medium capitalize">{category.name}</span>
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;
