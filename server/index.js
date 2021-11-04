'use strict';
let http = require('http');
let url = require('url');
let fs = require('fs');

const filename = 'data.json';
let data = {};


function createAccount(response, options){
    data["users"].push(options);
    response.end();
    let strInput = JSON.stringify(data);
    fs.writeFileSync(filename, strInput);
}

function serverFunction(request, response, options){
    const headerText = {'content-type': 'text/json'};
    response.writeHead(200, headerText);

    if(request.url.startsWith("/createAccount")){
        createAccount(response, options); //creates a new JSON object if a person does not exist
        return;
    }
    response.end();


}

data = JSON.parse(fs.readFileSync(filename));
let server = http.createServer();
server.on('request', async (request, response) => {
 
    if(request.method === 'POST'){
        let body = '';
        request.on('data', data => body += data);
        request.on('end', () => {
            serverFunction(request, response, JSON.parse(body));
        });
    }

    if(request.method === 'GET'){
        let options = url.parse(request.url, true).query;
        serverFunction(request, response, options);
    }
});

server.listen(8080);