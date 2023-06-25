var JSON_ON_DEVICE = "device.json";
var PATH_FOR_UPLOAD = "/api/upload.api/"

var UPLOAD_JSON_FILENAME = "upload.json";


var confirmUploadMsg	=   "<p>";
    confirmUploadMsg	+=  "<h1>Внимание!</h1><br>";
    confirmUploadMsg	+=  "Из <b>текстового поля</b> будет сформировать файл и отправлен на устройство!<br>"; 
    confirmUploadMsg	+=  "При загрузке новых параметров устройство может стать недоступным.<br><br>";
    confirmUploadMsg	+=  "<b>Вы уверены, что хотите загрузить данный JSON?</b>";
    confirmUploadMsg	+=  "</p>";
    confirmUploadMsg	+=  "<button style='cursor:pointer; display:inline-block;margin: 5px;' class='greenBtnNB' onclick='hideModal();confirmUpload(true);'>Уверен</button>";
    confirmUploadMsg	+=  "<button style='cursor:pointer; display:inline-block;margin: 5px;' class='redBtnNB' onclick='hideModal();confirmUpload(false)'>Закрыть</button>";


var confirmUploadErr	=	"<p><h1>Ошибка в JSON</h1><br>";
    confirmUploadErr    +=  "В структуре JSON была обнаружена ошибка.<br><br>";
    confirmUploadErr    +=  "<b>Файл <u>всё равно будет загружен</u> на устройство!</b></p>";
    confirmUploadErr    +=  "<button style='cursor:pointer; display:inline-block;margin: 5px;' class='redBtnNB' onclick='hideModal();'>Я понял, битый JSON загружен!</button>";



var NotAJSON 			=	"<p><h1>ОШИБКА</h1><br>";
    NotAJSON            +=  "Полученный файл не является JSON-массивом или допущена ошибка в структуре JSON.</p>";
    NotAJSON            +=  "<button style='cursor:pointer; display:inline-block;margin: 5px;' class='redBtnNB' onclick='hideModal()'>Ясно</button>";


var wrongJSON 			=	"<p><h1>JSON СТРУКТУРА НАРУШЕНА</h1><br>";
    wrongJSON           +=  "Допущена ошибка в структуре JSON.</p>";
    wrongJSON           +=  "<button style='cursor:pointer; display:inline-block;margin: 5px;' class='redBtnNB' onclick='hideModal()'>Ясно</button>";

var JSONisOK 			=	"<p><h1>ВСЁ В ПОРЯДКЕ</h1><br>"
    JSONisOK            +=  "Структура JSON идеальна! Но это не точно.</p>";
    JSONisOK            +=  "<button style='cursor:pointer; display:inline-block;margin: 5px;' class='greenBtnNB' onclick='hideModal()'>ОК</button>";

var NoFile  			=	"<p><h1>Загрузите файл</h1><br>";
    NoFile              +=  "Нажмите синию кнопку \"Выберите файл\" и укажите файл с JSON-массивом.</p>";
    NoFile              +=   "<button style='cursor:pointer; display:inline-block;margin: 5px;' class='redBtnNB' onclick='hideModal()'>Ясно</button>";

var FilePathNoSet  		=	"<p><h1>Ошибка пути</h1><br>";
    FilePathNoSet       +=  "Путь к файлу на сервере не задан.</p>";
    FilePathNoSet       +=  "<button style='cursor:pointer; display:inline-block;margin: 5px;' class='redBtnNB' onclick='hideModal()'>Ясно</button>";

var FilePathSpErr  		=	"<p><h1>Ошибка! Удалите пробелы</h1><br>";
    FilePathSpErr       +=  "Путь к файлу не должен содержать пробелы!</p>";
    FilePathSpErr       +=  "<button style='cursor:pointer; display:inline-block;margin: 5px;' class='redBtnNB' onclick='hideModal()'>Ясно</button>";

var FilePathFNErr  		=	"<p><h1>Ошибка в имени файла</h1><br>";
FilePathFNErr           +=  "Имя файла не указано после значения пути!</p>";
FilePathFNErr           +=  "<button style='cursor:pointer; display:inline-block;margin: 5px;' class='redBtnNB' onclick='hideModal()'>Ясно</button>";

var FileOversize  		=	"<p><h1>Ошибка!</h1><br>";
    FileOversize        +=  "Файл должен быть менее 200КБ!</p>";
    FileOversize        +=  "<button style='cursor:pointer; display:inline-block;margin: 5px;' class='redBtnNB' onclick='hideModal()'>Ясно</button>";

var ServerDiconn  		=	"<p><h1>СЕРВЕР ПРЕРВАЛ СОЕДИНЕНИЕ!</h1><br>";
ServerDiconn            +=  "Сервер неожиданно прервал соединение!<br>";
ServerDiconn            +=  "Страница будет перезагружена!</p>";
ServerDiconn            +=  "<button style='cursor:pointer; display:inline-block;margin: 5px;' class='redBtnNB' onclick='hideModal()'>Ясно</button>";

var CloseBtn			=	"<button style='cursor:pointer; display:inline-block;margin: 5px;' class='redBtnNB' onclick='hideModal()'>Ясно</button>";