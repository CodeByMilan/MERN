const mongoose=require ('mongoose')
//schema or table  structure
const bookSchema = new mongoose.Schema({
    bookName : {
        type : String,
        unique : true
},
bookPrice:{
    type:Number
},
isbnNumber:{
    type:Number //there is no double ,float in nosql
},
authorName :{
    type:String
},
publishedAt :{
    type:String
},
publication:{
    type:String
},
description:{
    type:String
},
imageUrl:{
    type:String
}

})
//  class Schema {
//     Schema(title){
//         console.log(title)
//     }
//  }
//  const schema  = new Schema('Hello')
//table creation
 const Book=mongoose.model('Book',bookSchema)//standard naming convention says that table name and returned name nshould be same 
 module.exports = Book

 //in no sql unless and until we do any operation we cannot see our table in the atlas
 //in no sql the name of the table we give becomes pulural and in lower case 