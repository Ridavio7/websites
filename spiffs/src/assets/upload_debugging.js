const PATH_FOR_GETDATA = "/api/getData.api";
const PATH_FOR_GETHEX = "/api/getHex.api";
const PATH_FOR_GETSTRDATA_1 = "/api/getStrData.api?inv=1";
const PATH_FOR_GETSTRDATA_0 = "/api/getStrData.api?inv=0";
const PATH_FOR_NET = "/api/getNet.api?info";

function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
};

function getJSONfromDevice(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
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

function getJSONnet(PATH_FOR_NET, callback){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', PATH_FOR_NET, true);
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

function CallBackFunction(err, url){
    if(err){
        //Error!
    }else{
        (function () {
            var old = console.log;
            var logger = document.getElementById('log');
            console.log = function (message) {
                if (typeof message == 'object') {
                    logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message, null, 4) : message) + '<br />';
                } else {
                    logger.innerHTML += message + '<br />';
                }
            }
        })();
        
        console.log(url);
    }
};

function CallBackNet(err, PATH_FOR_NET){
    if(err){
        //Error!
    }else{
        form_obj = PATH_FOR_NET;
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

function clearInput(){
    let add_request = document.getElementById('add_request');
    let req = "";
    if(add_request.value == ""){
        //;
    } else {
        req = "/" + add_request.value;
    }
    return req;
};

function clearInter(x){
    clearInterval(x);
}

function clearConsole(){
    var logger = document.getElementById('log');
    logger.innerHTML = "";
}

docReady(function(){
    window.onload = getJSONnet(PATH_FOR_NET, CallBackNet);
    document.getElementById('button_serv').onclick = function() {
        let serv = document.getElementById("serv");
        let desiredBox = serv.options[serv.selectedIndex].value;
        let auto_update = document.getElementById('auto_update');
        let period_serv = document.getElementById('period_serv').value;
        let auto_clear = document.getElementById('auto_clear');
        let url;
        if(desiredBox == "-- Выберите сервис --"){
            url = clearInput();
        } else if(desiredBox == "/api/getData.api"){
            url = PATH_FOR_GETDATA + clearInput();
        } else if(desiredBox == "/api/getHex.api"){
            url = PATH_FOR_GETHEX + clearInput();
        } else if(desiredBox == "/api/getStrData.api?inv=1"){
            url = PATH_FOR_GETSTRDATA_1 + clearInput();
        } else if(desiredBox == "/api/getStrData.api?inv=0"){
            url = PATH_FOR_GETSTRDATA_0 + clearInput();
        }
        let reloadF;
        if(auto_update.checked && period_serv !== "" && !auto_clear.checked){
            document.getElementById("button_serv").style.display = "none";
            document.getElementById("button_serv_stop").style.display = "block";
            getJSONfromDevice(url, CallBackFunction);
            reloadF = setInterval(() => {
                getJSONfromDevice(url, CallBackFunction);
            }, period_serv);
        } else if(auto_update.checked && period_serv !== "" && auto_clear.checked){
            document.getElementById("button_serv").style.display = "none";
            document.getElementById("button_serv_stop").style.display = "block";
            getJSONfromDevice(url, CallBackFunction);
            reloadF = setInterval(() => {
                clearConsole();
                getJSONfromDevice(url, CallBackFunction);
            }, period_serv);
        } else {
            getJSONfromDevice(url, CallBackFunction);
        }
        document.getElementById('button_serv_stop').onclick = function(){
            clearInter(reloadF);
            document.getElementById("button_serv_stop").style.display = "none";
            document.getElementById("button_serv").style.display = "block";
        }
    }
    document.getElementById('button_serv_clear').onclick = function(){
        clearConsole();
    }
});

document.getElementById("clear_x").onclick = function(e) {
    document.getElementById("add_request").value = "";
}