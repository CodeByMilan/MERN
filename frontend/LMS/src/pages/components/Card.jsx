import React from 'react';
import { Link } from 'react-router-dom';

const Card = (props) => {
    console.log(props)
  const { book: { _id, bookName, imageUrl , description } } = props;
  return (
    <div className='flex flex-col m-4 max-w-sm'>
      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={_id}>
        <img className="rounded-t-lg w-full h-[200px] object-cover" src={imageUrl || "https://freepngimg.com/thumb/book/1-2-book-png-2-thumb.png"} alt="" />
        <div className="p-3">
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{bookName}</h1>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description} </p>
          <Link to={`/book/${_id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            See more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
