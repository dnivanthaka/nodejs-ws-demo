//based on the example code from http://www.instructables.com/id/Easy-NodeJS-WebSockets-LED-Controller-for-Raspberr/?ALLSTEPS
express = require('express')				//Web server
app = express()
server = require('http').createServer(app);
io = require('socket.io').listen(server);		//WS server

server.listen(8080);
app.use(express.static('public'))			//Static page location

var requestCount = 0;
io.sockets.on('connection', function(socket){
	requestCount++;
	socket.emit('count', {value:requestCount});

	socket.on('set', function(data){
		requestCount = data.value;

		io.sockets.emit('count', {value:requestCount}); //sends the updated value to all the connected clients
	});
});
