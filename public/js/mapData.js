const latitud1 = document.getElementById('latitud1'); 
const longitud1 = document.getElementById('longitud1'); 
const timestamp1 = document.getElementById('timestamp1');
const rpm1 = document.getElementById('rpm1');
const latitud2 = document.getElementById('latitud2'); 
const longitud2 = document.getElementById('longitud2'); 
const timestamp2 = document.getElementById('timestamp2');
const rpm2 = document.getElementById('rpm2');
const URLActual = window.location;
const link1 = URLActual + '/api/1'; 
const link2 = URLActual + '/api/2'; 
let latlon1 = Array(0);
let latlon2 = Array(0);
//Inicializar Polilinea 1
var polyline1 = L.polyline([["0", "0"]], {color: "black"}).addTo(mymap);
//Inicializar Polilinea 2
var polyline2 = L.polyline([["0", "0"]], {color: "black"}).addTo(mymap);
//Crear icono con Taxi
const realtimeIcon1 = new L.Icon({
    iconUrl: "/images/taxi.png",
    iconSize: [50, 50]
});
const realtimeIcon2 = new L.Icon({
    iconUrl: "/images/taxi2.png",
    iconSize: [50, 50]
});
//Inicializar Marcador
const marker1 = L.marker([0, 0], {
    title: "Coordenadas",
    draggable:false,
    icon: realtimeIcon1
    }).addTo(mymap);
const marker2 = L.marker([0, 0], {
    title: "Coordenadas",
    draggable:false,
    icon: realtimeIcon2
    }).addTo(mymap);

async function Taxi() {
    //Fetch para obtener el ultimo dato de la base de datos
    var response1 = await fetch(link1);
    if (response1.status == 200) {
        let json1 = await response1.json(); 
        data1 = json1[0];
        let lattxt1 = data1['latitud'];
        let lontxt1 = data1['longitud'];
        let rpmtxt1 = data1['rpm'];
        let date1 = data1['timestamps'].split('T');
        let hora1 = date1[1].toString();
        hora1 = hora1.substring(0, hora1.length - 2);
        let timetxt1 = date1[0] + ' ' + hora1 ;
        //LLenar el array latlon con los datos entrantes
        latlon1.push([lattxt1, lontxt1]);
        // Generar polilinea apartir del array latlon
        polyline1.setLatLngs([latlon1]);
        latitud1.innerHTML=lattxt1;
        longitud1.innerHTML=lontxt1;
        timestamp1.innerHTML=timetxt1;
        marker1.setLatLng([lattxt1, lontxt1]).bindPopup(`<b>Lat:</b> ${lattxt1} <br> <b>Lon:</b> ${lontxt1}`,
            {
            closeOnClick: true,
            autoClose: false,
            autoPan: false
            }
        );//Se coloca el marcador en la ultima coordenada obtenida
        if (rpmtxt1 != null){
            rpm1.innerHTML=rpmtxt1;
        }else {
            rpm1.innerHTML='N.A';
        }    
    }
    var response2 = await fetch(link2);
    if (response2.status == 200) {
        let json2 = await response2.json(); 
        data2 = json2[0];
        let lattxt2 = data2['latitud'];
        let lontxt2 = data2['longitud'];
        let rpmtxt2 = data2['rpm'];
        let date2 = data2['timestamps'].split('T');
        let hora2 = date2[1].toString();
        hora2 = hora2.substring(0, hora2.length - 2);
        let timetxt2 = date2[0] + ' ' + hora2 ;
        console.log(date2);
        //LLenar el array latlon con los datos entrantes
        latlon2.push([lattxt2, lontxt2]);
        // Generar polilinea apartir del array latlon
        polyline2.setLatLngs([latlon2]);
        latitud2.innerHTML=lattxt2;
        longitud2.innerHTML=lontxt2;
        timestamp2.innerHTML=timetxt2;
        marker2.setLatLng([lattxt2, lontxt2]).bindPopup(`<b>Lat:</b> ${lattxt2} <br> <b>Lon:</b> ${lontxt2}`,
            {
            closeOnClick: true,
            autoClose: false,
            autoPan: false
            }
        );//Se coloca el marcador en la ultima coordenada obtenida
        if (rpmtxt2 != null){
            rpm2.innerHTML=rpmtxt2;
        }else {
            rpm2.innerHTML='N.A';
        }
    }    
}setInterval("Taxi()", 5000);
Taxi()