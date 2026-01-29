import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="flex items-center justify-between px-6 py-4 
                    bg-white dark:bg-slate-800 shadow">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        📚 Book Store
      </h1>

      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="text-gray-700 dark:text-gray-200 hover:underline"
        >
          Home
        </Link>

        <button
          onClick={toggleDarkMode}
          className="px-3 py-1 rounded-full shadow 
            bg-gray-900 text-white
            dark:bg-gray-200 dark:text-gray-900"
        >
          {darkMode ? "🌞" : "🌙"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
