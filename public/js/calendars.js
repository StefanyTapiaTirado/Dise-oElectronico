var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //enero es 0!
var yyyy = today.getFullYear();
var hora1 = today.getHours();
var minutes = today.getMinutes();
if (dd < 10) {
    dd = "0" + dd;
}
if (mm < 10) {
    mm = "0" + mm;
}
if (hora1 < 10) {
    hora1 = "0" + hora1;
}
if (minutes < 10) {
    minutes = "0" + minutes;
}
var hora = hora1 + ":" + minutes;
today = yyyy + "-" + mm + "-" + dd + "T" + hora;
//Inicialziar el segundo calendario con la fecha de hoy
endDate = document.getElementById("fdate");
startDate = document.getElementById("idate");



// Seleccionar maximo y minimo para los calendarios segun las fechas seleccionadas
startDate.addEventListener("click", async () => {
    if(endDate.value != ''){
        startDate.max = endDate.value;
    }else{
        startDate.max = today;
    }
    
})
endDate.addEventListener("click", async () => {
    endDate.min = startDate.value;
    //Definir que la fecha maxima por defecto sea la del dia de hoy
    endDate.max = today;
})
