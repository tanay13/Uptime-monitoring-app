const http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder

var server = http.createServer((req,res)=>{

    //get the url and parse it-(true- to parse query string data)
    var parsedUrl = url.parse(req.url,true)


    //get the path from url
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g,'');

    //Get the query string as an object
    var queryStringObject = parsedUrl.query;

    //get the http method
    var method = req.method.toLowerCase();

    //get the headers as an object
    var headers = req.headers;

    //get the payload
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    //The key thing to understand is that when you initialize the HTTP server using http.createServer(), 
    //the callback is called when the server got all the HTTP headers, but not the request body.
    //The request object passed in the connection callback is a stream.
    //So, we must listen for the body content to be processed, and it's processed in chunks.
    //same as req.body in vanilla form
    req.on('data',(data)=>{
        buffer+= decoder.write(data);
    })
    req.on('end',()=>{
        buffer += decoder.end();

        //choose the handler
        var chosenHandler = typeof(router[trimmedPath])!=='undefined'? router[trimmedPath]:handlers.notFound;
        //construct the data object
        var data = {
            'trimmedPath':trimmedPath,
            'queryStringobject' : queryStringObject,
            'method' :method,
            'headers' : headers,
            'payload' : buffer

        }
        // route the request to the handler
        chosenHandler(data,function(statusCode,payload){
            //default
            statusCode = typeof(statusCode) == 'number' ? statusCode:200;

            payload = typeof(payload) == 'object' ? payload:{}

            //convert the payload to a string
             var payloadSting = JSON.stringify(payload)

            //return the response
            res.setHeader('Content-type','application/json')
            res.writeHead(statusCode)
            res.end(payloadSting)
            console.log("Returning this response ",statusCode,payloadSting);

        })
            
    
    })






    
})

server.listen(3000,()=>{
    console.log("server running")
})
//define the handlers
var handlers = {};
//sample handlers
handlers.sample = function(data,callback){
    //callback a http status code and a payload object
    callback(406,{'name':'sample handler'})
};

//not found handler
handlers.notFound = function(data,callback){
    callback(404)
};


//defining a req router

var router = {
    'sample' : handlers.sample
};