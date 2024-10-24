 import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import axios from 'axios'
 
 const Home = () => {
 
  const [book,setBook]=useState([])
  const fetchBooks=async ()=>{
   const response = await axios.get('https://mern-1fyn.onrender.com/book',{ timeout: 10000 })
  //  console.log(response.data.data)
  if(response.status==200){
    setBook(response.data.data)
  }
  }
  useEffect(()=>{
    fetchBooks()
  },[])
   return (
     <>
     <Navbar/>
     <div className='flex flex-wrap justify-evenly gap-3 mt-20' >
      {
        book.length>0 && book.map((book)=>{
          return(
            <Card key={book.id} book={book}/>
          )
        })
      }
     </div>

     </>
   )
 }
 
 export default Home