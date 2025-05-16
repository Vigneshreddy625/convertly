import React, { useState, useContext, useEffect } from "react";
import { useAuth } from "../../authContext/AuthContext";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { register, registerLoading, authError } = useAuth();
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const result = await register(formData);

    if (result?.error) {
      setError(result.error);
    } else {
      setShowSuccessModal(true);
    }
  };

  const SuccessModal = () => {
    return (
      <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Registration Successful!</h3>
            <p className="mt-2 text-sm text-gray-500">
              Your account has been created. Redirecting to sign in page...
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Effect to handle redirect after successful registration
  useEffect(() => {
    if (showSuccessModal) {
      // Wait 2 seconds before redirecting
      const redirectTimer = setTimeout(() => {
        // Handle navigation directly in the component
        navigate("/login");
      }, 2000);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [showSuccessModal, navigate]);

  return (
    <div>
      {showSuccessModal && <SuccessModal />}
      
      <form onSubmit={handleSubmit} className="flex flex-col w-full text-gray-800">
        <div className="w-full flex flex-col space-y-0.5">
          <input
            type="email"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-[#f1f1f1] py-1 px-5 h-[50px] rounded-t-lg focus:outline-none"
          />

          <input
            type="text"
            name="username"
            placeholder="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="bg-[#f1f1f1] py-1 px-5 h-[50px] focus:outline-none"
          />

          <div className="relative bg-[#f1f1f1]">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-[#f1f1f1] py-1 px-5 h-[50px] rounded-tr-lg focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 text-[14px]"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button type="submit" className="mb-4 bg-[#303030] text-white p-2 h-[50px] rounded-b-md cursor-pointer">
          {registerLoading ? "Signing up..." : "Signup"}
        </button>
        {error && <div className="mt-2 text-red-500 text-center">{error}</div>}
      </form>
    </div>
  );
}

export default RegisterForm;