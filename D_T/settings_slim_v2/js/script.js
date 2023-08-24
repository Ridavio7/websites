  window.addEventListener('DOMContentLoaded', function() {
    var select = document.querySelector('#mode'),
        hide = document.querySelectorAll('.wi-fi_settings');
        function change()
        {
            [].forEach.call(hide, function(el) {
                var add = el.classList.contains(select.value) ? "add" : "remove"
                el.classList[add]('show');
            });
        }
        select.addEventListener('change', change);
        change()
    });

  window.addEventListener('DOMContentLoaded', function() {
    var select = document.querySelector('#routing'),
        hide = document.querySelectorAll('.routing');
        function change()
        {
            [].forEach.call(hide, function(el) {
                var add = el.classList.contains(select.value) ? "add" : "remove"
                el.classList[add]('show');
            });
        }
        select.addEventListener('change', change);
        change()
    });

    window.addEventListener('DOMContentLoaded', function() {
      var select = document.querySelector('#routing_eth'),
          hide = document.querySelectorAll('.routing_eth');
          function change()
          {
              [].forEach.call(hide, function(el) {
                  var add = el.classList.contains(select.value) ? "add" : "remove"
                  el.classList[add]('show');
              });
          }
          select.addEventListener('change', change);
          change()
    });
        
  // функция нахождения одного элемента с указанным селектором
  const findOne = (element, selector) => element.querySelector(selector)
  // функция нахождения всех элементов с указанным селектором
  const findAll = (element, selector) => element.querySelectorAll(selector)
  // функция добавления обработчика указанного события
  const addHandler = (element, event, callback) => element.addEventListener(event, callback)

  // Находим основной контейнер и контейнер для вопросов, а также отключаем отправку формы:
  const C = findOne(document.body, ".container");
  const Q = findOne(C, "#box");
  addHandler(Q, "submit", (ev) => ev.preventDefault());

  //Функция создания теста:
  addHandler(findOne(C, "#create-json-btn"), "click", () => createTest());

  const createTest = () => {
    obj = {};

      const isEmpty = (...args) => {
        args.map((arg) => {
          arg = arg.replace(/\s+/g, "").trim();
          if (arg === "") {
            alert("Some field is empty!");
            throw new Error();
          }
        });
      };

      const wifimodText = findOne(Q, ".wi-fi_mode").value;
      const ssidText = findOne(Q, ".ssid").value;
      const ssidmacText = findOne(Q, ".ssid_mac").value;
      const passwordText = findOne(Q, ".password").value;
      const hiddenText = findOne(Q, ".hidden").value;
      const channelText = findOne(Q, ".channel").value;
      const maxconnectionText = findOne(Q, ".maxconnection").value;
      if(document.getElementById("routing").options.selectedIndex == 1){
        modeText = findOne(Q, ".mode_static").value; 
      } else if (document.getElementById("routing").options.selectedIndex == 2) {
        modeText = findOne(Q, ".mode_dynamic").value;
      };

      const ipText = findOne(Q, ".ip").value;
      const maskText = findOne(Q, ".mask").value;
      const gatewayText = findOne(Q, ".gateway").value;
      const enableText = findOne(Q, ".enable").value;
      const startipText = findOne(Q, ".startip").value;
      const endipText = findOne(Q, ".endip").value;            
      const dnsText = [];
      findAll(Q, '.dns').forEach(text => dnsText.push(text.value))

      if(document.getElementById("routing_eth").options.selectedIndex == 1){
        modeethText = findOne(Q, ".mode_static_eth").value; 
      } else if (document.getElementById("routing_eth").options.selectedIndex == 2) {
        modeethText = findOne(Q, ".mode_dynamic_eth").value;
      };
      const ipethText = findOne(Q, ".ip_eth").value;
      const maskethText = findOne(Q, ".mask_eth").value;
      const gatewayethText = findOne(Q, ".gateway_eth").value;
      const enableethText = findOne(Q, ".enable_eth").value;
      const startipethText = findOne(Q, ".startip_eth").value;
      const endipethText = findOne(Q, ".endip_eth").value;
      const dnsethText = [];
      findAll(Q, '.dns_eth').forEach(text => dnsethText.push(text.value))
      
      const wifimodstaText = findOne(Q, ".wi-fi_mode_sta").value;
      const ssidstaText = findOne(Q, ".ssid_sta").value;
      //const modestaText = "";
      //if(document.getElementById("routing_sta").options.selectedIndex == 1){
      //  modestaText = findOne(Q, ".mode_static_sta").value; 
      //} else if (document.getElementById("routing_sta").options.selectedIndex == 2) {
      //  modestaText = findOne(Q, ".mode_dynamic_sta").value;
      //};
      //const ipstaText = findOne(Q, ".ip_sta").value;
      //const maskstaText = findOne(Q, ".mask_sta").value;
      //const gatewaystaText = findOne(Q, ".gateway_sta").value;
      //const enablestaText = findOne(Q, ".enable_sta").value;
      //const startipstaText = findOne(Q, ".startip_sta").value;
      //const endipstaText = findOne(Q, ".endip_sta").value;
      //const dnsstaText = [];
      //findAll(Q, '.dns_sta').forEach(text => dnsstaText.push(text.value))

      isEmpty(wifimodText, wifimodstaText, modeText, modeethText)

      let objap = {
        wifi: {
            mode: wifimodText,
            wifi_auth: {
                ssid: ssidText,
                pass: passwordText,
                ssid_mac: ssidmacText},
            ip: {
                mode: modeText,
                ip: ipText,
                mask: maskText,
                gateway: gatewayText},
            dns: dnsText,
            hidden: hiddenText,
            channel: channelText,
            maxconnection: maxconnectionText,
            dhcps: {              
                enable: enableText,
                startip: startipText,
                endip: endipText}
        },
        ethernet: {
          ip: {
              mode: modeethText,
              ip: ipethText,
              mask: maskethText,
              gateway: gatewayethText},
          dns: dnsethText,
          dhcps: {              
            enable: enableethText,
            startip: startipethText,
            endip: endipethText}
        } 
      };

      let objsta = {
        wifi: {
            mode: wifimodstaText,
            wifi_auth: {
                ssid: ssidstaText,
                pass: passwordText,
                ssid_mac: ssidmacText},
            ip: {
                mode: modeText,
                ip: ipText,
                mask: maskText,
                gateway: gatewayText},
            dns: dnsText,
            hidden: hiddenText,
            channel: channelText,
            maxconnection: maxconnectionText,
            dhcps: {              
                enable: enableText,
                startip: startipText,
                endip: endipText}
        },
        ethernet: {
          ip: {
              mode: modeethText,
              ip: ipethText,
              mask: maskethText,
              gateway: gatewayethText},
          dns: dnsethText,
          dhcps: {              
            enable: enableethText,
            startip: startipethText,
            endip: endipethText}
        } 
      };

      if(document.getElementById("mode").options.selectedIndex == 1){
        obj = objap;
      } else if (document.getElementById("mode").options.selectedIndex == 2) {
        obj = objsta;
      };

    var filePath = PATH_FOR_UPLOAD + UPLOAD_JSON_FILENAME;
    var fileIn = new File([JSON.stringify(obj)], UPLOAD_JSON_FILENAME, {
      type: "text/plain",
    });

    if (fileIn.length == 0) {
      showModal(NoFile);
    } else if (filePath.length == 0) {
      showModal(FilePathNoSet);
    } else if (filePath.indexOf(' ') >= 0) {
      showModalRedBorder(FilePathSpErr);
    } else if (filePath[filePath.length-1] == '/') {
      showModalRedBorder(FilePathFNErr);
    } else if (fileIn.size > 200*1024) {
      showModalRedBorder(FileOversize);
    } else {
      var file = fileIn;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4) {
          if (xhttp.status == 200) {
            //console.log(xhttp.responseText);
          } else if (xhttp.status == 0) {
            showModalRedBorder(ServerDiconn);					
          } else {
            showModalRedBorder("<p>xhttp.status: "+xhttp.status+"</p>"+"<p><b>ERROR: </b>" + xhttp.responseText + "<br></p><br>" + CloseBtn);
          }
          
        };
      }
      xhttp.open("POST", filePath, true);
      xhttp.send(file);		
    }

    const data = new Blob([JSON.stringify(obj, null, 4)], {
      type: "application/json"
    });
  
    if (findOne(C, "a") !== null) {
      findOne(C, "a").remove();
    }
  
    const link = document.createElement("a");
    link.setAttribute("href", URL.createObjectURL(data));
    link.setAttribute("download", "network.json");
    link.className = "btn_save";
    link.textContent = "Скачать json файл";
    C.append(link);
    URL.revokeObjectURL(data);
  };