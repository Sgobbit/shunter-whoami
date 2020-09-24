var http = require('http');
var os = require('os');

const argv = process.execArgv.join();
const isDebug = argv.includes('inspect') || argv.includes('debug');

const config = {
    port: process.env.PORT || (!isDebug) ? 80 : 3000
};

http.createServer(function (req, res) {
    try {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(`<h1>Hello world!</h1>`);
        res.write(`<br>`);
        res.write(`<h3>I'm Shunter whoami's container</h3>`);
        res.write(`<br>`);
        res.write(`<h3>Domain: <span style="color: gray;">${req.headers.host}</span></h3>`);
        res.write(`<h3>Cluster node: <span style="color: gray;">${os.hostname()}</span></h3>`);
        res.write(`<h3>Container IP: <span style="color: gray;">${req.connection.localAddress}</span></h3>`);
        res.write(`<h3>Container port: <span style="color: gray;">${req.connection.localPort}</span></h3>`);
        res.write(`<br>`);
        res.write(`<h3>Request IP: <span style="color: gray;">${req.connection.remoteAddress}</span></h3>`);
        res.write(`<h3>Request port: <span style="color: gray;">${req.connection.remotePort}</span></h3>`);
        res.write(`<br>`);
        res.write(`<h3>Forwarded IP: <span style="color: gray;">${req.headers['x-forwarded-for'] || "seem you aren't forwarded"}</span></h3>`);
        res.end();
    } catch (err) {
        console.error(err);  
    }
}).listen(config.port);