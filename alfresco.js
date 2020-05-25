exports.uploadFileToFolder = (fileName, filePath, metadataObj) => {
    const yaml = require('js-yaml');
    const fs = require('fs');
    const request = require("request");
    try {
        let configFile = fs.readFileSync('./alfresco.yaml', 'utf8');
        let config = yaml.safeLoad(configFile);
        console.log("Alfresco Configuration : ")
        console.log(config);

        //sending post request to Alfresco
        console.log(`File Path to be sent = ${filePath}`);
        let stream = fs.createReadStream(filePath).on('data', function (chunk) {
            console.log("Receiving data of length ...");
            console.log(chunk.length);
        });
        const url = `http://${config.host}:${config.port}${config.createDocumentURL}/${config.folderID}/children/`;
        console.log(`calling URL : ${url}`);


        var options = {
            method: 'POST',
            url: `${url}`,
            headers: {
                'content-type': 'multipart/form-data; boundary=---011000010111000001101001',
                'Authorization': `${config.basicAuthorizationKey}`
            },
            formData: {
                name: fileName,
                nodeType: config.alfrescoNodeType,
                filedata: stream,
                'dc:Barcode': metadataObj.barcode,
                'dc:EDate': formatDate(metadataObj.delegationDate),
                'dc:Embassy': metadataObj.counsulate,
                'dc:EmployeeName': metadataObj.employeeName,
                'dc:EmployeeNo': metadataObj.employeeNumber,
                'dc:POADate': formatDate(metadataObj.transactionDate),
                'dc:POAFrom': metadataObj.delegator,
                'dc:POAFromPass': metadataObj.delegatorPassport,
                'dc:POAKeyword': metadataObj.keySearch,
                'dc:POANumber': metadataObj.delegationNumber,
                'dc:POASubject': metadataObj.delegationSubject,
                'dc:POATo': metadataObj.delegatedTo,
                'dc:POAToPass': metadataObj.delegatedToPassport,
                'dc:POAType': metadataObj.delegationType,
                'cm:description': metadataObj.barcode + ',' + formatDate(metadataObj.delegationDate) + ',' + metadataObj.counsulate + ',' + metadataObj.employeeName + ',' + metadataObj.employeeNumber + ',' + formatDate(metadataObj.transactionDate) + ',' + metadataObj.delegator + ',' + metadataObj.delegatorPassport + ',' + metadataObj.keySearch + ',' + metadataObj.delegationNumber + ',' + metadataObj.delegationSubject + ',' + metadataObj.delegatedTo + ',' + metadataObj.delegatedToPassport + ',' + metadataObj.delegationType
            }
        };
        console.log("complete options to be sent = ");
        console.dir(options);

        request(options, function (error, response, body) {
            if (error) {
                return (error.message);
            }
            console.log("Received response = ");
            console.log(body);
            return "Ok";
        });

    } catch (e) {
        console.log(e.message);
        return e.message;
    }

};

exports.getAllFilesInFolder = async (folderID) => {
    const yaml = require('js-yaml');
    const fs = require('fs');
    const axios = require("axios");
    try {
        let configFile = fs.readFileSync('./alfresco.yaml', 'utf8');
        let config = yaml.safeLoad(configFile);
        console.log("Alfresco Configuration : ")
        console.log(config);

        //sending get request to Alfresco
        const url = `http://${config.host}:${config.port}${config.createDocumentURL}/${folderID}/children?include=properties&where=(nodeType%3D'${config.alfrescoNodeTypeForSearch}')`;
        console.log(`calling URL : ${url}`);
        axios.defaults.headers.common['Authorization'] = config.basicAuthorizationKey;
        const response = await axios.get(url);
        console.log("Response received from Alfresco is ");
        console.dir(response);
        return response;


    } catch (e) {
        console.log("Catching error : " + e.message);
        return e.message;
    }

};

exports.getFileURLWithID = async (fileID) => {  

    const yaml = require('js-yaml');
    const fs = require('fs');
    let configFile = fs.readFileSync('./alfresco.yaml', 'utf8');
    let config = yaml.safeLoad(configFile);
    console.log("Alfresco Configuration : ");
    console.log(config);
    
    const AlfrescoApi = require('alfresco-js-api-node');
    const alfrescoJsApi = new AlfrescoApi({hostEcm:`http://${config.host}:${config.port}`});
    alfrescoJsApi.login('admin', 'admin').then(function (data) {
        console.log('API called successfully Login ticket:' + data);
        const contentApi = new ContentApi(alfrescoJsApi);
        console.log(`Getting URL for file ID = ${fileID}`);
        return contentApi.getContentUrl(fileID);
    }, function (error) {
        console.log("Catching error : " + error.message);
        return error.message;
    });

    

};


exports.signIn = async (username, password) => {
    const yaml = require('js-yaml');
    const fs = require('fs');
    const axios = require("axios");
    try {
        let configFile = fs.readFileSync('./alfresco.yaml', 'utf8');
        let config = yaml.safeLoad(configFile);
        console.log("Alfresco Configuration : ")
        console.log(config);

        //sending get request to Alfresco
        const url = `http://${config.host}:${config.port}${config.loginURL}`;

        console.log(`calling URL : ${url}`);
        axios.defaults.headers.common['Authorization'] = config.basicAuthorizationKey;
        const response = await axios.post(url, {
            userId: username,
            password: password
        })
        console.log("Response received from Alfresco is ");
        console.dir(response);
        return response;


    } catch (e) {
        console.log("Catching error : " + e.message);
        return e.message;
    }

};

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}