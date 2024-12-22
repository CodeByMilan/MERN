import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../config";

const AddBook = () => {
  const navigate = useNavigate();
  // const [bookName,setBookName]=useState('')
  // const [bookPrice,setBookPrice]=useState('')
  // const [isbnNumber,setIsbnNumber]=useState('')
  // const [authorName,setAuthorName]=useState('')
  // const [publication,setPublication]=useState('')
  // const [publishedAt,setPublishedAt]=useState('')
  // const [image,setImage]=useState(null)
  // const[description,setDescription]=useState('')

  // const handleSubmit=async (e)=>{
  //   e.preventDefault()
  //   //one of the way of sending fata from frontend to backend
  // await axios.post('http://localhost:3000/book',{
  //   bookName,
  //   bookPrice,
  //   isbnNumber,
  //   authorName,
  //   publication,
  //   publishedAt,
  //   description,
  //   image
  // },{
  //   headers:{
  //     'Content-Type':'multipart/form-data'
  //   }
  // })

  //second way of sendind data from front end to nackend
  //   const formData=new FormData()
  //   formData.append('bookName', bookName);
  //   formData.append('bookPrice', bookPrice);
  //   formData.append('isbnNumber', isbnNumber);
  //   formData.append('authorName', authorName);
  //   formData.append('publication', publication);
  //   formData.append('publishedAt', publishedAt);
  //   formData.append('description', description);
  //   formData.append('image', image);
  //   const response = await axios.post('http://localhost:3000/book',formData)
  // }

  const [data, setData] = useState({
    bookName: "",
    bookPrice: "",
    isbnNumber: "",
    authorName: "",
    publication: "",
    publishedAt: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    //fiters all data and set the value in the name of the field that is coming in the target i.e
    //e.target.name= value
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    //object.entries converts the data into key and value pair array
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("image", image);

    const response = await axios.post(`${backendUrl}/book`, formData);

    if (response.status === 200 || response.status === 201) {
      navigate("/");
    } else {
      alert("something is incorrect");
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-10 p-10">
        <h1 className="font-bold font-serif text-3xl text-center mb-10 items-center">
          Add a Book{" "}
        </h1>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="BookName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Book Name
            </label>
            <input
              type="text"
              id="bookName"
              name="bookName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="bookPrice"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Book Price
            </label>
            <input
              type="text"
              id="bookPrice"
              name="bookPrice"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="isbnNumber"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              IsbnNumber
            </label>
            <input
              type="text"
              id="isbnNumber"
              name="isbnNumber"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="author name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Author Name
            </label>
            <input
              type="text"
              id="author"
              name="authorName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="publication"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Publication
            </label>
            <input
              type="text"
              id="publication"
              name="publication"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="publishedAt"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              PublishedAt
            </label>
            <input
              type="date"
              id="publishedAt"
              name="publishedAt"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
              placeholder="Augest 2, 1932"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="Image"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Image
            </label>
            <input
              type="file"
              id="imageUrl"
              name="image"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="text-white items-center justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBook;
