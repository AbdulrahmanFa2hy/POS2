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
      <div className="p-1 text-center">
        <h3 className="text-sm font-medium text-primary-800 truncate">
          {item.name}
        </h3>
        <p className="text-sm font-semibold text-neutral-700">
          {item.price} {item.currency}
        </p>
      </div>
    </div>
    // <div
    //   className="bg-white rounded-lg shadow-card transition-all duration-200 hover:shadow-hover hover:-translate-y-1 p-2 cursor-pointer animate-fade-in"
    //   onClick={() => addToCart(item)}
    // >
    //   <div className="relative overflow-hidden rounded-lg">
    //     <img
    //       src={imageUrl}
    //       alt={item.name}
    //       className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
    //     />
    //   </div>
    //   <div className="p-2 text-center">
    //     <h3 className="text-primary-700 font-medium">{item.name}</h3>
    //     <p className="text-gray-700 font-bold">
    //       {item.price} {item.currency}
    //     </p>
    //   </div>
    // </div>
  );
};

export default MenuCard;
