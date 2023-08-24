const PATH_FOR_UPLOAD = "/api/upload.api/"
const UPLOAD_JSON_FILENAME = "network.json";
const url = "/" + UPLOAD_JSON_FILENAME;

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

function saveData(filePath, jsonData){
	
		var file = JSON.stringify(jsonData);

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4) {
				if (xhttp.status == 200) {
					alert(`Готово ${xhttp.status}: ${xhttp.statusText}`);
				} else {
					alert(`Ошибка ${xhttp.status}: ${xhttp.statusText}`);
				}
			};
		}
		
		xhttp.open("POST", filePath, true);
		xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');

		console.log(file);
		
		xhttp.send(file);
	};

function changeJSONonDevice(){
		var bSave = 1;
		var xhr = new XMLHttpRequest();
		xhr.open('GET', "/" + UPLOAD_JSON_FILENAME, true);
	
		// обработчик получения ответа сервера
		xhr.responseType = 'json';
		xhr.onload = function () {
		if (xhr.readyState === xhr.DONE) {  //то есть ответ получен полностью
			if (xhr.status === 200) {
			{
				var obj =  xhr.response;
	
				var wifi_enable = document.getElementById('wifi_enable');
				if(wifi_enable.checked) {
					obj.wifi.mode = "sta";
				} else if(obj.wifi.mode == "ap"){
					obj.wifi.mode = "none";
				} else {
					bSave = 0;
				}

				if(bSave == 1){
					var network_mode = document.getElementById("network_mode");
					var desiredBox = network_mode.options[network_mode.selectedIndex].value;
				
					if(desiredBox == "DHCP"){
						obj.wifi.ip.mode = "dynamic";
					} else if(desiredBox == "Static") {
						obj.wifi.ip.mode = "static";
					}
		
					obj.wifi.wifi_auth.ssid = findOne(Q, ".ssid").value;
					obj.wifi.wifi_auth.pass = findOne(Q, ".password-input").value;
					obj.wifi.ip.ip = findOne(Q, ".ip").value;
					obj.wifi.ip.mask = findOne(Q, ".mask").value;
					obj.wifi.ip.gateway = findOne(Q, ".gateway").value;
					obj.wifi.dns[0] = findOne(Q, ".dns_pref").value;
					obj.wifi.dns[1] = findOne(Q, ".dns_alter").value;
		
					saveData(PATH_FOR_UPLOAD + UPLOAD_JSON_FILENAME, obj);
				}
			}
			} else {
				alert(`Ошибка, данные не изменились ${xhr.status}: ${xhr.statusText}`);
			}
		}
		};
	
		xhr.onerror = function() { // происходит, только когда запрос совсем не получилось выполнить
			console.log(`Ошибка соединения хмм!`); }
	
		xhr.send();
	};
	
var onCheckboxChanged = function(){
		var wifi_enable = document.getElementById('wifi_enable');
	
		//var type_ssid = document.getElementById('type_ssid');
		var networks = document.getElementById('networks');
		var ssid = document.getElementById( 'ssid' );  
		var password_input = document.getElementById('password-input');

		var network_mode = document.getElementById('network_mode');
		var desiredBox = network_mode.options[network_mode.selectedIndex].value;
		var ip = document.getElementById( 'ip' );
		var mask = document.getElementById( 'mask' );
		var gateway = document.getElementById( 'gateway' );
		var dns_pref = document.getElementById( 'dns_pref' );
		var dns_alter = document.getElementById( 'dns_alter' );
	
		if(wifi_enable.checked && desiredBox == "Static"){
			//type_ssid.disabled = false;
			networks.disabled = false;
			ssid.readOnly = false;
			password_input.readOnly = false;
	
			network_mode.disabled = false;
			ip.readOnly = false;
			mask.readOnly = false;
			gateway.readOnly = false;
			dns_pref.readOnly = false;
			dns_alter.readOnly = false;

		} else if(wifi_enable.checked && desiredBox == "DHCP"){
			//type_ssid.disabled = false;
			networks.disabled = false;
			ssid.readOnly = false;
			password_input.readOnly = false;
	
			network_mode.disabled = false;
			ip.readOnly = true;
			mask.readOnly = true;
			gateway.readOnly = true;
			dns_pref.readOnly = true;
			dns_alter.readOnly = true;
	
		} else if(!wifi_enable.checked && desiredBox == "Static"){
			//type_ssid.disabled = true;
			networks.disabled = true;
			ssid.readOnly = true;
			password_input.readOnly = true;
	
			network_mode.disabled = true;
			ip.readOnly = true;
			mask.readOnly = true;
			gateway.readOnly = true;
			dns_pref.readOnly = true;
			dns_alter.readOnly = true;
		} else {
			//type_ssid.disabled = true;
			networks.disabled = true;
			ssid.readOnly = true;
			password_input.readOnly = true;
	
			network_mode.disabled = true;
			ip.readOnly = true;
			mask.readOnly = true;
			gateway.readOnly = true;
			dns_pref.readOnly = true;
			dns_alter.readOnly = true;
		}
	};

function onCheckboxChangedIPv4(){
		var network_mode = document.getElementById("network_mode");
	
		var ip = document.getElementById( 'ip' );
		var mask = document.getElementById( 'mask' );
		var gateway = document.getElementById( 'gateway' );
		var dns_pref = document.getElementById( 'dns_pref' );
		var dns_alter = document.getElementById( 'dns_alter' );
	
		var desiredBox = network_mode.options[network_mode.selectedIndex].value;
	
		if(desiredBox == "DHCP"){
			ip.readOnly = true;
			mask.readOnly = true;
			gateway.readOnly = true;
			dns_pref.readOnly = true;
			dns_alter.readOnly = true;
		} else if(desiredBox == "Static") {
			ip.readOnly = false;
			mask.readOnly = false;
			gateway.readOnly = false;
			dns_pref.readOnly = false;
			dns_alter.readOnly = false;
		}
	};
	
function CallBackFunction(err, url){
		if(err){
			//Error!
		}else{
			form_obj = url;
			console.log(form_obj);
	
			let wifi_enable = document.getElementById('wifi_enable');
			let strEnWifi = form_obj.wifi.mode;
	
			if(strEnWifi == "sta") {
				wifi_enable.checked = true;
			} else {
				wifi_enable.checked = false;
			}
	
			onCheckboxChanged();
	
			onCheckboxChangedIPv4();
	
			let network_mode = document.getElementById("network_mode");
			let network_mode_obj = form_obj.wifi.ip.mode;
			var ip = document.getElementById( 'ip' );
			var mask = document.getElementById( 'mask' );
			var gateway = document.getElementById( 'gateway' );
			var dns_pref = document.getElementById( 'dns_pref' );
			var dns_alter = document.getElementById( 'dns_alter' );
	
			if(wifi_enable.checked && network_mode_obj == "dynamic"){
				network_mode.options[0].selected = true;
				ip.readOnly = true;
				mask.readOnly = true;
				gateway.readOnly = true;
				dns_pref.readOnly = true;
				dns_alter.readOnly = true;
			} else if(wifi_enable.checked && network_mode_obj == "static"){
				network_mode.options[1].selected = true;
				ip.readOnly = false;
				mask.readOnly = false;
				gateway.readOnly = false;
				dns_pref.readOnly = false;
				dns_alter.readOnly = false;
			} else if(!wifi_enable.checked && network_mode_obj == "static"){
				network_mode.options[1].selected = true;
				ip.readOnly = true;
				mask.readOnly = true;
				gateway.readOnly = true;
				dns_pref.readOnly = true;
				dns_alter.readOnly = true;
			}
	
			document.getElementById('ip_conn').innerHTML = form_obj.wifi.ip.ip;
	
			findOne(Q, ".ssid").value = form_obj.wifi.wifi_auth.ssid;
			findOne(Q, ".password-input").value = form_obj.wifi.wifi_auth.pass;
			findOne(Q, ".ip").value = form_obj.wifi.ip.ip;
			findOne(Q, ".mask").value = form_obj.wifi.ip.mask;
			findOne(Q, ".gateway").value = form_obj.wifi.ip.gateway;
			findOne(Q, ".dns_pref").value = form_obj.wifi.dns[0];
			findOne(Q, ".dns_alter").value = form_obj.wifi.dns[1];		
	
		}
	};

docReady(function() {
	window.onload = getJSONfromDevice("/" + UPLOAD_JSON_FILENAME, CallBackFunction);
	document.getElementById('create-json-btn').onclick = function() {
		changeJSONonDevice();
	};
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

// скрипт для кнопки переключения SSID
/*
(function () {
    'use strict';

    var selector = {
        $checkbox: document.getElementById('type_ssid'),
        $one: document.querySelector('.one'),
        $two: document.querySelector('.two')
    };

    selector.$checkbox.addEventListener('click', function (event) {
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
*/