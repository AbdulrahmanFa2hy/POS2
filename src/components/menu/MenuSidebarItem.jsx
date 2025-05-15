import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import IngredientsPopup from "./IngredientsPopup";

// Category icons mapping
const CATEGORY_ICONS = {
  pizza: "🍕",
  dinner: "🍛",
  lunch: "🥘",
  snacks: "🥨",
  main: "🍖",
  appetizers: "🥪",
  drinks: "🥤",
  desserts: "🍰",
  salads: "🥗",
  default: "🍴",
};

// Quantity Control Button component
const QuantityButton = ({ onClick, disabled, icon: Icon }) => (
  <button
    className="w-7 h-7 rounded-full border border-neutral-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50 transition-colors"
    onClick={onClick}
    disabled={disabled}
  >
    <Icon className="text-xs text-neutral-600" />
  </button>
);

// Note Button component
const NoteButton = ({ hasNote, onClick }) => (
  <button
    className={`ml-2 p-1.5 rounded-full hover:bg-neutral-50 transition-colors ${
      hasNote ? "text-primary-600" : "text-neutral-500"
    }`}
    onClick={onClick}
  >
    <MdOutlineSpeakerNotes className="text-current" />
  </button>
);

// Item Details component
const ItemDetails = ({ name, price, currency, note }) => (
  <div>
    <h4 className="font-medium text-primary-600 truncate">{name}</h4>
    <p className="font-medium text-sm text-neutral-600">
      {price} {currency}
    </p>
    {note && (
      <div className="mt-1.5">
        <p className="text-xs text-primary-600 font-medium">{note}</p>
      </div>
    )}
  </div>
);

const MenuSidebarItem = ({ item, updateQuantity, updateItemNote }) => {
  const [showIngredientsPopup, setShowIngredientsPopup] = useState(false);

  const handleQuantityChange = (change) => {
    const newQuantity = (item.quantity || 0) + change;
    if (newQuantity >= 0) {
      updateQuantity(item.id || item._id, change);
    }
  };

  const handleSaveIngredients = ({ note }) => {
    updateItemNote(item.id || item._id, note);
  };

  const categoryIcon = CATEGORY_ICONS[item.category] || CATEGORY_ICONS.default;

  return (
    <>
      <div className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm border border-neutral-100">
        {/* Category Icon */}
        <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
          <span className="text-2xl">{categoryIcon}</span>
        </div>

        <div className="flex-1 min-w-0">
          {/* Item Header */}
          <div className="flex justify-between items-start">
            <ItemDetails
              name={item.name}
              price={item.price}
              currency={item.currency}
              note={item.note}
            />
            <NoteButton
              hasNote={!!item.note}
              onClick={() => setShowIngredientsPopup(true)}
            />
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3 mt-2">
            <QuantityButton
              onClick={() => handleQuantityChange(-1)}
              disabled={!item.quantity || item.quantity <= 0}
              icon={FaMinus}
            />
            <span className="w-5 text-center font-medium">
              {item.quantity || 0}
            </span>
            <QuantityButton
              onClick={() => handleQuantityChange(1)}
              disabled={false}
              icon={FaPlus}
            />
          </div>
        </div>
      </div>

      {/* Ingredients Popup */}
      <IngredientsPopup
        isOpen={showIngredientsPopup}
        onClose={() => setShowIngredientsPopup(false)}
        ingredients={item.ingredients || []}
        onSave={handleSaveIngredients}
        initialNote={item.note || ""}
      />
    </>
  );
};

export default MenuSidebarItem;
