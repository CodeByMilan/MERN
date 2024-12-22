const mongoose = require('mongoose')

async function connectToDatabase(){
    await mongoose.connect('mongodb+srv://milanacharya2001:DTfMtpG8spK6dfSs@cluster0.ttjxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    console.log('Connected to database')

}
module.exports=connectToDatabase