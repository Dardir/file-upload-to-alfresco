exports.uploadFile =  (filePath, metadataObj) => {
  const alfresco = require('./alfresco');
  console.log(`Starting to upload file in path = ${filePath}`);
  //const fs = require('fs');
  try {
    /*const fileContent = fs.readFileSync(filePath);
    if (fileContent.length === 0) {
      console.log(`Empty file in path = ${filePath}`);
      return 'Empty File';
    }*/
    //console.log(`read file Successfuly in path = ${filePath} with size = "${fileContent.length}`);
    let pathArr = filePath.split("/");
    if(pathArr.length === 0){
      pathArr = filePath.split("\\");
    }
    const fileName = pathArr[pathArr.length-1];
    console.log(`file name to be sent is ${fileName}`);
    return alfresco.uploadFileToFolder(fileName,filePath,metadataObj);
  } catch (err) {
    return err.message;
  }
};