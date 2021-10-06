const dgram = require('dgram');
const socket = dgram.createSocket('udp4');
const fs = require('fs');
const conexion = require('./db');

socket.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    let informacion = msg;
    informacion = informacion.toString();
    let data = informacion.split('*');
    let lat = data[0];
    let lon = data[1];
    let tim = data[2];
    conexion.query(`INSERT INTO dataTaxi(latitud,longitud,timestamps) VALUES ('${lat}','${lon}',STR_TO_DATE('${tim}','%d/%m/%Y %H:%i:%s'));`, (err) => {
        if (!err) {
          console.log('Base de datos modificada exitosamente')
        } else {
          console.log(err);
        }
    })
});

socket.bind(3020);

module.exports = socket