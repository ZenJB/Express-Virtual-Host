//#region Dependencies
//Web Server
const express           = require('express');
//Virtual Host Manager
const vhostManager      = require('./vhost_manager');
//#endregion

//#region Express main server settings

//Express main server port
const WEB_PORT = 8080;

//#endregion

//Clear the console before we do anything
console.clear();

const mainServer = express();

//Use virtual host middleware
mainServer.use(vhostManager.middleware());

//For all requests that are not for the virtual hosts, pretend that the server does not exist
mainServer.get('*',(req,res) => {
    req.socket.end();
});

mainServer.listen(WEB_PORT);

console.log(`Server started on port ${WEB_PORT}`);

//#region Add your servers here

//Make a virtual host for localhost
vhostManager.addHost('localhost', __dirname+'/virtualHosts/localhost/program');

//Make a virtual host for 127.0.0.1
vhostManager.addHost('127.0.0.1', __dirname+'/virtualHosts/127.0.0.1/program');

//#endregion