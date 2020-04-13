exports.uploadFileToFolder = (fileName, filePath, metadataObj) => {
    const yaml = require('js-yaml');
    const fs = require('fs');
    const axios = require('axios');
    const FormData = require('form-data');
    try {
        let configFile = fs.readFileSync('./alfresco.yaml', 'utf8');
        let config = yaml.safeLoad(configFile);
        console.log("Alfresco Configuration : ")
        console.log(config);

        //sending post request to Alfresco
         
        const form = new FormData();
        form.append('name', fileName);
        form.append('nodeType', config.alfrescoNodeType);
        form.append('filedata', fs.createReadStream(filePath));
        form.append('dc:Barcode', metadataObj.barcode);
        form.append('dc:EDate', formatDate(metadataObj.delegationDate));
        form.append('dc:Embassy', metadataObj.counsulate);
        form.append('dc:EmployeeName', metadataObj.employeeName);
        form.append('dc:EmployeeNo', metadataObj.employeeNumber);
        form.append('dc:POADate', formatDate(metadataObj.transactionDate));
        form.append('dc:POAFrom', metadataObj.delegator);
        form.append('dc:POAFromPass', metadataObj.delegatorPassport);
        form.append('dc:POAKeyword', metadataObj.keySearch);
        form.append('dc:POANumber', metadataObj.delegationNumber);
        form.append('dc:POASubject', metadataObj.delegationSubject);
        form.append('dc:POATo', metadataObj.delegatedTo);
        form.append('dc:POAToPass', metadataObj.delegatedToPassport);
        form.append('dc:POAType', metadataObj.delegationType);
        console.log(form);
        
        const options = {...form.getHeaders(), Authorization: `${config.basicAuthorizationKey}`};
        console.log("Request header = ");
        console.dir(options);

        const url = `http://${config.host}:${config.port}${config.createDocumentURL}/${config.folderID}/children/`;
        console.log(`calling URL : ${url}`);

        axios.post(url, form, options)
        .then(({ data }) => {
            console.log(data);
            return "Ok";
        }, (error) => {
            console.log(error.message);
            return error.message;
        })
    } catch (e) {
        console.log(e.message);
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