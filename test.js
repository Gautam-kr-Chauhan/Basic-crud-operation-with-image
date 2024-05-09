const express=require("express");
const mongoose=require('mongoose');
const app=express()
const Path=require('path')

port=3000
//db connection
const db_uri='mongodb://localhost:27017/mydb'
mongoose.connect(db_uri);
const db=mongoose.connection;
db.on('error',(error)=>{
    console.log(error)
});
// db.once('open',()=>{
//     console.log("Connected to the database !")
    
// });
const acadmicInfoSchema = new mongoose.Schema({}, { collection: 'studentAcademicInfo' });
const AcadmicInfo = mongoose.model('AcadmicInfo', acadmicInfoSchema);
db.once('open', () => {
    console.log("Connected to the database!");

    // Retrieve data from collection
});
let a;

//middleware
//app.use(express.urlencoded({extended:false}));
//console.log(acadmicData);
//console.log(data)
app.get("/data", (req, res) => {
    AcadmicInfo.find()
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        console.error('Error retrieving data:', err);
    });
});
// app.get("/",(req,res)=>{
//     AcadmicInfo.find()
//     .then((data) => {
//         console.log(data)
//         res.json(data)
//     })
//     .catch((err) => {
//         console.error('Error retrieving data:', err);
//     });
// res.sendFile(Path.join(__dirname,"./index.html")) 
// })
app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`);
})