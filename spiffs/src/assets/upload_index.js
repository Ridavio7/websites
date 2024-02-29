const PATH_FOR_GETATS = "/api/getATS.api";
const PATH_FOR_GETNET = "/api/getNet.api?info";

function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
};

function getJSONnet(PATH_FOR_GETNET, callback){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', PATH_FOR_GETNET, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

function getJSONATS(PATH_FOR_GETATS, callback){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', PATH_FOR_GETATS, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

function CallBackATS(err, PATH_FOR_GETATS){
    if(err){
        //Error!
    }else{
        form_obj = PATH_FOR_GETATS;
        console.log(form_obj);
        document.getElementById("in1_u1").value = form_obj.Inputs.Input1.L1.U;
        document.getElementById("in1_u2").value = form_obj.Inputs.Input1.L2.U;
        document.getElementById("in1_u3").value = form_obj.Inputs.Input1.L3.U;
        let in1_f1_1 = form_obj.Inputs.Input1.L1.F;
        let in1_f1_2 = form_obj.Inputs.Input1.L2.F;
        let in1_f1_3 = form_obj.Inputs.Input1.L3.F;
        if(in1_f1_1 > 0){
            document.getElementById("in1_f1").value = in1_f1_1;
        } else if(in1_f1_2 > 0){
            document.getElementById("in1_f1").value = in1_f1_2;
        } else if(in1_f1_3 > 0){
            document.getElementById("in1_f1").value = in1_f1_3;
        }
        document.getElementById("in2_u1").value = form_obj.Inputs.Input2.L1.U;
        document.getElementById("in2_u2").value = form_obj.Inputs.Input2.L2.U;
        document.getElementById("in2_u3").value = form_obj.Inputs.Input2.L3.U;
        let in2_f1_1 = form_obj.Inputs.Input2.L1.F;
        let in2_f1_2 = form_obj.Inputs.Input2.L2.F;
        let in2_f1_3 = form_obj.Inputs.Input2.L3.F;
        if(in2_f1_1 > 0){
            document.getElementById("in2_f1").value = in2_f1_1;
        } else if(in2_f1_2 > 0){
            document.getElementById("in2_f1").value = in2_f1_2;
        } else if(in2_f1_3 > 0){
            document.getElementById("in2_f1").value = in2_f1_3;
        }
        let contactor_first = form_obj.ATS.Contactors[0].status
        let contactor_second = form_obj.ATS.Contactors[1].status
        if(contactor_first == "0"){
            document.getElementById('in_g1').style.visibility = 'visible';
        } else if(contactor_first == "1" || contactor_first == "2" || contactor_first == "3"){
            document.getElementById('in_y1').style.visibility = 'visible';
        } else {
            document.getElementById('in_r1').style.visibility = 'visible';
        }
        if(contactor_first == "0"){
            document.getElementById('status_cont_1').innerHTML = "CONTACOR OPEN";
        } else if(contactor_first == "1") {
            document.getElementById('status_cont_1').innerHTML = "CONTACOR CLOSE";
        } else if(contactor_first == "2") {
            document.getElementById('status_cont_1').innerHTML = "CONTACOR BUSY";
        } else if(contactor_first == "3") {
            document.getElementById('status_cont_1').innerHTML = "CONTACOR LOCKED";
        } else if(contactor_first == "4") {
            document.getElementById('status_cont_1').innerHTML = "CONTACOR ERR FB";
        }
        if(contactor_second == "0"){
            document.getElementById('in_g2').style.visibility = 'visible';
        } else if(contactor_second == "1" || contactor_second == "2" || contactor_second == "3"){
            document.getElementById('in_y2').style.visibility = 'visible';
        } else {
            document.getElementById('in_r2').style.visibility = 'visible';
        }
        if(contactor_second == "0"){
            document.getElementById('status_cont_2').innerHTML = "CONTACOR OPEN";
        } else if(contactor_second == "1") {
            document.getElementById('status_cont_2').innerHTML = "CONTACOR CLOSE";
        } else if(contactor_second == "2") {
            document.getElementById('status_cont_2').innerHTML = "CONTACOR BUSY";
        } else if(contactor_second == "3") {
            document.getElementById('status_cont_2').innerHTML = "CONTACOR LOCKED";
        } else if(contactor_second == "4") {
            document.getElementById('status_cont_2').innerHTML = "CONTACOR ERR FB";
        }
        let line_first = form_obj.ATS.Lines[0].status
        let line_second = form_obj.ATS.Lines[1].status
        if(line_first == "0"){
            document.getElementById('in1_ok').style.visibility = 'visible';
        } else {
            document.getElementById('in1_nok').style.visibility = 'visible';
        }
        if(line_first == "0"){
            document.getElementById('status_line_1').innerHTML = "LINE OK";
        } else if(line_first == "1") {
            document.getElementById('status_line_1').innerHTML = "LINE ERR PHASE A UMAX";
        } else if(line_first == "2") {
            document.getElementById('status_line_1').innerHTML = "LINE ERR PHASE B UMAX";
        } else if(line_first == "3") {
            document.getElementById('status_line_1').innerHTML = "LINE ERR PHASE C UMAX";
        } else if(line_first == "4") {
            document.getElementById('status_line_1').innerHTML = "LINE ERR PHASE A UMIN";
        } else if(line_first == "4") {
            document.getElementById('status_line_1').innerHTML = "LINE ERR PHASE B UMIN";
        } else if(line_first == "4") {
            document.getElementById('status_line_1').innerHTML = "LINE ERR PHASE C UMIN";
        } else if(line_first == "4") {
            document.getElementById('status_line_1').innerHTML = "LINE ERR FMIN";
        } else if(line_first == "4") {
            document.getElementById('status_line_1').innerHTML = "LINE ERR FMAX";
        } else if(line_first == "4") {
            document.getElementById('status_line_1').innerHTML = "LINE ERR PHASE ORDER";
        }
        if(line_second == "0"){
            document.getElementById('in2_ok').style.visibility = 'visible';
        } else {
            document.getElementById('in2_nok').style.visibility = 'visible';
        }
        if(line_second == "0"){
            document.getElementById('status_line_2').innerHTML = "LINE OK";
        } else if(line_second == "1") {
            document.getElementById('status_line_2').innerHTML = "LINE ERR PHASE A UMAX";
        } else if(line_second == "2") {
            document.getElementById('status_line_2').innerHTML = "LINE ERR PHASE B UMAX";
        } else if(line_second == "3") {
            document.getElementById('status_line_2').innerHTML = "LINE ERR PHASE C UMAX";
        } else if(line_second == "4") {
            document.getElementById('status_line_2').innerHTML = "LINE ERR PHASE A UMIN";
        } else if(line_second == "4") {
            document.getElementById('status_line_2').innerHTML = "LINE ERR PHASE B UMIN";
        } else if(line_second == "4") {
            document.getElementById('status_line_2').innerHTML = "LINE ERR PHASE C UMIN";
        } else if(line_second == "4") {
            document.getElementById('status_line_2').innerHTML = "LINE ERR FMIN";
        } else if(line_second == "4") {
            document.getElementById('status_line_2').innerHTML = "LINE ERR FMAX";
        } else if(line_second == "4") {
            document.getElementById('status_line_2').innerHTML = "LINE ERR PHASE ORDER";
        }
    }
};

function CallBackNet(err, PATH_FOR_GETNET){
    if(err){
        //Error!
    }else{
        form_obj = PATH_FOR_GETNET;
        console.log(form_obj);
        if(form_obj.wifiap === undefined){
            document.getElementById('ip_conn_ap').innerHTML = "-";
        } else {
            document.getElementById('ip_conn_ap').innerHTML = form_obj.wifiap.ip;
        }
        if(form_obj.ethernet === undefined){
            document.getElementById('ip_conn_eth').innerHTML = "-";
        } else {
            document.getElementById('ip_conn_eth').innerHTML = form_obj.ethernet.ip;
        }
        if(form_obj.wifista === undefined){
            document.getElementById('ip_conn_wifi').innerHTML = "-";
        } else {
            document.getElementById('ip_conn_wifi').innerHTML = form_obj.wifista.ip;
        }
    }
};

docReady(function() {
    window.onload = getJSONnet(PATH_FOR_GETNET, CallBackNet);
    getJSONATS(PATH_FOR_GETATS, CallBackATS);
    setInterval(function(){
        console.clear();
        getJSONATS(PATH_FOR_GETATS, CallBackATS);
    }, 50000);
});

var radio = document.getElementsByClassName('switch_img'); 
var click = [];
for (i=1; i<= radio.length; i++) {
    click[i]= document.getElementById('r' + i);
}
function clicking (click) {
click.onclick=function() {Go()}; }
function display (click, radio) {
    if (click.checked) {radio.style.display = 'block';} else {radio.style.display = 'none';}
}
for (i=1; i<= radio.length; i++) {
    clicking (click[i]);
}
function Go () {
    for (i=1; i<= radio.length; i++) {
        display (click[i], radio[i-1]);
    }
}