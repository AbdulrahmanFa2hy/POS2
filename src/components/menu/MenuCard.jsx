import imageUrl from "../../assets/img1.jpeg";

const MenuCard = ({ item, addToCart }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer active:scale-95 transition-all duration-75"
      onClick={() => addToCart(item)}
    >
      <img
        src={imageUrl}
        alt={item.name}
        className="w-full h-20 object-cover rounded-t-md"
      />
      <div className="p-1 ">
        <h3 className="text-sm font-medium text-primary-800 truncate">
          {item.name}
        </h3>
        <p className="text-sm font-semibold text-neutral-700">
          {item.price} {item.currency}
        </p>
      </div>
    </div>
  );
};

export default MenuCard;
