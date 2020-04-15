exports.uploadFileToFolder = (fileName, filePath, metadataObj) => {
    const yaml = require('js-yaml');
    const fs = require('fs');
    //const axios = require('axios');
    const request = require("request");
   // const FormData = require('form-data');
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
                'Authorization' : `${config.basicAuthorizationKey}`
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
                'dc:POAType': metadataObj.delegationType
            }
        };
        console.log("complete options to be sent = ");
        console.dir(options);

        request(options, function (error, response, body) {
            if (error){
                return (error.message);
            }
            console.log("Received response = ");
            console.log(body);
            return "Ok";
        });


        /*
                const form = new FormData();
                form.append('name', fileName);
                form.append('nodeType', config.alfrescoNodeType);
                form.append('filedata', stream);
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
                
                //const options = {...form.getHeaders(), 'Authorization': `${config.basicAuthorizationKey}`};
        
                
        
               // axios.defaults.headers.common['Authorization'] = config.basicAuthorizationKey;
        
                axios.post(url, form, form.getHeaders)
                .then(({ data }) => {
                    console.log(data);
                    return "Ok";
                }, (error) => {
                    console.log(error.message);
                    return error.message;
                })*/
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