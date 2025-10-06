import React, { useEffect } from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import useUserStore from "./stores/useUserStore";
import LoadingSpinner from "./components/LoadingSpinner";
import { LoaderCircle } from "lucide-react";
import AdminDashboard from "./pages/AdminDashboard";

const RequireAuth = ({ children }) => {
  const { user } = useUserStore();
  return user ? children : <Navigate to="/login" replace />;
};

const AuthOnly = ({ children }) => {
  const { user } = useUserStore();
  return user ? <Navigate to="/" replace /> : children;
};

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

function App() {
  const { checkAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(74, 179, 149, 0.2)_45%,rgba(0,0,0,0.1)_100%)]" />
        </div>
      </div>
      <div className="relative z-50 pt-25">
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
