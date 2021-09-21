const latitud = document.getElementById('latitud'); 
const longitud = document.getElementById('longitud'); 
const timestamp = document.getElementById('timestamp'); 
const URLactual = window.location;
const link = URLactual + "/api";

const marker1 = L.marker([0, 0], {
    title: "Coordenadas",
    draggable:false,
    opacity: 0.9
    }).addTo(mymap);

async function Taxi() {
//Fetch para obtener el ultimo dato de la base de datos
var response = await fetch(link);
if (response.status == 200) {
    let json1 = await response.json(); 
    data = json1[0];
    let lattxt = data['latitud'];
    let lontxt = data['longitud'];
    let date = data['timestamps'].split('T');
    let hora = date[1].toString();
    hora = hora.substring(0, hora.length - 2);
    let timetxt = date[0] + ' ' + hora ;

    latitud.innerHTML=lattxt;
    longitud.innerHTML=lontxt;
    timestamp.innerHTML=timetxt;

    marker1.setLatLng([lattxt, lontxt]).bindPopup(`<b>Lat:</b> ${lattxt} <br> <b>Lon:</b> ${lontxt}`,
        {
        closeOnClick: true,
        autoClose: false,
        autoPan: false
        }
    );
}    
}
setInterval("Taxi()", 3000);
window.addEventListener("load", Taxi);