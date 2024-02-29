const url = "https://api.avantguard.pro:9999/json";
var   tid = 0;
var   userId = 0, sat = 0;

function sform_tid(){
    var curr_dt = new Date();
    tid = curr_dt.getDate() + curr_dt.getMonth() + curr_dt.getFullYear() + curr_dt.getHours() + curr_dt.getMinutes() + curr_dt.getSeconds();
}

window.onload = function(){
    sform_tid();
    generate();
}

function funcCommand( body, callbackfunc ){
    var xhr    = new XMLHttpRequest();
    var jsbody = JSON.stringify( body );
    var resp;

    xhr.responseType = 'text';
    xhr.onload = function (){
        if (xhr.readyState === xhr.DONE){
            if (xhr.status === 200){
                resp = JSON.parse(xhr.responseText);
                callbackfunc( 1, resp );
            } else {
                console.log("Не 200: Server response: "+ xhr.statusText);
                callbackfunc( 0, null );
            }
        }
    };

    xhr.onerror = function(){
        console.log("Ошибка соединения!");
        callbackfunc( 0, null );
    }

    xhr.open("POST", url );
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(jsbody);
}

function funcProcessEnter( result, respobj ){
    if( result === 0 )  return;
    if (respobj.nErr === 15){
        alert("Неверный логин и/или пароль!");
    }
    if( respobj.pn == "1" ){
        userId = respobj.userId;
        lat    = respobj.lat;
        localStorage.setItem("userId", userId);
        localStorage.setItem("lat", lat);
        window.location.href = '../../AvG_monitoring/templates/index.html';
    } else if( respobj.pn == "2"){
        console.log( "Ошибка: " + respobj.sErr );
    } else {
        console.log(  "Не определено: " + respobj.pn );
    }
}

function funcEnter(){
    var body = { "mt":117, "pn":0, "tid":"", "phone":"", "long_pin":"", "aui":"web" };
    body.tid      = tid;
    body.phone    = document.getElementById("idlogin").value;
    body.long_pin = document.getElementById("idpsw").value;
    body.aui      = "web";

    var idloginValue = document.getElementById("idlogin").value;
    localStorage.setItem("idlogin", idloginValue);

    funcCommand( body, funcProcessEnter );
}

function funcEnterValid(){
    if (idlogin.validity.patternMismatch) {
        //
    } else {
        idlogin.setCustomValidity("");
        funcEnter();
    }
}

function funcProcessPsw( result, respobj ){
    if( result === 0 )  return;
    console.log( respobj );

    if( respobj.pn == "1" ){
        lat = respobj.lat;
        localStorage.setItem("lat", lat);
        window.location.href = '../templates/index.html';
    } else if( respobj.pn == "2"){
        console.log( "Ответ psw: " + respobj.sErr );
    } else {
        console.log(  "Не определено: " + respobj.pn );
    }
}

function funcSendPsw(){
    var body = { "mt":116,"pn":0,"tid":"", "long_pin":"", "name":"", "aui":"web", "userId":"", "sat":"" };
    body.userId   = localStorage.getItem("userId");
    body.sat      = localStorage.getItem("sat");
    body.tid      = tid;
    body.name     = document.getElementById("name").value;
    body.aui      = "web";

    pass1 = document.getElementById("password1").value;
    pass2 = document.getElementById("password2").value;
    if(pass1 == pass2){
        body.long_pin = pass2;
    } else {
        alert("Введенные пароли не совпадают!");
    }

    funcCommand( body, funcProcessPsw );
    localStorage.removeItem("sat");
}

function funcProcessProverkaPhone( result, respobj ){
    if( result === 0 ) return;
    console.log( respobj );

    if( respobj.pn == "1" ){
        userId = respobj.userId;
        localStorage.setItem("userId", userId);
        sat    = respobj.sat;
        localStorage.setItem("sat", sat);
        window.location.href = 'reg_second.html';
    } else if( respobj.pn == "2"){
        console.log( "Ошибка: " + respobj.sErr );
    } else {
        console.log( "Не определено: " + respobj.pn );
    }
}

function funcProverkaPhonePsw(){
    var body = { "mt":115,"pn":0,"tid":"", "phone":"", "sms_pin":"", "aui":"web", "lat":"" };
    body.tid     = tid;
    body.phone   = localStorage.getItem("idlogin");
    body.sms_pin = document.getElementById("idpsw").value;
    body.aui     = "web";

    funcCommand( body, funcProcessProverkaPhone );
}

function funcProcessReg( result, respobj ){
    if( result === 0 )  return;
    console.log( respobj );

    if( respobj.pn == "1" ){
        window.location.href = 'get_code_reg.html';
    } else if( respobj.pn == "2"){
        console.log( "Ответ reg: " + respobj.sErr  );
    } else {
        console.log(  "Не определено: " + respobj.pn );
    }
}

function funcSendReg(){
    var body = { "mt":114,"pn":0,"tid":"","phone":"","aui":"web"};
    body.tid   = tid;
    body.phone = document.getElementById("idlogin").value;
    body.aui   = "web";

    var idloginValue = document.getElementById("idlogin").value;
    localStorage.setItem("idlogin", idloginValue);

    funcCommand( body, funcProcessReg );
}

function funcSendRegValid(){
    if (idlogin.validity.patternMismatch) {
        //
    } else {
        idlogin.setCustomValidity("");
        funcSendReg();
    }
}

function funcProcessRegRepeat( result, respobj ){
    if( result === 0 )  return;
    console.log( respobj );

    if( respobj.pn == "1" ){
    } else if( respobj.pn == "2"){
        console.log( "Ответ reg: " + respobj.sErr  );
    } else {
        console.log(  "Не определено: " + respobj.pn );
    }
}

function funcSendRegRepeat(){
    var body = { "mt":114,"pn":0,"tid":"","phone":"","aui":"web"};
    body.tid   = tid;
    body.phone = localStorage.getItem("idlogin");
    body.aui   = "web";

    funcCommand( body, funcProcessRegRepeat );
}

function show_hide_password(target){
    var input = document.getElementById('idpsw');
    if (input.getAttribute('type') == 'password') {
        target.classList.add('view');
        input.setAttribute('type', 'text');
    } else {
        target.classList.remove('view');
        input.setAttribute('type', 'password');
    }
    return false;
}

let captcha;
function generate() {
    document.getElementById("submit").value = "";
    captcha = document.getElementById("image");
    let uniquechar = "";
    const randomchar =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 1; i < 5; i++) {
        uniquechar += randomchar.charAt(
            Math.random() * randomchar.length)
    }
    captcha.innerHTML = uniquechar;
}

function printmsg() {
    const usr_input = document.getElementById("submit").value;

    if (usr_input == captcha.innerHTML) {
        button_enter.style.pointerEvents = "all";
        let s = document.getElementById("key").innerHTML = "Код подходит!";
        generate();
    }
    else {
        let s = document.getElementById("key").innerHTML = "Код не подходит!";
        generate();
    }
}