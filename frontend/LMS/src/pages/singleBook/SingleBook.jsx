import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});

  const fetchBook = async () => {
    const response = await axios.get(`http://localhost:3000/book/${id}`);
    if (response.status == 200) {
      setBook(response.data.data);
    }
  };
  useEffect(() => {
    fetchBook();
  });
  return (
    <>
      <Navbar />
      <div className="flex mt-20 h-screen w-screen font-mono bg-gray-100 dark:bg-gray-800 p-10">
        <div className="w-1/3 h-full flex mr-8 ">
          <img
            className=" w-full h-[75%] md:w-full rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
            src={
              book.imageUrl
                ? book.imageUrl
                : "https://freepngimg.com/thumb/book/1-2-book-png-2-thumb.png"
            }
            alt="Book Cover"
          />
        </div>
        <div className="w-1/2 h-full text-2xl px-10 flex flex-col  space-y-4 text-gray-900 dark:text-gray-200">
          <h5 className="mb-2 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white transition-colors duration-300 hover:text-indigo-600 dark:hover:text-indigo-400">
           {book.bookName}
          </h5>
          <p className="mb-3 text-lg leading-relaxed text-gray-700 dark:text-gray-400">
            Price : ${book.bookPrice}
          </p>
         < p  className="mb-3 text-lg leading-relaxed text-gray-700 dark:text-gray-400">
             ISBNNumber:{book.isbnNumber}
          </p>
          < p className="mb-3 text-lg leading-relaxed text-gray-700 dark:text-gray-400">
             BY:{book.authorName}
          </p>
          < p className="mb-3 text-lg leading-relaxed text-gray-700 dark:text-gray-400">
             Published on :{book.publishedAt}
            
          </p>
          < p className="mb-3 text-lg leading-relaxed text-gray-700 dark:text-gray-400">
             Publication :{book.publication}
          </p>
          <p className="mb-3 text-lg leading-relaxed text-gray-700 dark:text-gray-400">
            {book.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default SingleBook;
