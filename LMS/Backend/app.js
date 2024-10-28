const express = require("express");
const app = express();
//use to parse incoming json
app.use(express.json());
//fs is required to deal with files while removing and updating new one
const fs = require("fs");
const mongoose = require("mongoose");

//this is used to give access to the storage folder so that image in the storage folder can be accesed directly by frontend
app.use(express.static("./storage/"));


//alternative
//const app=require('express')()

//cors package- for allowing the site to hit our backend , or simply giving permission 
const cors = require("cors");
app.use(
  cors({
    origin: "https://mern-chi-pied.vercel.app",
  })
);


//backendurl 
// const backendUrl = "http://localhost:300";
//change the backend url once you have deployed the backend so that the image will be loaded from the backend url as we will be hitting the hosted backend url from the front end 
 const backendUrl = "https://mern-u49b.onrender.com";
//database connection
const connectionString =
  "mongodb+srv://milanacharya2001:milan@cluster0.ka73t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function connectToDatabase() {
  await mongoose.connect(connectionString);
  console.log("database connection successful");
}
connectToDatabase();

//root
app.get("/", (req, res) => {
  res.status(200).json({
    message: "sucess",
  });
});
//insert operation
const Book = require("./model/bookModel");
const {multer,storage}=require ("./middleware/multerConfig")
const upload =multer({storage:storage})


//new book
app.post("/book", upload.single("image"), async (req, res) => {
  // console.log(req.file);
  console.log(req.body);
  try{
  let filename;
  if (!req.file) {
    filename = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmZBWXUFYSEz3ZFW7Fa7wtzKdtMgcPqNpWvQ&s";
  } else {
    filename = `${backendUrl}/ ${req.file.filename}`;
  }
  //destructuring
  const {
    bookName,
    bookPrice,
    isbnNumber,
    authorName,
    publishedAt,
    publication,
    description
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
    description,
    imageUrl: filename,
  });
  res.status(201).json({
    message: "book created successfully",
  });
}catch(error){
  console.log(error);
  res.status(500).json({
    message: "server error",
    });
  }
  console.log(bookName,bookPrice,isbnNumber,authorName,publishedAt,description)
});

//read operation 
//all read
app.get("/book", async (req, res) => {
  try {
  const books = await Book.find(); //return array
  res.status(200).json({
    message: "books fetched successfully",
    data: books,
  });
}
catch(error){ 
  console.log(error);
  res.status(500).json({
    message: "server error",
    });
    }

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

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    const imageUrl = book.imageUrl;
    const localHostUrlLength = `${backendUrl}/`.length;
    const filePath = imageUrl.slice(localHostUrlLength);
    fs.unlink(`storage/${filePath}`, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("Image file deleted successfully");
      }
    });
    await Book.findByIdAndDelete(id);

    res.status(200).json({ message: "Book and image file deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ message: "Server error" });
  }
});


//update operation
app.patch("/book/:id", upload.single("image"), async (req, res) => {
  const id = req.params.id;
  try{
    const olddata=await  Book.findById(id);
    if (!olddata) {
      return res.status(404).json({ message: "Book not found" });
      }  
  const {
    bookName,
    bookPrice,
    isbnNumber,
    authorName,
    publishedAt,
    publication,
    description,
    
  } = req.body;
  let filename=olddata.imageUrl
  if (req.file) {
    const oldimagepath = olddata.imageUrl;
    // console.log(oldimagepath);
    const localHostUrlLength = `${backendUrl}/`.length;
    const newoldImagePath = oldimagepath.slice(localHostUrlLength);
    // console.log(newoldImagePath);
    fs.unlink(`storage/${newoldImagePath}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("file deleted");
      }
    });
    filename = `${backendUrl}/ ${ req.file.filename}`;
    console.log(filename);
  }
  await Book.findByIdAndUpdate(id, {
    bookName,
    bookPrice,
    isbnNumber,
    publication,
    authorName,
    publishedAt,
    description,
    imageUrl: filename,
  });
}
catch(error){
  console.log(error)
  res.status(500).json({ message: "Server error" });
}
});
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
