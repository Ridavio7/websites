//---------------------------------
function iPostZapr( usid, lat )
//---------------------------------
{ var xhr = new XMLHttpRequest();
  var body = { "mt":113,"pn":44,"tid":10006, "lsAcnt":"000098020000", "nPg":1, "nPgSz":30,"userId":"", "aui":"web", "lat":"" };
  var url = "https://api.avantguard.pro:9999/json";

  body.userId = usid;
  body.lat    = lat;
  var jsbody = JSON.stringify(body);

  // обработчик получения ответа сервера
  xhr.responseType = 'text';
  xhr.onload = function () {
  if (xhr.readyState === xhr.DONE) {  //то есть ответ получен полностью
      if (xhr.status === 200) {
        console.log(typeof xhr.response, xhr.response);
      resp = JSON.parse(xhr.response);
      {
        console.log(typeof resp, resp);
        resp.aData[0].nValue = 43;
        document.getElementById('iTemp').innerHTML  = resp.aData[0].nValue/resp.aData[0].nDiv + " " + resp.aData[0].sUnit;
        document.getElementById('iFaza1').innerHTML = "   " +resp.aData[1].nValue/resp.aData[1].nDiv + " B"; // + resp.aData[1].sUnit;
        document.getElementById('iFaza2').innerHTML = "   " +resp.aData[2].nValue/resp.aData[2].nDiv + " B"; //+ resp.aData[2].sUnit;
        document.getElementById('iFaza3').innerHTML = "   " +resp.aData[3].nValue/resp.aData[2].nDiv + " B"; //+ resp.aData[2].sUnit;
        
        //document.getElementById('iTemp').innerHTML  = resp.aData[0].nn;
      }

    } else {
        console.log("Не 200: Server response: "+ xhr.statusText);
    }
  }
 };

 xhr.onerror = function() { // происходит, только когда запрос совсем не получилось выполнить
    console.log(`Ошибка соединения хмм!`); }

  xhr.open("POST", url );
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(jsbody);
}

// ----- запрос с логином--
function iPostLogin()
//------------------------
{ var xhr = new XMLHttpRequest();
  var body = '{ "mt":117,"tid":422436,"pn":0,"long_pin":"@Demo","phone":"@Demo","aui":"web"}';
  var url = "https://api.avantguard.pro:9999/json";
  var resptxt;

  // обработчик получения ответа сервера
  // responseType должно быть пустой строкой, либо "text"
  xhr.responseType = 'text';
  xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {  //то есть ответ получен полностью
        if (xhr.status === 200) {
           console.log( "Ответ на 117: 200! и еще! text:" + xhr.response);
           resp = JSON.parse(xhr.response);
           iPostZapr( resp.userId, resp.lat );
           let timerID = setInterval( iPostZapr, 60000,  resp.userId, resp.lat);
        }
    }
  };

  xhr.onerror = function() { // происходит, только когда запрос совсем не получилось выполнить
      console.log(`Ошибка соединения хмм!`);
  };

  xhr.open("POST", url );
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(body);


}
