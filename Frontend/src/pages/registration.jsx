import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "", 
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const errors = {};

    if (!registerForm.name.trim()) errors.name = "Name is required.";
    if (!registerForm.email.trim()) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(registerForm.email))
      errors.email = "Email is invalid.";

    if (!registerForm.password) errors.password = "Password is required.";
    else if (registerForm.password.length < 6)
      errors.password = "Password must be at least 6 characters.";

    if (!registerForm.confirmPassword)
      errors.confirmPassword = "Please confirm your password.";
    else if (registerForm.confirmPassword !== registerForm.password)
      errors.confirmPassword = "Passwords do not match.";

    return errors;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setFormErrors({});
      setSuccessMessage("Account has been created successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <i className="fas fa-sticky-note text-3xl text-purple-600 mr-3"></i>
              <h1 className="text-2xl font-bold text-gray-900">NotesApp</h1>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Create your account
            </h2>
            <p className="text-gray-600">
              Start organizing your thoughts today
            </p>
          </div>

          {successMessage && (
            <div className="mb-4 text-green-600 text-center font-medium">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={registerForm.name}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, name: e.target.value })
                }
                className={`w-full px-4 py-3 text-sm rounded-lg border ${
                  formErrors.name
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 bg-white"
                } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                placeholder="Enter your full name"
              />
              {formErrors.name && (
                <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={registerForm.email}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, email: e.target.value })
                }
                className={`w-full px-4 py-3 text-sm rounded-lg border ${
                  formErrors.email
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 bg-white"
                } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
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
                value={registerForm.password}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, password: e.target.value })
                }
                className={`w-full px-4 py-3 text-sm rounded-lg border ${
                  formErrors.password
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 bg-white"
                } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                placeholder="Create a password"
              />
              {formErrors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.password}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={registerForm.confirmPassword}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    confirmPassword: e.target.value,
                  })
                }
                className={`w-full px-4 py-3 text-sm rounded-lg border ${
                  formErrors.confirmPassword
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 bg-white"
                } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                placeholder="Confirm your password"
              />
              {formErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg cursor-pointer transition-colors"
            >
              Create Account
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Sign in
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

export default Registration;
