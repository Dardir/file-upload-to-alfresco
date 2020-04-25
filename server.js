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
  console.log("metadataObj = ");
  console.dir(metadataObj);
  console.log(`filePath =  ${filePath}`);
  try {
    const response = as.uploadFile(filePath, metadataObj);
    res.end(response);
  } catch (error) { // in case of no known errors
    res.end(error);
  }
});

app.get('/search/:folderID', async function (req, res) {
  const folderID = req.params.folderID;
  console.log(`folderID =  ${folderID}`);
  try {
    const response = await as.searchFile(folderID);
    console.log("Final Response = ");
    console.dir(response.data);

    res.json(response.data);
  } catch (error) { // in case of no known errors
    res.end(error);
  }
});

app.listen(4000, function () {
  console.log("Started on PORT 4000");
})