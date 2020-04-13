exports.uploadFileToFolder = (file,metadataObj)=> {
    const yaml = require('js-yaml');
    const fs = require('fs');
    try {
        let configFile = fs.readFileSync('./alfresco.yaml', 'utf8');
        let config = yaml.safeLoad(configFile);
        console.log("Alfresco Configuration : ")
        console.log(config);
        return "Ok";
    } catch (e) {
        console.log(e.message);
        return e.message;
    }
    
};