let API_UPDATE = '/api/update.api';
let PATH_FOR_UPLOAD = "/api/getVersion.api";
const PATH_FOR_NET = "/api/getNet.api?info";

function docReady(fn) {
	if (document.readyState === "complete" || document.readyState === "interactive") {
		setTimeout(fn, 1);
	} else {
		document.addEventListener("DOMContentLoaded", fn);
	}
};

function sub(obj)
{
	var path = obj.value;
	fileName = path.match(/[^\/\\]+$/);
	document.getElementById('file-input').innerHTML = fileName;
};

function getJSONfromDevice(PATH_FOR_UPLOAD, callback){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', PATH_FOR_UPLOAD, true);
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

// функция выполняет запрос к конфигурационному файлу
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

function CallBackFunction(err, PATH_FOR_UPLOAD){
	if(err){
		//Error!
	}else{
		form_obj = PATH_FOR_UPLOAD;
		console.log(form_obj);

		document.getElementById('n_web').value = form_obj.name;
		document.getElementById('v_web').value = form_obj.versions.software;
		document.getElementById('v_firmware').value = form_obj.versions.hardware;

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

docReady(function(){
	window.onload = getJSONfromDevice(PATH_FOR_UPLOAD, CallBackFunction),
	getJSONnet(PATH_FOR_NET, CallBackNet);
});

function mysub()
{
	var form = document.getElementById('upload_form');
	var data = new FormData(form);
	var type = 0;
	if(data.get('filetype') == 'fw')
	{
		type = 0xAA;	
		//data.set('update', file.files[0], data.get('update').name + '_fs');
	}
	if(data.get('filetype') == 'fs')
	{
		type = 0xBB;
		//data.set('update', file.files[0], data.get('update').name + '_fw');
	}
	//READ FILE DATA
	var reader = new FileReader();
	reader.onloadend = function (event) {
		let filedata = new Uint8Array(event.target.result);
		
		console.log('file name  : ' + file.files[0].name);
		console.log('file size  : ' + file.files[0].size);
		console.log('filedata:');
		console.log(filedata);
		console.log('Start http request');
		var xhttp = new window.XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4) {
				if (xhttp.status == 200) {
					console.log(xhttp.responseText)
					alert('Данные успешно загружены. Страница будет обновлена!')
					location.reload();
					//document.open();
					//document.write(xhttp.responseText);
					//document.close();
				} else if (xhttp.status == 0) {
					console.log('server disonection')					
				} else {
					console.log("<p>xhttp.status: "+xhttp.status+" + ERROR: " + xhttp.responseText + "\nСтраница будет перезагружена!");
				}
			}
		};
		xhttp.upload.addEventListener('progress', function (evt) {
			if (evt.lengthComputable)
			{
				var per = evt.loaded / evt.total;
				document.getElementById('prg').innerHTML = 'progress: ' + Math.round(per * 100) + '%';
				document.getElementById('bar').style.width = Math.round(per * 100) + '%';
			}
		}, false);
		//SEND DATA PREPARE:
		var header = [];
		//NAME
		for (var i = 0; i < file.files[0].name.length; i++)
		{
			header.push(file.files[0].name.charCodeAt(i));
		}
		for (var i = file.files[0].name.length; i < 20; i++)
		{
			header.push(0x00);
		}
		//SIZE
		header.push((file.files[0].size >> 0) & 0xFF);
		header.push((file.files[0].size >> 8) & 0xFF);
		header.push((file.files[0].size >> 16) & 0xFF);
		header.push((file.files[0].size >> 24) & 0xFF);
		//TYPE
		header.push(type);
		//SEND DATA
		var senddata = new Uint8Array(25 + file.files[0].size)
		senddata.set(header, 0);
		senddata.set(filedata, 25);
		console.log('senddata: ' + senddata.length);
		console.log(senddata);
		
		//SEND
		xhttp.open("POST", API_UPDATE, true);
		xhttp.setRequestHeader('Content-Type', 'application/json');
		//multipart/form-data
		//xhttp.send(data);
		xhttp.send(senddata); // perform all required operations with x here.
	};
	reader.readAsArrayBuffer(file.files[0]);
};