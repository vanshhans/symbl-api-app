const express = require("express");
const multer = require("multer");
const path = require("path");
const request = require("request");
const fs = require("fs");
const {
  response
} = require("express");

const app = express();
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    // console.log("filename");
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage
});
const authToken =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVUTRNemhDUVVWQk1rTkJNemszUTBNMlFVVTRRekkyUmpWQ056VTJRelUxUTBVeE5EZzFNUSJ9.eyJodHRwczovL3BsYXRmb3JtLnN5bWJsLmFpL3VzZXJJZCI6IjYzNjMyMDUxODUwNDQ0ODAiLCJpc3MiOiJodHRwczovL2RpcmVjdC1wbGF0Zm9ybS5hdXRoMC5jb20vIiwic3ViIjoiR3ZZMzlpNDNZcHpORzVTVTF1a1JoUDdJcU54Q1lVWGZAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcGxhdGZvcm0ucmFtbWVyLmFpIiwiaWF0IjoxNjUyMjc4MTI4LCJleHAiOjE2NTIzNjQ1MjgsImF6cCI6Ikd2WTM5aTQzWXB6Tkc1U1UxdWtSaFA3SXFOeENZVVhmIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.z41bLxgcWxbK0hD-XbvCCrUo4AFA6Cnff5LRSF7X-1iJs9MgXtCY4JJ6f1nVXqop2F4RfpgOGFEAzdcBf0HwAeI3g3dDh-hUoaBHAQHN85fvur6QQkkPJqMobshdF9VPS7bNJpOTjwRwXNNfZ7G4S5sXFmhJAdLy82SMKtAKoMChKOuniUsd0xN7mLixPt5hs62Pj_puzEZrkNzXWLhSyr7N2zBpysfRhlaqjN-jxM877tgxo4mCeA6TxwDQqfegA3Cl9QXp9QWdhEm-mw3g-kMbHiQKF-XrT7X5IV0_uEOjLFZ9oX6hZ60KdrCbSKobl7SYjPepRR8lo70IgL2D0A";

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.render("./index.html");
});

app.post("/audio", upload.single("file"), (req, res) => {
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
      global.conversationId = JSON.stringify(response.body["conversationId"]);
      // console.log(JSON.stringify(response.body.conversationId));
      // console.log(global.conversationId);
      res.render("home.ejs", {
        conversationId: response.body["conversationId"]
      });
    })
  );
});

app.get("/get-Speech-To-Text/:conversationId", (req, res) => {
  const id = req.params;
  request.get({
    url: `https://api.symbl.ai/v1/conversations/${id["conversationId"]}/messages`,
    headers: {
      'Authorization': `Bearer ${authToken}`
    },
    json: true
  }, (err, response, body) => {
    console.log(body);
  });
})

app.get("/get-Speech-To-Text/:conversationId", (req, res) => {
  const id = req.params;
  request.get({
    url: `https://api.symbl.ai/v1/conversations/${id["conversationId"]}/action-items`,
    headers: {
      'Authorization': `Bearer ${authToken}`
    },
    json: true
  }, (err, response, body) => {
    console.log(body);
  });
})

app.get("/get-Speech-To-Text/:conversationId", (req, res) => {
  const id = req.params;
  request.get({
    url: `https://api.symbl.ai/v1/conversations/${id["conversationId"]}/follow-ups`,
    headers: {
      'Authorization': `Bearer ${authToken}`
    },
    json: true
  }, (err, response, body) => {
    console.log(body);
  });
})

app.get("/get-Speech-To-Text/:conversationId", (req, res) => {
  const id = req.params;
  request.get({
    url: `https://api.symbl.ai/v1/conversations/${id["conversationId"]}/topics`,
    headers: {
      'Authorization': `Bearer ${authToken}`
    },
    json: true
  }, (err, response, body) => {
    console.log(body);
  });
})

app.get("/get-Speech-To-Text/:conversationId", (req, res) => {
  const id = req.params;
  request.get({
    url: `https://api.symbl.ai/v1/conversations/${id["conversationId"]}/questions`,
    headers: {
      'Authorization': `Bearer ${authToken}`
    },
    json: true
  }, (err, response, body) => {
    console.log(body);
  });
})

app.listen(3000, () => {
  console.log("Listening on port 3000");
});