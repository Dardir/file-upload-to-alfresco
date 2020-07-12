exports.uploadFile =  (filePath, metadataObj,token) => {
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
    return alfresco.uploadFileToFolder(fileName,filePath,metadataObj,token);
  } catch (err) {
    return err.message;
  }
};

exports.searchFile = async (folderID,token) => {
  const alfresco = require('./alfresco');
  console.log(`Starting to search files in folder = ${folderID}`);
  try {
    const response = await alfresco.getAllFilesInFolder(folderID,token);
    return response;
  }catch (err) {
    return err.message;
  }
}

exports.fetchFile = async (fileID,token) => {
  const alfresco = require('./alfresco');
  console.log(`Starting to fetch file of ID = ${fileID}`);
  try {
    const response = await alfresco.getFileURLWithID(fileID,token);
    return response;
  }catch (err) {
    return err.message;
  }
}

exports.signIn = async (username,password) => {
  const alfresco = require('./alfresco');
  console.log(`Starting to signin`);
  try {
    const response = await alfresco.signIn(username,password);
    return response;
  }catch (err) {
    return err.message;
  }
}