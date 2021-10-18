const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const conexion = require('./../db');

router.get('/', (req, res) => {
    res.render("index")
})

router.get('/monitorear/tiemporeal', (req, res) => {
    res.render("tiemporeal")
})
router.get('/monitorear/consultas', (req, res) => {
    res.render("consultas", {latlon:'', error:''})
})
router.use(cors());
router.get("/monitorear/tiemporeal/api/:id", (req, res) => {
    //Se define a cual tabla realizar la consulta
    let id = req.params.id;
    if(id == 1){
      table = 'dataTaxi'
    }else if(id == 2){
      table = 'dataTaxi2'
    }
    //Obtener el ultimo dato de la base de datos
    conexion.query(`SELECT * FROM ${table} ORDER BY id DESC LIMIT 1`, (err, result) => {
        if (!err) {
          var resultado = result;
          res.send(resultado)
        } else {
          console.log(err);
        }
    })
})
router.post('/monitorear/consultas', (req, res) => {
    let idate = req.body.idate;
    let fdate = req.body.fdate;
    let id = req.body.taxid;
    if (idate == '' || fdate == '' || id == ''){
      error = 'Todos los campos son requeridos para realizar la consulta.';
      res.render("consultas", {error:error, latlon:''});
    }else{
      let date1 = idate.split('T');
      let date2 = fdate.split('T');
      let hora1 = date1[1].toString();
      let hora2 = date2[1].toString();
      let time1 = date1[0] + ' ' + hora1 ;
      let time2 = date2[0] + ' ' + hora2 ;
      let tabledb = '';
      //Se hace la consulta teniendo en cuenta ID
      if (id == 1){
        tabledb = 'dataTaxi';
      }else if (id == 2){
        tabledb = 'dataTaxi2';
      }

      conexion.query(`SELECT * FROM ${tabledb} WHERE (timestamps BETWEEN '${time1}' AND '${time2}')`, (err, result) => {
        if (!err) {
          let info = result;
          let latlon = Array(0);
          for (i=0;i<info.length;i++){
              latlon[i] = [info[i]['latitud'],info[i]['longitud'],info[i]['timestamps']];
          }
          res.render("consultas", {error:'', latlon:latlon});
        } else {
          console.log(err);
        }
    })
  }  
})

module.exports = router;