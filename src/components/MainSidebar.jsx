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
import Tooltib from "./common/Tooltip";
import Tooltip from "./common/Tooltip";

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
    <Icon className="text-3xl lg:text-2xl" />
    <Tooltip>{label}</Tooltip>
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
      className="w-12 h-12 sm:w-9 sm:h-9 rounded-full object-cover"
    />
  ) : (
    <div className="w-12 h-12 sm:w-9 sm:h-9 bg-[#edf4fb] rounded-full flex items-center justify-center">
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
    <aside className="w-full h-dvh bg-white border-r border-neutral-200 flex flex-col items-center py-4">
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
          <Tooltip>
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-gray-300">{user.role}</p>
          </Tooltip>
        </div>
        <button
          className="w-full flex items-center justify-center p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group relative"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="text-xl" />
          <Tooltip>Log out</Tooltip>
        </button>
      </div>
    </aside>
  );
};

export default MainSidebar;
