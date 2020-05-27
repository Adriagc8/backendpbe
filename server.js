const hostname = '188.166.21.177';
const port = 5000;
const { sessionManager } = require('./lib/sessions');
const server = require('./routes/controller');
const { database } = require('./database/keys');

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
