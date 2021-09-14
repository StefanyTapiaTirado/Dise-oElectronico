// document.getElementById("textbtn").addEventListener("click", cargarTXT);
const intervalID = window.setInterval(cargarTXT, 5000);
const latitud = document.querySelector('#latitud');
const longitud = document.querySelector('#longitud');
const timestamp = document.querySelector('#timestamp');
const inputlon = document.querySelector('#inputLon');
const inputlat = document.querySelector('#inputLat');
function cargarTXT() {
    fetch('../../test.txt')
    .then(data => data.text())
    .then(data=>{
        let variables = data.split("*");
        let lat = variables[0];
        let lon = variables[1];
        let tim = variables[2];
        lat = parseFloat(lat);
        lon = parseFloat(lon);
        var lattxt = lat.toFixed(7);
        var lontxt = lon.toFixed(7);
        latitud.innerHTML = `${lattxt}`;
        longitud.innerHTML = `${lontxt}`;
        timestamp.innerHTML = `${tim}`;
        var marker = L.marker([lattxt, lontxt]).addTo(mymap);
        marker.bindPopup(`<b>Lat:</b>${lattxt}<br><b>Lon:</b>${lontxt}`).openPopup();
    })
}
cargarTXT();