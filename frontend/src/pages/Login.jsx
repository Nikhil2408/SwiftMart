import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Mail, Key, Loader, LogIn, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import useUserStore from "../stores/useUserStore";
import { Toaster } from "react-hot-toast";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { login, loading } = useUserStore();

  function changeHandler(e) {
    setLoginData((currentState) => {
      return { ...currentState, [e.target.name]: e.target.value };
    });
    setErrors((currentState) => {
      return { ...currentState, [e.target.name]: "" };
    });
  }

  function handleLogin() {
    if (!loginData.email) {
      setErrors((currentState) => {
        return { ...currentState, email: "Required" };
      });
    } else if (!loginData.password) {
      setErrors((currentState) => {
        return { ...currentState, password: "Required" };
      });
    } else {
      login(loginData);
    }
  }

  return (
    <div className="flex flex-col items-center mt-5 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-emerald-500 font-bold text-3xl">
          Login to your account
        </h3>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="rounded-xl flex flex-col bg-gray-900 py-8 px-6 mt-6 w-2/3 lg:w-1/3"
      >
        {/* Email input field */}
        <label className="font-bold" htmlFor="email">
          Email address
        </label>
        <div className="relative">
          <input
            id="email"
            className="bg-gray-600 py-2 pl-9 pr-4 rounded-lg mt-2 mb-1 outline-none w-full"
            type="email"
            name="email"
            placeholder="Enter your email address"
            onChange={changeHandler}
            value={loginData.email}
          />
          <p className="text-red-500 mb-4">{errors && errors.email}</p>
          <Mail className="absolute top-4.5 left-2" size={20} />
        </div>

        {/* Password input field */}
        <label className="font-bold" htmlFor="password">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            className="bg-gray-600 py-2 pl-9 pr-4 rounded-lg mt-2 mb-1 outline-none w-full"
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={changeHandler}
            value={loginData.password}
          />
          <p className="text-red-500 mb-4">{errors && errors.password}</p>
          <Key className="absolute top-4.5 left-2" size={20} />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          onClick={handleLogin}
          className="flex justify-center items-center gap-2 bg-emerald-500 py-2.5 rounded-lg font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader className="animate-spin" size={20} />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <LogIn size={20} />
              <span>Log In</span>
            </>
          )}
        </button>
      </motion.div>
      <p className="text-lg mt-4">
        Not a member?{" "}
        <Link className="text-emerald-500" to="/signup">
          Signup here{" "}
        </Link>
        <MoveRight className="inline-block text-emerald-500" />
      </p>
      <Toaster />
    </div>
  );
};

export default Login;
