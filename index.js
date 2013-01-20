var server = require("./server/server");
var router = require("./server/router");

server.start(router.route);