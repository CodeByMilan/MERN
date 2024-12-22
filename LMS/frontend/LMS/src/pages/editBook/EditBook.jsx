import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import axios from "axios";
import {  useNavigate,useParams } from "react-router-dom";
import { useState } from 'react';
import { backendUrl } from '../../config';


const EditBook = () => {
  //useParams can be used in only dynamic routing 
  const {id}=useParams()


  const navigate=useNavigate()

  const [data ,setData]=useState({
    bookName:'',
    bookPrice:'',
    isbnNumber:null,
    authorName:'',
    publication:'',
    publishedAt:''
  })
  const [image ,setImage]=useState(null)

const handleChange=(e)=>{
const {name,value,type,files}=e.target
if (type === 'file') {
  setImage(files[0]);
} else {
  setData({
    ...data,
    [name]: value
  });
}
}
const handleSubmit=async(e)=>{
  e.preventDefault()
  const formData=new FormData()
  //object.entries converts the data into key and value pair array 
  Object.entries(data).forEach(([key,value])=>{
    formData.append(key,value)
  })
formData.append('image',image)

 const response = await axios.patch(`${backendUrl}/book/`+id,formData)

 if(response.status==200){
  navigate("/book/"+id)
 }
 else{
  alert("something is incorrect")
 }
}


const fetchBook =async()=>{
const response =await axios.get(`${backendUrl}/book/`+id)
if(response.status ==200){
  // console.log(response.data.data)
setData(response.data.data)
}
}
useEffect(()=>{
  fetchBook()
},[])
  return (
    <>
    <Navbar/>
    <div className="mt-10 p-10">
        <h1 className="font-bold font-serif text-3xl text-center mb-10 items-center">
          Update Book{" "}
        </h1>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit} >
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
              value={data.bookName}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange}
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
              value={data.bookPrice}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"onChange={handleChange}
              
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
              value={data.isbnNumber}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"onChange={handleChange}
              
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
              value={data.authorName}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"onChange={handleChange}
              
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
              value={data.publication}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange}
              
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
              value={data.description}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"onChange={handleChange}
              
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
                  value={data.publishedAt}
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
              onChange={(e)=>setImage(e.target.files[0])}
            />
          </div>
          <div className="flex justify-center items-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Edit Book Details
          </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditBook