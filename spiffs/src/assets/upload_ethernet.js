const PATH_FOR_UPLOAD = "/api/upload.api/";
const UPLOAD_JSON_FILENAME = "network.json";
const url = "/" + UPLOAD_JSON_FILENAME;

function docReady(fn) {
	if (document.readyState === "complete" || document.readyState === "interactive") {
		setTimeout(fn, 1);
	} else {
		document.addEventListener("DOMContentLoaded", fn);
	}
};

// функция выполняет запрос к конфигурационному файлу
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

// Находим основной контейнер и контейнер для вопросов, а также отключаем отправку формы
const C = findOne(document.body, ".block_settings_form");
const Q = findOne(C, "#settings_form");
addHandler(Q, "submit", (ev) => ev.preventDefault());

// функция выполнет запрос на изменение конфигурационного файла
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
	var xhr = new XMLHttpRequest();
	xhr.open('GET', "/" + UPLOAD_JSON_FILENAME, true);

	// обработчик получения ответа сервера
	xhr.responseType = 'json';
	xhr.onload = function () {
	if (xhr.readyState === xhr.DONE) {  //то есть ответ получен полностью
		if (xhr.status === 200) {
		{
			var obj =  xhr.response;

			var eth_enable = document.getElementById('eth_enable');
			if(eth_enable.checked) {
				obj.ethernet.enable = "1";
			} else if(!eth_enable.checked){
				obj.ethernet.enable = "0";
			}

			var selectMode = document.getElementById("network_mode");
			var desiredBox = selectMode.options[selectMode.selectedIndex].value;
		
			if(desiredBox == "DHCP"){
				obj.ethernet.ip.mode = "dynamic";
			} else if(desiredBox == "Static") {
				obj.ethernet.ip.mode = "static";
			}

			var enable_dhcp = document.getElementById('enable_dhcp');
			if(enable_dhcp.checked){
				obj.ethernet.dhcps.enable = "1";
				obj.ethernet.dhcps.startip = findOne(Q, ".startip").value;
				obj.ethernet.dhcps.endip = findOne(Q, ".endip").value;
			} else {
				obj.ethernet.dhcps.enable = "0";
			}

            obj.ethernet.ip.ip = findOne(Q, ".ip").value;
            obj.ethernet.ip.mask = findOne(Q, ".mask").value;
            obj.ethernet.ip.gateway = findOne(Q, ".gateway").value;
            obj.ethernet.dns[0] = findOne(Q, ".dns_pref").value;
			obj.ethernet.dns[1] = findOne(Q, ".dns_alter").value;

			saveData(PATH_FOR_UPLOAD + UPLOAD_JSON_FILENAME, obj);
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
    var eth_enable = document.getElementById('eth_enable');

	var network_mode = document.getElementById('network_mode');

	var desiredBox = network_mode.options[network_mode.selectedIndex].value;
	var ip = document.getElementById( 'ip' );
	var mask = document.getElementById( 'mask' );
	var gateway = document.getElementById( 'gateway' );
	var dns_pref = document.getElementById( 'dns_pref' );
	var dns_alter = document.getElementById( 'dns_alter' );

	var enable_dhcp = document.getElementById('enable_dhcp');
	var startip = document.getElementById('startip');
	var endip = document.getElementById('endip');

    if(eth_enable.checked && desiredBox == "Static"){
		network_mode.disabled = false;
		ip.readOnly = false;
		mask.readOnly = false;
		gateway.readOnly = false;
		dns_pref.readOnly = false;
		dns_alter.readOnly = false;
		enable_dhcp.disabled = false;
    } else if(eth_enable.checked && desiredBox == "DHCP"){
		network_mode.disabled = false;
		ip.readOnly = true;
		mask.readOnly = true;
		gateway.readOnly = true;
		dns_pref.readOnly = true;
		dns_alter.readOnly = true;
		enable_dhcp.disabled = false;
	} else {
		network_mode.disabled = true;
		ip.readOnly = true;
		mask.readOnly = true;
		gateway.readOnly = true;
		dns_pref.readOnly = true;
		dns_alter.readOnly = true;
		enable_dhcp.disabled = true;
		startip.readOnly = true;
		endip.readOnly = true;
    }
};

var onCheckboxChangedDHCP = function(){
	var enable_dhcp = document.getElementById('enable_dhcp');

	var startip = document.getElementById('startip');
	var endip = document.getElementById('endip');

	if (enable_dhcp.checked){
		startip.readOnly = false;
		endip.readOnly = false;
	} else {
		startip.readOnly = true;
		endip.readOnly = true;
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

		let eth_enable = document.getElementById('eth_enable');
		let strEnEth = form_obj.ethernet.enable;

		if(strEnEth == "1") {
			eth_enable.checked = true;
		} else if(strEnEth == "0"){
			eth_enable.checked = false;
		}

		let enable_dhcp = document.getElementById('enable_dhcp');
		let strEnDHCP = form_obj.ethernet.dhcps.enable;

		if(strEnDHCP == "1") {
			enable_dhcp.checked = true;
		} else if(strEnDHCP == "0"){
			enable_dhcp.checked = false;
		}

		findOne(Q, ".startip").value = form_obj.ethernet.dhcps.startip;
		findOne(Q, ".endip").value = form_obj.ethernet.dhcps.endip;

		onCheckboxChanged();

		onCheckboxChangedDHCP();

		onCheckboxChangedIPv4();

		let network_mode = document.getElementById("network_mode");
		let network_mode_obj = form_obj.ethernet.ip.mode;
		var ip = document.getElementById( 'ip' );
		var mask = document.getElementById( 'mask' );
		var gateway = document.getElementById( 'gateway' );
		var dns_pref = document.getElementById( 'dns_pref' );
		var dns_alter = document.getElementById( 'dns_alter' );

		if(network_mode_obj == "dynamic"){
			network_mode.options[0].selected = true;
			ip.readOnly = true;
			mask.readOnly = true;
			gateway.readOnly = true;
			dns_pref.readOnly = true;
			dns_alter.readOnly = true;
		} else if(network_mode_obj == "static"){
			network_mode.options[1].selected = true;
			ip.readOnly = false;
			mask.readOnly = false;
			gateway.readOnly = false;
			dns_pref.readOnly = false;
			dns_alter.readOnly = false;
		}

		document.getElementById('ip_conn').innerHTML = form_obj.ethernet.ip.ip;

		findOne(Q, ".ip").value = form_obj.ethernet.ip.ip;
		findOne(Q, ".mask").value = form_obj.ethernet.ip.mask;
		findOne(Q, ".gateway").value = form_obj.ethernet.ip.gateway;
		findOne(Q, ".dns_pref").value = form_obj.ethernet.dns[0];
		findOne(Q, ".dns_alter").value = form_obj.ethernet.dns[1];		

	}
};

docReady(function() {
	window.onload = getJSONfromDevice("/" + UPLOAD_JSON_FILENAME, CallBackFunction);
	document.getElementById('create-json-btn').onclick = function() {
		changeJSONonDevice();
	};
});