import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { RiRestaurant2Fill } from "react-icons/ri";
import IngredientsPopup from "./IngredientsPopup";
import image from "../../assets/img1.jpeg";
// Item Details component
const ItemDetails = ({ name, price, currency, note }) => (
  <div>
    <h4 className="font-medium text-primary-800 truncate">{name}</h4>
    <p className="font-medium text-sm text-neutral-600">
      {price} {currency}
    </p>
    {note && (
      <div className="mt-1.5">
        <p className="text-xs text-primary-800 font-medium">{note}</p>
      </div>
    )}
  </div>
);

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
      hasNote ? "text-primary-800" : "text-neutral-500"
    }`}
    onClick={onClick}
  >
    <MdOutlineSpeakerNotes className="text-current" />
  </button>
);

const MenuSidebarItem = ({ item, updateQuantity, updateItemNote }) => {
  const [showIngredientsPopup, setShowIngredientsPopup] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleQuantityChange = (change) => {
    const newQuantity = (item.quantity || 0) + change;
    if (newQuantity >= 0) {
      updateQuantity(item.id || item._id, change);
    }
  };

  const handleSaveIngredients = ({ note }) => {
    updateItemNote(item.id || item._id, note);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <div className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm ">
        {/* Meal Image */}
        <div className="w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center bg-primary-50">
          {!imageError && image ? (
            <img
              src={image}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <RiRestaurant2Fill className="text-2xl text-primary-300" />
            </div>
          )}
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
