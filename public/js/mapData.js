const latitud = document.getElementById('latitud'); 
const longitud = document.getElementById('longitud'); 
const timestamp = document.getElementById('timestamp');
const URLActual = window.location;
const link = URLActual + '/api' 
let latlon = Array(0);
//Inicializar Polilinea
var polyline = L.polyline([["0", "0"]], {color: "black"}).addTo(mymap);
//Crear icono con Taxi
const realtimeIcon = new L.Icon({
    iconUrl: "/images/taxi.png",
    iconSize: [30, 30]
});
//Inicializar Marcador
const marker1 = L.marker([0, 0], {
    title: "Coordenadas",
    draggable:false,
    icon: realtimeIcon
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
    //LLenar el array latlon con los datos entrantes
    latlon.push([lattxt, lontxt]);
    // Generar polilinea apartir del array latlon
    polyline.setLatLngs([latlon]);
    latitud.innerHTML=lattxt;
    longitud.innerHTML=lontxt;
    timestamp.innerHTML=timetxt;
    mymap.setView([lattxt, lontxt]);//Se centra el mapa en la ultima coordenada obtenida
    marker1.setLatLng([lattxt, lontxt]).bindPopup(`<b>Lat:</b> ${lattxt} <br> <b>Lon:</b> ${lontxt}`,
        {
        closeOnClick: true,
        autoClose: false,
        autoPan: false
        }
    );//Se coloca el marcador en la ultima coordenada obtenida
}    
}setInterval("Taxi()", 5000);
Taxi()