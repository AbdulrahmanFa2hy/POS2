import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MdTableRestaurant,
  MdOutlineRestaurantMenu,
  MdDashboard,
  MdReceiptLong,
} from "react-icons/md";
import { FaHistory, FaCog, FaSignOutAlt } from "react-icons/fa";
import avatar from "../assets/avatar.png";

import { logout } from "../store/authSlice";

// Navigation links configuration
const navigationLinks = [
  {
    to: "/dashboard",
    icon: MdDashboard,
    label: "Dashboard",
  },
  {
    to: "/table",
    icon: MdTableRestaurant,
    label: "Table",
  },
  {
    to: "/menu",
    icon: MdOutlineRestaurantMenu,
    label: "Menu",
  },
  {
    to: "/order",
    icon: MdReceiptLong,
    label: "Order",
  },
  {
    to: "/history",
    icon: FaHistory,
    label: "History",
  },
  {
    to: "/setting",
    icon: FaCog,
    label: "Setting",
  },
];

// NavLink component
const SidebarNavLink = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center justify-center p-3 rounded-xl transition-all duration-200 group relative
       ${
         isActive
           ? "bg-primary-800 text-white"
           : "text-primary-800 hover:bg-[#edf4fb] hover:text-primary-800"
       }`
    }
  >
    <Icon className="text-2xl" />
    <span className="absolute left-full ml-2 bg-gray-800 text-white text-sm py-1 px-2 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
      {label}
    </span>
  </NavLink>
);

// User Avatar component
const UserAvatar = ({ user }) => {
  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return user.image ? (
    <img
      src={avatar}
      alt={user.name}
      className="w-8 h-8 rounded-full object-cover"
    />
  ) : (
    <div className="w-8 h-8 bg-[#edf4fb] rounded-full flex items-center justify-center">
      <span className="text-primary-800 text-xs font-medium">
        {getInitials(user.name)}
      </span>
    </div>
  );
};

const MainSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!user) return null;

  return (
    <aside className="w-16 h-dvh bg-white border-r border-neutral-200 flex flex-col items-center py-4">
      {/* Logo */}

      {/* Navigation */}
      <nav className="flex-1 w-full px-2 space-y-3">
        {navigationLinks.map((link) => (
          <SidebarNavLink key={link.to} {...link} />
        ))}
      </nav>

      {/* User Profile and Logout */}
      <div className="w-full px-2 space-y-3">
        <div className="flex justify-center group relative">
          <UserAvatar user={user} />
          <div className="absolute left-full ml-2 bg-gray-800 text-white text-sm py-1 px-2 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-gray-300">{user.role}</p>
          </div>
        </div>
        <button
          className="w-full flex items-center justify-center p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group relative"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="text-xl" />
          <span className="absolute left-full ml-2 bg-gray-800 text-white text-sm py-1 px-2 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
            Log out
          </span>
        </button>
      </div>
    </aside>
  );
};

export default MainSidebar;
