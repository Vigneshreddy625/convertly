import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import RegisterForm from "./Signup";
import LoginForm from "./Login";
import fb from "../../assets/facebook.png";
import google from "../../assets/google.png";
import convertly from "../../assets/convertly.png";
import login from "../../assets/logged.avif";

function Auth() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeButton, setActiveButton] = useState("login");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "signup" || tab === "login") {
      setActiveButton(tab);
    } else {
      setSearchParams({ tab: "login" }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleTabClick = (tab) => {
    setActiveButton(tab);
    setSearchParams({ tab }); 
  };

  return (
    <div className="flex w-screen h-screen text-gray-800">
      <div className="flex-1 bg-transparent">
        <img src={login} alt="Fiver" className="w-full h-full object-cover" />
      </div>

      <div className="w-2/5 bg-white flex justify-center items-center">
        <div className="max-w-[380px] w-full px-8 py-10">
          <div className="w-2/3 mb-8">
          <img src={convertly} alt="" srcset="" className="h-full w-full" />
          </div>
          <p className="text-gray-500 mb-4 ml-1">
            Please {activeButton === "login" ? "login" : "register"} to continue
          </p>

          <div className="flex space-x-2 mb-4">
            <button className="flex-1 px-4 py-3 flex items-center justify-between bg-gray-100 rounded-l-lg hover:bg-gray-200 transition-all duration-200 cursor-pointer">
              <span className="font-medium">Google</span>
              <img src={google} alt="Google" className="h-5" />
            </button>
            <button className="flex-1 px-4 py-3 flex items-center justify-between bg-gray-100 rounded-r-lg hover:bg-gray-200 transition-all duration-200 cursor-pointer">
              <span className="font-medium">Facebook</span>
              <img src={fb} alt="Facebook" className="h-5" />
            </button>
          </div>

          <div className="mb-6 h-[2px] bg-gray-200 w-full" />

          <div className="flex">
            <button
              className={`p-4 font-medium transition-colors rounded-t-lg duration-200 cursor-pointer ${
                activeButton === "login"
                  ? "bg-[#f1f1f1]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => handleTabClick("login")}
            >
              Login
            </button>
            <button
              className={`p-4 font-medium transition-colors rounded-t-lg duration-200 cursor-pointer ${
                activeButton === "signup"
                  ? "bg-[#f1f1f1]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => handleTabClick("signup")}
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