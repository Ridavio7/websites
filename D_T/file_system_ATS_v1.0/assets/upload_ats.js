var PATH_FOR_UPLOAD = "/api/upload.api/"
var UPLOAD_JSON_FILENAME = "ats.json";

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

// Находим основной контейнер и контейнер для вопросов, а также отключаем отправку формы
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
	var xhr = new XMLHttpRequest();
	xhr.open('GET', "/" + UPLOAD_JSON_FILENAME, true);

	// обработчик получения ответа сервера
	xhr.responseType = 'json';
	xhr.onload = function () {
	if (xhr.readyState === xhr.DONE) {  //то есть ответ получен полностью
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

	xhr.onerror = function() { // происходит, только когда запрос совсем не получилось выполнить
		console.log(`Ошибка соединения хмм!`); }

	xhr.send();
};

// Функция считывание данных из файла и запись в атрибут input
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

		document.getElementById("ATS_timeOK").setAttribute('value', form_obj.ATS.line.timeOK);
		document.getElementById("ATS_timeERR").setAttribute('value', form_obj.ATS.line.timeERR);
		document.getElementById("timeSwitchPriority").setAttribute('value', form_obj.ATS.timeSwitchPriority);

		document.getElementById("n0_l1_min").setAttribute('value', form_obj.Lines[0].U.limits[0].min);
		document.getElementById("n0_l1_max").setAttribute('value', form_obj.Lines[0].U.limits[0].max);
		document.getElementById("n0_l2_min").setAttribute('value', form_obj.Lines[0].U.limits[1].min);
		document.getElementById("n0_l2_max").setAttribute('value', form_obj.Lines[0].U.limits[1].max);
		document.getElementById("n0_l3_min").setAttribute('value', form_obj.Lines[0].U.limits[2].min);
		document.getElementById("n0_l3_max").setAttribute('value', form_obj.Lines[0].U.limits[2].max);
		document.getElementById("n0_timeERR_HighVoltage").setAttribute('value', form_obj.Lines[0].U.timeERR.HighVoltage);
		document.getElementById("n0_timeERR_LowVoltage").setAttribute('value', form_obj.Lines[0].U.timeERR.LowVoltage);
		document.getElementById("n0_l4_min").setAttribute('value', form_obj.Lines[0].F.limits.min);
		document.getElementById("n0_l4_max").setAttribute('value', form_obj.Lines[0].F.limits.max);
		document.getElementById("n0_timeERR_Frequency").setAttribute('value', form_obj.Lines[0].F.timeERR.Frequency);
		document.getElementById("n0_timeOK").setAttribute('value', form_obj.Lines[0].timeOK);

		let n0_enPhaseOrder = document.getElementById('n0_enPhaseOrder');
		let strn0_enPhaseOrder = form_obj.Lines[0].enPhaseOrder;

		if(strn0_enPhaseOrder == "1") {
			n0_enPhaseOrder.checked = true;
		} else if(strn0_enPhaseOrder == "0") {
			n0_enPhaseOrder.checked = false;
		}

		document.getElementById("n1_l1_min").setAttribute('value', form_obj.Lines[1].U.limits[0].min);
		document.getElementById("n1_l1_max").setAttribute('value', form_obj.Lines[1].U.limits[0].max);
		document.getElementById("n1_l2_min").setAttribute('value', form_obj.Lines[1].U.limits[1].min);
		document.getElementById("n1_l2_max").setAttribute('value', form_obj.Lines[1].U.limits[1].max);
		document.getElementById("n1_l3_min").setAttribute('value', form_obj.Lines[1].U.limits[2].min);
		document.getElementById("n1_l3_max").setAttribute('value', form_obj.Lines[1].U.limits[2].max);
		document.getElementById("n1_timeERR_HighVoltage").setAttribute('value', form_obj.Lines[1].U.timeERR.HighVoltage);
		document.getElementById("n1_timeERR_LowVoltage").setAttribute('value', form_obj.Lines[1].U.timeERR.LowVoltage);
		document.getElementById("n1_l4_min").setAttribute('value', form_obj.Lines[1].F.limits.min);
		document.getElementById("n1_l4_max").setAttribute('value', form_obj.Lines[1].F.limits.max);
		document.getElementById("n1_timeERR_Frequency").setAttribute('value', form_obj.Lines[1].F.timeERR.Frequency);
		document.getElementById("n1_timeOK").setAttribute('value', form_obj.Lines[1].timeOK);

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

		document.getElementById("с0_time").setAttribute('value', form_obj.Contactors[0].FB.time);

		let с1_en = document.getElementById('с1_en');
		let strс1_en = form_obj.Contactors[1].FB.en;

		if(strс1_en == "1") {
			с1_en.checked = true;
		} else if(strс1_en == "0") {
			с1_en.checked = false;
		}

		document.getElementById("с1_time").setAttribute('value', form_obj.Contactors[1].FB.time);
	}
};

docReady(function() {
	window.onload = getJSONfromDevice("/" + UPLOAD_JSON_FILENAME, CallBackFunction);
	document.getElementById('create-json-btn').onclick = function() {
		changeJSONonDevice();
	};
});