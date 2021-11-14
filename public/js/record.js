//Se crean iconos
const recordIcon = new L.Icon({
    iconUrl: "/images/circle.png",
    iconSize: [8, 8]
});
const startendIcon = new L.Icon({
    iconUrl: "/images/circle2.png",
    iconSize: [12, 12]
});
const startendIcon2 = new L.Icon({
    iconUrl: "/images/circle3.png",
    iconSize: [12, 12]
});
//Se crea vector con los valores de latitud y longitud 
let latlon = [];
let latlonpol = [];
let dates1 = [];
let rpm1 = [];
for(i = 0; i < resultdb.length; i++){
    latlonpol.push([resultdb[i][0],resultdb[i][1]]);
    if (i % 3 == 0 && i != latlon.length) {
        latlon.push([resultdb[i][0],resultdb[i][1]]);
        dates1.push(resultdb[i][2]);
        rpm1.push(resultdb[i][3]);
    }
}

let latlon2 = [];
let latlonpol2 = [];
let dates2 = [];
let rpm2 = [];

for(i = 0; i < resultdb2.length; i++){
    latlonpol2.push([resultdb2[i][0],resultdb2[i][1]]);
    if (i % 3 == 0 && i != latlon2.length) {
        latlon2.push([resultdb2[i][0],resultdb2[i][1]]);
        dates2.push(resultdb2[i][2]);
        rpm2.push(resultdb2[i][3]);
    }
}

let markers = [];
for (i = 1; i < latlon.length; i++){
        dates1[i] = dates1[i].split("T").join(" ").split(".000Z").join("");
        if (rpm1[i] != null){
            markers[i] = L.marker(latlon[i], {icon: recordIcon}).addTo(mymap).bindPopup("<b>Fecha y Hora:</b> "+ dates1[i] + '<br><b>RPM:</b>' + rpm1[i]);// + '<br>' + "<b>Fecha y Hora:</b> "+ dates1[j]);           
        }else{
            markers[i] = L.marker(latlon[i], {icon: recordIcon}).addTo(mymap).bindPopup("<b>Fecha y Hora:</b> "+ dates1[i] + '<br><b>RPM:</b> Valor no registrado');
        }
        
        markers[i].on('mouseover', function (e) {
            this.openPopup();
        });
        markers[i].on('mouseout', function (e) {
            this.closePopup();
        });
    }

for (i = 1; i < latlon.length; i+=2){
    for (j = i; j < latlon.length; j++){
        if (i != j){
            let distance = mymap.distance(latlon[i],latlon[j]);
            if (distance < 50 && rpm1[i] == null && rpm1[j] == null){
                markers[i].bindPopup("<b>Fecha y Hora:</b> "+ dates1[i] + '<br><b>RPM:</b> Valor no registrado' + '<br>' + "<b>Fecha y Hora:</b> "+ dates1[j] + '<br><b>RPM:</b> Valor no registrado');
                mymap.removeLayer(markers[j]);
            }
            if (distance < 50 && rpm1[i] != null && rpm1[j] == null){
                markers[i].bindPopup("<b>Fecha y Hora:</b> "+ dates1[i] + '<br><b>RPM:</b>' + rpm1[i] + '<br>' + "<b>Fecha y Hora:</b> "+ dates1[j] + '<br><b>RPM:</b> Valor no registrado');
                mymap.removeLayer(markers[j]);
            }
            if (distance < 50 && rpm1[i] == null && rpm1[j] != null){
                markers[i].bindPopup("<b>Fecha y Hora:</b> "+ dates1[i] + '<br><b>RPM:</b>' + '<br><b>RPM:</b> Valor no registrado' + '<br>' + "<b>Fecha y Hora:</b> "+ dates1[j] + '<br><b>RPM:</b>' + rpm1[j]);
                mymap.removeLayer(markers[j]);
            }
            if (distance < 50 && rpm1[i] != null && rpm1[j] != null){
                markers[i].bindPopup("<b>Fecha y Hora:</b> "+ dates1[i] + '<br><b>RPM:</b>' + '<br><b>RPM:</b>' + rpm1[i] + '<br>' + "<b>Fecha y Hora:</b> "+ dates1[j] + '<br><b>RPM:</b>' + rpm1[j]);
                mymap.removeLayer(markers[j]);
            }
        }
    }    
}

let markers2 = [];
for (i = 1; i < latlon2.length; i++){
        dates2[i] = dates2[i].split("T").join(" ").split(".000Z").join("");
        if (rpm2[i] != null){
            markers2[i] = L.marker(latlon2[i], {icon: recordIcon}).addTo(mymap).bindPopup("<b>Fecha y Hora:</b> "+ dates2[i] + '<br><b>RPM:</b>' + rpm2[i]);// + '<br>' + "<b>Fecha y Hora:</b> "+ dates1[j]);           
        }else{
            markers2[i] = L.marker(latlon2[i], {icon: recordIcon}).addTo(mymap).bindPopup("<b>Fecha y Hora:</b> "+ dates2[i] + '<br><b>RPM:</b> Valor no registrado');
        }
        
        markers[i].on('mouseover', function (e) {
            this.openPopup();
        });
        markers[i].on('mouseout', function (e) {
            this.closePopup();
        });
    }
    
for (i = 1; i < latlon2.length; i+=2){
    for (j = i; j < latlon2.length; j++){
        if (i != j){
            let distance = mymap.distance(latlon2[i],latlon2[j]);
            if (distance < 50 && rpm2[i] == null && rpm2[j] == null){
                markers2[i].bindPopup("<b>Fecha y Hora:</b> "+ dates2[i] + '<br><b>RPM:</b> Valor no registrado' + '<br>' + "<b>Fecha y Hora:</b> "+ dates2[j] + '<br><b>RPM:</b> Valor no registrado');
                mymap.removeLayer(markers2[j]);
            }
            if (distance < 50 && rpm2[i] != null && rpm2[j] == null){
                markers2[i].bindPopup("<b>Fecha y Hora:</b> "+ dates2[i] + '<br><b>RPM:</b>' + rpm2[i] + '<br>' + "<b>Fecha y Hora:</b> "+ dates2[j] + '<br><b>RPM:</b> Valor no registrado');
                mymap.removeLayer(markers2[j]);
            }
            if (distance < 50 && rpm2[i] == null && rpm2[j] != null){
                markers2[i].bindPopup("<b>Fecha y Hora:</b> "+ dates2[i] + '<br><b>RPM:</b>' + '<br><b>RPM:</b> Valor no registrado' + '<br>' + "<b>Fecha y Hora:</b> "+ dates2[j] + '<br><b>RPM:</b>' + rpm2[j]);
                mymap.removeLayer(markers2[j]);
            }
            if (distance < 50 && rpm2[i] != null && rpm2[j] != null){
                markers2[i].bindPopup("<b>Fecha y Hora:</b> "+ dates2[i] + '<br><b>RPM:</b>' + '<br><b>RPM:</b>' + rpm2[i] + '<br>' + "<b>Fecha y Hora:</b> "+ dates2[j] + '<br><b>RPM:</b>' + rpm2[j]);
                mymap.removeLayer(markers2[j]);
            }
        }
    }    
}


if (resultdb != ''){
    //Se obtiene la fecha inicial
    let initialdate = resultdb[0][2].split("T").join(" ").split(".000Z").join("");
    
    //Se coloca el marcador en el inicio de la ruta
    L.marker(latlonpol[0], {icon: startendIcon}).addTo(mymap).bindPopup("<b>Inicio:</b> " + initialdate, {
            closeOnClick: true,
            autoClose: false,
            autoPan: false
        }).openPopup(latlonpol[0]);
    //Se obtiene la fecha final
    let finaldate = resultdb[resultdb.length-1][2];
    //Se coloca el marcador en el final de la ruta
    L.marker(latlonpol[latlonpol.length-1], {icon: startendIcon}).addTo(mymap).bindPopup("<b>Final:</b> " + finaldate, {
        closeOnClick: true,
        autoClose: false,
        autoPan: false
    });
    //Se genera la polilinea
    L.polyline(latlonpol, {color: "black"}).addTo(mymap);
    mymap.setView(latlon[0],14);

}
if (resultdb2 != ''){
    let initialdate = resultdb2[0][2].split("T").join(" ").split(".000Z").join("");
    //Se coloca el marcador en el inicio de la ruta
    L.marker(latlonpol2[0], {icon: startendIcon}).addTo(mymap).bindPopup("<b>Inicio:</b> " + initialdate, {
            closeOnClick: true,
            autoClose: false,
            autoPan: false
        }).openPopup(latlonpol2[0]);
    //Se obtiene la fecha final
    let finaldate = resultdb2[resultdb2.length-1][2];
    //Se coloca el marcador en el final de la ruta
    L.marker(latlonpol2[latlonpol2.length-1], {icon: startendIcon}).addTo(mymap).bindPopup("<b>Final:</b> " + finaldate, {
        closeOnClick: true,
        autoClose: false,
        autoPan: false
    });
    //Se genera la polilinea
    L.polyline(latlonpol2, {color: "black"}).addTo(mymap);
    mymap.setView(latlonpol2[0],14);

}