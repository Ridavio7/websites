const url = "https://api.avantguard.pro:9999/json";
var   tid = 0, userId = 0, sat = 0, ts = 0,  line_chart_h = null, line_chart_m = null, data_line_h = [], labels_h = [], lines_h = [], data_line_m = [], labels_m = [], lines_m = [], count_obj = 0;

function sform_tid(){
    var curr_dt = new Date();
    tid = curr_dt.getDate() + curr_dt.getMonth() + curr_dt.getFullYear() + curr_dt.getHours() + curr_dt.getMinutes() + curr_dt.getSeconds();
    ts = parseInt(((new Date().getTime() / 1000) + 10800).toFixed(0));
}

function Mess( messtxt ){
    alert(messtxt);
}

function setUserId() {
    var user_id = document.getElementById("user_id");
    user_id.innerHTML = localStorage.getItem("idlogin");
}

window.onload = function(){
    sform_tid();
    funcGetObjectList();
    funcDashboards();
    setUserId();
    for (let i = 0; i < 1440; i+=60) {
        funcGetMessageTodayHours(i);
    };
    setInterval(() => {
        if(line_chart_h != null){
            data_line_h = [], labels_h = [], lines_h = [];
        }
        for (let i = 0; i < 1440; i+=60) {
            funcGetMessageTodayHours(i);
        };
    }, 1800000)
    for (let i = 0; i < 30; i+=1) {
        funcGetMessageTodayMinutes(i);
    };
    setInterval(() => {
        if(line_chart_m != null){
            data_line_m = [], labels_m = [], lines_m = [];
        }
        for (let i = 0; i < 30; i+=1) {
            funcGetMessageTodayMinutes(i);
        };
    }, 30000)
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

function hideAllBlock() {
    document.getElementById("chart_minutes").style.display = 'none';
    document.getElementById("chart_hourse").style.display = 'none';
}

function Selected(a) {
    hideAllBlock();
    document.getElementById(a.value).style.display = 'block';
}

function makeChartLineMinutes(lines, labels){
    if(line_chart_m != null){
        line_chart_m.destroy();
    }
    line_chart_m = new Chart( document.querySelector('.chart_minutes'),{
        type: 'line',
        data: {labels: labels,
                datasets: [{
                label: 'События',
                data: lines,
                borderColor: '#0F59B1',
                borderWidth: 2,
                backgroundColor: 'white',
                cubicInterpolationMode: 'monotone'}]},
        options: {
                scales: {x: {ticks: {color: 'white', autoSkip: true, maxRotation: 0}, grid: {color: '#717171'}},
                y: {beginAtZero: true, ticks: {color: 'white'}, grid: {color: '#717171'}}},
                plugins: {legend: {display: false}}}
    });
}

function callbackGetMessageTodayMinutes(respobj){
    let line_m = respobj.aValues[0];
    let label_m = respobj.sBDaTi;

    data_line_m[label_m] = line_m;
    let data_line_m_sorted = Object.fromEntries(Object.entries(data_line_m).sort());
    if(Object.keys(data_line_m_sorted).length >= 29 && Object.keys(data_line_m_sorted).length <= 30){
        for (let key in data_line_m_sorted){
            lines_m.push(data_line_m_sorted[key]);
            key = key.substring(11, 16);
            labels_m.push(key);
        }
        if(lines_m.length >= 29 && labels_m.length >= 29){
            lines_m = lines_m.slice(0, 29);
            labels_m = labels_m.slice(0, 29);
            makeChartLineMinutes(lines_m, labels_m);
        }
    }
}

function funcProcessGetMessageTodayMinutes( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "1" ){
        callbackGetMessageTodayMinutes(respobj);
    } else if( respobj.pn == "3"){
        //console.log( respobj );
    } else {
        console.log( "Не определено: " + respobj.pn );
        let lines = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        let labels = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        makeChartLineMinutes(lines, labels);
    }
}

function funcGetMessageTodayMinutes(i){
    let body = { "mt":124, "pn":0, "tid":"", "userId":"", "lat":"", "aui":"web", "tDeltaBDaTi":"", "nMinutes":"", "nMaxCnt":""};
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.aui      = "web";
    body.tDeltaBDaTi = -i;
    body.nMinutes = 1;
    body.nMaxCnt  = 30;
    funcCommand( body, funcProcessGetMessageTodayMinutes );
}

function makeChartLineHourse(lines, labels){
    if(line_chart_h != null){
        line_chart_h.destroy();
    }
    line_chart_h = new Chart( document.querySelector('.chart_hourse'),{
        type: 'line',
        data: {labels: labels,
                datasets: [{
                label: 'События',
                data: lines,
                borderColor: '#0F59B1',
                borderWidth: 2,
                backgroundColor: 'white',
                cubicInterpolationMode: 'monotone'}]},
        options: {
                scales: {x: {ticks: {color: 'white', autoSkip: true, maxRotation: 0}, grid: {color: '#717171'}},
                y: {beginAtZero: true, ticks: {color: 'white'}, grid: {color: '#717171'}}},
                plugins: {legend: {display: false}}}
    });
}

function callbackGetMessageTodayHours(respobj){
    let line_h = respobj.aValues[0];
    let label_h = respobj.sBDaTi;

    data_line_h[label_h] = line_h;
    let data_line_h_sorted = Object.fromEntries(Object.entries(data_line_h).sort());
    if(Object.keys(data_line_h_sorted).length >= 23){
        for (let key in data_line_h_sorted){
            lines_h.push(data_line_h_sorted[key]);
            key = key.substring(11, 16);
            labels_h.push(key);
            if(lines_h.length >= 23 && labels_h.length >= 23){
                lines_h = lines_h.slice(0, 23);
                labels_h = labels_h.slice(0, 23);
                makeChartLineHourse(lines_h, labels_h);
            }
        }
    }
}

function funcProcessGetMessageTodayHours( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "1" ){
        callbackGetMessageTodayHours(respobj);
    } else if( respobj.pn == "3"){
        //console.log( respobj );
    } else {
        console.log( "Не определено: " + respobj.pn );
        let lines = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        let labels = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        makeChartLineHourse(lines, labels);
    }
}

function funcGetMessageTodayHours(i){
    let body = { "mt":124, "pn":0, "tid":"", "userId":"", "lat":"", "aui":"web", "tDeltaBDaTi":"", "nMinutes":"", "nMaxCnt":""};
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.aui      = "web";
    body.tDeltaBDaTi = -i;
    body.nMinutes = 60;
    body.nMaxCnt  = 24;
    funcCommand( body, funcProcessGetMessageTodayHours );
}

function callbackGetDashboardInfoSmall(respobj, db_id){
    if(respobj.pn == "1"){
        let colors = ['red'];
        let data = [1];
        let labels = ["Ошибка"];

        new Chart(document.getElementById(db_id),{
            type: 'pie',
            data: {labels: labels,
                datasets: [{data: data,backgroundColor: colors}]},
            options: {plugins: {legend: {display: false}},
                    datasets: {pie: {borderWidth: 1}}}
        });
    } else {
        users_obj = respobj.DBInfo;
        let colors = users_obj.aClr;
        let data = users_obj.aData;

        new Chart(document.getElementById(db_id),{
            type: 'pie',
            data: {datasets: [{data: data,backgroundColor: colors}]},
            options: {plugins: {legend: {display: false}},
                    datasets: {pie: {borderWidth: 1}}}
        });
    }
}

function funcProcessGetDashboardInfoCommMain( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "1" ){
        callbackGetDashboardInfoSmall(respobj, "db_communication");
    } else if( respobj.pn == "3"){
        callbackGetDashboardInfoSmall(respobj, "db_communication");
    } else {
        console.log( "Не определено: " + respobj.pn );
    }
}

function funcGetDashboardInfoCommMain(){
    let body = { "mt":121, "pn":0, "tid":"", "userId":"", "lat":"", "aui":"web",  "iDB":"" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.iDB      = 4;
    body.aui      = "web";
    funcCommand( body, funcProcessGetDashboardInfoCommMain );
}

function funcProcessGetDashboardInfoPower( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "1" ){
        callbackGetDashboardInfoSmall(respobj, "db_power");
    } else if( respobj.pn == "3"){
        callbackGetDashboardInfoSmall(respobj, "db_power");
    } else {
        console.log( "Не определено: " + respobj.pn );
    }
}

function funcGetDashboardInfoPower(){
    let body = { "mt":121, "pn":0, "tid":"", "userId":"", "lat":"", "aui":"web",  "iDB":"" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.iDB      = 6;
    body.aui      = "web";
    funcCommand( body, funcProcessGetDashboardInfoPower );
}

function funcProcessGetDashboardInfoObj( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "1" ){
        callbackGetDashboardInfoSmall(respobj, "db_objects");
    } else if( respobj.pn == "3"){
        callbackGetDashboardInfoSmall(respobj, "db_objects");
    } else {
        console.log( "Не определено: " + respobj.pn );
    }
}

function funcGetDashboardInfoObj(){
    let body = { "mt":121, "pn":0, "tid":"", "userId":"", "lat":"", "aui":"web",  "iDB":"" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.iDB      = 2;
    body.aui      = "web";
    funcCommand( body, funcProcessGetDashboardInfoObj );
}

function funcProcessGetDashboardInfoAlarm( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "1" ){
        callbackGetDashboardInfoSmall(respobj, "db_alarm");
    } else if( respobj.pn == "3"){
        callbackGetDashboardInfoSmall(respobj, "db_alarm");
    } else {
        console.log( "Не определено: " + respobj.pn );
    }
}

function funcGetDashboardInfoAlarm(){
    let body = { "mt":121, "pn":0, "tid":"", "userId":"", "lat":"", "aui":"web",  "iDB":"" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.iDB      = 3;
    body.aui      = "web";
    funcCommand( body, funcProcessGetDashboardInfoAlarm );
}

function funcProcessGetDashboardInfoStatus( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "1" ){
        callbackGetDashboardInfoSmall(respobj, "db_status");
    } else if( respobj.pn == "3"){
        callbackGetDashboardInfoSmall(respobj, "db_status");
    } else {
        console.log( "Не определено: " + respobj.pn );
    }
}

function funcGetDashboardInfoStatus(){
    let body = { "mt":121, "pn":0, "tid":"", "userId":"", "lat":"", "aui":"web",  "iDB":"" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.iDB      = 1;
    body.aui      = "web";
    funcCommand( body, funcProcessGetDashboardInfoStatus );
}

function funcDashboards(){
    funcGetDashboardInfoStatus();
    funcGetDashboardInfoAlarm();
    funcGetDashboardInfoObj();
    funcGetDashboardInfoPower();
    funcGetDashboardInfoCommMain();
}
/*
function tableSearch() {
    var phrase = document.getElementById('find_list');
    var table = document.getElementById('tb_list');
    var regPhrase = new RegExp(phrase.value, 'i');
    var flag = false;
    for (var i = 1; i < table.rows.length; i++) {
        flag = false;
        for (var j = table.rows[i].cells.length - 1; j >= 0; j--) {
            flag = regPhrase.test(table.rows[i].cells[j].innerHTML);
            if (flag) break;
        }
        if (flag) {
            table.rows[i].style.display = "";
        } else {
            table.rows[i].style.display = "none";
        }
    }
}

function funcSortTable(number){
    let sortedRows = Array.from(tb_list.rows)
    .slice(1)
    .sort((rowA, rowB) => rowA.cells[number].innerHTML > rowB.cells[number].innerHTML ? 1 : -1);
    tb_list.tBodies[0].append(...sortedRows);
}

function funcSortList(){
    let filt_obj = document.getElementById("sort_select_obj");
    let chose_box = filt_obj.options[filt_obj.selectedIndex].value;
    if (chose_box == "Сортировка"){
        funcSortTable(0);
    } else if (chose_box == "CID"){
        funcSortTable(0);
    } else if(chose_box == "Название"){
        funcSortTable(1);
    } else if(chose_box == "Адрес") {
        funcSortTable(2);
    }
}

function funcFiltList(respobj, stat){
    for (let key in respobj.aData) {
        users_obj = respobj.aData[key];
        let CID = users_obj.sAcnt;
        let Name = users_obj.sName;
        let Address = users_obj.sAddr;
        let Status = users_obj.jState;
        if (Status === undefined){
        } else {
            Status = Status.aState;
            query = stat;
            filteredItems = Status.filter(item => `${item.t}`.includes(query));
            if (filteredItems.length === 0){
            } else {
                addRow(CID, Name, Address, Status);
            }
        }
    }
}

function callbackGetFiltObjectList(err, respobj){
    if(err){
        //Error!
    } else {
        let filt_obj = document.getElementById("filt_select_obj");
        let chose_box = filt_obj.options[filt_obj.selectedIndex].value;
        let tableHeaderRowCount = 1;
        let table = document.getElementById('tb_list');
        let rowCount = table.rows.length;
        for (let i = tableHeaderRowCount; i < rowCount; i++) {
            table.deleteRow(tableHeaderRowCount);
        }
        if (chose_box == "Фильтр"){
            funcGetObjectList();
        } else if(chose_box == "Поставлен на охрану"){
            funcFiltList(respobj, "Закрыт");
        } else if(chose_box == "Снят с охраны") {
            funcFiltList(respobj, "Открыт");
        } else if(chose_box == "Не поставлен вовремя на охрану") {
            funcFiltList(respobj, "Закрыт частично");
        }
    }

    let css = '#cell_status:hover { transform: none; text-align: left} #cell_CID:hover { transform: none; text-align: left}';
    let style = document.createElement('style');

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('head')[0].appendChild(style);
}

function funcProcessGetFiltObjectList( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "1" ){
        console.log( respobj );
    } else if( respobj.pn == "3"){
        callbackGetFiltObjectList(respobj.sErr, respobj);
    } else {
        console.log( "Не определено: " + respobj.pn );
    }
}

function funcGetFiltObjectList(){
    let body = { "mt":113, "pn":0, "tid":"", "userId":"", "lat":"",  "nPg":"",  "nPgSz":"", "aui":"web" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.nPg      = 1;
    body.nPgSz    = 5000;
    body.aui      = "web";
    funcCommand( body, funcProcessGetFiltObjectList );
}

function addRow(CID, Name, Address, Status) {
    let tableRef = document.getElementById("tb_list");
    let newRow = tableRef.insertRow(-1);

    let cellCID = newRow.insertCell(0);
    let cellName = newRow.insertCell(1);
    let cellAddress = newRow.insertCell(2);
    let cellStatus = newRow.insertCell(3);

    cellCID.id = 'cell_CID';
    cellStatus.id = 'cell_status';

    let cellCIDtext = document.createTextNode(CID);
    cellCID.appendChild(cellCIDtext);
    let cellNametext = document.createTextNode(Name);
    cellName.appendChild(cellNametext);

    if(Address === ""){
        cellAddress.innerHTML = "Адрес объекта не указан";
    } else {
        let cellAddresstext = document.createTextNode(Address);
        cellAddress.appendChild(cellAddresstext);
    }

    if (Status === "Нет статуса"){
        cellStatus.innerHTML = Status;
    } else {
        cellStatus.innerHTML =
        "<i class='fas fa-exclamation-triangle' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top'></i>"+
        "<i class='fas fa-battery-three-quarters' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top'></i>"+
        "<i class='fas fa-wifi' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top'></i>"+
        "<i class='fas fa-ghost' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top'></i>"+
        "<i class='fas fa-fire-alt' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top'></i>"+
        "<i class='fas fa-skull-crossbones' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top'></i>";

        // неисправности
        query = "9";
        filteredItems = Status.filter(item => `${item.i}`.includes(query));
        cellStatus.childNodes[0].style.color = filteredItems[0].c;
        // питание
        query = "7";
        filteredItems = Status.filter(item => `${item.i}`.includes(query));
        cellStatus.childNodes[1].style.color = filteredItems[0].c;
        //связь
        query = "8";
        filteredItems = Status.filter(item => `${item.i}`.includes(query));
        if(filteredItems[0] !== undefined){
            cellStatus.childNodes[2].style.color = filteredItems[0].c;
        } else if(filteredItems[0] === undefined) {
            cellStatus.childNodes[2].style.color = "#b3b3b3";
        }
        // датчик сигнала
        query = "Датчики сигн. в норме";
        filteredItems = Status.filter(item => `${item.t}`.includes(query));
        if(filteredItems[0] !== undefined){
            cellStatus.childNodes[3].style.color = filteredItems[0].c;
        } else if(filteredItems[0] === undefined) {
            query = "Пожар";
            filteredItems = Status.filter(item => `${item.t}`.includes(query));
            cellStatus.childNodes[3].style.color = filteredItems[0].c;
        }
        // датчик пожара
        query = "3";
        filteredItems = Status.filter(item => `${item.i}`.includes(query));
        cellStatus.childNodes[4].style.color = filteredItems[0].c;
        // тревожная кнопка
        query = "4";
        filteredItems = Status.filter(item => `${item.i}`.includes(query));
        cellStatus.childNodes[5].style.color = filteredItems[0].c;
    };
}

function callbackGetObjectList(err, respobj){
    if(err){
        //Error!
    } else {
        console.log(respobj);
        funcFiltList(respobj, "Присутствует неисправность");
    }

    let css = '#cell_status:hover { transform: none; text-align: left} #cell_CID:hover { transform: none; text-align: left}';
    let style = document.createElement('style');
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName('head')[0].appendChild(style);
}
*/
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
        //callbackGetObjectList(respobj.sErr, respobj);
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
    body.nPgSz    = 5000;
    body.aui      = "web";
    funcCommand( body, funcProcessGetObjectList );
}