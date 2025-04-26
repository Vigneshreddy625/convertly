import React from "react";
import {
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Clock,
  Download,
  Briefcase,
  Contact,
} from "lucide-react";

export default function Account() {
  return (
    <div className="w-full h-full flex flex-col items-center relative py-8 px-4">
      <div className="w-full max-w-6xl">
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 md:gap-12 items-center lg:mt-20">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <div className="overflow-hidden rounded-md h-72 md:h-full">
              <img
                src="https://github.com/shadcn.png"
                alt="Profile"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <div className="relative inline-block bg-green-500 text-white text-xs font-medium px-4 py-2 rounded-md mb-4">
              HELLO
              <div className="absolute -bottom-2 left-3 w-0 h-0 border-t-8 border-t-green-500 border-x-8 border-x-transparent"></div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800 dark:text-gray-100 tracking-tight">
              I'm Vignesh Reddy
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              Student and Developer
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 text-sm">
              {[
                { icon: <Clock size={18} />, label: "AGE", value: "21" },
                {
                  icon: <MapPin size={18} />,
                  label: "ADDRESS",
                  value: "Ongole, Prakasam, Andhra Pradesh",
                },
                {
                  icon: <Mail size={18} />,
                  label: "E-MAIL",
                  value: "vignesh@gmail.com",
                },
                {
                  icon: <Phone size={18} />,
                  label: "PHONE",
                  value: "+91 93XXXXXXXX",
                },
                {
                  icon: <Briefcase size={18} />,
                  label: "ROLE",
                  value: "Premium",
                },
              ].map(({ icon, label, value }, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex items-center text-green-500 mt-1">
                    {icon}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-500 dark:text-gray-400">
                      {label}
                    </div>
                    <div className="text-gray-800 dark:text-gray-200">
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button className="flex items-center bg-white dark:bg-zinc-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-zinc-700 py-3 px-6 sm:px-8 text-sm font-medium transition-colors text-gray-800 dark:text-gray-200 shadow-sm cursor-pointer rounded-lg">
          <Contact size={16} className="mr-2" />
          CONTACT ME
        </button>
      </div>

      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-green-500 to-green-600 py-4 px-6 flex flex-wrap justify-center gap-6">
        {[Twitter, Facebook, Linkedin, Instagram].map((Icon, idx) => (
          <Icon
            key={idx}
            size={20}
            className="text-white hover:text-gray-200 cursor-pointer transition-transform hover:scale-110"
          />
        ))}
      </div>
    </div>
  );
}
