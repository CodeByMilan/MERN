//library
const express = require('express');
//instance of  express
const app = express();
//server class is used to setup websocket connrction and realtime communication
const { Server } = require('socket.io');
const connectToDatabase = require('./database');
const Chat = require('./model/chatModel')


//starting  express server at port 4000
const server = app.listen(4000, () => {
    console.log("server is running on port 4000");
})

//dtaabase conection 
connectToDatabase()

//socket.io setup
const io = new Server(server);
//socket.io connection
io.on('connection', (socket) => {
    console.log('a new client connected');

    //sending a message to the connected client 
    socket.emit("responseMessage", {
        status: 200,
        message: "Server: hello client"
    })

    //receiving message from the client 
    socket.on("receiveMessage", async (data) => {
        console.log("received message from client:" , data);

        //storing the message in the database
        try {
            if (data) {
                const newMessage = await Chat.create({
                    message: data.message
                })
                socket.emit("responseMessage", {
                    status: 200,
                    message: "message stored in database",
                    data: newMessage
                })
            }
        } catch (error) {
            socket.emit("responseMessage", {
                status: 200,
                message: "message not received",

            })
            console.log(error);

        }
        })

    })


