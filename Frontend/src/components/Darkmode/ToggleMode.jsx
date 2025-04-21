import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./Theme-provider";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center h-10 w-10 cursor-pointer"
    >
      <Sun className="absolute h-5 w-5 transform transition-all duration-300 dark:rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 transform transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
