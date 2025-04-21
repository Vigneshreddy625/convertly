import {
  Bell,
  GalleryHorizontal,
  Home,
  PanelLeftDashed,
  PanelRightDashed,
  User,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  IconCategory,
  IconFileTypeDoc,
  IconFileTypePdf,
} from "@tabler/icons-react";

function Navbar({ onToggleCollapse }) {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);

    if (onToggleCollapse) {
      onToggleCollapse(newCollapsedState);
    }
  };

  useEffect(() => {
    if (onToggleCollapse) {
      onToggleCollapse(collapsed);
    }
  }, []);

  const navigate = useNavigate();

  const location = useLocation();
  const currentPath = location.pathname.split("/")[1];
  const isActive = (path) => {
    return currentPath === path;
  }

  const navItems = [
    { icon: Home, label: "Home", path: "home" },
    { icon: IconCategory, label: "Explore", path: "explore" },
    { icon: IconFileTypePdf, label: "PDF to Word", path: "pdftoword" },
    { icon: IconFileTypeDoc, label: "Word to PDF", path: "wordtopdf" },
    { icon: Bell, label: "Blog", path: "bell" },
    { icon: GalleryHorizontal, label: "Gallery", path: "blog" },
  ];

  return (
    <motion.div
      className="bg-[#ECECEC] dark:bg-[#302c2c] rounded-lg shadow-md flex flex-col h-full border border-gray-300 dark:border-none overflow-hidden"
      animate={{
        width: collapsed ? "5rem" : "14rem",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <div className="flex items-center w-full mb-2 px-5 py-4 border-b border-gray-400">
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                className="font-semibold text-gray-700 dark:text-white block whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                Navbar Gallery
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          {!collapsed ? (
            <PanelLeftDashed
              onClick={toggleCollapse}
              className={`text-gray-800 dark:text-white hover:text-blue-600 cursor-pointer transition-colors duration-200 ${
                collapsed ? "mr-2.5" : "mr-0"
              }`}
              size={20}
            />
          ) : (
            <PanelRightDashed
              onClick={toggleCollapse}
              className={`text-gray-800 dark:text-white hover:text-blue-600 cursor-pointer transition-colors duration-200 ${
                collapsed ? "mr-2.5" : "mr-0"
              }`}
              size={20}
            />
          )}
        </motion.div>
      </div>

      <div className="flex flex-col space-y-4 px-5 py-2 flex-1">
        {navItems.map((item, index) => (
          <div
            key={item.label}
            className={`flex items-center w-full py-2 px-2 rounded-lg hover:bg-blue-200 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-200 space-x-2 ${
                  isActive(item.path) ? "bg-blue-200 dark:bg-gray-500" : ""}`}
          >
            <div
              className={`flex items-center justify-center w-6 h-6 flex-shrink-0`}
              onClick={() => navigate(item.path)}
            >
              <item.icon
                className={`text-gray-800 dark:text-white hover:text-blue-600 `}
                size={20}
              />
            </div>

            <div className="ml-3 overflow-hidden">
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    className="text-gray-700 dark:text-white block whitespace-nowrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto px-5 py-4 border-t border-gray-400">
        <div className="flex items-center px-2.5">
          <User
            className="text-gray-800 dark:text-white hover:text-blue-600 cursor-pointer"
            size={20}
          />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                className="ml-3 text-gray-700 dark:text-white whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                Profile
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default Navbar;
