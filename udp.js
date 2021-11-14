const { table } = require('console');
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
    let rpm = data[3];
    let id = data[4];
    let tabledb = '';
    if (id == 1){
      tabledb = 'dataTaxi';
    } else if (id == 2){
      tabledb = 'dataTaxi2';
    }
    conexion.query(`INSERT INTO ${tabledb}(latitud,longitud,timestamps,rpm) VALUES ('${lat}','${lon}',STR_TO_DATE('${tim}','%d/%m/%Y %H:%i:%s'),'${rpm}');`, (err) => {
        if (!err) {
          console.log('Base de datos modificada exitosamente')
        } else {
          console.log(err);
        }
    })
});

socket.bind(3020);

module.exports = socket