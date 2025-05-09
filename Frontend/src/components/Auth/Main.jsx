import React, { useState, useEffect } from "react";
import RegisterForm from "./Signup";
import LoginForm from "./Login";
import fb from "../../assets/facebook.png";
import google from "../../assets/google.png";
import rive from "../../assets/auth-bg.jpg";

function Auth() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeButton, setActiveButton] = useState("login");

  return (
    <div className="flex w-screen h-screen">
      <div className="flex-1 bg-transparent">
        <img src={rive} alt="Fiver" className="w-full h-full object-cover" />
      </div>

      <div className="w-2/5 bg-white flex justify-center items-center">
        <div className="max-w-[380px] w-full px-8 py-10">
          <h1 className="text-3xl font-bold mb-6">CONVERTLY</h1>
          <p className="text-gray-500 mb-6">
            Please {activeButton === "login" ? "login" : "register"} to continue
          </p>

          <div className="flex space-x-2 mb-8">
            <button className="flex-1 px-4 py-3 flex items-center justify-between bg-gray-100 rounded-l-lg hover:bg-gray-200 transition-all duration-200">
              <span className="font-medium">Google</span>
              <img src={google} alt="Google" className="h-5" />
            </button>
            <button className="flex-1 px-4 py-3 flex items-center justify-between bg-gray-100 rounded-r-lg hover:bg-gray-200 transition-all duration-200">
              <span className="font-medium">Facebook</span>
              <img src={fb} alt="Facebook" className="h-5" />
            </button>
          </div>

          <div className="mb-6 h-[2px] bg-gray-200 w-full" />

          <div className="flex">
            <button
              className={`p-4 font-medium transition-colors rounded-t-lg duration-200 ${
                activeButton === "login"
                  ? "bg-[#f1f1f1]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveButton("login")}
            >
              Login
            </button>
            <button
              className={`p-4 font-medium transition-colors rounded-t-lg duration-200 ${
                activeButton === "signup"
                  ? "bg-[#f1f1f1]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveButton("signup")}
            >
              Signup
            </button>
          </div>

          <div className="mb-6">
            {activeButton === "login" ? <LoginForm /> : <RegisterForm />}
          </div>

          <p className="text-center">
            <a
              href="#"
              className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
            >
              Forgot Password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;