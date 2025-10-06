import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserPlus,
  MoveRight,
  User,
  Mail,
  Key,
  Eye,
  Loader,
} from "lucide-react";
import { motion } from "framer-motion";
import useUserStore from "../stores/useUserStore";
import { Toaster } from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const { signup, loading } = useUserStore();

  function changeHandler(e) {
    setFormData((currentState) => {
      return { ...currentState, [e.target.name]: e.target.value };
    });
    setErrors((currentState) => {
      return { ...currentState, [e.target.name]: "" };
    });
  }

  function checkValidations() {
    const errorObj = {};
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        errorObj[field] = `Required`;
      }
    });
    setErrors(errorObj);
  }

  function handleSignUp(e) {
    e.preventDefault();
    checkValidations();
    if (Object.keys(errors).length === 0) {
      signup(formData);
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
          Create your account
        </h3>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="rounded-xl flex flex-col bg-gray-900 py-4 px-6 mt-6 w-2/3 lg:w-1/3"
      >
        {/* Full Name input field */}
        <label className="font-bold" htmlFor="fullName">
          Full name
        </label>
        <div className="relative">
          <input
            id="fullName"
            className="bg-gray-600 py-2 pl-9 pr-4 rounded-lg mt-2 mb-1 outline-none w-full"
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            onChange={changeHandler}
            value={formData.fullName}
          />
          <p className="mb-6 text-red-500">{errors && errors.fullName}</p>
          <User className="absolute top-4.5 left-2" size={20} />
        </div>

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
            value={formData.email}
          />
          <p className="mb-6 text-red-500">{errors && errors.email}</p>
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
            value={formData.password}
          />
          <p className="mb-6 text-red-500">{errors && errors.password}</p>
          <Key className="absolute top-4.5 left-2" size={20} />
        </div>

        {/* Confirm password input field */}
        <label className="font-bold" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            className="bg-gray-600 py-2 pl-9 pr-4 rounded-lg mt-2 mb-1 outline-none w-full"
            type="password"
            name="confirmPassword"
            placeholder="Enter password again to confirm"
            onChange={changeHandler}
            value={formData.confirmPassword}
          />
          <p className="mb-6 text-red-500">
            {errors && errors.confirmPassword}
          </p>
          <Eye className="absolute top-4.5 left-2" size={20} />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          onClick={handleSignUp}
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
              <UserPlus size={20} />
              <span>Sign Up</span>
            </>
          )}
        </button>
      </motion.div>
      <p className="text-md my-4">
        Already have an account?{" "}
        <Link className="text-emerald-500" to="/login">
          Login here{" "}
        </Link>
        <MoveRight className="inline-block text-emerald-500" />
      </p>
      <Toaster />
    </div>
  );
};

export default Signup;
