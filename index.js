let restify = require('restify');
const server = restify.createServer();
const port = process.env.PORT || "5000";

/**
 * Controllers (route handlers).
 */

const homeController = require('./controllers/home');

/**
 * This is a backend for Quran Streaming App
 * We Need routes for
 * -- Get all Recitators
 * -- Get all Surats (name of surat in arabish, english, so on...)
 * -- Get stream audio quran (specifying surat and recitor)
 */

server.get('/recitators', homeController.listRecitators);
server.get('/surahs', homeController.listSurahs);
server.get('/surahs/:id', homeController.getSurah);

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});

module.exports = server;