import MenuCard from "./MenuCard";

const MenuGrid = ({ menuItems, addToCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {menuItems.length > 0 ? (
        menuItems.map((item) => (
          <MenuCard key={item._id} item={item} addToCart={addToCart} />
        ))
      ) : (
        <div className="col-span-full text-center py-8">
          <p className="text-neutral-500">
            No items found matching your search criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default MenuGrid;
