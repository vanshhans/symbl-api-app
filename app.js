const express=require("express");
const multer = require("multer");
const upload =multer({storage});

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

app.get("/",(req,res)=>{
    res.send("home page");
})

app.post("/api.symbl.ai/v1/process/audio",upload.single('file'),(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    res.send("successfully uploaded the file");
});


app.listen(3000,()=>{
    console.log("Listening on port 3000");
})