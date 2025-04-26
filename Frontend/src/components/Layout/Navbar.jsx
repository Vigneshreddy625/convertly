import {
  Bell,
  GalleryHorizontal,
  Home,
  PanelLeftDashed,
  PanelRightDashed,
  LayoutGrid,
  FileCheck
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { faFilePdf, faFileWord, faFileAlt} from "@fortawesome/free-regular-svg-icons";
import Profile from "../Profile";

const navItems = [
  { icon: Home, label: "Home", path: "home" },
  { icon: LayoutGrid, label: "Explore", path: "explore" },
  {
    icon: () => <FontAwesomeIcon icon={faFilePdf} size="lg" />,
    label: "PDF to Word",
    path: "pdftoword",
  },
  {
    icon: () => <FontAwesomeIcon icon={faFileWord} size="lg" />,
    label: "Word to PDF",
    path: "wordtopdf",
  },
  { icon: FileCheck, label: "My Docs", path: "documents" },
  { icon: Bell, label: "Blog", path: "bell" },
];

function Navbar({ onToggleCollapse }) {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1];

  const toggleCollapse = useCallback(() => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);

    if (onToggleCollapse) {
      onToggleCollapse(newCollapsedState);
    }
  }, [collapsed, onToggleCollapse]);

  const handleNavigation = useCallback((path) => {
    navigate(path);
  }, [navigate]);

  const isActive = useCallback((path) => {
    return currentPath === path;
  }, [currentPath]);

  useEffect(() => {
    if (onToggleCollapse) {
      onToggleCollapse(collapsed);
    }
  }, []);

  return (
    <motion.div
      className="hidden lg:flex bg-[#ECECEC] dark:bg-[#302c2c] rounded-lg shadow-md flex-col h-full border border-gray-300 dark:border-none overflow-hidden"
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
        <motion.div 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.95 }}
          onClick={toggleCollapse}
        >
          {!collapsed ? (
            <PanelLeftDashed
              className={`text-gray-800 dark:text-white hover:text-blue-600 cursor-pointer transition-colors duration-200 ${
                collapsed ? "mr-2" : "mr-0"
              }`}
              size={20}
            />
          ) : (
            <PanelRightDashed
              className={`text-gray-800 dark:text-white hover:text-blue-600 cursor-pointer transition-colors duration-200 ${
                collapsed ? "mr-2" : "mr-0"
              }`}
              size={20}
            />
          )}
        </motion.div>
      </div>

      <div className="flex flex-col space-y-4 px-5 py-2 flex-1">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`flex items-center w-full py-2 px-2 rounded-lg hover:bg-blue-200 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-200 space-x-2 ${
              isActive(item.path) ? "bg-blue-200 dark:bg-gray-500" : ""
            }`}
            onClick={() => handleNavigation(item.path)}
          >
            <div
              className="flex items-center justify-center w-6 h-6 flex-shrink-0"
            >
              {typeof item.icon === "function" ? (
                <item.icon />
              ) : (
                <item.icon
                  size={20}
                  className="text-gray-800 dark:text-white hover:text-blue-600"
                />
              )}
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

      <div className="mt-auto px-5 py-2 border-t border-gray-400">
        <div className="flex items-center px-1 py-2 hover:bg-blue-200 dark:hover:bg-gray-600 rounded-lg cursor-pointer transition-colors duration-200">
          <Profile />
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