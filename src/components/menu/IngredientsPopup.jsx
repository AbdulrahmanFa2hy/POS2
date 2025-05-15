import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const IngredientsPopup = ({
  isOpen,
  onClose,
  ingredients = [],
  onSave,
  initialNote = "",
}) => {
  // Parse initial ingredients from the note
  const parseInitialIngredients = (note) => {
    if (!note) return [];
    return note.split(", ").filter(Boolean);
  };

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // Reset state when popup opens with new data
  useEffect(() => {
    if (isOpen) {
      const initialIngredients = parseInitialIngredients(initialNote);
      setSelectedIngredients(initialIngredients);
    }
  }, [isOpen, initialNote]);

  if (!isOpen) return null;

  // Convert string to array if needed
  const ingredientsList = Array.isArray(ingredients)
    ? ingredients
    : ingredients
        ?.split(",")
        .map((item) => item.trim())
        .filter(Boolean) || [];

  const handleIngredientToggle = (ingredient) => {
    const updatedIngredients = selectedIngredients.includes(ingredient)
      ? selectedIngredients.filter((i) => i !== ingredient)
      : [...selectedIngredients, ingredient];

    setSelectedIngredients(updatedIngredients);
  };

  const handleSave = () => {
    onSave({
      selectedIngredients,
      note: selectedIngredients.join(", "),
    });
    onClose();
  };

  return (
    <div className="fixed -top-16 inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl p-6 w-[28rem] max-w-[90vw] shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-neutral-800">
            Select Ingredients
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <FaTimes className="text-neutral-500" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {ingredientsList.map((ingredient, index) => (
            <button
              key={`${ingredient}-${index}`}
              onClick={() => handleIngredientToggle(ingredient)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                selectedIngredients.includes(ingredient)
                  ? "bg-primary-100 text-primary-700 border-2 border-primary-200"
                  : "bg-neutral-100 text-neutral-700 border-2 border-transparent hover:border-neutral-200"
              }`}
            >
              {ingredient}
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-neutral-200 rounded-lg text-sm hover:bg-neutral-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default IngredientsPopup;
