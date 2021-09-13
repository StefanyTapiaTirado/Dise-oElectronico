const dgram = require('dgram');
const socket = dgram.createSocket('udp4');
const fs = require('fs');


socket.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    var informacion = msg;
    fs.writeFile('./public/test.txt', '', function(){console.log('Modificando archivo...')});
    fs.writeFile("./public/test.txt", informacion, function(err) {
    if (err) {
        console.log(err);
    }
    console.log("Archivo modificado exitosamente")
});
});

socket.bind(3020);