exports.uploadFile =  (filePath, metadataObj) => {
  const alfresco = require('./alfresco');
  console.log(`Starting to upload file in path = ${filePath}`);
  try {
    let pathArr = filePath.split("/");
    if(pathArr.length === 0){
      pathArr = filePath.split('\\');
    }
    const fileNameWithUUID = pathArr[pathArr.length-1];
    const firstPart = fileNameWithUUID.split("_")[0];
    const extension = fileNameWithUUID.split(".")[1];
    const fileName = firstPart+"."+extension;
    console.log(`file name to be sent is ${fileName}`);
    return alfresco.uploadFileToFolder(fileName,filePath,metadataObj);
  } catch (err) {
    return err.message;
  }
};