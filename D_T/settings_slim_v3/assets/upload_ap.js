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
            xhr.response.wifi.mode = findOne(Q, ".wi-fi_mode").value;

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

docReady(function() {
	document.getElementById('create-json-btn').onclick = function() {
		changeJSONonDevice(document.getElementById('FileNameField').value);
	};
});

window.addEventListener('DOMContentLoaded', function() {
	var select = document.querySelector('#mode'),
		hide = document.querySelectorAll('.wi-fi_settings');
		function change()
		{
			[].forEach.call(hide, function(el) {
				var add = el.classList.contains(select.value) ? "add" : "remove"
				el.classList[add]('show');
			});
		}
		select.addEventListener('change', change);
		change()
	});