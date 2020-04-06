exports.uploadFile = function (filePath, metadataObj) {
  console.log("Starting to read file in path = " + filePath);
  var fs = require('fs');
  try {
    var fileContent = fs.readFileSync(filePath);
    if (fileContent.length === 0) {
      console.log("Empty file in path = " + filePath);
      return "Empty File"
    }
    console.log("read file Successfuly in path = " + filePath+ " with size = "+fileContent.length);
    return "Ok";
  } catch (err) {
    return error;
  }
};