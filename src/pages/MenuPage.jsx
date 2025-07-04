import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import MenuHeader from "../components/menu/MenuHeader";
import MenuGrid from "../components/menu/MenuGrid";
import MenuSidebar from "../components/menu/MenuSidebar";
import { fetchMeals } from "../store/mealSlice";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("pizza");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [menuSidebarOpen, setMenuSidebarOpen] = useState(
    window.innerWidth >= 768
  );

  const location = useLocation();
  const dispatch = useDispatch();

  // Get URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const tableIdFromUrl = queryParams.get("table");

  // Get table data from Redux store
  const tables = useSelector((state) => state.table.tables);
  const { meals, loading, error } = useSelector((state) => state.meals);

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
    return ""; // Default if no table is specified
  });

  // Fetch meals when component mounts
  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);

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

  const getFilteredMenuItems = () => {
    if (!meals) return [];

    let filteredMeals = meals;

    if (activeCategory) {
      filteredMeals = meals.filter((meal) => meal.category === activeCategory);
    }

    if (searchQuery.trim() !== "") {
      return filteredMeals.filter(
        (meal) =>
          meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          meal.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredMeals;
  };

  const addToCart = (meal) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem._id === meal._id
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...meal, quantity: 1, note: "" }]);
    }
  };

  const updateQuantity = (id, change) => {
    const item = cart.find((item) => item._id === id);
    if (item && item.quantity + change <= 0) {
      removeItem(id);
    } else {
      const updatedCart = cart.map((item) => {
        if (item._id === id) {
          return { ...item, quantity: item.quantity + change };
        }
        return item;
      });
      setCart(updatedCart);
    }
  };

  const updateItemNote = (id, note) => {
    const updatedCart = cart.map((item) => {
      if (item._id === id) {
        return { ...item, note };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const filteredMenuItems = getFilteredMenuItems();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

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
        />

        <div className="px-2 sm:px-4 pb-8">
          <MenuGrid menuItems={filteredMenuItems} addToCart={addToCart} />
        </div>
      </div>

      <button
        onClick={toggleRightSidebar}
        className="fixed top-[22%] right-0 z-10 bg-white h-16 p-[5px] text-lg border border-primary-200 rounded-tl-lg rounded-bl-lg shadow-xl text-primary-800"
      >
        {menuSidebarOpen ? <FaTimes /> : <FaArrowLeft />}
      </button>

      <div
        className={`
          ${menuSidebarOpen ? "translate-x-0" : "translate-x-full"} 
          lg:translate-x-0 
          fixed lg:relative lg:block 
          w-96 max-w-[80vw] lg:max-w-none 
          bg-white border-l border-neutral-200
          right-0 h-full z-50
          transition-transform duration-300 ease-in-out
        `}
      >
        <MenuSidebar
          cart={cart}
          selectedTable={selectedTable}
          availableTables={availableTables}
          updateQuantity={updateQuantity}
          updateItemNote={updateItemNote}
          setSelectedTable={setSelectedTable}
          calculateTotal={calculateTotal}
          setCart={setCart}
          fromTableReservation={!!tableIdFromUrl}
        />
      </div>
    </div>
  );
};

export default MenuPage;
