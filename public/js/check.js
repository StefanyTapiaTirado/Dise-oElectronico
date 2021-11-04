let check1 = document.getElementById('check1');
let check2 = document.getElementById('check2');
function validDate(){
    let date1 = document.getElementById('idate').value;
    if (date1 == '') {
        check1.style.color = 'gray';    
    } else {
        check1.style.color = 'rgb(0, 194, 0)';    
    }
}