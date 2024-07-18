const url = "https://apitw.avantguard.pro:32100/json";

window.onload = function() {
    funcGetResTable();
}

function funcCommand( body, callbackfunc ){
    let xhr    = new XMLHttpRequest();
    let jsbody = JSON.stringify( body );
    let resp;

    xhr.responseType = 'text';
    xhr.onload = function (){
        if (xhr.readyState === 4){
        if (xhr.status === 200){
            try{
            resp = JSON.parse(xhr.responseText);
            callbackfunc( 1, resp );
            } catch (err){
            console.log(err);
            }
        } else {
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

function funcGetResTable(){
    let zapros_main = localStorage.getItem("zapros_main_value");
    let body  =  {"user":"demo", "meth":"multiselect", "task":"shipSets", "zapros":`${zapros_main}`};
    funcCommand( body, funcProcessGetResTable );
}

function funcProcessGetResTable( result, respobj ){
    if( result === 0 ) return;
    console.log(respobj);
    let tb_id = "tb_shipment";
    for (let key in respobj.answ) {
        let val = respobj.answ[key];
        let NPset = val.NPset;
        let SNset = val.SNset;
        let name = val.set;
        let status = val.status;
        let kontr = val.kontr;
        let date = val.date;
        let prim = val.prim;
        let set = val.set;
        let comp = val.comp;
        let uin = val.uin;
        addRowColums(NPset, SNset, name, status, kontr, date, prim, set, uin, tb_id);
        makeTooltiptable(uin, comp);
    }
}

function addRowColums(NPset, SNset, name, status, kontr, date, prim, set, uin, tb_id){
    let tableRef = document.getElementById(tb_id);
    let newRow = tableRef.insertRow(-1);

    let cellNPset = newRow.insertCell(0);
    let cellSNset = newRow.insertCell(1);
    let cellname = newRow.insertCell(2);
    let cellstatus = newRow.insertCell(3);
    let cellkontr = newRow.insertCell(4);
    let celldate = newRow.insertCell(5);
    let cellprim = newRow.insertCell(6);
    let cellset = newRow.insertCell(7);

    let cellNPsettext = document.createTextNode(SNset); cellNPset.appendChild(cellNPsettext);
    let cellSNsettext = document.createTextNode(NPset); cellSNset.appendChild(cellSNsettext);
    let cellnametext = document.createTextNode(name); cellname.appendChild(cellnametext);
    let cellstatustext = document.createTextNode(status); cellstatus.appendChild(cellstatustext);
    let cellkontrtext = document.createTextNode(kontr); cellkontr.appendChild(cellkontrtext);
    let celldatetext = document.createTextNode(date); celldate.appendChild(celldatetext);
    let cellprimtext = document.createTextNode(prim); cellprim.appendChild(cellprimtext);
    let cellsettext = document.createTextNode(set); cellset.appendChild(cellsettext);

    tooltipTableHover(cellname, uin);
}

function tooltipTableHover(td, uin){
    td.onmouseout = function(e) {
        document.getElementById(uin).style.display='none';
    }
    td.onmouseover = function(e) {
        document.getElementById(uin).style.display='table';
    };
}

function makeTooltiptable(uin, comp){
    let divTableRef = document.getElementById("main_tb_shipment");
    let tooltipTable = document.createElement('table');
    tooltipTable.id = uin;
    tooltipTable.classList.add("coupontooltip");
    divTableRef.append(tooltipTable);

    for(let key in comp){
        let val = comp[key];
        let prod = val.prod;
        let SNprod = val.snprod;

        let tooltipTableRow = tooltipTable.insertRow(-1);
        let cellprod = tooltipTableRow.insertCell(0);
        let cellSNprod = tooltipTableRow.insertCell(1);
    
        let cellprodtext = document.createTextNode(prod); cellprod.appendChild(cellprodtext);
        let cellSNprodtext = document.createTextNode(SNprod); cellSNprod.appendChild(cellSNprodtext);
    }

    tooltipTable.onclick = function() {tooltipTable.style.display='none'};
}