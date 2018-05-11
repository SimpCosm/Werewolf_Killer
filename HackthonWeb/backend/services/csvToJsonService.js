let csvtojson = require("csvtojson");

function convertFromStream(csvStream) {
    let jsonArray = [];
    let promise = new Promise((resolve, reject) => {
        csvtojson({ noheader: false, checkType: true })
            .fromStream(csvStream)
            .on('json', (jsonObj) => {
                jsonArray.push(jsonObj);
            })
            .on('done', (err) => {
                if (err) {
                    reject(err);
                }
                resolve(jsonArray);
            })
    })
    return promise;
}

function convertFromString(csvString) {
    let jsonArray = [];
    let promise = new Promise((resolve, reject) => {
        csvtojson({ noheader: false, checkType: true })
            .fromString(csvString)
            .on('json', (jsonObj) => {
                jsonArray.push(jsonObj);
            })
            .on('done', (err) => {
                if (err) {
                    reject(err);
                }
                resolve(jsonArray);
            })
    })
    return promise;
}

module.exports.convertFromString = convertFromString;
module.exports.convertFromStream = convertFromStream;