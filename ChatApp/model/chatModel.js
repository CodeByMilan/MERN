const mongoose  = require('mongoose');
const { type } = require('os');
 
const Schema =mongoose.Schema

const messageSchema =new Schema({
    message:{
        type:String
    }
})
const Chat =  mongoose.model('Chat', messageSchema);
module.exports=Chat;

