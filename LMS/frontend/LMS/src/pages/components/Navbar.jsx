import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <nav className="bg-black text-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex items-start justify-between  mx-auto p-4">
          <img src="https://www.shutterstock.com/image-vector/book-store-logo-icon-classic-600nw-1780228784.jpg" className="h-8" alt="BookStore Logo" />
          <span className="text-2xl font-semibold whitespace-nowrap dark:text-white"><Link to="/">BookStore</Link></span>

          <div className="flex md:order-2 space-x-3 md:space-x-0">
            <Link to='/addbook'>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Add Book
            </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
