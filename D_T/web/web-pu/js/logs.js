//GLOBAL
var arch = '[\n';

var loggerSize = 0;
//var lgReqCount = 0;

//SETTINGS
var reqLoggerLimitPerChunk = 50;
var lgReqSize = 20;

//MAIN COUNTER
var idxEntry = 0;

//CHUNK REQUESTS
var reqCount = 0;

//DEBUG
var reqChunkCounter = 0;
var mIdx = 0;

var data = 0;

var dataReady = 0;

//FILE SAVE
function enable_download(text, name, type)
{

	console.log('download:enable');
	var a = document.getElementById("file");
	var file = new Blob([text], {type: type});
	a.href = URL.createObjectURL(file);
	a.download = name;
	return;
}

function disable_download()
{

	console.log('download: diasble');
	var a = document.getElementById("file");
	a.href = "javascript:butDowbload();"
	return;
}

function butDowbload()
{
	if(dataReady == 0)
	{
		alert('Please wait, data uploading...')
		return;
	}
	return;
}

//STARTUP FUNCTION
function funLoad() {
	var tbl = document.getElementById("logger");
	var th1 = document.createElement('th');
	var th2 = document.createElement('th');
	var th3 = document.createElement('th');
	var th4 = document.createElement('th');
	var th5 = document.createElement('th');
  	th1.appendChild(document.createTextNode('N'))
	th2.appendChild(document.createTextNode('Номер в хранилице'))
	th3.appendChild(document.createTextNode('Метка времени'))
	th4.appendChild(document.createTextNode('ID'))
	th5.appendChild(document.createTextNode('Текст'))
  	tbl.appendChild(th1)
	tbl.appendChild(th2)
	tbl.appendChild(th3)
	tbl.appendChild(th4)
	tbl.appendChild(th5)
	getValues();
}

function funChunkReady(end)
{
	console.log("CHUNK READY:", "end: ", end ,"entry: ", idxEntry, "reqChunkCounter: ", reqChunkCounter);
	
	//if(end)
	{
		arch += '\n]'
		dataReady = 1;
		enable_download(arch,'logger.json','text/plain');
	}
}

//API: GET VALUES
function getValues()
{
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "api/getValues.api");
	xhr.responseType = "json";
	xhr.send();
	xhr.onload = function () {
		let resJsonObj = xhr.response;

		loggerSize = resJsonObj.logSize;
		document.getElementById("logSize").textContent = "0" + "/" + loggerSize;

		//DEBUG
		console.log("ALL ENTIES IN LOGGER: loggerSize=", loggerSize);

		idxEntry = loggerSize - 1;

		//START LOADING
		funNextChunkLoad();
	};
}

//API: LOGGER UPDATER
function getLogger(size)
{
	//NO MORE DATA
	if (idxEntry < 0) {
		console.log("getLogger: NO MORE DATA: idxEntry=", idxEntry);
		return;
	}

	dataReady = 0;
	disable_download();
	if(arch.length > 2)
	{
		arch.slice(0,-2)
	}

	let xhr = new XMLHttpRequest();
	xhr.open("GET", "/api/logger.api?" + "cursor=" + idxEntry + "&count=" + size);
	xhr.responseType = "json";
	xhr.send();

	xhr.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			let resJsonObj = xhr.response;
			let bNext = 1;

			//CHANGE COUNTER
			idxEntry -= resJsonObj.length;

			//UPDATE TABLE
			funLoggerReady(resJsonObj);

			//UPDATE COUNTER
			document.getElementById("logSize").textContent = (loggerSize - idxEntry - 1) + "/" + loggerSize;

			//DEBUG
			console.log(
				"LOAD READY: resJsonObj.length=", resJsonObj.length,
				" idxEntry=", idxEntry,
				" chunk=", reqChunkCounter
			);

			//NEXT REQUEST
			if (reqLoggerLimitPerChunk != 0) {
				reqCount += 1;

				if (reqCount >= reqLoggerLimitPerChunk)
				{
					console.log(
						"CHUNK READY: idxEntry=", idxEntry,
						" requests_in_chunk=", reqCount,
						" chunk=", reqChunkCounter
					);
					funChunkReady(0);
					return;
				}
			}

			//NO MORE DATA
			if (idxEntry < 0) {
				funChunkReady(1);
				console.log("getLogger: NO MORE DATA:", idxEntry);
				return;
			}

			//NEXT REQUEST
			getLogger(lgReqSize);
		}
	};
}

//TODO: NOT USED: GENERAL FILL TABLE
function funReady()
{
	tbl = document.getElementById("logger");
	console.log("FUN READY:");
	arch.forEach(function (currentValue, index, arr) {
		var text = document.createTextNode(
			index + " --- " + JSON.stringify(currentValue)
		);
		var tr = document.createElement("tr");
		var th = document.createElement("th");

		th.appendChild(text);
		tr.appendChild(th);

		tbl.appendChild(tr);
		console.log(currentValue);
	});
}

//API: LOGEGR: READY: FILL TABLE
function funLoggerReady(inArr)
{
	tbl = document.getElementById("logger");
	console.log("API LOGGER READY: ", inArr.length);
	inArr.forEach(function (currentValue, index, arr) {
		mIdx += 1;
		//var text = document.createTextNode(
		//	mIdx + " -- " + JSON.stringify(currentValue)
		//);
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		var td2 = document.createElement("td");
		var td3 = document.createElement("td");
		var td4 = document.createElement("td");
		var td5 = document.createElement("td");

		td1.appendChild(document.createTextNode(mIdx));
		td2.appendChild(document.createTextNode(currentValue.n));
		td3.appendChild(document.createTextNode(currentValue.ts));
		td4.appendChild(document.createTextNode(currentValue.id));
		td5.appendChild(document.createTextNode(currentValue.text));

		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		tr.appendChild(td5);
		

		if(mIdx != 1)
		{
			arch += ",\n" 
		}
		arch += JSON.stringify(currentValue);
		tbl.appendChild(tr);
		console.log(currentValue);
	});
}


function funNextChunkLoad()
{
	console.log("START LOAD NEXT CHUNK: idxEntry=", idxEntry, " chunk=", reqChunkCounter);
	//NO MORE DATA
	if (idxEntry < 0) {
		console.log("funNextChunkLoad: NO MORE DATA: idxEntry=", idxEntry);
		return;
	}
	reqChunkCounter += 1;
	reqCount = 0;
	getLogger(lgReqSize);
}
