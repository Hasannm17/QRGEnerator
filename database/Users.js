const mongoose =require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_INFO ,{useNewUrlParser:true}).then(()=>{
    console.log('connected to the db')
}).catch(err =>{
    console.error(`there is an error ${err}`)
});
const UserSchema =new mongoose.Schema({

    username:{type:String ,required:[true ,"Provide a UserName"]} ,
    email:{type:String ,required:[true ,"please provide an email " ] ,unique:[true ,"Email Exist"] } ,
    password:{type:String ,required:true }





});
const User =new mongoose.model("User" ,UserSchema);

module.exports={User}; 
