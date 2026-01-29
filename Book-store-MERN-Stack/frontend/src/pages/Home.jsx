import React, { useEffect, useState } from "react";
import axios from "axios";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";
import Spinner from "../components/Spinner";
import { MdOutlineAddBox } from "react-icons/md";
import { Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  // Fetch books
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((res) => {
        // ✅ supports both { data: [] } and []
        setBooks(res.data.data || res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div
      className="
        min-h-[calc(100vh-5rem)]
        bg-white/80 dark:bg-blue-900/70
        backdrop-blur
        rounded-2xl
        shadow-xl
        p-6 md:p-8
        transition-colors duration-500
      "
    >
      {/* View Toggle */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setShowType("table")}
          className={`px-5 py-2 rounded-xl font-semibold transition-all shadow
            ${
              showType === "table"
                ? "bg-sky-600 text-white scale-105"
                : "bg-sky-100 text-sky-800 hover:bg-sky-200 dark:bg-sky-800 dark:text-sky-100"
            }`}
        >
          📋 Table
        </button>

        <button
          onClick={() => setShowType("card")}
          className={`px-5 py-2 rounded-xl font-semibold transition-all shadow
            ${
              showType === "card"
                ? "bg-sky-600 text-white scale-105"
                : "bg-sky-100 text-sky-800 hover:bg-sky-200 dark:bg-sky-800 dark:text-sky-100"
            }`}
        >
          🗂 Cards
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-blue-900 dark:text-sky-100">
            Books Library
          </h1>
          <p className="text-gray-600 dark:text-sky-300 mt-1">
            Manage, edit and explore your collection
          </p>
        </div>

        <Link
          to="/books/create"
          className="
            inline-flex items-center gap-2
            bg-sky-600 hover:bg-sky-700
            text-white
            px-5 py-3
            rounded-xl
            shadow-lg
            hover:scale-105
            transition-all
          "
        >
          <MdOutlineAddBox className="text-2xl" />
          Add Book
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center mt-24">
          <Spinner />
        </div>
      ) : books.length === 0 ? (
        <div className="text-center mt-24">
          <p className="text-lg text-gray-600 dark:text-sky-300">
            No books found 📭
          </p>
        </div>
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
