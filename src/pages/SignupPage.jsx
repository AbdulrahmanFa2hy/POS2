import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUp, clearError, clearSuccessMessage } from "../store/authSlice";
import { ROUTES } from "../utils/constants";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    role: "waiter", // Default role
  });
  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, successMessage, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // Redirect if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

  // Clear messages on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearSuccessMessage());
    };
  }, [dispatch]);

  // Handle success message
  useEffect(() => {
    if (successMessage) {
      // Wait a bit to show the success message before redirecting
      const timer = setTimeout(() => {
        navigate(ROUTES.DASHBOARD);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear specific error when user starts typing
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validate name
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    // Validate username
    if (!formData.username.trim()) {
      errors.username = "Username is required";
    } else if (formData.username.length < 3) {
      errors.username = "Username must be at least 3 characters";
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Validate password
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    // Validate password confirmation
    if (formData.password !== formData.passwordConfirmation) {
      errors.passwordConfirmation = "Passwords do not match";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Create data object for API without passwordConfirmation
    const { passwordConfirmation, ...signupData } = formData;

    // Dispatch signup action
    dispatch(signUp(signupData));
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1e62b3] mb-2">Yoomy</h1>
          <p className="text-neutral-600">Create your account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-neutral-700 mb-1"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 border ${
                formErrors.name ? "border-red-500" : "border-neutral-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e62b3]`}
              placeholder="Enter your full name"
            />
            {formErrors.name && (
              <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-neutral-700 mb-1"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className={`w-full p-3 border ${
                formErrors.username ? "border-red-500" : "border-neutral-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e62b3]`}
              placeholder="Enter your username"
            />
            {formErrors.username && (
              <p className="mt-1 text-sm text-red-500">{formErrors.username}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-neutral-700 mb-1"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border ${
                formErrors.email ? "border-red-500" : "border-neutral-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e62b3]`}
              placeholder="Enter your email"
            />
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-neutral-700 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-3 border ${
                formErrors.password ? "border-red-500" : "border-neutral-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e62b3]`}
              placeholder="Enter your password"
            />
            {formErrors.password && (
              <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-neutral-700 mb-1"
              htmlFor="passwordConfirmation"
            >
              Confirm Password
            </label>
            <input
              id="passwordConfirmation"
              name="passwordConfirmation"
              type="password"
              value={formData.passwordConfirmation}
              onChange={handleChange}
              className={`w-full p-3 border ${
                formErrors.passwordConfirmation
                  ? "border-red-500"
                  : "border-neutral-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e62b3]`}
              placeholder="Confirm your password"
            />
            {formErrors.passwordConfirmation && (
              <p className="mt-1 text-sm text-red-500">
                {formErrors.passwordConfirmation}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-sm font-medium text-neutral-700 mb-1"
              htmlFor="role"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e62b3]"
            >
              <option value="waiter">Waiter</option>
              <option value="cashier">Cashier</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1e62b3] text-white p-3 rounded-lg font-medium transition-colors hover:bg-[#174d8f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e62b3] disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-neutral-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#1e62b3] font-medium hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
