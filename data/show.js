var request = require("request")

var options = {
    host: 'api.thetvdb.com',
    path: '/login',
    method: 'POST',
    json: true,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: '{"apikey":"277BCE9339B4CAD9"}'
};

var req = https.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
        console.log('BODY: ' + chunk);

        //res1.writeHead(200, {'Content-Type': 'application/json'});
        res1.end('Hello World NodeJS \n' + chunk);
    });
});