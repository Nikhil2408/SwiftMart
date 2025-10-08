import React, { useEffect } from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import useUserStore from "./stores/useUserStore";
import { LoaderCircle } from "lucide-react";
import AdminDashboard from "./pages/AdminDashboard";

// eslint-disable-next-line react-refresh/only-export-components
const RequireAuth = ({ children }) => {
  const { user } = useUserStore();
  return user ? children : <Navigate to="/login" replace />;
};

// eslint-disable-next-line react-refresh/only-export-components
const AuthOnly = ({ children }) => {
  const { user } = useUserStore();
  return user ? <Navigate to="/" replace /> : children;
};

// eslint-disable-next-line react-refresh/only-export-components
const RequireAdmin = ({ children }) => {
  const { user } = useUserStore();
  const role = user?.role;
  return role === "admin" ? children : <Navigate to="/login" replace />;
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <RequireAuth>
            <Home />
          </RequireAuth>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthOnly>
            <Signup />
          </AuthOnly>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthOnly>
            <Login />
          </AuthOnly>
        ),
      },
      {
        path: "/admin-dashboard",
        element: (
          <RequireAdmin>
            <AdminDashboard />
          </RequireAdmin>
        ),
      },
    ],
  },
]);

// eslint-disable-next-line react-refresh/only-export-components
function App() {
  const { checkAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 bg-gray-900" />

      {/* --- ELLIPTICAL GRADIENTS --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-center glow */}
        <div
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[100%] h-[80%] 
          bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.45)_0%,transparent_70%)]
          blur-3xl opacity-80"
        />
        {/* Bottom-left glow */}
        <div
          className="absolute bottom-[-20%] left-[10%] w-[70%] h-[70%]
          bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.35)_0%,transparent_80%)]
          blur-3xl opacity-60"
        />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 pt-20">
        <Navbar />
        {checkingAuth ? (
          <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
            <LoaderCircle
              size={120}
              className="animate-spin text-emerald-400"
            />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

export default appRouter;
