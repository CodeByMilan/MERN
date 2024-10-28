const express = require("express");
const app = express();
const { Server } = require("socket.io");
const connectDB = require("./database");

const Book = require("./model/bookModel");
//database connection
connectDB();

const server = app.listen(4000, () => {
  console.log("server is running on port 4000");
});
//must use the same instance throughout the project
const io = new Server(server);

//CRUD
io.on("connection", (socket) => {
  console.log("user connected");

  //insert operation

  socket.on("addBook", async (data) => {
    console.log(data);
    try {
      if (data) {
        const { bookName, bookPrice } = data;
        console.log(bookName, bookPrice);
        const newBook = await Book.create({
          bookName,
          bookPrice,
        });
        socket.emit("response", {
          status: 200,
          message: "book added successfully",
          data: newBook,
        });
      }
    } catch (error) {
      socket.emit("response", {
        status: 500,
        message: "something went wrong ",
        data: newBook,
      });
      console.log(error);
    }
  });

  //read operation
  socket.on("getBooks", async () => {
    try {
      const books = await Book.find();
      socket.emit("response", {
        status: 200,
        mesasge: "books fetched successfully",
        data: books,
      });
    } catch (error) {
      socket.emit("response", {
        status: 500,
        message: "something went wrong ",
      });
      console.log(error);
    }
  });

  //update operation
  socket.on("updateBook", async (data) => {
    try {
      if (data) {
        const { id, bookName, bookPrice } = data;
        const book = await Book.findByIdAndUpdate(
          id,
          {
            bookName,
            bookPrice,
          },
          {
            //this will response new data
            new: true,
          }
        );
        socket.emit("response", {
          status: 200,
          message: "book updated successfully",
          data: book,
        });
      }
    } catch (error) {
      socket.emit("response", {
        status: 500,
        message: "something went wrong ",
      });
      console.log(error);
    }
  });
  //delete Operation
  socket.on("deleteBook", async (data) => {
    try {
      if (data) {
        const { id } = data;
        const book = await Book.findByIdAndDelete(id);
        socket.emit("response", {
          status: 200,
          message: "book deleted successfully",
          data: book,
        });
      }
    } catch (error) {
      socket.emit("response", {
        status: 500,
        message: "something went wrong ",
      });
      console.log(error);
    }
  });
});
