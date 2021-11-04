//Se crean iconos
const recordIcon = new L.Icon({
    iconUrl: "/images/circle.png",
    iconSize: [8, 8]
});
const startendIcon = new L.Icon({
    iconUrl: "/images/circle2.png",
    iconSize: [12, 12]
});
//Se crea vector con los valores de latitud y longitud 
let latlon = [];
for(let i in resultdb){
    latlon.push([resultdb[i][0],resultdb[i][1]]);
}
//Se colocan los marcadores a lo largo de la ruta
for (j = 1; j < latlon.length; j++) { 
    //Modificar fechas para quitar T y .000Z
    resultdb[j][2] = resultdb[j][2].split("T").join(" ").split(".000Z").join("");
    //Generar marcadores cada 3 datos
    if (j % 3 == 0 && j != latlon.length) {
        //Crear nombre de marcadores
        let markers = 'marker' + j;
        if (resultdb[j][3] != null){
            markers = L.marker(latlon[j], {icon: recordIcon}).addTo(mymap).bindPopup("<b>Fecha y Hora:</b> "+ resultdb[j][2] + '<br><b>RPM:</b>' + resultdb[j][3] );
        }else{
            markers = L.marker(latlon[j], {icon: recordIcon}).addTo(mymap).bindPopup("<b>Fecha y Hora:</b> "+ resultdb[j][2] + '<br><b>RPM:</b> Valor no registrado' );
        }
        
        markers.on('mouseover', function (e) {
            this.openPopup();
        });
        markers.on('mouseout', function (e) {
            this.closePopup();
        });
    }       
};
if (resultdb != ''){
    //Se obtiene la fecha inicial
    initialdate = resultdb[0][2].split("T").join(" ").split(".000Z").join("");
    //Se coloca el marcador en el inicio de la ruta
    L.marker(latlon[0], {icon: startendIcon}).addTo(mymap).bindPopup("<b>Inicio:</b> " + initialdate, {
            closeOnClick: true,
            autoClose: false,
            autoPan: false
        }).openPopup(latlon[0]);
    //Se obtiene la fecha final
    finaldate = resultdb[resultdb.length-1][2];
    //Se coloca el marcador en el final de la ruta
    L.marker(latlon[latlon.length-1], {icon: startendIcon}).addTo(mymap).bindPopup("<b>Final:</b> " + finaldate, {
        closeOnClick: true,
        autoClose: false,
        autoPan: false
    });
    //Se genera la polilinea
    L.polyline([latlon], {color: "black"}).addTo(mymap);
    mymap.setView(latlon[0],14);
}
