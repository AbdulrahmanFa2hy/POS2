import imageUrl from "../../assets/img1.jpeg";

const MenuCard = ({ item, addToCart }) => {
  return (
    <div className="bg-white rounded-xl p-2 shadow-sm">
      <img
        src={imageUrl}
        alt={item.name}
        className="w-full h-48 object-cover rounded-lg mb-2"
      />
      <h3 className="text-lg font-semibold text-primary-600 mb-1">
        {item.name}
      </h3>
      <p className="text-lg font-bold mb-1">
        {item.price} {item.currency}
      </p>
      <p className="text-sm text-neutral-600 mb-1 line-clamp-3 h-[40px]">
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
