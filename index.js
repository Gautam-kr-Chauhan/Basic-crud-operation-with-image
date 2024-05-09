const express=require("express");
const mongoose=require('mongoose');
const session=require('express-session')
const app=express()
const Path=require('path')

port=4000
//db connection
const db_uri='mongodb://localhost:27017/mydb'

mongoose.connect(db_uri);
const db=mongoose.connection;
db.on('error',(error)=>{
    console.log(error)
});
db.once('open',()=>{
    console.log("Connected to the database !")
    
});

//middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({
    secret:'my secret key',
    saveUninitialized:true,
    resave:false,

}))
app.use((req,res,next)=>{
    res.locals.message=req.session.message;
    delete req.session.message;
    next();
});

app.use(express.static('uploads'));
//set template engine
app.set('view engine',"ejs");

//router prefix
app.use("",require('./routes/routes'));

app.get("/", (req, res) => {
    res.send('hello bro!!')
});

app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`);
})