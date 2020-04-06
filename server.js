var express        =        require("express");
var bodyParser     =        require("body-parser");
var app            =        express();
var fu             =        require('./fileUploader');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/upload',function(req,res){
  var metadataObj = req.body.metadataObj;
  var filePath = req.body.filePath;
  console.log("metadataObj = ");
  console.dir(metadataObj);
  console.log("filePath = "+filePath);
  var response = fu.uploadFile(filePath,metadataObj);
  res.end(response);
});

app.listen(4000,function(){
  console.log("Started on PORT 4000");
})