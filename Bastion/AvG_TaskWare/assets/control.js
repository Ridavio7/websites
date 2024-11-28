const url = "https://apitw.avantguard.pro:32100/json";

window.onload = function(){
  returnTabs();
}

/* переключение темы */
function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
}

function toggleTheme() {
  if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-light');
  } else {
      setTheme('theme-dark');
  }
}

(function () {
  if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-dark');
      document.getElementById('slider').checked = false;
  } else {
      setTheme('theme-light');
    document.getElementById('slider').checked = true;
  }
})();

/* выпадающий список по стрелке */
let arrow_user = document.getElementsByClassName("arrow_user");
arrow_user[0].addEventListener("click", (e)=>{
  let arrowParent = e.target.parentElement.parentElement;
  arrowParent.classList.toggle("showMenu");
});

/* установка значений вкладок */
function returnTabs(){
  let tab_second = document.getElementsByClassName(/*localStorage.getItem("control_tab_second_active")*/"tablinks_users");
  tab_second[0].click();
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

//////////
/* пользователи */
function funcGetUsers(){
  let body  =  {"user":"demo", "meth":"view", "obj":"users", "count":"100"};
  funcCommand(body, funcProcessGetUsers);
}

function funcProcessGetUsers(result, respobj){
  if( result === 0 ) return;
  console.log("Пользователи:", respobj);

  let tb_id = "tb_users";
  clearTable(tb_id);

  let users_list = respobj.answ;
  localStorage.setItem("users_list", JSON.stringify(users_list));

  for (let key in respobj.answ){
    let obj = respobj.answ[key];
    let num = +key + 1;
    let name = obj.name;
    let del = obj.del;
    let uin = obj.uin;
    addUsersRow(num, name, del, uin, tb_id);
  }
}

function addUsersRow(num, name, del, uin, tb_id){
  let tableRef = document.getElementById(tb_id);
  let newRow = tableRef.insertRow(-1);

  let cellNum        = newRow.insertCell(0);
  let cellName       = newRow.insertCell(1);
  let cellPost       = newRow.insertCell(2);
  let cellAllRights  = newRow.insertCell(3);
  let cellShipRights = newRow.insertCell(4);
  let cellEditRights = newRow.insertCell(5);
  let cellBtn        = newRow.insertCell(6);

  cellNum.innerHTML        = num;
  cellPost.innerHTML       = "---";
  cellAllRights.innerHTML  = `<input type="checkbox" class="custom-checkbox" id="user_all_rights" value="" name=""><label for="user_all_rights"></label>`;
  cellShipRights.innerHTML = `<input type="checkbox" class="custom-checkbox" id="user_ship_rights" value="" name=""><label for="user_ship_rights"></label>`;
  cellEditRights.innerHTML = `<input type="checkbox" class="custom-checkbox" id="user_edit_rights" value="" name=""><label for="user_edit_rights"></label>`;
  cellName.innerHTML       = `<input type="text" value="${name}" name="${name}">`;

  let bx_color;
  del === 0 ? bx_color = "inherit" : bx_color = "red"; cellBtn.classList = "cell_button";
  cellBtn.innerHTML = `<button class="button_control" onclick="funcUpdateRowUsers(${uin},'${name}',this)"><img src="../images/button/chb/checkbox.svg"></button>&nbsp;&nbsp;&nbsp;<button class="button_control" style="background:${bx_color}" onclick="funcMdelRowUsers(${uin},this)"><img src="../images/button/cross_w.svg"></button>`;
}

/* функция удаления статуса */
function funcMdelRowUsers(uin, elem){
  let body  =  {"user":"demo", "meth":"mdel", "obj":"users", "uin":`${uin}`};

  if(elem.style.background === "red"){
    elem.style.background = "inherit";
  } else {
    elem.style.background = "red"
  }

  funcCommand(body, funcProcessOnlyInfo);
}

/* функция обновления статуса */
function funcUpdateRowUsers(uin, name, elem){
  let body  =  {"user":"demo", "meth":"update", "obj":"users", "name":"", "uin":`${uin}`};

  let target_table = tb_users;
  body.name = findForUpdateInput(name, target_table);

  funcCommand(body, funcProcessOnlyInfo);
  highlight(elem);
  setTimeout(function(){funcGetUsers()}, 100);
}

/* функция добавления статуса */
function funcAddRowUsers(){
  let body  =  {"user":"demo", "meth":"add", "obj":"users", "name":""};

  let name_value = document.getElementById("input_add_user_name").value

  if(name_value === ""){
    alert("Вы не заполнили все поля!");
  } else {
    body.name = name_value;

    document.getElementById("input_add_user_name").value = "";

    funcCommand(body, funcProcessOnlyInfo);
    setTimeout(function(){funcGetUsers()}, 100);
  }
}

listenSortSelect("sort_users", "tb_users", "users", funcProcessGetUsers);

////////// ОБЩИЕ ФУНКЦИИ //////////
function funcProcessOnlyInfo(result, respobj){
  if( result === 0 ) return;
  console.log(respobj);
  if(respobj.succ === 0){alert("Произошла ошибка! Попробуйте снова!")};
}

/* очистка таблицы без первой строки*/
function clearTable(tb_id){
  let table = document.getElementById(tb_id);
  for(let i = 1; i < table.rows.length;){
    table.deleteRow(i);
  }
}

/* поиск input для обновления */
function findForUpdateInput(name, table){
  let inputs = table.getElementsByTagName("input");
  let input_value = [];
  for (let i = 0, len = inputs.length; i < len; i++) {
    if (inputs[i].name === name) {
      input_value.push(inputs[i]);
    }
  }
  let target_input = input_value[0].value;
  if(target_input === ""){
    target_input = " ";
  }

  return target_input;
}

/* изменение цвета кнопки обновления */
function highlight(obj){
  obj.style.background = "green";
  setTimeout(function(){
    obj.style.background = "inherit";
  }, 3000);
}

/* select сортировка */
function listenSortSelect(select, tb, obj, func){
  document.getElementById(select).addEventListener('change', function(){
    clearTable(tb);
  
    let option = this.selectedIndex;
    switch (option){
      case 0:
        let body0  =  {"user":"demo", "meth":"view", "obj":obj, "count":"500"};
        funcCommand(body0, func);
        break;
      case 1:
        let body1  =  {"user":"demo", "meth":"view", "obj":obj, "count":"500", "sort":"name"};
        funcCommand(body1, func);
        break;
      case 2:
        let body2  =  {"user":"demo", "meth":"view", "obj":obj, "count":"500", "asort":"name"};
        funcCommand(body2, func);
        break;
      case 3:
        let body3  =  {"user":"demo", "meth":"view", "obj":obj, "count":"500", "sort":"uin"};
        funcCommand(body3, func);
        break;
      case 4:
        let body4  =  {"user":"demo", "meth":"view", "obj":obj, "count":"500", "asort":"uin"};
        funcCommand(body4, func);
        break;
      case 5:
        let body5  =  {"user":"demo", "meth":"view", "obj":obj, "count":"500", "sort":"uinset"};
        funcCommand(body5, func);
        break;
      case 6:
        let body6  =  {"user":"demo", "meth":"view", "obj":obj, "count":"500", "asort":"uinset"};
        funcCommand(body6, func);
        break;
      case 7: 
        let body7  =  {"user":"demo", "meth":"view", "obj":obj, "count":"500", "sort":"datechange"};
        funcCommand(body7, func);
        break;
      case 8:
        let body8  =  {"user":"demo", "meth":"view", "obj":obj, "count":"500", "asort":"datechange"};
        funcCommand(body8, func);
        break;
    }
  });
}

/* sidebar */
const expand_btn = document.querySelector(".expand-btn");
let activeIndex;
expand_btn.addEventListener("click", () => {
  document.body.classList.toggle("collapsed");
});

/* sidebar tabs */
function openTabSidebar(evt, tabName) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("sidebar_tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("sidebar_tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "flex";
  document.getElementById(tabName).style.flexDirection = "column";
  evt.currentTarget.className += " active";
}
document.getElementById("defaultOpenSidebar").click();

/* 2 вкладка */
function openTabSecond(evt, first_class, second_class, func) {
  setTimeout(function(){func}, 10);
  let tablinks_1 = document.getElementsByClassName(first_class);
  let tablinks_2 = document.getElementsByClassName(second_class);

  for (let i = 0; i < tablinks_1.length; i++) {
    tablinks_1[i].className = tablinks_1[i].className.replace(" active", "");
  }
  for (let i = 0; i < tablinks_2.length; i++) {
    tablinks_2[i].className += " active";
  }

  localStorage.setItem("control_tab_second_active", second_class);
}

function handleLeaveSite(){
  let result = confirm("Вы уверены, что хотите выйти?");
  if(result === true){
    window.location = 'https://dev.proektit.ru';
  }
}