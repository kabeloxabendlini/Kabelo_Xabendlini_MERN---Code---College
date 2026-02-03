import { Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Home from './pages/Home';
import CreateBook from './pages/CreateBooks';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (saved === 'dark' || (!saved && prefersDark)) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  const toggleDark = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    setDarkMode(isDark);
  };

  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br from-sky-50 via-indigo-50 to-sky-100
      dark:from-slate-950 dark:via-blue-950 dark:to-indigo-900
      transition-colors duration-700
    "
    >
      {/* Navbar */}
      <nav
        className="
        sticky top-0 z-50
        flex items-center justify-between
        px-6 md:px-10 py-4
        bg-white/70 dark:bg-slate-900/70
        backdrop-blur-xl
        border-b border-white/20 dark:border-white/10
        shadow-[0_8px_30px_rgba(0,0,0,0.08)]
      "
      >
        {/* Brand */}
        <Link
          to="/"
          className="
          flex items-center gap-3
          text-2xl font-extrabold tracking-tight
          text-sky-700 dark:text-sky-200
          hover:text-sky-500 dark:hover:text-sky-300
          transition-colors duration-300
        "
        >
          <span className="text-3xl">📚</span>
          <span>Book Store</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <a
            href="http://localhost:5555/books"
            target="_blank"
            rel="noopener noreferrer"
            className="
            hidden sm:inline-flex
            px-4 py-2 rounded-full
            text-sm font-medium
            text-sky-700 dark:text-sky-200
            bg-sky-100/70 dark:bg-sky-800/40
            hover:bg-sky-200/70 dark:hover:bg-sky-700/50
            transition
          "
          >
            API
          </a>

          <button
            onClick={toggleDark}
            className="px-4 py-2 rounded-full bg-sky-600 
                       dark:bg-sky-300 text-white 
                       dark:text-blue-900 shadow-lg 
                       hover:scale-105 
                       active:scale-95 transition-all 
                       duration-300 animate-fade-in"
          >
            {darkMode ? '🌞 Light' : <span className="text-black">🌙 Dark</span>}
          </button>

        </div>
      </nav>

      {/* Main content */}
      <main
        className="
        px-4 sm:px-6 py-10
        max-w-7xl mx-auto
        animate-fade-in
      "
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/create" element={<CreateBook />} />
          <Route path="/books/details/:id" element={<ShowBook />} />
          <Route path="/books/edit/:id" element={<EditBook />} />
          <Route path="/books/delete/:id" element={<DeleteBook />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
