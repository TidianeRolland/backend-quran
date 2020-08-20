let restify = require('restify');
const port = process.env.PORT || "5000";


function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

let server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});



/**
 * This is a backend for Quran Streaming App
 * We Need routes for
 * -- Get all Recitors
 * -- Get all Surats (name of surat in arabish, english, so on...)
 * -- Get stream audio quran (specifying surat and recitor)
 */