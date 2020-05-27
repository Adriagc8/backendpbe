const http = require('http');
const url = require('url');
const querys = require('./querys');



module.exports = http.createServer((req, res) => {

    const reqUrl = url.parse(req.url, true);

    switch (reqUrl.pathname) {
        case "/timetables":
            querys.timetables(req, res); //retorna un json amb les dades demanades pel client
            break
        case "/tasks":
            querys.tasks(req, res); //retorna un json amb les dades demanades pel client
            break
        case "/marks":
            querys.marks(req, res); //retorna un json amb les dades demanades pel client
            break
        case "/login":
            querys.login(req, res);
            break
        case "/logout":
            querys.logout(req, res);
            break

        default:
           querys.invalidRequest(req, res);

    }

});
