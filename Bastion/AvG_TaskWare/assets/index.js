const url = "https://apitw.avantguard.pro:32100/json";
let zapros = [];
let zapros_main = [];
let forModal = [];
let forModal_main = [];

window.onload = function(){
  funcGetSets();
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

function funcGetSets(){
  let body  =  {"user":"demo", "meth":"view", "obj":"sets", "count":"100" };
  funcCommand( body, funcProcessGetSets );
}

function funcProcessGetSets( result, respobj ){
  if( result === 0 ) return;
  let tb_id = "tb_sets";
  for (let key in respobj.answ) {
    let set = respobj.answ[key];
    let uin = set.uin;
    let name = set.name;
    addRowColums(uin, name, tb_id);
  }
}

function addRowColums(uin, name, tb_id){
  let tableRef = document.getElementById(tb_id);
  let newRow = tableRef.insertRow(-1);

  let cellCheckbox = newRow.insertCell(0);
  let cellName = newRow.insertCell(1);
  let cellInput = newRow.insertCell(2);

  cellCheckbox.innerHTML = `<input type="checkbox" class="custom-checkbox" id="set_${uin}" value="${name}"><label for="set_${uin}"></label>`;
  let cellNametext = document.createTextNode(name);
  cellName.appendChild(cellNametext);
  cellInput.innerHTML = `<input type="text" id="input_${uin}" name="${uin}">`;
}

/* mian Tabs */
function openTabMain(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent_task");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "flex";
    document.getElementById(tabName).style.flexDirection = "column";
    evt.currentTarget.className += " active";
  }
  document.getElementById("defaultOpen").click();

//the modal
let modal = document.getElementById("modal_shipment");
let btn = document.getElementById("button_shipment");
let span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  getCheckSets();
  modal.style.display = "block";
}

span.onclick = function() {
  clearModalTable();
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    clearModalTable();
    modal.style.display = "none";
  }
}

function clearModalTable(){
  localStorage.clear();
  zapros.length = 0;
  forModal.length = 0;
  zapros_main.length = 0;
  forModal_main.length = 0;

  let table = document.getElementById('main_tb_sets_model');
  let newTbody = document.createElement('tbody');
  newTbody.id = "tb_sets_model";
  table.replaceChild(newTbody, table.getElementsByTagName('tbody')[0]);
}

function getCheckSets(){
  let zapros_1 = {};
  let forModal_1 = {};
  if(set_15.checked){
    zapros_1.uin = input_15.name;
    zapros_1.count = input_15.value;
    forModal_1.name = set_15.value;
    forModal_1.count = input_15.value;
  }
  let zapros_2 = {};
  let forModal_2 = {};
  if(set_16.checked){
    zapros_2.uin = input_16.name;
    zapros_2.count = input_16.value;
    forModal_2.name = set_16.value;
    forModal_2.count = input_16.value;
  }
  let zapros_3 = {};
  let forModal_3 = {};
  if(set_17.checked){
    zapros_3.uin = input_17.name;
    zapros_3.count = input_17.value;
    forModal_3.name = set_17.value;
    forModal_3.count = input_17.value;
  }
  let zapros_4 = {};
  let forModal_4 = {};
  if(set_18.checked){
    zapros_4.uin = input_18.name;
    zapros_4.count = input_18.value;
    forModal_4.name = set_18.value;
    forModal_4.count = input_18.value;
  }
  let zapros_5 = {};
  let forModal_5 = {};
  if(set_19.checked){
    zapros_5.uin = input_19.name;
    zapros_5.count = input_19.value;
    forModal_5.name = set_19.value;
    forModal_5.count = input_19.value;
  }
  let zapros_6 = {};
  let forModal_6 = {};
  if(set_20.checked){
    zapros_6.uin = input_20.name;
    zapros_6.count = input_20.value;
    forModal_6.name = set_20.value;
    forModal_6.count = input_20.value;
  }
  let zapros_7 = {};
  let forModal_7 = {};
  if(set_21.checked){
    zapros_7.uin = input_21.name;
    zapros_7.count = input_21.value;
    forModal_7.name = set_21.value;
    forModal_7.count = input_21.value;
  }
  let zapros_8 = {};
  let forModal_8 = {};
  if(set_22.checked){
    zapros_8.uin = input_22.name;
    zapros_8.count = input_22.value;
    forModal_8.name = set_22.value;
    forModal_8.count = input_22.value;
  }
  let zapros_9 = {};
  let forModal_9 = {};
  if(set_23.checked){
    zapros_9.uin = input_23.name;
    zapros_9.count = input_23.value;
    forModal_9.name = set_23.value;
    forModal_9.count = input_23.value;
  }
  let zapros_10 = {};
  let forModal_10 = {};
  if(set_24.checked){
    zapros_10.uin = input_24.name;
    zapros_10.count = input_24.value;
    forModal_10.name = set_24.value;
    forModal_10.count = input_24.value;
  }
  let zapros_11 = {};
  let forModal_11 = {};
  if(set_25.checked){
    zapros_11.uin = input_25.name;
    zapros_11.count = input_25.value;
    forModal_11.name = set_25.value;
    forModal_11.count = input_25.value;
  }
  let zapros_12 = {};
  let forModal_12 = {};
  if(set_26.checked){
    zapros_12.uin = input_26.name;
    zapros_12.count = input_26.value;
    forModal_12.name = set_26.value;
    forModal_12.count = input_26.value;
  }
  let zapros_13 = {};
  let forModal_13 = {};
  if(set_27.checked){
    zapros_13.uin = input_27.name;
    zapros_13.count = input_27.value;
    forModal_13.name = set_27.value;
    forModal_13.count = input_27.value;
  }
  let zapros_14 = {};
  let forModal_14 = {};
  if(set_28.checked){
    zapros_14.uin = input_28.name;
    zapros_14.count = input_28.value;
    forModal_14.name = set_28.value;
    forModal_14.count = input_28.value;
  }
  let zapros_15 = {};
  let forModal_15 = {};
  if(set_29.checked){
    zapros_15.uin = input_29.name;
    zapros_15.count = input_29.value;
    forModal_15.name = set_29.value;
    forModal_15.count = input_29.value;
  }
  let zapros_16 = {};
  let forModal_16 = {};
  if(set_30.checked){
    zapros_16.uin = input_30.name;
    zapros_16.count = input_30.value;
    forModal_16.name = set_30.value;
    forModal_16.count = input_30.value;
  }
  let zapros_17 = {};
  let forModal_17 = {};
  if(set_31.checked){
    zapros_17.uin = input_31.name;
    zapros_17.count = input_31.value;
    forModal_17.name = set_31.value;
    forModal_17.count = input_31.value;
  }
  let zapros_18 = {};
  let forModal_18 = {};
  if(set_32.checked){
    zapros_18.uin = input_32.name;
    zapros_18.count = input_32.value;
    forModal_18.name = set_32.value;
    forModal_18.count = input_32.value;
  }
  let zapros_19 = {};
  let forModal_19 = {};
  if(set_33.checked){
    zapros_19.uin = input_33.name;
    zapros_19.count = input_33.value;
    forModal_19.name = set_33.value;
    forModal_19.count = input_33.value;
  }
  let zapros_20 = {};
  let forModal_20 = {};
  if(set_34.checked){
    zapros_20.uin = input_34.name;
    zapros_20.count = input_34.value;
    forModal_20.name = set_34.value;
    forModal_20.count = input_34.value;
  }
  let zapros_21 = {};
  let forModal_21 = {};
  if(set_35.checked){
    zapros_21.uin = input_35.name;
    zapros_21.count = input_35.value;
    forModal_21.name = set_35.value;
    forModal_21.count = input_35.value;
  }
  let zapros_22 = {};
  let forModal_22 = {};
  if(set_36.checked){
    zapros_22.uin = input_36.name;
    zapros_22.count = input_36.value;
    forModal_22.name = set_36.value;
    forModal_22.count = input_36.value;
  }
  let zapros_23 = {};
  let forModal_23 = {};
  if(set_37.checked){
    zapros_23.uin = input_37.name;
    zapros_23.count = input_37.value;
    forModal_23.name = set_37.value;
    forModal_23.count = input_37.value;
  }
  zapros.push(zapros_1, zapros_2, zapros_3, zapros_4, zapros_5, zapros_6, zapros_7, zapros_8, zapros_9, zapros_10, zapros_11, zapros_12,
              zapros_13, zapros_14, zapros_15, zapros_16, zapros_17, zapros_18, zapros_19, zapros_20, zapros_21, zapros_22, zapros_23);
  for(let i of zapros){
    if(Object.keys(i).length != 0){
      zapros_main.push(i);
    }
  }

  forModal.push(forModal_1, forModal_2, forModal_3, forModal_4, forModal_5, forModal_6, forModal_7, forModal_8, forModal_9, forModal_10, forModal_11, forModal_12,
                forModal_13, forModal_14, forModal_15, forModal_16, forModal_17, forModal_18, forModal_19, forModal_20, forModal_21, forModal_22, forModal_23);
    for(let i of forModal){
    if(Object.keys(i).length != 0){
      forModal_main.push(i);
    }
  }

  localStorage.setItem("zapros_main_value", JSON.stringify(zapros_main));
  console.log(localStorage.getItem("zapros_main_value"));

  console.log(zapros_main);
  console.log(forModal_main);

  pushSetsInModal(forModal_main);
}

function pushSetsInModal(arr){
  let tb_id = "tb_sets_model";
  for (let key in arr) {
    let set = arr[key];
    let name = set.name;
    let count = set.count;
    addRowInModal(name, count, tb_id);
  }
}

function addRowInModal(name, count, tb_id){
  let tableRef = document.getElementById(tb_id);
  let newRow = tableRef.insertRow(-1);

  let cellName = newRow.insertCell(0);
  let cellCount = newRow.insertCell(1);

  let cellNametext = document.createTextNode(name);
  cellName.appendChild(cellNametext);
  let cellCounttext = document.createTextNode(count);
  cellCount.appendChild(cellCounttext);
}