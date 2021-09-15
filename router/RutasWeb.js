const express = require('express');
const router = express.Router();
const cors = require('cors');
const conexion = require('./../db');

router.get('/', (req, res) => {
    res.render("index")
})

router.get('/monitorear/tiemporeal', (req, res) => {
    res.render("tiemporeal")
})
router.get('/monitorear/consultas', (req, res) => {
    res.render("consultas")
})
router.use(cors());
router.get("/api", (req, res) => {
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

module.exports = router;