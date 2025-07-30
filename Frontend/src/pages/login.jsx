import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setCurrentPage }) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!loginForm.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
      errors.email = "Email is invalid.";
    }

    if (!loginForm.password) {
      errors.password = "Password is required.";
    }

    return errors;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setFormErrors({});
      console.log("Logging in:", loginForm);
      // Navigate to /home only if form is valid
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <i className="fas fa-sticky-note text-3xl text-blue-600 mr-3"></i>
              <h1 className="text-2xl font-bold text-gray-900">NotesApp</h1>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Welcome back
            </h2>
            <p className="text-gray-600">Sign in to access your notes</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm((prev) => ({ ...prev, email: e.target.value }))
                }
                className={`w-full px-4 py-3 text-sm rounded-lg border ${
                  formErrors.email
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 bg-white"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Enter your email"
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className={`w-full px-4 py-3 text-sm rounded-lg border ${
                  formErrors.password
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 bg-white"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Enter your password"
              />
              {formErrors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg cursor-pointer transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/register">
                <button
                  onClick={() => {
                    if (setCurrentPage) {
                      setCurrentPage("register");
                    }
                    setFormErrors({});
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                >
                  Sign up
                </button>
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link to="/">
              <button className="text-gray-500 hover:text-gray-700 text-sm cursor-pointer">
                <i className="fas fa-arrow-left mr-2"></i>
                Back to home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
