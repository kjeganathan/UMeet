'use strict';
let http = require('http');
let url = require('url');
let fs = require('fs');

const filename = 'data.json';
let data = {};

function serverFunction(request, response, options){
    const headerText = {'content-type': 'text/json'};
    response.writeHead(200, headerText);
    
}

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