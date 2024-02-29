const PATH_FOR_UPLOAD = "/api/upload.api/";
const UPLOAD_JSON_FILENAME = "ats.json";
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
			let type_scheme = document.getElementById("type_scheme");
			var desiredBox = type_scheme.options[type_scheme.selectedIndex].value;
			if(desiredBox == "Схема 2 - 1"){
				obj.ATS.type = "0";
			}
			obj.ATS.line.timeOK = findOne(Q, ".ATS_timeOK").value;
			obj.ATS.line.timeERR = findOne(Q, ".ATS_timeERR").value;
			obj.ATS.timeSwitchPriority = findOne(Q, ".timeSwitchPriority").value;
			obj.Lines[0].U.limits[0].min = findOne(Q, ".n0_l1_min").value;
			obj.Lines[0].U.limits[0].max = findOne(Q, ".n0_l1_max").value;
    		obj.Lines[0].U.limits[1].min = findOne(Q, ".n0_l2_min").value;
			obj.Lines[0].U.limits[1].max = findOne(Q, ".n0_l2_max").value;
			obj.Lines[0].U.limits[2].min = findOne(Q, ".n0_l3_min").value;
			obj.Lines[0].U.limits[2].max = findOne(Q, ".n0_l3_max").value;
    		obj.Lines[0].U.timeERR.HighVoltage = findOne(Q, ".n0_timeERR_HighVoltage").value;
			obj.Lines[0].U.timeERR.LowVoltage = findOne(Q, ".n0_timeERR_LowVoltage").value;
    		obj.Lines[0].F.limits.min = findOne(Q, ".n0_l4_min").value;
			obj.Lines[0].F.limits.max = findOne(Q, ".n0_l4_max").value;
    		obj.Lines[0].F.timeERR.Frequency = findOne(Q, ".n0_timeERR_Frequency").value;
    		obj.Lines[0].timeOK = findOne(Q, ".n0_timeOK").value;
			var n0_enPhaseOrder = document.getElementById('n0_enPhaseOrder');
			if(n0_enPhaseOrder.checked) {
				obj.Lines[0].enPhaseOrder = "1";
			} else {
				obj.Lines[0].enPhaseOrder = "0";
			}
    		obj.Lines[1].U.limits[0].min = findOne(Q, ".n1_l1_min").value;
			obj.Lines[1].U.limits[0].max = findOne(Q, ".n1_l1_max").value;
    		obj.Lines[1].U.limits[1].min = findOne(Q, ".n1_l2_min").value;
			obj.Lines[1].U.limits[1].max = findOne(Q, ".n1_l2_max").value;
    		obj.Lines[1].U.limits[2].min = findOne(Q, ".n1_l3_min").value;
			obj.Lines[1].U.limits[2].max = findOne(Q, ".n1_l3_max").value;
    		obj.Lines[1].U.timeERR.HighVoltage = findOne(Q, ".n1_timeERR_HighVoltage").value;
			obj.Lines[1].U.timeERR.LowVoltage = findOne(Q, ".n1_timeERR_LowVoltage").value;
    		obj.Lines[1].F.limits.min = findOne(Q, ".n1_l4_min").value;
			obj.Lines[1].F.limits.max = findOne(Q, ".n1_l4_max").value;
    		obj.Lines[1].F.timeERR.Frequency = findOne(Q, ".n1_timeERR_Frequency").value;
			obj.Lines[1].timeOK = findOne(Q, ".n1_timeOK").value;
			var n1_enPhaseOrder = document.getElementById('n1_enPhaseOrder');
			if(n1_enPhaseOrder.checked) {
				obj.Lines[1].enPhaseOrder = "1";
			} else {
				obj.Lines[1].enPhaseOrder = "0";
			}
			var с0_en = document.getElementById('с0_en');
			if(с0_en.checked) {
				obj.Contactors[0].FB.en = "1";
			} else {
				obj.Contactors[0].FB.en = "0";
			}
			obj.Contactors[0].FB.time = findOne(Q, ".с0_time").value;
			var с1_en = document.getElementById('с1_en');
			if(с1_en.checked) {
				obj.Contactors[1].FB.en = "1";
			} else {
				obj.Contactors[1].FB.en = "0";
			}
			obj.Contactors[1].FB.time = findOne(Q, ".с1_time").value;
			saveData(PATH_FOR_UPLOAD + UPLOAD_JSON_FILENAME, obj);
		}
		} else {
			alert(`Ошибка, данные не изменились ${xhr.status}: ${xhr.statusText}`);
		}
	}
	};
	xhr.onerror = function() {
		console.log(`Ошибка соединения хмм!`); }
	xhr.send();
};

function CallBackFunction(err, url){
	if(err){
		//Error!
	}else{
		form_obj = url;
		let type_scheme = document.getElementById("type_scheme");
		let type_scheme_obj = form_obj.ATS.type;
		if(type_scheme_obj == "0"){
			type_scheme.options[0].selected = true;
		}
		document.getElementById("ATS_timeOK").value = form_obj.ATS.line.timeOK;
		document.getElementById("ATS_timeERR").value = form_obj.ATS.line.timeERR;
		document.getElementById("timeSwitchPriority").value = form_obj.ATS.timeSwitchPriority;
		document.getElementById("n0_l1_min").value = form_obj.Lines[0].U.limits[0].min;
		document.getElementById("n0_l1_max").value = form_obj.Lines[0].U.limits[0].max;
		document.getElementById("n0_l2_min").value = form_obj.Lines[0].U.limits[1].min;
		document.getElementById("n0_l2_max").value = form_obj.Lines[0].U.limits[1].max;
		document.getElementById("n0_l3_min").value = form_obj.Lines[0].U.limits[2].min;
		document.getElementById("n0_l3_max").value = form_obj.Lines[0].U.limits[2].max;
		document.getElementById("n0_timeERR_HighVoltage").value = form_obj.Lines[0].U.timeERR.HighVoltage;
		document.getElementById("n0_timeERR_LowVoltage").value = form_obj.Lines[0].U.timeERR.LowVoltage;
		document.getElementById("n0_l4_min").value = form_obj.Lines[0].F.limits.min;
		document.getElementById("n0_l4_max").value = form_obj.Lines[0].F.limits.max;
		document.getElementById("n0_timeERR_Frequency").value = form_obj.Lines[0].F.timeERR.Frequency;
		document.getElementById("n0_timeOK").value = form_obj.Lines[0].timeOK;
		let n0_enPhaseOrder = document.getElementById('n0_enPhaseOrder');
		let strn0_enPhaseOrder = form_obj.Lines[0].enPhaseOrder;
		if(strn0_enPhaseOrder == "1") {
			n0_enPhaseOrder.checked = true;
		} else if(strn0_enPhaseOrder == "0") {
			n0_enPhaseOrder.checked = false;
		}
		document.getElementById("n1_l1_min").value = form_obj.Lines[1].U.limits[0].min;
		document.getElementById("n1_l1_max").value = form_obj.Lines[1].U.limits[0].max;
		document.getElementById("n1_l2_min").value = form_obj.Lines[1].U.limits[1].min;
		document.getElementById("n1_l2_max").value = form_obj.Lines[1].U.limits[1].max;
		document.getElementById("n1_l3_min").value = form_obj.Lines[1].U.limits[2].min;
		document.getElementById("n1_l3_max").value = form_obj.Lines[1].U.limits[2].max;
		document.getElementById("n1_timeERR_HighVoltage").value = form_obj.Lines[1].U.timeERR.HighVoltage;
		document.getElementById("n1_timeERR_LowVoltage").value = form_obj.Lines[1].U.timeERR.LowVoltage;
		document.getElementById("n1_l4_min").value = form_obj.Lines[1].F.limits.min;
		document.getElementById("n1_l4_max").value = form_obj.Lines[1].F.limits.max;
		document.getElementById("n1_timeERR_Frequency").value = form_obj.Lines[1].F.timeERR.Frequency;
		document.getElementById("n1_timeOK").value = form_obj.Lines[1].timeOK;
		let n1_enPhaseOrder = document.getElementById('n1_enPhaseOrder');
		let strn1_enPhaseOrder = form_obj.Lines[1].enPhaseOrder;
		if(strn1_enPhaseOrder == "1") {
			n1_enPhaseOrder.checked = true;
		} else if(strn1_enPhaseOrder == "0") {
			n1_enPhaseOrder.checked = false;
		}
		let с0_en = document.getElementById('с0_en');
		let strс0_en = form_obj.Contactors[0].FB.en;
		if(strс0_en == "1") {
			с0_en.checked = true;
		} else if(strс0_en == "0") {
			с0_en.checked = false;
		}
		document.getElementById("с0_time").value = form_obj.Contactors[0].FB.time;
		let с1_en = document.getElementById('с1_en');
		let strс1_en = form_obj.Contactors[1].FB.en;
		if(strс1_en == "1") {
			с1_en.checked = true;
		} else if(strс1_en == "0") {
			с1_en.checked = false;
		}
		document.getElementById("с1_time").value = form_obj.Contactors[1].FB.time;
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

docReady(function() {
	window.onload = getJSONfromDevice("/" + UPLOAD_JSON_FILENAME, CallBackFunction),
	getJSONnet(PATH_FOR_NET, CallBackNet);
	document.getElementById('create-json-btn').onclick = function() {
		changeJSONonDevice();
	};
});