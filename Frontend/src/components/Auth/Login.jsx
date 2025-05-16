import React, { useState, useContext } from "react";
import { useAuth } from "../../authContext/AuthContext";

function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, loginLoading } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await login(formData);

    if (result.error) {
      setError(result.error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-[340px]">
        <div className="w-full flex flex-col space-y-0.5">

          <input
            type="text"
            name="username"
            placeholder="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="bg-[#f1f1f1] py-1 px-5 h-[50px] rounded-tr-lg focus:outline-none"
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
        <button type="submit" className=" bg-[#303030] text-white p-2 h-[50px] rounded-b-md cursor-pointer">
          {loginLoading ? "Logging in..." : "Login"}
        </button>
        {error && <div className="error mt-4 text-red-600 text-center">{error}</div>}
      </form>
    </div>
  );
}

export default LoginForm;
