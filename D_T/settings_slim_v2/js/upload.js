function docReady(fn) {
	if (document.readyState === "complete" || document.readyState === "interactive") {
		setTimeout(fn, 1);
	} else {
		document.addEventListener("DOMContentLoaded", fn);
	}
};

function showModal(message){
	document.getElementById('msgBox').style.display = 'block';
	document.getElementById('msgBoxBody').innerHTML = '';
	document.getElementById('msgBoxBody').innerHTML = message;
}

function showModalRedBorder(message){
	document.getElementById('msgBox').style.display = 'block';
	document.getElementById('msgBoxBody').style.border = '6px solid #ce2121';
	document.getElementById('msgBoxBody').innerHTML = '';
	document.getElementById('msgBoxBody').innerHTML = message;
};

function showModalGreenBorder(message){
	document.getElementById('msgBox').style.display = 'block';
	document.getElementById('msgBoxBody').style.border = '6px solid #179834';
	document.getElementById('msgBoxBody').innerHTML = '';
	document.getElementById('msgBoxBody').innerHTML = message;
};

function hideModal(){
	document.getElementById('msgBox').style.display = 'none';
	document.getElementById('msgBox').text = '';
	document.getElementById('msgBoxBody').style.border = '6px solid #0099ff';
};

function ChangeName(id, FileName){
	document.getElementById(id).innerHTML = FileName;
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

function CallBackFunction(err, data){
	if(err){
		//Error!
	}else{
		var formatted = JSON.stringify(data, null, 2);
		form_obj = JSON.parse(formatted);
		console.log(form_obj);

		const ssid = form_obj.wifi.wifi_auth.ssid;
		const pass = form_obj.wifi.wifi_auth.pass;
		const ssidmac = form_obj.wifi.wifi_auth.ssid_mac;
		const ip = form_obj.wifi.ip.ip;
		const mask = form_obj.wifi.ip.mask;
		const gateway = form_obj.wifi.ip.gateway;
		const dns_prefer = form_obj.wifi.dns[0];
		const dns_alternative = form_obj.wifi.dns[1];
		const hidden = form_obj.wifi.hidden;
		const channel = form_obj.wifi.channel;
		const maxconnection = form_obj.wifi.maxconnection;
		const enable = form_obj.wifi.dhcps.enable;
		const startip = form_obj.wifi.dhcps.startip;
		const endip = form_obj.wifi.dhcps.endip;
		const ip_eth = form_obj.ethernet.ip.ip;
		const mask_eth = form_obj.ethernet.ip.mask;
		const gateway_eth = form_obj.ethernet.ip.gateway;
		const dns_eth = form_obj.ethernet.dns;
		const enable_eth = form_obj.ethernet.dhcps.enable;
		const startip_eth = form_obj.ethernet.dhcps.startip;
		const endip_eth = form_obj.ethernet.dhcps.endip;

		document.getElementById("ssid_ap").setAttribute('value', ssid);
		document.getElementById("ssid_sta").setAttribute('value', ssid);
		document.getElementById("pass").setAttribute('value', pass);
		document.getElementById("ssid_mac").setAttribute('value', ssidmac);
		document.getElementById("ip").setAttribute('value', ip);
		document.getElementById("mask").setAttribute('value', mask);
		document.getElementById("gateway").setAttribute('value', gateway);
		document.getElementById("dns_prefer").setAttribute('value', dns_prefer);
		document.getElementById("dns_alternative").setAttribute('value', dns_alternative);
		document.getElementById("hidden").setAttribute('value', hidden);
		document.getElementById("channel").setAttribute('value', channel);
		document.getElementById("maxconnection").setAttribute('value', maxconnection);
		document.getElementById("enable").setAttribute('value', enable);
		document.getElementById("startip").setAttribute('value', startip);
		document.getElementById("endip").setAttribute('value', endip);
		document.getElementById("ip_eth").setAttribute('value', ip_eth);
		document.getElementById("mask_eth").setAttribute('value', mask_eth);
		document.getElementById("gateway_eth").setAttribute('value', gateway_eth);
		document.getElementById("dns_eth").setAttribute('value', dns_eth);
		document.getElementById("enable_eth").setAttribute('value', enable_eth);
		document.getElementById("startip_eth").setAttribute('value', startip_eth);
		document.getElementById("endip_eth").setAttribute('value', endip_eth);
	}
};

function getJSONFromPC() {
	var files = document.getElementById('selectJSON').files;
	  console.log(files);
	  if (files.length <= 0) {
		  showModal(NoFile);
		return false;
	  }
	
	  var fr = new FileReader();
	
	  fr.onload = function(e) { 
	  console.log(e);
		if(isJSON(e.target.result) == false){
			showModalRedBorder(NotAJSON);
		}
		var result = JSON.parse(e.target.result);
		var formatted = JSON.stringify(result, null, 2);
			document.getElementById('result').value = formatted;
	  }
	
	  fr.readAsText(files.item(0));
};

function confirmUpload(bool){
	if (bool == true){
		SendFile();
	}
};

function isJSON(str){
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};

function checkJSON(json) {
	if(isJSON(json) == true){	
		showModalGreenBorder(JSONisOK);
	} else {
		showModalRedBorder(wrongJSON);
	}
};

function isEmpty(str) {
    return (!str || str.length === 0 );
};

function CreateFile(){
	var content = document.getElementById('result').value;
	if (isEmpty(document.getElementById("FileNameField").value)){
		UPLOAD_JSON_FILENAME = "upload.json"
	} else {
		UPLOAD_JSON_FILENAME = document.getElementById("FileNameField").value;
	}
	if (!isJSON(content)){
		showModalRedBorder(confirmUploadErr);		
	}	
	var file = new File([content], UPLOAD_JSON_FILENAME, {
		type: "text/plain",
	});
	return file;  
};

function SendFile () {
	var filePath = PATH_FOR_UPLOAD + UPLOAD_JSON_FILENAME;
	var fileInput = CreateFile();

	var MAX_FILE_SIZE = 200*1024;
	var MAX_FILE_SIZE_STR = "200KB";

	if (fileInput.length == 0) {
		showModal(NoFile);
	} else if (filePath.length == 0) {
		showModal(FilePathNoSet);
	} else if (filePath.indexOf(' ') >= 0) {
		showModalRedBorder(FilePathSpErr);
	} else if (filePath[filePath.length-1] == '/') {
		showModalRedBorder(FilePathFNErr);
	} else if (fileInput.size > 200*1024) {
		showModalRedBorder(FileOversize);
	} else {
		var file = fileInput;
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4) {
				if (xhttp.status == 200) {
					//console.log(xhttp.responseText);
				} else if (xhttp.status == 0) {
					showModalRedBorder(ServerDiconn);					
				} else {
					showModalRedBorder("<p>xhttp.status: "+xhttp.status+"</p>"+"<p><b>ERROR: </b>" + xhttp.responseText + "<br></p><br>" + CloseBtn);
				}
				
			};
		}
		xhttp.open("POST", filePath, true);
		xhttp.send(file);		
	}
};

docReady(function() {
	document.getElementById('LoadFromDevice').onclick = function() {
		getJSONfromDevice(document.getElementById('FileNameField').value, CallBackFunction);
	};

	document.getElementById('selectJSON').addEventListener("change", function() {
		ChangeName('JSONLabel', document.getElementById('selectJSON').files[0].name)
		getJSONFromPC();
	});
});
