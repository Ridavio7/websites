const url = "https://apitw.avantguard.pro:32100/json";

window.onload = function(){
  funcGetSets();
  funcGetProducts();
  funcGetComponents();
  funcGetColors();
  funcGetStatuses();
  funcGetFormulaSets();
  funcGetSNProd();
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

function addRowSixColums(name, SN, count, count_use, date, status, tb_id){
  let tableRef = document.getElementById(tb_id);
  let newRow = tableRef.insertRow(-1);

  let cellName = newRow.insertCell(0);
  let cellSN = newRow.insertCell(1);
  let cellCount = newRow.insertCell(2);
  let cellCountUse = newRow.insertCell(3);
  let cellDate = newRow.insertCell(4);
  let cellStatus = newRow.insertCell(5);

  let cellNametext = document.createTextNode(name);
  cellName.appendChild(cellNametext);
  let cellSNtext = document.createTextNode(SN);
  cellSN.appendChild(cellSNtext);
  let cellCounttext = document.createTextNode(count);
  cellCount.appendChild(cellCounttext);
  let cellCounUsettext = document.createTextNode(count_use);
  cellCountUse.appendChild(cellCounUsettext);
  let cellDatetext = document.createTextNode(date);
  cellDate.appendChild(cellDatetext);
  let cellStatustext = document.createTextNode(status);
  cellStatus.appendChild(cellStatustext);
}

function addRowThreeColums(set, product, count, tb_id){
  let tableRef = document.getElementById(tb_id);
  let newRow = tableRef.insertRow(-1);

  let cellSet = newRow.insertCell(0);
  let cellProduct = newRow.insertCell(1);
  let cellCount = newRow.insertCell(2);

  let cellSettext = document.createTextNode(set);
  cellSet.appendChild(cellSettext);
  let cellProducttext = document.createTextNode(product);
  cellProduct.appendChild(cellProducttext);
  let cellCounttext = document.createTextNode(count);
  cellCount.appendChild(cellCounttext);
};

function addRowTwoColums(name, other, tb_id){
  let tableRef = document.getElementById(tb_id);
  let newRow = tableRef.insertRow(-1);

  let cellName = newRow.insertCell(0);
  let cellOther = newRow.insertCell(1);

  let cellNametext = document.createTextNode(name);
  cellName.appendChild(cellNametext);
  other === "" ? other = "Отсутствует" : other = other;
  let cellOthertext = document.createTextNode(other);
  cellOther.appendChild(cellOthertext);
}

function addRowOneColum(name, tb_id){
  let tableRef = document.getElementById(tb_id);
  let newRow = tableRef.insertRow(-1);

  let cellName = newRow.insertCell(0);

  let cellNametext = document.createTextNode(name);
  cellName.appendChild(cellNametext);
}

/* комплекты */
function funcGetSets(){
  let body  =  {"user":"demo", "meth":"view", "obj":"sets", "count":"100" };
  funcCommand( body, funcProcessGetSets );
}

function funcProcessGetSets( result, respobj ){
  if( result === 0 ) return;
  console.log("Комплекты:", respobj);
  let tb_id = "tb_sets";
  for (let key in respobj.answ) {
    let set = respobj.answ[key];
    let name = set.name;
    let other = set.model_train;
    addRowTwoColums(name, other, tb_id);
  }
}

/* изделия */
function funcGetProducts(){
  let body  =  {"user":"demo", "meth":"view", "obj":"products", "count":"100" };
  funcCommand( body, funcProcessGetProducts );
}

function funcProcessGetProducts( result, respobj ){
  if( result === 0 ) return;
  console.log("Изделия:", respobj);
  let tb_id = "tb_products_main";
  for (let key in respobj.answ) {
    let set = respobj.answ[key];
    let name = set.name;
    let other = set.color;
    addRowTwoColums(name, other, tb_id);
  }
}

/* комплектующие */
function funcGetComponents(){
  let body  =  {"user":"demo", "meth":"view", "obj":"components", "count":"100" };
  funcCommand( body, funcProcessGetComponents );
}

function funcProcessGetComponents( result, respobj ){
  if( result === 0 ) return;
  console.log("Комплектующие:", respobj);
}

/* цвета */
function funcGetColors(){
  let body  =  {"user":"demo", "meth":"view", "obj":"colors", "count":"100" };
  funcCommand( body, funcProcessGetColors );
}

function funcProcessGetColors( result, respobj ){
  if( result === 0 ) return;
  console.log("Цвета:", respobj);

  let tb_id = "tb_products_colors";
  for (let key in respobj.answ) {
    let set = respobj.answ[key];
    let name = set.name;
    addRowOneColum(name, tb_id);
  }
}

/* статусы */
function funcGetStatuses(){
  let body  =  {"user":"demo", "meth":"view", "obj":"statuses", "count":"100" };
  funcCommand( body, funcProcessGetStatuses );
}

function funcProcessGetStatuses( result, respobj ){
  if( result === 0 ) return;
  console.log("Статусы:", respobj);
}

/* формулы */
function funcGetFormulaSets(){
  let body  =  {"user":"demo", "meth":"view", "obj":"formula_sets", "count":"100" };
  funcCommand( body, funcProcessGetFormulaSets );
}

function funcProcessGetFormulaSets( result, respobj ){
  if( result === 0 ) return;
  console.log("Формулы:", respobj);
  let tb_id = "tb_sets_formula";
  for (let key in respobj.answ) {
    let formula = respobj.answ[key];
    let set = formula.set;
    let product = formula.product;
    let count = formula.count;
    addRowThreeColums(set, product, count, tb_id);
  }
}

/* SN иделия */
function funcGetSNProd(){
  let body  =  {"user":"demo", "meth":"view", "obj":"snprod", "count":"100" };
  funcCommand( body, funcProcessGetSNProd );
}

function funcProcessGetSNProd( result, respobj ){
  if( result === 0 ) return;
  console.log("SNProd:", respobj);
  let tb_id = "tb_products_SNProd";
  for (let key in respobj.answ) {
    let formula = respobj.answ[key];
    let name = formula.name;
    let SN = formula.SN;
    let count = formula.count;
    let count_use = formula.count_use;
    let date = formula.date;
    let status = formula.status;
    addRowSixColums(name, SN, count, count_use, date, status, tb_id);
  }
}

/* sidebar */
const expand_btn = document.querySelector(".expand-btn");
let activeIndex;
expand_btn.addEventListener("click", () => {
  document.body.classList.toggle("collapsed");
});
const current = window.location.href;
const allLinks = document.querySelectorAll(".sidebar-links a");
allLinks.forEach((elem) => {
  elem.addEventListener("click", function () {
    const hrefLinkClick = elem.href;
    allLinks.forEach((link) => {
      if (link.href == hrefLinkClick) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  });
});
const searchInput = document.querySelector(".search__wrapper input");
searchInput.addEventListener("focus", (e) => {
  document.body.classList.remove("collapsed");
});

/* mian tabs */
function openTabMain(evt, tabName) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
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

/* child tabs */
function openTabChild(evt, tabName) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent_child");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks_child");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "flex";
  document.getElementById(tabName).style.flexDirection = "column";
  evt.currentTarget.className += " active";
}
document.getElementById("defaultOpenChild").click();

/* child tabs sets */
function openTabSets(evt, tabName) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent_sets");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks_sets");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
document.getElementById("defaultOpentabSets").click();

/* child tabs products */
function openTabProducts(evt, tabName) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent_products");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks_products");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
document.getElementById("defaultOpentabProducts").click();

/* child tabs components */
function openTabComponents(evt, tabName) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent_components");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks_components");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
document.getElementById("defaultOpentabcomponents").click();