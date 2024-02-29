const PATH_FOR_UPLOAD = "/api/upload.api/";
const UPLOAD_JSON_FILENAME = "network.ethernet.json";
const url = "/" + UPLOAD_JSON_FILENAME;
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
	var xhr = new XMLHttpRequest();
	xhr.open('GET', "/" + UPLOAD_JSON_FILENAME, true);
	xhr.responseType = 'json';
	xhr.onload = function () {
	if (xhr.readyState === xhr.DONE) {
		if (xhr.status === 200) {
		{
			var obj =  xhr.response;
			var eth_enable = document.getElementById('eth_enable');
			if(eth_enable.checked) {
				obj.enable = "1";
			} else if(!eth_enable.checked){
				obj.enable = "0";
			}
			var selectMode = document.getElementById("network_mode");
			var desiredBox = selectMode.options[selectMode.selectedIndex].value;
			if(desiredBox == "DHCP"){
				obj.ip.mode = "dynamic";
			} else if(desiredBox == "Static") {
				obj.ip.mode = "static";
			}
			var enable_dhcp = document.getElementById('enable_dhcp');
			if(enable_dhcp.checked){
				obj.dhcps.enable = "1";
				obj.dhcps.startip = findOne(Q, ".startip").value;
				obj.dhcps.endip = findOne(Q, ".endip").value;
			} else {
				obj.dhcps.enable = "0";
			}
            obj.ip.ip = findOne(Q, ".ip").value;
            obj.ip.mask = findOne(Q, ".mask").value;
            //obj.ethernet.ip.gateway = findOne(Q, ".gateway").value;
            //obj.ethernet.dns[0] = findOne(Q, ".dns_pref").value;
			//obj.ethernet.dns[1] = findOne(Q, ".dns_alter").value;
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
	//var gateway = document.getElementById( 'gateway' );
	//var dns_pref = document.getElementById( 'dns_pref' );
	//var dns_alter = document.getElementById( 'dns_alter' );
	var enable_dhcp = document.getElementById('enable_dhcp');
	var startip = document.getElementById('startip');
	var endip = document.getElementById('endip');
    if(eth_enable.checked && desiredBox == "Static"){
		network_mode.disabled = false;
		ip.readOnly = false;
		mask.readOnly = false;
		//gateway.readOnly = false;
		//dns_pref.readOnly = false;
		//dns_alter.readOnly = false;
		enable_dhcp.disabled = false;
		if (!enable_dhcp.checked){
			startip.readOnly = true;
			endip.readOnly = true;
		} else {
			startip.readOnly = false;
			endip.readOnly = false;
		}
    } else if(eth_enable.checked && desiredBox == "DHCP"){
		network_mode.disabled = false;
		ip.readOnly = true;
		mask.readOnly = true;
		//gateway.readOnly = true;
		//dns_pref.readOnly = true;
		//dns_alter.readOnly = true;
		enable_dhcp.disabled = false;
		if (!enable_dhcp.checked){
			startip.readOnly = true;
			endip.readOnly = true;
		} else {
			startip.readOnly = false;
			endip.readOnly = false;
		}
	} else {
		network_mode.disabled = true;
		ip.readOnly = true;
		mask.readOnly = true;
		//gateway.readOnly = true;
		//dns_pref.readOnly = true;
		//dns_alter.readOnly = true;
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
	//var gateway = document.getElementById( 'gateway' );
	//var dns_pref = document.getElementById( 'dns_pref' );
	//var dns_alter = document.getElementById( 'dns_alter' );
	var desiredBox = network_mode.options[network_mode.selectedIndex].value;
	if(desiredBox == "DHCP"){
		ip.readOnly = true;
		mask.readOnly = true;
		//gateway.readOnly = true;
		//dns_pref.readOnly = true;
		//dns_alter.readOnly = true;
	} else if(desiredBox == "Static") {
		ip.readOnly = false;
		mask.readOnly = false;
		//gateway.readOnly = false;
		//dns_pref.readOnly = false;
		//dns_alter.readOnly = false;
	}
};

function CallBackFunction(err, url){
	if(err){
		//Error!
	}else{
		form_obj = url;
		console.log(form_obj);
		let eth_enable = document.getElementById('eth_enable');
		let strEnEth = form_obj.enable;
		if(strEnEth == "1") {
			eth_enable.checked = true;
		} else if(strEnEth == "0"){
			eth_enable.checked = false;
		}
		let enable_dhcp = document.getElementById('enable_dhcp');
		let strEnDHCP = form_obj.dhcps.enable;
		if(strEnDHCP == "1") {
			enable_dhcp.checked = true;
		} else if(strEnDHCP == "0"){
			enable_dhcp.checked = false;
		}
		document.getElementById("startip").value = form_obj.dhcps.startip;
		document.getElementById("endip").value = form_obj.dhcps.endip;
		onCheckboxChanged();
		onCheckboxChangedDHCP();
		onCheckboxChangedIPv4();
		let network_mode = document.getElementById("network_mode");
		let network_mode_obj = form_obj.ip.mode;
		var ip = document.getElementById( 'ip' );
		var mask = document.getElementById( 'mask' );
		//var gateway = document.getElementById( 'gateway' );
		//var dns_pref = document.getElementById( 'dns_pref' );
		//var dns_alter = document.getElementById( 'dns_alter' );
		if(network_mode_obj == "dynamic"){
			network_mode.options[0].selected = true;
			ip.readOnly = true;
			mask.readOnly = true;
			//gateway.readOnly = true;
			//dns_pref.readOnly = true;
			//dns_alter.readOnly = true;
		} else if(network_mode_obj == "static"){
			network_mode.options[1].selected = true;
			ip.readOnly = false;
			mask.readOnly = false;
			//gateway.readOnly = false;
			//dns_pref.readOnly = false;
			//dns_alter.readOnly = false;
		}
		document.getElementById("ip").value = form_obj.ip.ip;
		document.getElementById("mask").value = form_obj.ip.mask;
		//document.getElementById("gateway").value = form_obj.ip.gateway;
		//document.getElementById("dns_pref").value = form_obj.dns[0];
		//document.getElementById("dns_alter").value = form_obj.dns[1];		
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
	document.getElementById('ip_stat_ip').innerHTML = form_obj.ethernet.ip;
	document.getElementById('ip_stat_mac').innerHTML = form_obj.ethernet.mac;
};

docReady(function() {
	window.onload = getJSONfromDevice("/" + UPLOAD_JSON_FILENAME, CallBackFunction),
	getJSONnet(PATH_FOR_NET, CallBackNet);
	document.getElementById('create-json-btn').onclick = function() {
		changeJSONonDevice();
	};
});