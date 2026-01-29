import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const BookSingleCard = ({ book }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-1 p-5">
      
      <div className="flex items-center gap-2 mb-3">
        <PiBookOpenTextLight className="text-3xl text-sky-600" />
        <h2 className="text-lg font-bold text-gray-800 dark:text-white truncate">
          {book.title}
        </h2>
      </div>

      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
        <BiUserCircle className="text-xl" />
        <span>{book.author}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {book.publishYear}
        </span>

        <div className="flex gap-3 text-xl">
          <Link to={`/books/details/${book._id}`} className="text-green-600 hover:scale-110">
            <BsInfoCircle />
          </Link>
          <Link to={`/books/edit/${book._id}`} className="text-yellow-500 hover:scale-110">
            <AiOutlineEdit />
          </Link>
          <Link to={`/books/delete/${book._id}`} className="text-red-500 hover:scale-110">
            <MdOutlineDelete />
          </Link>
        </div>
      </div>

    </div>
  );
};

export default BookSingleCard;
