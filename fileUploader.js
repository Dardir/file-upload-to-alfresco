exports.uploadFile =  (filePath, metadataObj) => {
  const alfresco = require('./alfresco');
  console.log(`Starting to read file in path = ${filePath}`);
  const fs = require('fs');
  try {
    const fileContent = fs.readFileSync(filePath);
    if (fileContent.length === 0) {
      console.log(`Empty file in path = ${filePath}`);
      return 'Empty File';
    }
    console.log(`read file Successfuly in path = ${filePath} with size = "${fileContent.length}`);
    return alfresco.uploadFileToFolder(fileContent,metadataObj);
  } catch (err) {
    return err.message;
  }
};