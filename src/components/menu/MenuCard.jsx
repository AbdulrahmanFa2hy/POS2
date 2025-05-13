const MenuCard = ({ item, addToCart }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold text-primary-600 mb-1">
        {item.name}
      </h3>
      <p className="text-lg font-bold mb-2">
        {item.price} {item.currency}
      </p>
      <p className="text-sm text-neutral-600 mb-4 line-clamp-3">
        {item.description}
      </p>
      <button
        className="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        onClick={() => addToCart(item)}
      >
        Add to Order
      </button>
    </div>
  );
};

export default MenuCard;
