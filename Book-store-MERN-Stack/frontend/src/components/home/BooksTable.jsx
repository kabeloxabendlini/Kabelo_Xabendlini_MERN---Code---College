import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const BooksTable = ({ books }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse rounded-xl overflow-hidden shadow-lg bg-white dark:bg-slate-800">
        <thead className="bg-sky-100 dark:bg-sky-800">
          <tr>
            <th className="p-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-100">
              No
            </th>
            <th className="p-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-100">
              Title
            </th>
            <th className="p-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-100">
              Author
            </th>
            <th className="p-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-100">
              Year
            </th>
            <th className="p-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-100">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {books.map((book, index) => (
            <tr
              key={book._id}
              className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            >
              <td className="p-4 text-slate-700 dark:text-slate-200">
                {index + 1}
              </td>

              <td className="p-4 font-medium text-slate-700 dark:text-slate-200">
                {book.title}
              </td>

              <td className="p-4 text-slate-600 dark:text-slate-300">
                {book.author}
              </td>

              <td className="p-4 text-slate-600 dark:text-slate-300">
                {book.publishYear}
              </td>

              <td className="p-4 flex gap-4 text-xl">
                <Link
                  to={`/books/details/${book._id}`}
                  className="text-emerald-600 hover:scale-110 transition"
                >
                  <BsInfoCircle />
                </Link>

                <Link
                  to={`/books/edit/${book._id}`}
                  className="text-amber-500 hover:scale-110 transition"
                >
                  <AiOutlineEdit />
                </Link>

                <Link
                  to={`/books/delete/${book._id}`}
                  className="text-red-600 hover:scale-110 transition"
                >
                  <MdOutlineDelete />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
