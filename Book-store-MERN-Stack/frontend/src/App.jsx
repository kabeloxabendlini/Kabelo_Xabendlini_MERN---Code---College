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
    <div className="min-h-screen 
      bg-gradient-to-br from-sky-50 to-sky-100 
      dark:from-blue-950 dark:to-blue-900 
      transition-colors duration-500"
    >
      {/* Navbar */}
      <nav className="
        sticky top-0 z-50
        flex justify-between items-center
        px-6 py-4
        bg-white/70 dark:bg-blue-900/70
        backdrop-blur-lg
        border-b border-white/20 dark:border-blue-700/40
        shadow-md
      ">
        <a
          href="http://localhost:5555/books"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl font-extrabold tracking-tight 
             text-sky-700 dark:text-sky-200
             hover:text-sky-500 transition"
        >
          📚 Book Store
        </a>


        <button
          onClick={toggleDark}
          className="
            px-4 py-2 rounded-full
            bg-sky-600 dark:bg-sky-300
            text-white dark:text-blue-900
            shadow-lg
            hover:scale-105 active:scale-95
            transition-all duration-300
          "
        >
          {darkMode ? '🌞 Light' : '🌙 Dark'}
        </button>
      </nav>

      <main className="p-6 max-w-7xl mx-auto">
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
