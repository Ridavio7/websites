const url = "https://api.avantguard.pro:9999/json";
let   tid = 0, userId = 0, sat = 0, ts = 0, data_line = [], count_obj = 0;

function sform_tid(){
    let curr_dt = new Date();
    tid = curr_dt.getDate() + curr_dt.getMonth() + curr_dt.getFullYear() + curr_dt.getHours() + curr_dt.getMinutes() + curr_dt.getSeconds();
    ts = parseInt(((new Date().getTime() / 1000) + 10800).toFixed(0));
}

function Mess( messtxt ){
    alert(messtxt);
}

function setUserId() {
    let user_id = document.getElementById("user_id");
    user_id.innerHTML = localStorage.getItem("idlogin");
}

window.onload = function(){
    sform_tid();
    funcGetObjectList();
    funcDashboards();
    setUserId();
    funcGetMessageToday();
}

function funcCommand( body, callbackfunc ){
    var xhr    = new XMLHttpRequest();
    var jsbody = JSON.stringify( body );
    var resp;

    xhr.responseType = 'text';
    xhr.onload = function (){
        if (xhr.readyState === xhr.DONE){
            if (xhr.status === 200){
                try{
                    resp = JSON.parse(xhr.responseText);
                    callbackfunc( 1, resp );
                } catch (err){
                    console.log(err);
                }
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

function leaveLK(){
    localStorage.removeItem("idlogin");
    localStorage.removeItem("lat");
    localStorage.removeItem("userId");
    localStorage.removeItem("vals");
    window.location.href = '../../AvG_login/templates/index.html';
}

function doDataForLine(data){
    let time_00 = new Date(); time_00.setUTCHours(0,0,0,0);
    let time_00_conv = ((new Date(time_00.toUTCString()).valueOf()).toString()).slice(0, -3);
    let time_01 = new Date(); time_01.setUTCHours(1,0,0,0);
    let time_01_conv = ((new Date(time_01.toUTCString()).valueOf()).toString()).slice(0, -3);
    let time_02 = new Date(); time_02.setUTCHours(2,0,0,0);
    let time_02_conv = ((new Date(time_02.toUTCString()).valueOf()).toString()).slice(0, -3);
    let time_03 = new Date(); time_03.setUTCHours(3,0,0,0);
    let time_03_conv = ((new Date(time_03.toUTCString()).valueOf()).toString()).slice(0, -3);
    let time_04 = new Date(); time_04.setUTCHours(4,0,0,0);
    let time_04_conv = ((new Date(time_04.toUTCString()).valueOf()).toString()).slice(0, -3);
    let time_05 = new Date(); time_05.setUTCHours(5,0,0,0);
    let time_05_conv = ((new Date(time_05.toUTCString()).valueOf()).toString()).slice(0, -3);
    let time_06 = new Date(); time_06.setUTCHours(6,0,0,0);
    let time_06_conv = ((new Date(time_06.toUTCString()).valueOf()).toString()).slice(0, -3);
    let time_07 = new Date(); time_07.setUTCHours(7,0,0,0);
    let time_07_conv = ((new Date(time_07.toUTCString()).valueOf()).toString()).slice(0, -3);
    let time_08 = new Date(); time_08.setUTCHours(8,0,0,0);
    let time_08_conv = ((new Date(time_08.toUTCString()).valueOf()).toString()).slice(0, -3);
    let time_09 = new Date(); time_09.setUTCHours(9,0,0,0);
    let time_09_conv = ((new Date(time_09.toUTCString()).valueOf()).toString()).slice(0, -3);
    let time_10 = new Date(); time_10.setUTCHours(10,0,0,0);
    let time_10_conv = ((new Date(time_10.toUTCString()).valueOf()).toString()).slice(0, -3);
    let time_11 = new Date(); time_11.setUTCHours(11,0,0,0);
    let time_11_conv = ((new Date(time_11.toUTCString()).valueOf()).toString()).slice(0, -3);
    let time_12 = new Date(); time_12.setUTCHours(12,0,0,0);
    let time_12_conv = ((new Date(time_12.toUTCString()).valueOf()).toString()).slice(0, -3);
    let time_13 = new Date(); time_13.setUTCHours(13,0,0,0);
    let time_13_conv = ((new Date(time_13.toUTCString()).valueOf()).toString()).slice(0, -3);
    let time_14 = new Date(); time_14.setUTCHours(14,0,0,0);
    let time_14_conv = ((new Date(time_14.toUTCString()).valueOf()).toString()).slice(0, -3);
    let time_15 = new Date(); time_15.setUTCHours(15,0,0,0);
    let time_15_conv = ((new Date(time_15.toUTCString()).valueOf()).toString()).slice(0, -3);
    let time_16 = new Date(); time_16.setUTCHours(16,0,0,0);
    let time_16_conv = ((new Date(time_16.toUTCString()).valueOf()).toString()).slice(0, -3);
    let time_17 = new Date(); time_17.setUTCHours(17,0,0,0);
    let time_17_conv = ((new Date(time_17.toUTCString()).valueOf()).toString()).slice(0, -3);
    let time_18 = new Date(); time_18.setUTCHours(18,0,0,0);
    let time_18_conv = ((new Date(time_18.toUTCString()).valueOf()).toString()).slice(0, -3);
    let time_19 = new Date(); time_19.setUTCHours(19,0,0,0);
    let time_19_conv = ((new Date(time_19.toUTCString()).valueOf()).toString()).slice(0, -3);
    let time_20 = new Date(); time_20.setUTCHours(20,0,0,0);
    let time_20_conv = ((new Date(time_20.toUTCString()).valueOf()).toString()).slice(0, -3);
    let time_21 = new Date(); time_21.setUTCHours(21,0,0,0);
    let time_21_conv = ((new Date(time_21.toUTCString()).valueOf()).toString()).slice(0, -3);
    let time_22 = new Date(); time_22.setUTCHours(22,0,0,0);
    let time_22_conv = ((new Date(time_22.toUTCString()).valueOf()).toString()).slice(0, -3);
    let time_23 = new Date(); time_23.setUTCHours(23,0,0,0);
    let time_23_conv = ((new Date(time_23.toUTCString()).valueOf()).toString()).slice(0, -3);
    let time_002 = new Date(); time_002.setUTCHours(23,59,59,999);
    let time_002_conv = ((new Date(time_002.toUTCString()).valueOf()).toString()).slice(0, -3);

    let count = ["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"];
    for (let i of data){
        if (time_00_conv <= i && i <= time_01_conv){ count[0]++; }
        if (time_01_conv <= i && i <= time_02_conv){ count[1]++; }
        if (time_02_conv <= i && i <= time_03_conv){ count[2]++; }
        if (time_03_conv <= i && i <= time_04_conv){ count[3]++; }
        if (time_04_conv <= i && i <= time_05_conv){ count[4]++; }
        if (time_05_conv <= i && i <= time_06_conv){ count[5]++; }
        if (time_06_conv <= i && i <= time_07_conv){ count[6]++; }
        if (time_07_conv <= i && i <= time_08_conv){ count[7]++; }
        if (time_08_conv <= i && i <= time_09_conv){ count[8]++; }
        if (time_09_conv <= i && i <= time_10_conv){ count[9]++; }
        if (time_10_conv <= i && i <= time_11_conv){ count[10]++;}
        if (time_11_conv <= i && i <= time_12_conv){ count[11]++; }
        if (time_12_conv <= i && i <= time_13_conv){ count[12]++; }
        if (time_13_conv <= i && i <= time_14_conv){ count[13]++; }
        if (time_14_conv <= i && i <= time_15_conv){ count[14]++; }
        if (time_15_conv <= i && i <= time_16_conv){ count[15]++; }
        if (time_16_conv <= i && i <= time_17_conv){ count[16]++; }
        if (time_17_conv <= i && i <= time_18_conv){ count[17]++; }
        if (time_18_conv <= i && i <= time_19_conv){ count[18]++; }
        if (time_19_conv <= i && i <= time_20_conv){ count[19]++; }
        if (time_20_conv <= i && i <= time_21_conv){ count[20]++; }
        if (time_21_conv <= i && i <= time_22_conv){ count[21]++; }
        if (time_22_conv <= i && i <= time_23_conv){ count[22]++; }
        if (time_23_conv <= i && i <= time_002_conv){ count[23]++; }
    }

    new Chart( document.querySelector('.chart'),{
            type: 'line',
            data: {
            labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', 
                    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
                    '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
            datasets: [
                {
                    label: 'События',
                    data: count,
                    borderColor: '#0F59B1',
                    borderWidth: 2,
                    backgroundColor: 'white',
                    cubicInterpolationMode: 'monotone',
                }
            ]
        },
            options: {
            scales: {
                x: {
                    ticks: {
                        color: 'white',
                    },
                    grid: {
                        color: '#4C5761',
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white',
                    },
                    grid: {
                        color: '#4C5761',
                    }
                }
            },
            plugins: {
                    legend: {
                        display: false,
                    }
                }
            }
        });
}

function callbackGetMessageToday(err, respobj){
    if(err){
        //Error!
    } else {
        console.log( respobj );
        let data_str = [];
        for (i in respobj) {
            list_obj = respobj.aData;
        }
        for (let j in list_obj){
            let data_obj = list_obj[j];
            let data = data_obj.Mdt  + 10800;
            data_str.unshift(data);
        }
        doDataForLine(data_str);
    }
}

function funcProcessGetMessageToday( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "1" ){
        console.log( respobj );
    } else if( respobj.pn == "3"){
        callbackGetMessageToday(respobj.sErr, respobj);
    } else {
        console.log( "Не определено: " + respobj.pn );
    }
}

function funcGetMessageToday(){
    let body = { "mt":112, "pn":0, "tid":"", "userId":"", "lat":"", "aui":"web", "nPg":"",  "nPgSz":"", "db":"",  "de":"" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.aui      = "web";
    body.nPg      = 1;
    body.nPgSz    = 500;

    let start = new Date(); start.setUTCHours(0,0,0,0);
    let end = new Date(); end.setUTCHours(23,59,59,999);
    let start_conv = ((new Date(start.toUTCString()).valueOf()).toString()).slice(0, -3);
    let end_conv = ((new Date(end.toUTCString()).valueOf()).toString()).slice(0, -3);

    body.db       = start_conv;
    body.de       = end_conv;

    funcCommand( body, funcProcessGetMessageToday );
}

function callbackGetDashboardInfo(err, respobj, db_id){
    if(err){
        //Error!
    } else {
        users_obj = respobj.DBInfo;
        let colors = users_obj.aClr;
        let data = users_obj.aData;
        //let text = users_obj.aTxt;

        let canvas = document.getElementById(db_id);
        let ctx = canvas.getContext("2d");
        let total = data.reduce(function(sum, value) { return sum + value; }, 0);
        let startAngle = 0;
        ctx.translate(0,70);
        ctx.rotate(-90 * Math.PI / 180);
        for (let i = 0; i < data.length; i++) {
            let sliceAngle = 2 * Math.PI * data[i] / total;
            ctx.fillStyle = colors[i];
            ctx.beginPath();
            ctx.moveTo(canvas.width/2, canvas.height/2);
            ctx.arc(canvas.width/2, canvas.height/2, canvas.height/2, startAngle, startAngle+sliceAngle);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = "#39414B";
            ctx.stroke(); 
            startAngle += sliceAngle;
        }
    }
}

function funcProcessGetDashboardInfoFifth( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "1" ){
        console.log( respobj );
    } else if( respobj.pn == "3"){
        for (let key in respobj.aData) {
            users_obj = respobj.aData[key];
            let Status = users_obj.jState;
            if (Status === undefined){
            } else {
                Status = Status.aState;
                query = "Присутствует неисправность";
                filteredItems = Status.filter(item => `${item.t}`.includes(query));
                if (filteredItems.length === 0){
                } else {
                    count_obj++;
                }
            }
        }
        respobj = {DBInfo:{aClr: ["#f6c23e"], aData: [count_obj]}}
        callbackGetDashboardInfo(respobj.sErr, respobj, "db_faults")
    } else {
        console.log( "Не определено: " + respobj.pn );
    }
}

function funcGetDashboardInfoFifth(){
    let body = { "mt":113, "pn":0, "tid":"", "userId":"", "lat":"",  "nPg":"",  "nPgSz":"", "aui":"web" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.nPg      = 1;
    body.nPgSz    = 13;
    body.aui      = "web";
    funcCommand( body, funcProcessGetDashboardInfoFifth );
}

function funcProcessGetDashboardInfoFourth( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "1" ){
        console.log( respobj );
    } else if( respobj.pn == "3"){
        callbackGetDashboardInfo(respobj.sErr, respobj, "db_power");
    } else {
        console.log( "Не определено: " + respobj.pn );
    }
}

function funcGetDashboardInfoFourth(){
    let body = { "mt":121, "pn":0, "tid":"", "userId":"", "lat":"", "aui":"web",  "iDB":"" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.iDB      = 6;
    body.aui      = "web";
    funcCommand( body, funcProcessGetDashboardInfoFourth );
}

function funcProcessGetDashboardInfoThird( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "1" ){
        console.log( respobj );
    } else if( respobj.pn == "3"){
        callbackGetDashboardInfo(respobj.sErr, respobj, "db_communication");
    } else {
        console.log( "Не определено: " + respobj.pn );
    }
}

function funcGetDashboardInfoThird(){
    let body = { "mt":121, "pn":0, "tid":"", "userId":"", "lat":"", "aui":"web",  "iDB":"" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.iDB      = 4;
    body.aui      = "web";
    funcCommand( body, funcProcessGetDashboardInfoThird );
}

function funcProcessGetDashboardInfoSecond( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "1" ){
        console.log( respobj );
    } else if( respobj.pn == "3"){
        callbackGetDashboardInfo(respobj.sErr, respobj, "db_alarm");
    } else {
        console.log( "Не определено: " + respobj.pn );
    }
}

function funcGetDashboardInfoSecond(){
    let body = { "mt":121, "pn":0, "tid":"", "userId":"", "lat":"", "aui":"web",  "iDB":"" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.iDB      = 3;
    body.aui      = "web";
    funcCommand( body, funcProcessGetDashboardInfoSecond );
}

function funcProcessGetDashboardInfoFirst( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "1" ){
        console.log( respobj );
    } else if( respobj.pn == "3"){
        callbackGetDashboardInfo(respobj.sErr, respobj, "db_objects");
    } else {
        console.log( "Не определено: " + respobj.pn );
    }
}

function funcGetDashboardInfoFirst(){
    let body = { "mt":121, "pn":0, "tid":"", "userId":"", "lat":"", "aui":"web",  "iDB":"" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.iDB      = 1;
    body.aui      = "web";
    funcCommand( body, funcProcessGetDashboardInfoFirst );
}

function funcDashboards(){
    funcGetDashboardInfoFirst();
    funcGetDashboardInfoSecond();
    funcGetDashboardInfoThird();
    funcGetDashboardInfoFourth();
    funcGetDashboardInfoFifth();
}

function funcProcessGetObjectList( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "1" ){
        console.log( respobj );
        if (respobj.nErr === 1){
            user_online_cl.style.display = "none";
            user_offline_cl.style.display = "block";
            user_online.style.display = "none";
            user_offline.style.display = "block";
        }
    } else if( respobj.pn == "3"){
        //
    } else {
        console.log( "Не определено: " + respobj.pn );
    }
}

function funcGetObjectList(){
    let body = { "mt":113, "pn":0, "tid":"", "userId":"", "lat":"",  "nPg":"",  "nPgSz":"", "aui":"web" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.nPg      = 1;
    body.nPgSz    = 13;
    body.aui      = "web";
    funcCommand( body, funcProcessGetObjectList );
}