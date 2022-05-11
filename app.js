const express = require("express");
const multer = require("multer");
const path = require("path");
const request = require("request");
const fs = require("fs");
// const tokenGenerator=require("./auth_token");

const app = express();
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    console.log("filename");
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("./index.html");
});

app.post("/audio", upload.single("file"), (req, res) => {
  const authToken =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVUTRNemhDUVVWQk1rTkJNemszUTBNMlFVVTRRekkyUmpWQ056VTJRelUxUTBVeE5EZzFNUSJ9.eyJodHRwczovL3BsYXRmb3JtLnN5bWJsLmFpL3VzZXJJZCI6IjYzNjMyMDUxODUwNDQ0ODAiLCJpc3MiOiJodHRwczovL2RpcmVjdC1wbGF0Zm9ybS5hdXRoMC5jb20vIiwic3ViIjoiR3ZZMzlpNDNZcHpORzVTVTF1a1JoUDdJcU54Q1lVWGZAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcGxhdGZvcm0ucmFtbWVyLmFpIiwiaWF0IjoxNjUyMTkyMzU3LCJleHAiOjE2NTIyNzg3NTcsImF6cCI6Ikd2WTM5aTQzWXB6Tkc1U1UxdWtSaFA3SXFOeENZVVhmIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.sw4hRSiobDvJg6yukdbJ67a7s3ZNwnJ58aAPjpcsx01LeY7ujR3yE9oYj8ZtPMa1jZ-IoWH0kdF877G4g_2icdHNv79uP6ZTvs0Hp9ImMMNwT1dn1NtH6QTZPJHbxamzXzeEzKu6MHXYsd_bt8LqNC0e0sAAHlcSIjvQ5jCtQempbZXEtuQIFzmHGWpjIZlydZnDnqz6xV02JYDlU8bKNk4B86-lE0NKM1DusS257NNg02nJhxueSSbQsG_8tKySnBgUkY9LLmBwIYNS4_cxC5YIbQjJ9LNWhvouR-U6KeoAsD3WG8vRsI3MNkuO1EnW0BdauDnBaRxRw1CA-bXOXQ";
  //const webhookUrl = WEBHOOK_URL;
  const audioFileStream = fs.createReadStream(`${req.file.filename}`);

  const audioOption = {
    url: "https://api.symbl.ai/v1/process/audio",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    json: true,
  };

  audioFileStream.pipe(
    request.post(audioOption, (err, response, body) => {
      const statusCode = response.statusCode;
      if (err || Object.keys(response).indexOf(statusCode.toString()) !== -1) {
        throw new Error(response[statusCode]);
      }
      console.log("Status code: ", statusCode);
      console.log("Body", response.body);
    })
  );

  res.send("successfully uploaded the file");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
