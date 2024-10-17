const express = require ('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose')
const Book = require('./model/bookModel')
//alternative 
//const app=require('express')()
const connectionString ="mongodb+srv://milanacharya2001:milan@cluster0.ka73t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

async function connectToDatabase (){
    await mongoose.connect(connectionString)
    console.log("database connection successful")
}
connectToDatabase()
app.get("/",(req,res)=>{
    res.status(200).json({
        message:"sucess"
    })
})
 //if something takes time then we must put asyn and wait 
app.post("/book",async(req,res)=>{
    console.log(req.body)
   //destructuring
    const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication}=req.body
    //or const  bookName = req.body.bookName
    //if the keyname and valuepair  name is same than we can write only one 
  await Book.create({
    bookName,
    bookPrice,
    isbnNumber,
    authorName,
    publishedAt,
    publication 

  })
  res.status(201).json({
    message:"book created successfully"
  })
   // console.log(bookName,bookPrice,isbnNumber,authorName,publishedAt) 
})
//all read
app.get("/book",async (req,res)=>{
    const books= await Book.find()//return array 
    res.status(200).json({
        message:"books fetched successfully",   
        data:books 
}) 
})
//single read
app.get("/book/:id",async (req,res)=>{
    try{
    const id=req.params.id
    const books= await Book.findById(id)//return  object
    if(!books){
        res.status(404).json({
            message:"book not found"
            })
        }
    res.status(200).json({
        message:"Single book fetched successfully",   
        data:books 
})
    }
    catch(err){
        res.status(500).json({
            message:"server error"
            })
            }
})
app.listen(3000,()=>{
    console.log('server is running on port 3000')
})