const dgram = require('dgram');
const socket = dgram.createSocket('udp4');
const innerhtml = require("innerhtml")

socket.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    document.getElementById("latitud").innerHTML = msg;
});

socket.bind(8080);