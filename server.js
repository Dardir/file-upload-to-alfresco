const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const as = require('./alfrescoService');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/upload', function (req, res) {
  const metadataObj = req.body.metadataObj;
  const filePath = req.body.filePath;
  const token =  req.header('Authorization');
  console.log("metadataObj = ");
  console.dir(metadataObj);
  console.log(`filePath =  ${filePath}`);
  try {
    const response = as.uploadFile(filePath, metadataObj,token);
    res.end(response);
  } catch (error) { // in case of no known errors
    res.end(error);
  }
});

app.post('/signin', async function (req, res) {
  const userId = req.body.userId;
  const password = req.body.password;
  console.log(`userId = ${userId}`);
  console.log(`password =  ${password}`);
  try {
    const response = await as.signIn(userId, password);
    if (response.data) {
      console.log("Final Response = ");
      console.dir(response.data);
      res.json(response.data);
    } else {
      res.send(response);
    }
  } catch (error) { // in case of no known errors
    res.end(error);
  }
});

app.get('/search/:folderID', async function (req, res) {
  const folderID = req.params.folderID;
  console.log(`folderID =  ${folderID}`);
  const token =  req.header('Authorization');
  try {
    const response = await as.searchFile(folderID,token);
    if (response.data) {
      console.log("Final Response = ");
      console.dir(response.data);
      res.json(response.data);
    } else {
      res.send(response);
    }
  } catch (error) { // in case of no known errors
    res.end(error);
  }
});

app.get('/fetchFile/:fileID', async function (req, res) {
  const fileID = req.params.fileID;
  console.log(`fileID =  ${fileID}`);
  const token =  req.header('Authorization');
  try {
    const response = await as.fetchFile(fileID,token);
    if (response.data) {
      console.log("Final Response = ");
      console.dir(response.data);
      res.json(response.data);
    } else {
      res.status(500).send(response);
    }
  } catch (error) { // in case of no known errors
    res.end(error);
  }
});

app.listen(4000, function () {
  console.log("Started on PORT 4000");
})