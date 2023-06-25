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
            const wifimodText = findOne(Q, ".wi-fi_mode").value;
            const ssidText = findOne(Q, ".ssid").value;
            const ssidmacText = findOne(Q, ".ssid_mac").value;
            const passwordText = findOne(Q, ".password").value;
            const hiddenText = findOne(Q, ".hidden").value;
            const channelText = findOne(Q, ".channel").value;
            const maxconnectionText = findOne(Q, ".maxconnection").value;           
            const modeText = findOne(Q, ".mode").value;
            const ipText = findOne(Q, ".ip").value;
            const maskText = findOne(Q, ".mask").value;
            const gatewayText = findOne(Q, ".gateway").value;
            const enableText = findOne(Q, ".enable").value;
            const startipText = findOne(Q, ".startip").value;
            const endipText = findOne(Q, ".endip").value;            
            const dnsText = [];
            findAll(Q, '.dns').forEach(text => dnsText.push(text.value))
            const modeethText = findOne(Q, ".mode_eth").value;
            const ipethText = findOne(Q, ".ip_eth").value;
            const maskethText = findOne(Q, ".mask_eth").value;
            const gatewayethText = findOne(Q, ".gateway_eth").value;
            const enableethText = findOne(Q, ".enable_eth").value;
            const startipethText = findOne(Q, ".startip_eth").value;
            const endipethText = findOne(Q, ".endip_eth").value;
            const dnsethText = [];
            findAll(Q, '.dns_eth').forEach(text => dnsethText.push(text.value))
            //const wifimodstaText = findOne(Q, ".wi-fi_mode_sta").value;
            //const ssidstaText = findOne(Q, ".ssid_sta").value;
            //const modestaText = findOne(Q, ".mode_sta").value;
            //const ipstaText = findOne(Q, ".ip_sta").value;
            //const maskstaText = findOne(Q, ".mask_sta").value;
            //const gatewaystaText = findOne(Q, ".gateway_sta").value;
            //const enablestaText = findOne(Q, ".enable_sta").value;
            //const startipstaText = findOne(Q, ".startip_sta").value;
            //const endipstaText = findOne(Q, ".endip_sta").value;

            let obj = {
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
            
          //TODO: GLEBOV:START
          var filePath = PATH_FOR_UPLOAD + "network.json";
          var file = new File([JSON.stringify(obj)], "network.json", {
            type: "text/plain",
          });

          console.table(JSON.stringify(obj));

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

          // создаем файл
          const data = new Blob([JSON.stringify(obj, null, 4)], {
            type: "application/json"
          });
          //TODO: GLEBOV:END
        };