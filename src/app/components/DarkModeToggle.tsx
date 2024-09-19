"use client";

import { FaSun, FaMoon } from "react-icons/fa";

interface DarkModeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function DarkModeToggle({ isDarkMode, toggleDarkMode }: DarkModeToggleProps) {
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-md bg-purple-800 text-white hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
    >
      {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  );
}