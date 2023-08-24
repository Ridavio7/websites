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
			xhr.response.ATS.type = findOne(Q, ".type_scheme").value;
			xhr.response.ATS.line.timeOK = findOne(Q, ".ATS_timeOK").value;
			xhr.response.ATS.line.timeERR = findOne(Q, ".ATS_timeERR").value;
			xhr.response.ATS.timeSwitchPriority = findOne(Q, ".timeSwitchPriority").value;

			xhr.response.Lines[0].U.limits[0].min = findOne(Q, ".n0_l1_min").value;
			xhr.response.Lines[0].U.limits[0].max = findOne(Q, ".n0_l1_max").value;
      xhr.response.Lines[0].U.limits[1].min = findOne(Q, ".n0_l2_min").value;
			xhr.response.Lines[0].U.limits[1].max = findOne(Q, ".n0_l2_max").value;
      xhr.response.Lines[0].U.limits[2].min = findOne(Q, ".n0_l3_min").value;
			xhr.response.Lines[0].U.limits[2].max = findOne(Q, ".n0_l3_max").value;
      xhr.response.Lines[0].U.timeERR.HighVoltage = findOne(Q, ".n0_timeERR_HighVoltage").value;
			xhr.response.Lines[0].U.timeERR.LowVoltage = findOne(Q, ".n0_timeERR_LowVoltage").value;
      xhr.response.Lines[0].F.limits.min = findOne(Q, ".n0_l4_min").value;
			xhr.response.Lines[0].F.limits.max = findOne(Q, ".n0_l4_max").value;
      xhr.response.Lines[0].F.timeERR.Frequency = findOne(Q, ".n0_timeERR_Frequency").value;
      xhr.response.Lines[0].timeOK = findOne(Q, ".n0_timeOK").value;
			xhr.response.Lines[0].enPhaseOrder = findOne(Q, ".n0_enPhaseOrder").value;

      xhr.response.Lines[1].U.limits[0].min = findOne(Q, ".n1_l1_min").value;
			xhr.response.Lines[1].U.limits[0].max = findOne(Q, ".n1_l1_max").value;
      xhr.response.Lines[1].U.limits[1].min = findOne(Q, ".n1_l2_min").value;
			xhr.response.Lines[1].U.limits[1].max = findOne(Q, ".n1_l2_max").value;
      xhr.response.Lines[1].U.limits[2].min = findOne(Q, ".n1_l3_min").value;
			xhr.response.Lines[1].U.limits[2].max = findOne(Q, ".n1_l3_max").value;
      xhr.response.Lines[1].U.timeERR.HighVoltage = findOne(Q, ".n1_timeERR_HighVoltage").value;
			xhr.response.Lines[1].U.timeERR.LowVoltage = findOne(Q, ".n1_timeERR_LowVoltage").value;
      xhr.response.Lines[1].F.limits.min = findOne(Q, ".n1_l4_min").value;
			xhr.response.Lines[1].F.limits.max = findOne(Q, ".n1_l4_max").value;
      xhr.response.Lines[1].F.timeERR.Frequency = findOne(Q, ".n1_timeERR_Frequency").value;
      xhr.response.Lines[1].timeOK = findOne(Q, ".n1_timeOK").value;
			xhr.response.Lines[1].enPhaseOrder = findOne(Q, ".n1_enPhaseOrder").value;

      xhr.response.Contactors[0].FB.en = findOne(Q, ".с0_en").value;
			xhr.response.Contactors[0].FB.time = findOne(Q, ".с0_time").value;
			xhr.response.Contactors[1].FB.en = findOne(Q, ".с1_en").value;
			xhr.response.Contactors[1].FB.time = findOne(Q, ".с1_time").value;


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

// Функция считывание данных из файла и запись в атрибут input
function CallBackFunction(err, url){
	if(err){
		//Error!
	}else{
		form_obj = url;
    console.log(form_obj);

		document.getElementById("type_scheme").setAttribute('value', form_obj.ATS.type);
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
		document.getElementById("n0_enPhaseOrder").setAttribute('value', form_obj.Lines[0].enPhaseOrder);

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
		document.getElementById("n1_enPhaseOrder").setAttribute('value', form_obj.Lines[1].enPhaseOrder);

		document.getElementById("с0_en").setAttribute('value', form_obj.Contactors[0].FB.en);
		document.getElementById("с0_time").setAttribute('value', form_obj.Contactors[0].FB.time);
		document.getElementById("с1_en").setAttribute('value', form_obj.Contactors[1].FB.en);
		document.getElementById("с1_time").setAttribute('value', form_obj.Contactors[1].FB.time);
	}
};

docReady(function() {
	window.onload = getJSONfromDevice(document.getElementById('FileNameField').value, CallBackFunction);
	document.getElementById('create-json-btn').onclick = function() {
		changeJSONonDevice(document.getElementById('FileNameField').value);
	};
});