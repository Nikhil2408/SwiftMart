import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import useUserStore from "../stores/useUserStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 border-b border-emerald-800 py-2 z-[9999]">
      <div className="flex justify-between items-center px-4">
        <Link
          to="/"
          className="text-xl font-bold text-emerald-400 items-center space-x-2 flex"
        >
          E-Commerce
        </Link>
        <div className="flex flex-wrap items-center gap-4">
          <Link to="/">Home</Link>
          {user && (
            <Link to="/cart" className="flex gap-1 items-center relative">
              <ShoppingCart size={20} />
              <span>Cart</span>
              <span className="absolute -top-3 -left-4 bg-emerald-500 rounded-full px-2 py-0.5 text-xs">
                3
              </span>
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/admin-dashboard"
              className="flex items-center gap-1 bg-emerald-500 px-2 py-1 rounded-lg"
            >
              <Lock size={17} />
              <span>Dashboard</span>
            </Link>
          )}
          {user ? (
            <button
              onClick={logout}
              className="flex items-center gap-1 bg-gray-400 px-2 py-1 rounded-lg"
            >
              <LogOut size={17} />
              <span>Logout</span>
            </button>
          ) : (
            <>
              <Link
                to="/signup"
                className="flex items-center gap-1 bg-emerald-500 px-2 py-1 rounded-lg"
              >
                <UserPlus size={17} />
                <span>Sign Up</span>
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-1 bg-gray-400 px-2 py-1 rounded-lg"
              >
                <LogIn size={17} />
                <span>Login</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
