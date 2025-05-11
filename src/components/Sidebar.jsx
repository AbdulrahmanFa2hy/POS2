import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaTh,
  FaUtensils,
  FaBook,
  FaShoppingCart,
  FaHistory,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { logout } from "../store/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Get first letters of name for avatar
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <aside className="w-56 bg-white border-r border-neutral-200 flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-3xl font-bold text-[#1e62b3]">Yoomy</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-3 text-lg font-medium rounded-lg transition-all duration-200 
             ${
               isActive
                 ? "bg-[#1e62b3] text-white"
                 : "text-[#1e62b3] hover:bg-[#edf4fb] hover:text-[#1e62b3]"
             }`
          }
        >
          <FaTh className="text-xl" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/table"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-3 text-lg font-medium rounded-lg transition-all duration-200 
             ${
               isActive
                 ? "bg-[#1e62b3] text-white"
                 : "text-[#1e62b3] hover:bg-[#edf4fb] hover:text-[#1e62b3]"
             }`
          }
        >
          <FaUtensils className="text-xl" />
          <span>Table</span>
        </NavLink>

        <NavLink
          to="/menu"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-3 text-lg font-medium rounded-lg transition-all duration-200 
             ${
               isActive
                 ? "bg-[#1e62b3] text-white"
                 : "text-[#1e62b3] hover:bg-[#edf4fb] hover:text-[#1e62b3]"
             }`
          }
        >
          <FaBook className="text-xl" />
          <span>Menu</span>
        </NavLink>

        <NavLink
          to="/order"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-3 text-lg font-medium rounded-lg transition-all duration-200 
             ${
               isActive
                 ? "bg-[#1e62b3] text-white"
                 : "text-[#1e62b3] hover:bg-[#edf4fb] hover:text-[#1e62b3]"
             }`
          }
        >
          <FaShoppingCart className="text-xl" />
          <span>Order</span>
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-3 text-lg font-medium rounded-lg transition-all duration-200 
             ${
               isActive
                 ? "bg-[#1e62b3] text-white"
                 : "text-[#1e62b3] hover:bg-[#edf4fb] hover:text-[#1e62b3]"
             }`
          }
        >
          <FaHistory className="text-xl" />
          <span>History</span>
        </NavLink>

        <NavLink
          to="/setting"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-3 text-lg font-medium rounded-lg transition-all duration-200 
             ${
               isActive
                 ? "bg-[#1e62b3] text-white"
                 : "text-[#1e62b3] hover:bg-[#edf4fb] hover:text-[#1e62b3]"
             }`
          }
        >
          <FaCog className="text-xl" />
          <span>Setting</span>
        </NavLink>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-neutral-200">
        <div className="flex items-center gap-3 p-2">
          <div className="w-10 h-10 bg-[#edf4fb] rounded-full flex items-center justify-center">
            <span className="text-[#1e62b3] font-medium">
              {getInitials(user?.name || "User")}
            </span>
          </div>
          <div>
            <h3 className="font-medium text-neutral-800">
              {user?.name || "User"}
            </h3>
            <p className="text-sm text-neutral-500">{user?.role || "Waiter"}</p>
          </div>
        </div>

        <button
          className="mt-4 w-full flex items-center justify-center gap-2 bg-[#c0271c] text-white px-4 py-2 font-medium rounded-lg hover:bg-red-700 transition-all"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
