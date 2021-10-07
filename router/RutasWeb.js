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
router.get("/monitorear/tiemporeal/api", (req, res) => {
    //Obtener el ultimo dato de la base de datos
    conexion.query(`SELECT * FROM dataTaxi ORDER BY id DESC LIMIT 1`, (err, result) => {
        if (!err) {
          var resultado = result;
          res.send(resultado)
        } else {
          console.log(err);
        }
    })
})
router.post('/monitorear/consultas', (req, res) => {
    let idate =req.body.idate;
    let fdate =req.body.fdate;
    if (idate == '' || fdate == ''){
      error = 'Todos los campos son requeridos para realizar la consulta.';
      res.render("consultas", {error:error, latlon:''});
    }else{
      let date1 = idate.split('T');
      let date2 = fdate.split('T');
      let hora1 = date1[1].toString();
      let hora2 = date2[1].toString();
      
      let time1 = date1[0] + ' ' + hora1 ;
      let time2 = date2[0] + ' ' + hora2 ;
    
      conexion.query(`SELECT * FROM dataTaxi WHERE (timestamps BETWEEN '${time1}' AND '${time2}')`, (err, result) => {
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