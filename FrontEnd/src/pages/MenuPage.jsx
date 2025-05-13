import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import MenuHeader from "../components/menu/MenuHeader";
import MenuGrid from "../components/menu/MenuGrid";
import MenuSidebar from "../components/menu/MenuSidebar";

import img1 from "../assets/img1.jpeg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.jpeg";
import img4 from "../assets/img4.jpeg";
import img5 from "../assets/img5.jpeg";
import img6 from "../assets/img6.jpeg";
import img7 from "../assets/img7.jpeg";
import img8 from "../assets/img8.jpeg";
import img9 from "../assets/img9.jpeg";

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("pizza");
  const [orderNumber, setOrderNumber] = useState("#22222");
  const [searchQuery, setSearchQuery] = useState("");
  const [showTableDropdown, setShowTableDropdown] = useState(false);
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("Guest");
  const [menuSidebarOpen, setMenuSidebarOpen] = useState(
    window.innerWidth >= 768
  );

  const location = useLocation();

  // Get URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const tableIdFromUrl = queryParams.get("table");

  // Get table data from Redux store
  const tables = useSelector((state) => state.table.tables);

  // Find the selected table from the table ID in URL
  const selectedTableObj = tables.find(
    (table) => table.id === tableIdFromUrl || table._id === tableIdFromUrl
  );

  // Create the table name (e.g., "Table 1")
  const [selectedTable, setSelectedTable] = useState(() => {
    if (selectedTableObj) {
      const tableName =
        selectedTableObj.name || selectedTableObj.number || tableIdFromUrl;
      return `Table ${tableName}`;
    }
    return "Table 1"; // Default if no table is specified
  });

  // Update selected table whenever the URL parameter changes
  useEffect(() => {
    if (tableIdFromUrl && tables.length > 0) {
      const foundTable = tables.find(
        (table) => table.id === tableIdFromUrl || table._id === tableIdFromUrl
      );

      if (foundTable) {
        const tableName =
          foundTable.name || foundTable.number || tableIdFromUrl;
        setSelectedTable(`Table ${tableName}`);
      }
    }
  }, [tableIdFromUrl, tables]);

  useEffect(() => {
    const handleResize = () => {
      setMenuSidebarOpen(window.innerWidth >= 1000);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1000) {
      setMenuSidebarOpen(false);
    }
  }, [location.pathname]);

  // Generate available tables list from Redux store
  const availableTables =
    tables.length > 0
      ? tables.map((table) => {
          const tableName = table.name || table.number || table.id || table._id;
          return `Table ${tableName}`;
        })
      : ["Table 1", "Table 2", "Table 3", "Table 4", "Table 5"];

  const toggleRightSidebar = () => {
    setMenuSidebarOpen(!menuSidebarOpen);
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
      {menuSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleRightSidebar}
        />
      )}

      <div className="flex-1 overflow-y-auto [scrollbar-width:none] [::-webkit-scrollbar]:hidden">
        <MenuHeader
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          getCategoryTitle={getCategoryTitle}
        />

        <div className="px-2 sm:px-8 pb-8">
          <MenuGrid menuItems={filteredMenuItems} addToCart={addToCart} />
        </div>
      </div>

      <button
        onClick={toggleRightSidebar}
        className="fixed top-[22%] right-0 z-10 bg-white h-20 p-1 rounded-md shadow-lg  text-primary-600 lg:hidden"
      >
        {menuSidebarOpen ? <FaTimes /> : <FaArrowLeft />}
      </button>

      <div
        className={`
          ${menuSidebarOpen ? "translate-x-0" : "translate-x-full"} 
          lg:translate-x-0 
          fixed lg:relative lg:block 
          w-80 max-w-[80vw] lg:max-w-none 
          bg-white border-l border-neutral-200
          right-0 h-full z-50
          transition-transform duration-300 ease-in-out
        `}
      >
        <MenuSidebar
          cart={cart}
          selectedTable={selectedTable}
          availableTables={availableTables}
          orderNumber={orderNumber}
          orderType={orderType}
          updateQuantity={updateQuantity}
          setSelectedTable={setSelectedTable}
          calculateTotal={calculateTotal}
          showTableDropdown={showTableDropdown}
          setShowTableDropdown={setShowTableDropdown}
          setOrderType={setOrderType}
          generateNewOrder={generateNewOrder}
          setCart={setCart}
          customerName={customerName}
          setCustomerName={setCustomerName}
          fromTableReservation={!!tableIdFromUrl}
        />
      </div>
    </div>
  );
};

export default MenuPage;
