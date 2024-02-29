const url = "https://api.avantguard.pro:9999/json";
var   tid = 0;
var   userId = 0, sat = 0;

//-------------------
function sform_tid()
//-------------------
{ var curr_dt = new Date();
  tid = curr_dt.getDate() + curr_dt.getMonth() + curr_dt.getFullYear() + curr_dt.getHours() + curr_dt.getMinutes() + curr_dt.getSeconds();
}
//----------------------
function Mess( messtxt )
//-----------------------
{  document.getElementById("idOtvet").value = messtxt; }

//------------------------
window.onload = function()
//------------------------
{
  sform_tid();
  document.getElementById("idarea").value = "Здесь будет ответ сервера/ tid=" + tid;
}

//----------------------------------------
function funcCommand( body, callbackfunc )
//----------------------------------------
{ var xhr    = new XMLHttpRequest();
  var jsbody = JSON.stringify( body );
  var resp;

  xhr.responseType = 'text';
  xhr.onload = function ()
  {
    if (xhr.readyState === xhr.DONE)
    {
        if (xhr.status === 200)
        {
           resp = JSON.parse(xhr.responseText);
           console.log( resp );
           callbackfunc( 1, resp );
        }
        else
        {
           console.log("Не 200: Server response: "+ xhr.statusText);
           callbackfunc( 0, null );
        }
    }
 };

  xhr.onerror = function()
  {
    console.log("Ошибка соединения!");
    callbackfunc( 0, null );
  }

  xhr.open("POST", url );
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(jsbody);
}


//---------------------------------------
function funcProcessEnter2( result, respobj )
//---------------------------------------
{  if( result === 0 )  return;
   console.log( respobj );
   console.log( respobj.pn );

  if( respobj.pn == "1" )
  {
      Mess(  "Успешно! Вход разрещен! " );
      userId = respobj.userId;
      lat    = respobj.lat;
      console.log( userId );
      console.log( lat );

  }
  else
       if( respobj.pn == "2")   Mess( "Ошибка: " + respobj.sErr );
       else    Mess(  "Не определено: " + respobj.pn );
}
//---------------------------------
//функция входа по логину и паролю
function funcEnter2( )
//---------------------------------
{ var body = { "mt":117,"pn":0,"tid":"", "phone":"", "long_pin":"", "aui":"web" };
  body.tid      = tid;
  body.phone    = document.getElementById("idlogin").value;
  body.long_pin = document.getElementById("idpsw").value;

  funcCommand( body, funcProcessEnter2 );
}


//---------------------------------------
function funcProcessPsw( result, respobj )
//---------------------------------------
{  if( result === 0 )  return;
   console.log( respobj );

  if( respobj.pn == "1" )
  {
      Mess(  "Успешно сохранили пароль!" );
      lat = respobj.lat;
  }
  else
       if( respobj.pn == "2")   Mess( "Ответ psw: " + respobj.sErr );
       else    Mess(  "Не определено: " + respobj.pn );
}
//-------------------------------
//функция установки нового пароля
function funcSendPsw( )
//-------------------------------
{ var body = { "mt":116,"pn":0,"tid":"", "long_pin":"", "aui":"web", "userId":"", "sat":"" };
  body.userId   = userId;
  body.sat      = sat;
  body.tid      = tid;
  body.long_pin = document.getElementById("idpsw").value;

  funcCommand( body, funcProcessPsw );
}

//--------------------------------------------------
function funcProcessProverkaPhone( result, respobj )
//-------------------------------------------------
{  if( result === 0 ) return;
   console.log( respobj );

  if( respobj.pn == "1" )
  {
      //Mess(  "Успешно, получил userId и sat!" );
      userId = respobj.userId;
      sat    = respobj.sat;

      funcSendPsw();
  }
  else
       if( respobj.pn == "2")   Mess( "Ошибка: " + respobj.sErr );
       else    Mess( "Не определено: " + respobj.pn );
}
//----------------------------------------
function funcProverkaPhonePsw( )
//----------------------------------------
{  var body = { "mt":115,"pn":0,"tid":"", "phone":"", "sms_pin":"", "aui":"web", "lat":"" };
  body.tid    = tid;
  body.phone   = document.getElementById("idlogin").value;
  body.sms_pin = document.getElementById("idpin").value;

  funcCommand( body, funcProcessProverkaPhone );
}

//------------------------------------------
function funcProcessReg( result, respobj )
//---------------------------------------
{  if( result === 0 )  return;
   console.log( respobj );

  if( respobj.pn == "1" )
  {
      Mess( "Успешно, Послан пин-код"  );
  }
  else
       if( respobj.pn == "2")   Mess( "Ответ reg: " + respobj.sErr  );
       else    Mess(  "Не определено: " + respobj.pn );
}
//----------------------
function funcSendReg()
//-----------------------
{ var body = { "mt":114,"pn":0,"tid":"","phone":"","aui":"web"};
  body.tid   = tid;
  body.phone = document.getElementById("idlogin").value;

  funcCommand( body, funcProcessReg );
}
