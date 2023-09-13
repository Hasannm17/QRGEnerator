const express= require('express');
const cors =require('cors');
const BodyParser =require('body-parser');
const {User}=require('./database/Users');
const auth = require("./auth");
const bycrypt=require('bcrypt');
const jwt =require('jsonwebtoken');
const PORT = process.env.PORT | 3000 ;
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(BodyParser.urlencoded({extended:true}));
app.use(cors());
app.listen(PORT , ()=>{console.log(`Running on port ${PORT}`)});
// Curb Cores Error by adding a header here
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });
  
  app.route('/').get((req ,res)=>{
    res.send('Welcome to our server')
  })

app.route('/signup').get((req, res )=>{
    res.send('signup page');
    }).post((req,res)=>{

        bycrypt.hash(req.body.password ,10).then((hashedpassword)=>{
    
            const firstUser= new User({
                username:req.body.username ,
                email:req.body.email ,
                password:hashedpassword
                });
                firstUser.save().then((result) => {
                    res.status(201).json({message:"Successfully added to the dataBase " , result});
                }).catch((err) => {
                        if(err.code===11000 && err.keyPattern.email===1){
                            res.status(400).json({message:"Email exist"})
                        }else{
                            res.status(500).json({message:"there is an error" , err})
                            console.error(`there error is ${err}`);
                         }
                });
             }).catch((err) =>{
           res.json({message:"Not hashed successfully " , err});
        });   
   

});

app.route('/signin').get((req ,res)=>{
    res.send('signin page');
}).post((req ,res )=>{
    User.findOne({email: req.body.email}).then((user)=>{
        bycrypt.compare(req.body.password ,user.password).then((passwordCheck)=>{
            if(!passwordCheck){
                return res.status(400).json({message:"password does not match" ,error})
            }

    //creat jwt Token
    const token = jwt.sign(
        {
            userId:user._id ,
            useremail:user.email
        },
        "RANDOM-TOKEN"
        ,
        {expiresIn:"24h"}
    );
    res.status(201).json({message:"jwt created successfully" , useremail:user.email ,token});

        })
        .catch((error)=>{
            res.json({message:"Wrong Password" ,error })
        })
      
    }).catch((err)=>{
        res.status(404).json({message:"Email not found" , err})
    })
});



// free endpoint
app.get("/free-endpoint", (request, response) => {
    response.json({ message: "You are free to access me anytime" });
  });
  
  // authentication endpoint
  app.get("/auth-endpoint",auth, (request, response) => {
    response.json({ message: "You are authorized to access me" });
  });
  