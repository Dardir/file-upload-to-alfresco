const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fu = require('./fileUploader');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/upload', function (req, res) {
  const metadataObj = req.body.metadataObj;
  const filePath = req.body.filePath;
  console.log("metadataObj = ");
  console.dir(metadataObj);
  console.log(`filePath =  ${filePath}`);
  try {
    const response = fu.uploadFile(filePath, metadataObj);
    res.end(response);
  } catch (error) { // in case of no known errors
    res.end(error);
  }
});

app.listen(4000, function () {
  console.log("Started on PORT 4000");
})