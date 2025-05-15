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
import avatar from "../assets/avatar.png";

import { logout } from "../store/authSlice";

// Navigation links configuration
const navigationLinks = [
  {
    to: "/dashboard",
    icon: FaTh,
    label: "Dashboard",
  },
  {
    to: "/table",
    icon: FaUtensils,
    label: "Table",
  },
  {
    to: "/menu",
    icon: FaBook,
    label: "Menu",
  },
  {
    to: "/order",
    icon: FaShoppingCart,
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
      `flex items-center gap-3 px-5 sm:px-3 py-3 text-lg font-medium rounded-lg transition-all duration-200 
       ${
         isActive
           ? "bg-[#1e62b3] text-white"
           : "text-[#1e62b3] hover:bg-[#edf4fb] hover:text-[#1e62b3]"
       }`
    }
  >
    <Icon className="text-xl" />
    <span>{label}</span>
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
      // src={user.image || avatar}
      src={avatar}
      alt={user.name}
      className="w-12 h-12 rounded-full object-cover"
    />
  ) : (
    <div className="w-12 h-12 bg-[#edf4fb] rounded-full flex items-center justify-center">
      <span className="text-[#1e62b3] font-medium">
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
    <aside className="w-full lg:w-56 h-dvh bg-white border-r border-neutral-200 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6">
        <h1 className="text-3xl font-bold text-[#1e62b3]">Yoomy</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 sm:px-4 space-y-2">
        {navigationLinks.map((link) => (
          <SidebarNavLink key={link.to} {...link} />
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 md:p-2 border-t border-neutral-200">
        <div className="flex items-center gap-3 p-2">
          <UserAvatar user={user} />
          <div>
            <h3 className="font-medium text-neutral-800">{user.name}</h3>
            <p className="text-sm text-neutral-500">{user.role}</p>
          </div>
        </div>

        {/* Logout Button */}
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

export default MainSidebar;
