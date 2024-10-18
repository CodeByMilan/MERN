const express = require("express");
const app = express();
app.use(express.json());
const fs=require('fs')
const mongoose = require("mongoose");
const Book = require("./model/bookModel");

const upload = require('./middleware/multerConfig').upload;
//alternative
//const app=require('express')()
const connectionString =
  "mongodb+srv://milanacharya2001:milan@cluster0.ka73t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function connectToDatabase() {
  await mongoose.connect(connectionString);
  console.log("database connection successful");
}
connectToDatabase();
app.get("/", (req, res) => {
  res.status(200).json({
    message: "sucess",
  });
});
//if something takes time then we must put asyn and wait
//insert operation
app.post("/book",upload.single("image"), async (req, res) => {
  console.log(req.file)
  console.log(req.body);
  let filename
  if(!req.file){
    filename="js.png"
  }
  else{
    filename="http://localhost:3000/"+req.file.filename
    }
  //destructuring
  const {
    bookName,
    bookPrice,
    isbnNumber,
    authorName,
    publishedAt,
    publication
  } = req.body;
  //or const  bookName = req.body.bookName
  //if the keyname and valuepair  name is same than we can write only one
  await Book.create({
    bookName,
    bookPrice,
    isbnNumber,
    authorName,
    publishedAt,
    publication,
    imageUrl:filename
  });
  res.status(201).json({
    message: "book created successfully",
  });
  // console.log(bookName,bookPrice,isbnNumber,authorName,publishedAt)
});
//all read
app.get("/book", async (req, res) => {
  const books = await Book.find(); //return array
  res.status(200).json({
    message: "books fetched successfully",
    data: books,
  });
});
//single read
app.get("/book/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const books = await Book.findById(id); //return  object
    if (!books) {
      res.status(404).json({
        message: "book not found",
      });
    }
    res.status(200).json({
      message: "Single book fetched successfully",
      data: books,
    });
  } catch (err) {
    res.status(500).json({
      message: "server error",
    });
  }
});

//delete operation
app.delete("/book/:id", async (req, res) => {
  const id = req.params.id;
  await Book.findByIdAndDelete(id);
  res.status(200).json({
    message: "book deleted successfully",
  });
});
//update operation
app.patch("/book/:id",upload.single('image'), async (req, res) => {
  const id = req.params.id;
  const { bookName, bookPrice, isbnNumber, authorName, publishedAt,publication } = req.body
  const olddata=await  Book.findById(id)
  let filename
  if (req.file){
    const oldimagepath =olddata.imageUrl
    console.log(oldimagepath)
    const localHostUrlLength="http://localhost:3000/".length
    const newoldImagePath= oldimagepath.slice(localHostUrlLength)
    console.log(newoldImagePath)
    fs.unlink(`storage/${newoldImagePath}`,(err)=>{
      if(err){
        console.log(err)
        }
        else{
          console.log("file deleted")
        }
    })
    filename="http://localhost:3000/"+req.file.filename
    console.log(filename)
  }
  await Book.findByIdAndUpdate(id,{
    bookName,
    bookPrice,
    isbnNumber,
    publication,
    authorName,
    publishedAt,
    imageUrl:filename
  });
  res.status(200).json({
    message: "book updated successfully",
  })
})
app.use(express.static("./storage"))
app.listen(3000, () => {
  console.log("server is running on port 3000");
});

