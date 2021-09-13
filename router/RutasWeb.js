const express = require('express');
const router = express.Router();
const mensaje = require('../udp')
router.get('/', (req, res) => {
    // console.log(__dirname)
    res.render("index")
})

router.get('/monitorear/tiemporeal', (req, res) => {
    res.render("tiemporeal")
})
router.get('/monitorear/consultas', (req, res) => {
    res.render("consultas")
})
module.exports = router;