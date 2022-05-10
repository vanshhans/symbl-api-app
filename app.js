const express=require("express");
const multer = require("multer");
const path=require("path");
const tokenGenerator=require("./auth_token");

const app=express();
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      console.log('filename')
      cb(null, file.originalname)
    },
    destination: function (req, file, cb) {
      console.log('storage')
      cb(null, './uploads')
    },
  })

const upload =multer({storage});

app.use(express.static(path.join(__dirname, 'public')));


app.get("/",(req,res)=>{
    res.render("./index.html");
})


app.post("/api.symbl.ai/v1/process/audio",upload.single('file'),(req,res)=>{
    const authToken=tokenGenerator();
    res.set('Authorization', `Bearer ${authToken}`);
    console.log(req.body);
    console.log(req.file);
    res.send("successfully uploaded the file");
});


app.listen(3000,()=>{
    console.log("Listening on port 3000");
})