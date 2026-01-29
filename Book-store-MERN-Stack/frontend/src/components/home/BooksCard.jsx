import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

const BooksCard = ({ books }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book) => (
        <div
          key={book._id}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform duration-300"
        >
          <div className="p-4 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {book.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                Author: {book.author}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Year: {book.publishYear}
              </p>
            </div>

            <div className="flex justify-around mt-4 text-2xl">
              <Link
                to={`/books/details/${book._id}`}
                className="text-green-600 hover:text-green-400 transition"
              >
                <BsInfoCircle />
              </Link>
              <Link
                to={`/books/edit/${book._id}`}
                className="text-yellow-500 hover:text-yellow-400 transition"
              >
                <AiOutlineEdit />
              </Link>
              <Link
                to={`/books/delete/${book._id}`}
                className="text-red-600 hover:text-red-400 transition"
              >
                <MdOutlineDelete />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BooksCard;
