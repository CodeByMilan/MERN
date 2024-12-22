const express = require("express");
const app = express();
//use to parse incoming json
app.use(express.json());
//fs is required to deal with files while removing and updating new one
const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config()

//this is used to give access to the storage folder so that image in the storage folder can be accesed directly by frontend
const path = require('path');
app.use(express.static(path.join(__dirname, 'storage')));



//alternative
//const app=require('express')()

//cors package- for allowing the site to hit our backend , or simply giving permission 
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);


//backendurl 
const backendUrl = process.env.backendUrl;
//change the backend url once you have deployed the backend so that the image will be loaded from the backend url as we will be hitting the hosted backend url from the front end 
//  const backendUrl = "https://mern-u49b.onrender.com";
//database connection
const connectToDatabase = async () => {
  try {
      const uri = process.env.connectionStringMongoose;
      if (!uri) {
          throw new Error('connectionString is not defined in the environment variables');
      }
      await mongoose.connect(uri);
      console.log('Connected to MongoDB successfully');
  } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      process.exit(1);
  }
};

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
    filename = `${backendUrl}/${req.file.filename}`;
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
console.log(req.body)
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
  console.log(bookName,bookPrice,isbnNumber,authorName,publishedAt,description)
}catch(error){
  console.log(error);
  res.status(500).json({
    message: "server error",
    });
  }

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

    // Use fs.promises.unlink to handle asynchronous file deletion properly
    try {
      await fs.promises.unlink(`storage/${filePath}`);
      console.log("Image file deleted successfully");
    } catch (err) {
      console.error("Error deleting file:", err);
    }

    // Delete the book from the database
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
  try {
    const olddata = await Book.findById(id);
    if (!olddata) {
      return res.status(404).json({ message: "Book not found" });
    }

    const { bookName, bookPrice, isbnNumber, authorName, publishedAt, publication, description } = req.body;
    
    let filename = olddata.imageUrl;

    if (req.file) {
      const oldimagepath = olddata.imageUrl;
      const localHostUrlLength = `${backendUrl}/`.length;
      const newoldImagePath = oldimagepath.slice(localHostUrlLength);

      // Delete old image
      try {
        await fs.promises.unlink(`storage/${newoldImagePath}`);
        console.log("Old file deleted");
      } catch (err) {
        console.log("Error deleting old image:", err);
      }

      // Set new image filename
      filename = `${backendUrl}/${req.file.filename}`;
      console.log('New image filename:', filename);
    }

    // Update book
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

    res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: "Server error" });
  }
});
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
