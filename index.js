const http = require('http');
const csv2json = require('csvtojson');

//listen for incoming CSVs
function processCSV (req, res) {
    if (req.method == 'POST') {
        let csv = '';

        console.log('Receiving data...');
        req.on('data', (data) => {
            csv += data;
        })

        req.on('end', () => {
            console.log('Data received: ', GetConsoleText(csv));
            csv2json()
                .fromString(csv)
                .then(json => {respondWithJson(json, res)});
        });
    }
};

//send JSON back
function respondWithJson(jsonObj, res) {
    var json = JSON.stringify(jsonObj);
    console.log('Converted into JSON:', GetConsoleText(json));
    console.log('Returning JSON...');
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(json);
};

//trim csv/json text for console
function GetConsoleText(text) {
    var consoleData = text;

    if (consoleData.length > 75)
        consoleData = consoleData.substr(0, 75) + '...';
    
    return consoleData;
}

http.createServer(processCSV).listen(3000);