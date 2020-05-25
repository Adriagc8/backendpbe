const hostname = '127.0.0.1';
const port = 5902;
const { sessionManager } = require('./lib/sessions');
const server = require('./routes/controller');
const { database } = require('./database/keys');

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
/*
io.sockets.on('connection', function (socket) {
    socket.on('setUserInfo', function (data) {
        var sess = new Object();
        sess.sessionId = socket.id;
        // sess.userId = data.userId;
        // sess.username = data.username;
        sessionManager.add(sess);
    });
    
    socket.on('disconnect', function() {
        sessionMgm.remove(socket.id);
    });
});*/