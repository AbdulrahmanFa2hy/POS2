import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  FaSearch,
  FaMinus,
  FaPlus,
  FaUser,
  FaChevronDown,
  FaArrowLeft,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";

import img1 from "../assets/img1.jpeg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.jpeg";
import img4 from "../assets/img4.jpeg";
import img5 from "../assets/img5.jpeg";
import img6 from "../assets/img6.jpeg";
import img7 from "../assets/img7.jpeg";
import img8 from "../assets/img8.jpeg";
import img9 from "../assets/img9.jpeg";

const MenuPage = ({ sidebarOpen, toggleSidebar }) => {
  const [activeCategory, setActiveCategory] = useState("pizza");
  const [selectedTable, setSelectedTable] = useState("Table 1");
  const [orderNumber, setOrderNumber] = useState("#22222");
  const [searchQuery, setSearchQuery] = useState("");
  const [showTableDropdown, setShowTableDropdown] = useState(false);
  const [cart, setCart] = useState([]);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(
    window.innerWidth >= 768
  );
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setRightSidebarOpen(window.innerWidth >= 1000);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1000) {
      setRightSidebarOpen(false);
    }
  }, [location]);

  const availableTables = [
    "Table 1",
    "Table 2",
    "Table 3",
    "Table 4",
    "Table 5",
  ];

  const toggleRightSidebar = () => {
    setRightSidebarOpen(!rightSidebarOpen);
  };

  const [orderType, setOrderType] = useState("dine-in");

  const allMenuItems = {
    pizza: [
      {
        id: 1,
        name: "American Favorite",
        price: 46,
        currency: "AED",
        description:
          "Flaky dough, topped with rich tomato sauce, a generous layer of mozzarella cheese, smoked pepperoni slices, seasoned beef sausage, green peppers, onions, and black olives.",
        image: img1,
        category: "pizza",
      },
      {
        id: 2,
        name: "Margherita",
        price: 38,
        currency: "AED",
        description:
          "Classic pizza with tomato sauce, fresh mozzarella, and basil leaves on a thin and crispy crust.",
        image: img2,
        category: "pizza",
      },
      {
        id: 3,
        name: "BBQ Chicken",
        price: 42,
        currency: "AED",
        description:
          "Tangy BBQ sauce base topped with grilled chicken, red onions, cilantro, and a blend of mozzarella and cheddar cheeses.",
        image: img3,
        category: "pizza",
      },
      {
        id: 4,
        name: "Vegetarian Supreme",
        price: 40,
        currency: "AED",
        description:
          "Loaded with mushrooms, bell peppers, onions, olives, tomatoes, and spinach on a bed of tomato sauce and mozzarella.",
        image: img4,
        category: "pizza",
      },
    ],
    main: [
      {
        id: 5,
        name: "Grilled Salmon",
        price: 65,
        currency: "AED",
        description:
          "Fresh salmon fillet grilled to perfection, served with seasonal vegetables and lemon butter sauce.",
        image: img5,
        category: "main",
      },
      {
        id: 6,
        name: "Beef Tenderloin",
        price: 78,
        currency: "AED",
        description:
          "Premium cut beef tenderloin cooked to your preference, served with roasted potatoes and red wine reduction.",
        image: img6,
        category: "main",
      },
    ],
    appetizers: [
      {
        id: 7,
        name: "Calamari",
        price: 32,
        currency: "AED",
        description:
          "Crispy fried calamari rings served with tangy marinara sauce and lemon wedges.",
        image: img7,
        category: "appetizers",
      },
      {
        id: 8,
        name: "Caesar Salad",
        price: 28,
        currency: "AED",
        description:
          "Crisp romaine lettuce, garlic croutons, parmesan cheese, and our signature Caesar dressing.",
        image: img8,
        category: "appetizers",
      },
    ],
    drinks: [
      {
        id: 9,
        name: "Fresh Orange Juice",
        price: 18,
        currency: "AED",
        description: "Freshly squeezed orange juice, served chilled.",
        image: img9,
        category: "drinks",
      },
      {
        id: 10,
        name: "Strawberry Smoothie",
        price: 22,
        currency: "AED",
        description:
          "Blend of fresh strawberries, yogurt, and honey for a refreshing treat.",
        image: img1,
        category: "drinks",
      },
    ],
  };

  const getFilteredMenuItems = () => {
    let items = [];

    if (activeCategory && allMenuItems[activeCategory]) {
      items = allMenuItems[activeCategory];
    } else {
      items = Object.values(allMenuItems).flat();
    }

    if (searchQuery.trim() !== "") {
      return items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return items;
  };

  const addToCart = (item) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1, note: "" }]);
    }
  };

  const updateQuantity = (id, change) => {
    const item = cart.find((item) => item.id === id);
    if (item && item.quantity + change <= 0) {
      removeItem(id);
    } else {
      const updatedCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + change };
        }
        return item;
      });
      setCart(updatedCart);
    }
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCategoryTitle = () => {
    switch (activeCategory) {
      case "pizza":
        return "Pizza";
      case "main":
        return "Main Dishes";
      case "appetizers":
        return "Appetizers";
      case "drinks":
        return "Beverages";
      default:
        return "Menu Items";
    }
  };

  const filteredMenuItems = getFilteredMenuItems();

  const generateNewOrder = () => {
    const random = Math.floor(10000 + Math.random() * 90000);
    setOrderNumber(`#${random}`);
  };

  return (
    <div className="h-full flex relative">
      {rightSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleRightSidebar}
        />
      )}

      <div className="flex-1 p-2 sm:p-8 overflow-y-auto [scrollbar-width:none] [::-webkit-scrollbar]:hidden">
        <div className="flex items-center gap-4 mb-8 flex-wrap">
          <button
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              activeCategory === "pizza"
                ? "bg-primary-600 text-white"
                : "bg-white text-neutral-700"
            }`}
            onClick={() => setActiveCategory("pizza")}
          >
            <span className="text-xl">🍕</span>
            Pizza
          </button>
          <button
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              activeCategory === "main"
                ? "bg-primary-600 text-white"
                : "bg-white text-neutral-700"
            }`}
            onClick={() => setActiveCategory("main")}
          >
            <span className="text-xl">🍽️</span>
            Main dishes
          </button>
          <button
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              activeCategory === "appetizers"
                ? "bg-primary-600 text-white"
                : "bg-white text-neutral-700"
            }`}
            onClick={() => setActiveCategory("appetizers")}
          >
            <span className="text-xl">🥗</span>
            Appetizers
          </button>
          <button
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              activeCategory === "drinks"
                ? "bg-primary-600 text-white"
                : "bg-white text-neutral-700"
            }`}
            onClick={() => setActiveCategory("drinks")}
          >
            <span className="text-xl">🥤</span>
            Drinks
          </button>
        </div>

        <div className="flex justify-between items-center ">
          <h2 className="hidden sm:block sm:text-2xl font-bold mb-6">
            {getCategoryTitle()}
          </h2>
          <div className="relative mb-6 w-[70%] s ml-2 sm:ml-0 sm:w-1/2">
            <input
              type="text"
              placeholder="Search menu items..."
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenuItems.length > 0 ? (
            filteredMenuItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm">
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
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-neutral-500">
                No items found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={toggleRightSidebar}
        className="fixed top-[26%] right-0 z-50 bg-white p-2 rounded-lg shadow-md text-[#1e62b3] lg:hidden"
      >
        {rightSidebarOpen ? <FaTimes /> : <FaArrowLeft />}
      </button>

      <div
        className={`
          ${rightSidebarOpen ? "translate-x-0" : "translate-x-full"} 
          lg:translate-x-0 
          fixed lg:relative lg:block 
          w-80 max-w-[80vw] lg:max-w-none 
          bg-white border-l border-neutral-200 p-6 
          right-0 h-full z-50
          transition-transform duration-300 ease-in-out
        `}
      >
        <div className="flex justify-between">
          <div className="relative">
            <button
              className="font-medium flex items-center gap-1"
              onClick={() => setShowTableDropdown(!showTableDropdown)}
            >
              {selectedTable} <FaChevronDown className="text-xs" />
            </button>

            {showTableDropdown && (
              <div className="absolute z-10 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg w-40">
                {availableTables.map((table) => (
                  <button
                    key={table}
                    className={`w-full text-left px-3 py-2 hover:bg-neutral-50 ${
                      selectedTable === table
                        ? "font-medium text-primary-600"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedTable(table);
                      setShowTableDropdown(false);
                    }}
                  >
                    {table}
                  </button>
                ))}
              </div>
            )}
          </div>
          <p className="text-sm text-neutral-500">{orderNumber}</p>
        </div>

        <div className="space-x-2 flex justify-center items-center gap-3 mt-4 mb-6">
          <button
            className={`px-4 py-1 text-sm ${
              orderType === "dine-in"
                ? "bg-danger-600 text-white"
                : "border border-primary-600 text-primary-600"
            } rounded-lg w-1/2`}
            onClick={() => setOrderType("dine-in")}
          >
            Dine in
          </button>
          <button
            className={`px-4 py-1 text-sm ${
              orderType === "takeaway"
                ? "bg-danger-600 text-white"
                : "border border-primary-600 text-primary-600"
            } rounded-lg w-1/2`}
            onClick={() => setOrderType("takeaway")}
          >
            Take Away
          </button>
        </div>

        {cart.length > 0 ? (
          <div className="space-y-4 mb-6 h-[calc(100vh-280px)] overflow-y-auto [scrollbar-width:none] [::-webkit-scrollbar]:hidden">
            {cart.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">
                    {item.category === "pizza"
                      ? "🍕"
                      : item.category === "main"
                      ? "🍽️"
                      : item.category === "appetizers"
                      ? "🥗"
                      : item.category === "drinks"
                      ? "🥤"
                      : "🍴"}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-primary-600">
                      {item.name}
                    </h4>
                  </div>
                  {item.note && (
                    <p className="text-sm text-neutral-500">
                      Note: {item.note}
                    </p>
                  )}
                  <p className="font-medium">
                    {item.price} {item.currency}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <button
                      className="w-6 h-6 rounded-full border border-neutral-300 flex items-center justify-center"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <FaMinus className="text-xs" />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="w-6 h-6 rounded-full border border-neutral-300 flex items-center justify-center"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <FaPlus className="text-xs" />
                    </button>
                    <button className="w-6 h-6 rounded-full border border-neutral-300 flex items-center justify-center ml-auto">
                      <FaUser className="text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 mb-6]">
            <p className="text-neutral-500">Your order is empty</p>
            <p className="text-sm text-neutral-400">Add items from the menu</p>
          </div>
        )}

        {cart.length > 0 && (
          <div className="border-t border-neutral-200 pt-4 mb-6">
            <div className="flex justify-between">
              <span className="font-medium">Total</span>
              <span className="font-bold">{calculateTotal()} AED</span>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            className={`flex-1 py-2 rounded-lg transition-colors ${
              cart.length === 0
                ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                : "bg-primary-600 text-white hover:bg-primary-700"
            }`}
            disabled={cart.length === 0}
            onClick={() => {
              if (cart.length > 0) {
                alert(`Order ${orderNumber} for ${selectedTable} completed!`);
                generateNewOrder();
                setCart([]);
              }
            }}
          >
            Done
          </button>
          <button
            className={`flex-1 py-2 border rounded-lg transition-colors ${
              cart.length === 0
                ? "border-neutral-200 text-neutral-400 cursor-not-allowed"
                : "border-neutral-300 hover:bg-neutral-50"
            }`}
            onClick={() => setCart([])}
            disabled={cart.length === 0}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
