var PATH_FOR_UPLOAD = "/api/upload.api/"
var UPLOAD_JSON_FILENAME = "network.json";

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

// функция нахождения одного элемента с указанным селектором
const findOne = (element, selector) => element.querySelector(selector)
// функция добавления обработчика указанного события
const addHandler = (element, event, callback) => element.addEventListener(event, callback)

// Находим основной контейнер и контейнер для вопросов, а также отключаем отправку формы:
const C = findOne(document.body, ".block_settings_form");
const Q = findOne(C, "#settings_form");
addHandler(Q, "submit", (ev) => ev.preventDefault());

function saveData(filePath, jsonData, fileName){
	var fileIn = new File(jsonData, fileName, {
		type: "text/plain",
	});
    
	var file = fileIn;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4) {
			if (xhttp.status == 200) {
			//console.log(xhttp.responseText);
			} else if (xhttp.status == 0) {
				alert(ServerDiconn);					
			} else {
				alert("Http cтатус: "+xhttp.status+"");
			}
		};
		}
		
		xhttp.open("POST", filePath, true);
		xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		xhttp.send(file);

		const link = document.createElement("a");
		link.setAttribute("href", URL.createObjectURL(file));
		link.setAttribute("download", fileName);
		link.className = "btn_save";
		link.textContent = "Скачать json файл";
		C.append(link);
		URL.revokeObjectURL(file);
};

function changeJSONonDevice(){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', PATH_FOR_UPLOAD + UPLOAD_JSON_FILENAME, true);

	// обработчик получения ответа сервера
	xhr.responseType = 'json';
	xhr.onload = function () {
	if (xhr.readyState === xhr.DONE) {  //то есть ответ получен полностью
		if (xhr.status === 200) {
		{
            xhr.response.wifi.wifi_auth.ssid = findOne(Q, ".ssid").value;
            xhr.response.wifi.wifi_auth.pass = findOne(Q, ".password-input").value;
            xhr.response.wifi.wifi_auth.ssid_mac = findOne(Q, ".ssid_mac").value;
            xhr.response.wifi.ip.ip = findOne(Q, ".ip").value;
            xhr.response.wifi.ip.mask = findOne(Q, ".mask").value;
            xhr.response.wifi.ip.gateway = findOne(Q, ".gateway").value;
            xhr.response.wifi.dns[0] = findOne(Q, ".dns").value;
            xhr.response.wifi.hidden = findOne(Q, ".hidden").value;
            xhr.response.wifi.channel = findOne(Q, ".channel").value;
            xhr.response.wifi.maxconnection = findOne(Q, ".maxconnection").value;
            xhr.response.wifi.dhcps.enable = findOne(Q, ".enable").value;
            xhr.response.wifi.dhcps.startip = findOne(Q, ".startip").value;
            xhr.response.wifi.dhcps.endip = findOne(Q, ".endip").value;

			saveData(PATH_FOR_UPLOAD + UPLOAD_JSON_FILENAME, xhr.response, UPLOAD_JSON_FILENAME);
		}

		} else {
			console.log("Server response: "+ xhr.statusText);
		}
	}
	};

	xhr.onerror = function() { // происходит, только когда запрос совсем не получилось выполнить
		console.log(`Ошибка соединения хмм!`); }

	xhr.send();
};

function CallBackFunction(err, url){
	if(err){
		//Error!
	}else{
		form_obj = url;

		findOne(Q, ".ssid").value = form_obj.wifi.wifi_auth.ssid;
		findOne(Q, ".ssid_mac").value = form_obj.wifi.wifi_auth.ssid_mac;
		findOne(Q, ".hidden").value = form_obj.wifi.hidden;
		findOne(Q, ".channel").value = form_obj.wifi.channel;
		findOne(Q, ".maxconnection").value = form_obj.wifi.maxconnection;
	}
};

docReady(function() {
	window.onload = getJSONfromDevice(document.getElementById('FileNameField').value, CallBackFunction);
	document.getElementById('create-json-btn').onclick = function() {
		changeJSONonDevice(document.getElementById('FileNameField').value);
	};
});

function CallBackStatic(err, url){
	if(err){
		//Error!
	}else{
		form_obj = url;

		document.getElementById('ip_conn').innerHTML = form_obj.wifi.ip.ip;

		findOne(Q, ".ip").value = form_obj.wifi.ip.ip;
		findOne(Q, ".mask").value = form_obj.wifi.ip.mask;
		findOne(Q, ".gateway").value = form_obj.wifi.ip.gateway;
		findOne(Q, ".dns").value = form_obj.wifi.dns[0];
	}
};

function CallBackDHCP(err, url){
	if(err){
		//Error!
	}else{
		form_obj = url;

        findOne(Q, ".enable").value = form_obj.wifi.dhcps.enable;
		findOne(Q, ".startip").value = form_obj.wifi.dhcps.startip;
		findOne(Q, ".startip").value = form_obj.wifi.dhcps.endip;
	}
};

function CallBackPass(err, url){
	if(err){
		//Error!
	}else{
		form_obj = url;

		findOne(Q, ".password-input").value = form_obj.wifi.wifi_auth.pass;
	}
};

function getDataStatic(){
	getJSONfromDevice(document.getElementById('FileNameField').value, CallBackStatic)
};

function getDataDHCP(){
	getJSONfromDevice(document.getElementById('FileNameField').value, CallBackDHCP)
};

function getDataPass(){
	getJSONfromDevice(document.getElementById('FileNameField').value, CallBackPass)
};

(function () {
    'use strict';

    var selector = {
        $button: document.getElementById('type_ssid'),
        $one: document.querySelector('.one'),
        $two: document.querySelector('.two')
    };

    selector.$button.addEventListener('click', function (event) {
        event.preventDefault();
        if (isHidden(selector.$one)) {
            changeDisplay(selector.$one, 'block');
            changeDisplay(selector.$two, 'none');
        } else {
            changeDisplay(selector.$one, 'none');
            changeDisplay(selector.$two, 'block');
        }
    });

    function changeDisplay($node, value) {
        $node.style.display = value;
        return $node;
    }

    function isHidden($node) {
        return window.getComputedStyle($node).display === 'none';
    }

}());

var nameIp  = "192.168.0.0";
document.getElementById( 'eth_static' ).addEventListener( 'click', function(){
	var textInput = document.getElementById( 'ip' );
	textInput.readOnly = !this.checked;
	if( this.checked ) {
		textInput.value = nameIp;
	} else {
		textInput.value = textInput.defaultValue;
	}
});
document.getElementById( 'ip' ).addEventListener( 'keyup', function(){
    nameIp = this.value;
});

var nameMask  = "192.168.0.0";
document.getElementById( 'eth_static' ).addEventListener( 'click', function(){
	var textInput = document.getElementById( 'mask' );
	textInput.readOnly = !this.checked;
	if( this.checked ) {
		textInput.value = nameMask;
	} else {
		textInput.value = textInput.defaultValue;
	}
});
document.getElementById( 'mask' ).addEventListener( 'keyup', function(){
    nameMask = this.value;
});

var nameGateway  = "192.168.0.0";
document.getElementById( 'eth_static' ).addEventListener( 'click', function(){
	var textInput = document.getElementById( 'gateway' );
	textInput.readOnly = !this.checked;
	if( this.checked ) {
		textInput.value = nameGateway;
	} else {
		textInput.value = textInput.defaultValue;
	}
});
document.getElementById( 'gateway' ).addEventListener( 'keyup', function(){
    nameGateway = this.value;
});

var nameDns  = "192.168.0.0";
document.getElementById( 'eth_static' ).addEventListener( 'click', function(){
	var textInput = document.getElementById( 'dns' );
	textInput.readOnly = !this.checked;
	if( this.checked ) {
		textInput.value = nameDns;
	} else {
		textInput.value = textInput.defaultValue;
	}
});
document.getElementById( 'dns' ).addEventListener( 'keyup', function(){
    nameDns = this.value;
});

var nameEnable  = "0";
document.getElementById( 'enable_wifi' ).addEventListener( 'click', function(){
	var textInput = document.getElementById( 'enable' );
	textInput.readOnly = !this.checked;
	if( this.checked ) {
		textInput.value = nameEnable;
	} else {
		textInput.value = textInput.defaultValue;
	}
});
document.getElementById( 'enable' ).addEventListener( 'keyup', function(){
    nameEnable = this.value;
});

var nameStartip  = "192.168.0.0";
document.getElementById( 'enable_wifi' ).addEventListener( 'click', function(){
	var textInput = document.getElementById( 'startip' );
	textInput.readOnly = !this.checked;
	if( this.checked ) {
		textInput.value = nameStartip;
	} else {
		textInput.value = textInput.defaultValue;
	}
});
document.getElementById( 'startip' ).addEventListener( 'keyup', function(){
    nameStartip = this.value;
});

var nameEndip  = "192.168.0.0";
document.getElementById( 'enable_wifi' ).addEventListener( 'click', function(){
	var textInput = document.getElementById( 'endip' );
	textInput.readOnly = !this.checked;
	if( this.checked ) {
		textInput.value = nameEndip;
	} else {
		textInput.value = textInput.defaultValue;
	}
});
document.getElementById( 'endip' ).addEventListener( 'keyup', function(){
    nameEndip = this.value;
});

var namePass = 'password';
document.getElementById( 'ap_password' ).addEventListener( 'click', function(){
	var textInput = document.getElementById( 'password-input' );
	textInput.readOnly = !this.checked;
	if( this.checked ) {
		textInput.value = namePass;
	} else {
		textInput.value = textInput.defaultValue;
	}
});
document.getElementById( 'password-input' ).addEventListener( 'keyup', function(){
    namePass = this.value;
});

function show_hide_password(target){
    var input = document.getElementById('password-input');
    if (input.getAttribute('type') == 'password') {
        target.classList.add('view');
        input.setAttribute('type', 'text');
    } else {
        target.classList.remove('view');
        input.setAttribute('type', 'password');
    }
    return false;
}