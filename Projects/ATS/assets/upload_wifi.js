const PATH_FOR_UPLOAD = "/api/upload.api/"
const UPLOAD_JSON_FILENAME = "network.wifista.json";
const url = "/" + UPLOAD_JSON_FILENAME;
const PATH_FOR_SCAN =  "/api/getNet.api?scan";
const PATH_FOR_NET = "/api/getNet.api?info";
const PATH_FOR_REBOOT = "/api/setValues.api?id=cmd.reboot&value=1";

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
	xhr.onerror = function() { alert(`Ошибка соединения!`); }
	xhr.send();
};

function getListNetworks(PATH_FOR_SCAN, callback){
	alert(`Идет поиск Wi-Fi сетей, подождите!`);
	var xhr = new XMLHttpRequest();
	xhr.open('GET', PATH_FOR_SCAN, true);
	xhr.responseType = 'json';
	xhr.onload = function() {
		var status = xhr.status;
		if (status === 200) {
			callback(null, xhr.response);
		} else {
			callback(status, xhr.response);
		}
	};
	xhr.onerror = function() { alert(`Ошибка соединения!`); }
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

function getReboot(PATH_FOR_REBOOT, callback){
	alert("Внимание! Для применения параметров плата будет перезагружена! Переподключитесь к контроллеру!");
    var xhr = new XMLHttpRequest();
    xhr.open('GET', PATH_FOR_REBOOT, true);
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

function CallBackReboot(err, PATH_FOR_REBOOT){
	if(err){
		//Error!
	}else{
		form_obj = PATH_FOR_REBOOT;
		console.log(form_obj);

		if(form_obj.status == 0){
			alert("Плата перезагружена и готова к работе!");
		} else {
			alert("Ошибка! Плата не перезагружена!");
		}
	}
};

const findOne = (element, selector) => element.querySelector(selector)
const addHandler = (element, event, callback) => element.addEventListener(event, callback)

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
					getReboot(PATH_FOR_REBOOT, CallBackReboot);
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
		xhr.responseType = 'json';
		xhr.onload = function () {
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status === 200) {
			{
				var obj =  xhr.response;
				var wifi_enable = document.getElementById('wifi_enable');
				if(wifi_enable.checked) {
					obj.enable = "1";
				} else if(!wifi_enable.checked){
					obj.enable = "0";
				} else {
					bSave = 0;
				}
				if(bSave == 1){
					var network_mode = document.getElementById("network_mode");
					var desiredBox = network_mode.options[network_mode.selectedIndex].value;
					if(desiredBox == "DHCP"){
						obj.ip.mode = "dynamic";
					} else if(desiredBox == "Static") {
						obj.ip.mode = "static";
					}
					var networks = document.getElementById("networks");
					var networkOpt = networks.options[networks.selectedIndex].value;
					if (networkOpt == "-- Выберите SSID --"){
						obj.wifi_auth.ssid = findOne(Q, ".ssid").value;
					} else {
						obj.wifi_auth.ssid = networkOpt;
					}
					obj.wifi_auth.pass = findOne(Q, ".password-input").value;
					obj.ip.ip = findOne(Q, ".ip").value;
					obj.ip.mask = findOne(Q, ".mask").value;
					obj.ip.gateway = findOne(Q, ".gateway").value;
					obj.dns[0] = findOne(Q, ".dns_pref").value;
					obj.dns[1] = findOne(Q, ".dns_alter").value;
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
			let strEnWifi = form_obj.enable;
			if(strEnWifi == "1") {
				wifi_enable.checked = true;
			} else {
				wifi_enable.checked = false;
			}
			onCheckboxChanged();
			onCheckboxChangedIPv4();
			let network_mode = document.getElementById("network_mode");
			let network_mode_obj = form_obj.ip.mode;
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
			document.getElementById('ssid').value = form_obj.wifi_auth.ssid;
			document.getElementById('password-input').value = form_obj.wifi_auth.pass;
			document.getElementById('ip').value = form_obj.ip.ip;
			document.getElementById('mask').value = form_obj.ip.mask;
			document.getElementById('gateway').value = form_obj.ip.gateway;
			document.getElementById('dns_pref').value = form_obj.dns[0];
			document.getElementById('dns_alter').value = form_obj.dns[1];		
		}
	};

function CallBackScan(err, PATH_FOR_SCAN){
	if(err){
		//Error!
	}else{
		form_obj = PATH_FOR_SCAN;
		console.log(form_obj);
		let networks = document.getElementById("networks");
		if(form_obj.status == undefined){
			alert(`Сканирование прошло успешно!`);
		} else if(form_obj.status != 0){
			alert(`Ошибка! Код: ${form_obj.status}`);
		}
		var result = Object.keys(form_obj.networks).map(function(key){
			return form_obj.networks[key].SSID + " (rssi: " + form_obj.networks[key].rssi + ")";
		});
		var result_value = Object.keys(form_obj.networks).map(function(key){
			return form_obj.networks[key].SSID;
		});
		for (var i = 0; i < result.length; i++) {
			var opt = result[i];
			var opt_v = result_value[i];
			var el = document.createElement("option");
			el.textContent = opt;
			el.value = opt_v;
			networks.appendChild(el);
		}
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
		document.getElementById('ip_stat_ip').innerHTML = form_obj.wifista.ip;
		document.getElementById('ip_stat_mac').innerHTML = form_obj.wifista.mac;
	}
};

docReady(function() {
	window.onload = getJSONfromDevice("/" + UPLOAD_JSON_FILENAME, CallBackFunction),
	getJSONnet(PATH_FOR_NET, CallBackNet);
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