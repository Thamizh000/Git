const express = require("express");
const pasth = require("path");
const bcrypt = require("bcrypt");
const collection = require ("./Config");

const app = express();
app.set('view engine' , 'ejs');
app.use(express.static("public"));
app.use(express. json());
app.use(express. urlencoded({extended: false}))


app.get("/", (req, res)=>{
   res.render("login")
})

app.get("/sign", (req, res)=>{
    res.render("Sign");
});

app.post("/sign" , async(req, res)=>{
    const datas = {
        name: req.body.username,
        password:req.body.userpassword
    }

    const exiteuser = await collection.findOne({name: datas.name});
    if(exiteuser){
        res.send("Already in Attendence");
    }else{
        
    const setRounds = 10;
    const hashpassword = await bcrypt.hash(datas.password, setRounds);
    datas.password = hashpassword;

    const userdata = await collection.insertMany(datas);
    console.log(userdata);

    }

})

app.post("/login" , async (req, res)=>{
    try{

        const check = await collection.findOne({name: req.body.username});
        if(!check){
            res.send("cannot find your name");
        }


       
      const isPasswordMatch = await bcrypt.compare(req.body.userpassword, check.userpassword);
        if(isPasswordMatch){
            res.render("details")

        }else{
            res.send("wrong password")
        } 
    }catch{
        res.render("details");

    }

});




const port = 5000;
app.listen(port, ()=>{
    console.log(`Data Running Successfully !!! on ${port}`);
})