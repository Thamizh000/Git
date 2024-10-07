const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/user");

connect.then(()=>{
    console.log("Data base connected !!!")
})

.catch(()=>{
    console.log("Try again...")
})

const LoginSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    }
}); 

const collection = new mongoose.model("data", LoginSchema);


module.exports = collection;