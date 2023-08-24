var PATH_FOR_UPLOAD = "/api/upload.api/";
var UPLOAD_JSON_FILENAME = "network.json";

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

// функция выполнет изменение параметров конфигурационного файла
function changeJSONonDevice(){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', PATH_FOR_UPLOAD + UPLOAD_JSON_FILENAME, true);

	// обработчик получения ответа сервера
	xhr.responseType = 'json';
	xhr.onload = function () {
	if (xhr.readyState === xhr.DONE) {  //то есть ответ получен полностью
		if (xhr.status === 200) {
		{
			xhr.response.ethernet.ip.ip = findOne(Q, ".ip_eth").value;
			xhr.response.ethernet.ip.mask = findOne(Q, ".mask_eth").value;
			xhr.response.ethernet.ip.gateway = findOne(Q, ".gateway_eth").value;
			xhr.response.ethernet.dns[0] = findOne(Q, ".dns_eth").value;
			xhr.response.ethernet.dhcps.enable = findOne(Q, ".enable_eth").value;
			xhr.response.ethernet.dhcps.startip = findOne(Q, ".startip_eth").value;
			xhr.response.ethernet.dhcps.endip = findOne(Q, ".endip_eth").value;

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
	//window.onload = getJSONfromDevice(document.getElementById('FileNameField').value, CallBackFunction);
	document.getElementById('create-json-btn').onclick = function() {
		changeJSONonDevice(document.getElementById('FileNameField').value);
	};
});

function CallBackStatic(err, url){
	if(err){
		//Error!
	}else{
		form_obj = url;

		document.getElementById('ip_conn').innerHTML = form_obj.ethernet.ip.ip;

		findOne(Q, ".ip_eth").value = form_obj.ethernet.ip.ip;
		findOne(Q, ".mask_eth").value = form_obj.ethernet.ip.mask;
		findOne(Q, ".gateway_eth").value = form_obj.ethernet.ip.gateway;
		findOne(Q, ".dns_eth").value = form_obj.ethernet.dns;
	}
};

function CallBackDNS(err, url){
	if(err){
		//Error!
	}else{
		form_obj = url;

		findOne(Q, ".enable_eth").value = form_obj.ethernet.dhcps.enable;
		findOne(Q, ".startip_eth").value = form_obj.ethernet.dhcps.startip;
		findOne(Q, ".endip_eth").value = form_obj.ethernet.dhcps.endip;
	}
};

function getDataStatic(){
	getJSONfromDevice(document.getElementById('FileNameField').value, CallBackStatic)
};

function getDataDNS(){
	getJSONfromDevice(document.getElementById('FileNameField').value, CallBackDNS)
};

var nameIp = "192.168.0.0";
	document.getElementById( 'eth_static' ).addEventListener( 'click', function(){
		var textInput = document.getElementById( 'ip_eth' );
		textInput.readOnly = !this.checked;
		if( this.checked ) {
			textInput.value = nameIp;
		} else {
			textInput.value = textInput.defaultValue;
		}
	});
	document.getElementById( 'ip_eth' ).addEventListener( 'keyup', function(){
		nameIp = this.value;
	});

var nameMask = "192.168.0.0";
    document.getElementById( 'eth_static' ).addEventListener( 'click', function(){
        var textInput = document.getElementById( 'mask_eth' );
        textInput.readOnly = !this.checked;
        if( this.checked ) {
            textInput.value = nameMask;
        } else {
            textInput.value = textInput.defaultValue;
        }
        });
    document.getElementById( 'mask_eth' ).addEventListener( 'keyup', function(){
        nameMask = this.value;
    });

var nameGateway = "192.168.0.0";
    document.getElementById( 'eth_static' ).addEventListener( 'click', function(){
        var textInput = document.getElementById( 'gateway_eth' );
        textInput.readOnly = !this.checked;
        if( this.checked ) {
            textInput.value = nameGateway;
        } else {
            textInput.value = textInput.defaultValue;
        }
    });
    document.getElementById( 'gateway_eth' ).addEventListener( 'keyup', function(){
        nameGateway = this.value;
    });

var nameDns = "192.168.0.0";
    document.getElementById( 'eth_static' ).addEventListener( 'click', function(){
        var textInput = document.getElementById( 'dns_eth' );
        textInput.readOnly = !this.checked;
        if( this.checked ) {
            textInput.value = nameDns;
        } else {
            textInput.value = textInput.defaultValue;
        }
        });
    document.getElementById( 'dns_eth' ).addEventListener( 'keyup', function(){
        nameDns = this.value;
    });


var nameEnable  = "0";
    document.getElementById( 'enable_ethernet' ).addEventListener( 'click', function(){
        var textInput = document.getElementById( 'enable_eth' );
        textInput.readOnly = !this.checked;
        if( this.checked ) {
            textInput.value = nameEnable;
        } else {
            textInput.value = textInput.defaultValue;
        }
        });
    document.getElementById( 'enable_eth' ).addEventListener( 'keyup', function(){
        nameEnable = this.value;
    });

var nameStartip  = "192.168.0.0";
    document.getElementById( 'enable_ethernet' ).addEventListener( 'click', function(){
        var textInput = document.getElementById( 'startip_eth' );
        textInput.readOnly = !this.checked;
        if( this.checked ) {
            textInput.value = nameStartip;
        } else {
            textInput.value = textInput.defaultValue;
        }
        });
    document.getElementById( 'startip_eth' ).addEventListener( 'keyup', function(){
        nameStartip = this.value;
    });

var nameEndip  = "192.168.0.0";
    document.getElementById( 'enable_ethernet' ).addEventListener( 'click', function(){
        var textInput = document.getElementById( 'endip_eth' );
        textInput.readOnly = !this.checked;
        if( this.checked ) {
            textInput.value = nameEndip;
        } else {
            textInput.value = textInput.defaultValue;
        }
    });
    document.getElementById( 'endip_eth' ).addEventListener( 'keyup', function(){
        nameEndip = this.value;
    });