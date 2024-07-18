const url = "https://api.avantguard.pro:9999/json";
let   web_url = "https://dev.proektit.ru/AvG_monitoring/templates/index.html";
let   tid = 0, userId = 0, sat = 0, ts = 0, err, line_chart_h = null, line_chart_m = null,
        data_line_h = [], labels_h = [], lines_h = [], data_line_m = [], labels_m = [],
        lines_m = [], count_obj = 0;

function sform_tid(){
    let curr_dt = new Date();
    tid = curr_dt.getDate() + curr_dt.getMonth() + curr_dt.getFullYear() + curr_dt.getHours() + curr_dt.getMinutes() + curr_dt.getSeconds();
    ts = parseInt(((new Date().getTime() / 1000) + 10800).toFixed(0));
}

function setUserId() {
    let user_id = document.getElementById("user_id");
    user_id.innerHTML = localStorage.getItem("idlogin");
}

window.onload = function(){
    sform_tid();
    setUserId();
    funcGetObjectList();
    funcDashboards();
    setInterval(() => {funcDashboards()}, 5000);
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
    }, 30000);
}

function funcCommand( body, callbackfunc ){
    let xhr    = new XMLHttpRequest();
    let jsbody = JSON.stringify( body );
    let resp;

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

function removeTable(){
    $("#tb_list").DataTable().clear().draw();
    $("#tb_list").empty();
    $("#tb_list_wrapper").remove();
    $("#ball_rotate_lt").after('<table id="tb_list"><thead id="tb_list_thead"><tr><td class="td_main">CID</td><td class="td_main">Название объекта</td><td class="td_main">Адрес объекта</td><td class="td_main">Статус</td></tr></thead><tbody id="tb_list_bd"></tbody></table>');
}

function addRow(CID, Name, Address, Status) {
    let tableRef = document.getElementById("tb_list_bd");
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
        "<i class='fas fa-tools' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top' title='Обслуживание'></i>"+
        "<i class='fas fa-lock' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top' title='Статус объекта'></i>"+
        "<i class='fas fa-exclamation-triangle' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top' title='Неисправность'></i>"+
        "<i class='fas fa-battery-three-quarters' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top' title='Питание'></i>"+
        "<i class='fas fa-wifi' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top' title='Связь'></i>"+
        "<i class='fas fa-ghost' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top' title='Сигнализация'></i>"+
        "<i class='fas fa-fire-alt' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top' title='Пожар'></i>"+
        "<i class='fas fa-skull-crossbones' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top' title='Тревожная кнопка'></i>";

        // обслуживание
        query = "6";
        filteredItems = Status.filter(item => `${item.i}`.includes(query));
        cellStatus.childNodes[0].style.color = filteredItems[0].c;
        // открыт/закрыт
        query = "10";
        filteredItems = Status.filter(item => `${item.i}`.includes(query));
        if(filteredItems[0] !== undefined){
            cellStatus.childNodes[1].style.color = filteredItems[0].c;
        } else if(filteredItems[0] === undefined) {
            query = "2";
            filteredItems = Status.filter(item => `${item.i}`.includes(query));
            cellStatus.childNodes[1].style.color = filteredItems[0].c;
        }
        // неисправности
        query = "9";
        filteredItems = Status.filter(item => `${item.i}`.includes(query));
        cellStatus.childNodes[2].style.color = filteredItems[0].c;
        // питание
        query = "7";
        filteredItems = Status.filter(item => `${item.i}`.includes(query));
        cellStatus.childNodes[3].style.color = filteredItems[0].c;
        //связь
        query = "8";
        filteredItems = Status.filter(item => `${item.i}`.includes(query));
        if(filteredItems[0] !== undefined){
            cellStatus.childNodes[4].style.color = filteredItems[0].c;
        } else if(filteredItems[0] === undefined) {
            cellStatus.childNodes[4].style.color = "#b3b3b3";
        }
        // датчик сигнала
        query = "Датчики сигн. в норме";
        filteredItems = Status.filter(item => `${item.t}`.includes(query));
        if(filteredItems[0] !== undefined){
            cellStatus.childNodes[5].style.color = filteredItems[0].c;
        } else if(filteredItems[0] === undefined) {
            query = "Пожар";
            filteredItems = Status.filter(item => `${item.t}`.includes(query));
            cellStatus.childNodes[5].style.color = filteredItems[0].c;
        }
        // датчик пожара
        query = "3";
        filteredItems = Status.filter(item => `${item.i}`.includes(query));
        cellStatus.childNodes[6].style.color = filteredItems[0].c;
        // тревожная кнопка
        query = "4";
        filteredItems = Status.filter(item => `${item.i}`.includes(query));
        cellStatus.childNodes[7].style.color = filteredItems[0].c;
    };
}

function tableStyle(){
    let css = '#cell_status:hover { transform: none; text-align: left} #cell_CID:hover { transform: none; text-align: left}';
    let style = document.createElement('style');
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName('head')[0].appendChild(style);

    ball_rotate.style.display = "none";
    icon_update.style.display = "inline-block";
    tb_list.style.display = "block";
}

function creatingTablePag(){
    $('#tb_list').DataTable({
        "oLanguage": {
            "sLengthMenu": "Показать _MENU_ записей на странице",
            "sZeroRecords": "По вашему запросу ничего не найдено",
            "sInfo": "Показано от _START_ до _END_ из _TOTAL_ записей",
            "sInfoEmpty": "Нет записей",
            "sInfoFiltered": "(из _MAX_ записей)",
            "sSearch": "Поиск:",
            "oPaginate": {
                "sNext": ">",
                "sPrevious": "<"
            }
        },
        "bAutoWidth": false,
        "lengthMenu": [[13, 25, 50, -1], [13, 25, 50, "Все"]]
    });
}

function callbackGetObjectListSecond(err, respobj){
    if(err){
        //Error!
    } else {
        removeTable();

        for (let key in respobj.aData) {
            users_obj = respobj.aData[key];
            let CID = users_obj.sAcnt;
            let Name = users_obj.sName;
            let Address = users_obj.sAddr;
            let Status = users_obj.jState;
            if (Status === undefined){
                Status = "Нет статуса";
                addRow(CID, Name, Address, Status);
            } else {
                Status = Status.aState;
                addRow(CID, Name, Address, Status);
            }
        }
    }

    tableStyle();
    creatingTablePag();

    let ball_rotate_lt = $("#ball_rotate_lt");
    ball_rotate_lt.css({'display':'none'});
    let text_loading = $("#text_loading");
    text_loading.css({'display':'none'});
}

function funcProcessGetObjectListSecond( result, respobj ){
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
        console.log( respobj );
        callbackGetObjectListSecond(respobj.sErr, respobj);
    } else {
        console.log( "Не определено: " + respobj.pn );
    }
}

function funcGetObjectListSecond(){
    let body = { "mt":113, "pn":0, "tid":"", "userId":"", "lat":"",  "nPg":"",  "nPgSz":"", "aui":"web" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.nPg      = 1;
    body.nPgSz    = 5000;
    body.aui      = "web";
    funcCommand( body, funcProcessGetObjectListSecond );
}

function callbackGetObjectList(err, respobj){
    if(err){
        //Error!
    } else {
        for (let key in respobj.aData) {
            users_obj = respobj.aData[key];
            let CID = users_obj.sAcnt;
            let Name = users_obj.sName;
            let Address = users_obj.sAddr;
            let Status = users_obj.jState;
            if (Status === undefined){
                Status = "Нет статуса";
                addRow(CID, Name, Address, Status);
            } else {
                Status = Status.aState;
                addRow(CID, Name, Address, Status);
            }
        }
    }

    tableStyle();
    creatingTablePag();

    let search_label = $("div.dataTables_filter label");
    let ball_rotate_lt = $("#ball_rotate_lt");
    let text_loading = $("#text_loading");
    
    $( search_label ).on( "click", function() {
        ball_rotate_lt.css({'display':'block'});
        text_loading.css({'display':'block'});
        search_label.css({'pointer-events':'none'});
        funcGetObjectListSecond();
    });

    ball_rotate.style.display = "none";
    icon_update.style.display = "inline-block";
    tb_list.style.display = "block";
}

function funcProcessGetObjectList( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "1" ){
        if (respobj.nErr === 1){
            user_online_cl.style.display = "none";
            user_offline_cl.style.display = "block";
            user_online.style.display = "none";
            user_offline.style.display = "block";
        }
    } else if( respobj.pn == "3"){
        console.log( respobj );
        callbackGetObjectList(respobj.sErr, respobj);
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
    body.nPgSz    = 500;
    body.aui      = "web";
    funcCommand( body, funcProcessGetObjectList );
}