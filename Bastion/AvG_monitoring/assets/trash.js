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
    body.nPgSz    = 5000;

    let start = new Date(); start.setUTCHours(0,0,0,0);
    let end = new Date(); end.setUTCHours(23,59,59,999);
    let start_conv = ((new Date(start.toUTCString()).valueOf()).toString()).slice(0, -3);
    let end_conv = ((new Date(end.toUTCString()).valueOf()).toString()).slice(0, -3);

    body.db       = start_conv;
    body.de       = end_conv;

    funcCommand( body, funcProcessGetMessageToday );
}


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

function callbackGetDashboardInfo(err, respobj, db_id){
    if(err){
        //Error!
    } else {
        users_obj = respobj.DBInfo;
        let colors = users_obj.aClr;
        let data = users_obj.aData;

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
        respobj = {DBInfo:{aClr: ["#f6c23e"], aData: [count_obj], aTxt: ["Присутствует неисправность"]}}
        callbackGetDashboardInfo(respobj.sErr, respobj, "db_faults");
        callbackGetDashboardInfoBig(respobj.sErr, respobj, "canvas_fault");
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
    body.nPgSz    = 5000;
    body.aui      = "web";
    funcCommand( body, funcProcessGetDashboardInfoFifth );
}