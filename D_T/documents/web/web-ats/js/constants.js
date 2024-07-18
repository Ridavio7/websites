var JSON_ON_DEVICE = "device.json";
var PATH_FOR_UPLOAD = "/api/upload.api/"

var UPLOAD_JSON_FILENAME = "upload.json";


var confirmUploadMsg	=   "<p>";
    confirmUploadMsg	+=  "<h1>Внимание!</h1><br>";
    confirmUploadMsg	+=  "Из <b>текстового поля</b> будет сформировать файл и отправлен на устройство!<br>"; 
    confirmUploadMsg	+=  "При загрузке новых параметров устройство может стать недоступным.<br><br>";
    confirmUploadMsg	+=  "<b>Вы уверены, что хотите загрузить данный JSON?</b>";
    confirmUploadMsg	+=  "</p>";
    confirmUploadMsg	+=  "<span style='cursor:pointer; display:inline-block;margin: 5px;' class='greenBtnNB' onclick='hideModal();confirmUpload(true);'>Уверен</span>";
    confirmUploadMsg	+=  "<span style='cursor:pointer; display:inline-block;margin: 5px;' class='redBtnNB' onclick='hideModal();confirmUpload(false)'>Закрыть</span>";


var confirmUploadErr	=	"<p><h1>Ошибка в JSON</h1><br>";
    confirmUploadErr    +=  "В структуре JSON была обнаружена ошибка.<br><br>";
    confirmUploadErr    +=  "<b>Файл <u>всё равно будет загружен</u> на устройство!</b></p>";
    confirmUploadErr    +=  "<span style='cursor:pointer; display:inline-block;margin: 5px;' class='redBtnNB' onclick='hideModal();'>Я понял, битый JSON загружен!</span>";



var NotAJSON 			=	"<p><h1>ОШИБКА</h1><br>";
    NotAJSON            +=  "Полученный файл не является JSON-массивом или допущена ошибка в структуре JSON.</p>";
    NotAJSON            +=  "<span style='cursor:pointer; display:inline-block;margin: 5px;' class='redBtnNB' onclick='hideModal()'>Ясно</span>";


var wrongJSON 			=	"<p><h1>JSON СТРУКТУРА НАРУШЕНА</h1><br>";
    wrongJSON           +=  "Допущена ошибка в структуре JSON.</p>";
    wrongJSON           +=  "<span style='cursor:pointer; display:inline-block;margin: 5px;' class='redBtnNB' onclick='hideModal()'>Ясно</span>";

var JSONisOK 			=	"<p><h1>ВСЁ В ПОРЯДКЕ</h1><br>"
    JSONisOK            +=  "Структура JSON идеальна! Но это не точно.</p>";
    JSONisOK            +=  "<span style='cursor:pointer; display:inline-block;margin: 5px;' class='greenBtnNB' onclick='hideModal()'>ОК</span>";

var NoFile  			=	"<p><h1>Загрузите файл</h1><br>";
    NoFile              +=  "Нажмите синию кнопку \"Выберите файл\" и укажите файл с JSON-массивом.</p>";
    NoFile              +=   "<span style='cursor:pointer; display:inline-block;margin: 5px;' class='redBtnNB' onclick='hideModal()'>Ясно</span>";

var FilePathNoSet  		=	"<p><h1>Ошибка пути</h1><br>";
    FilePathNoSet       +=  "Путь к файлу на сервере не задан.</p>";
    FilePathNoSet       +=  "<span style='cursor:pointer; display:inline-block;margin: 5px;' class='redBtnNB' onclick='hideModal()'>Ясно</span>";

var FilePathSpErr  		=	"<p><h1>Ошибка! Удалите пробелы</h1><br>";
    FilePathSpErr       +=  "Путь к файлу не должен содержать пробелы!</p>";
    FilePathSpErr       +=  "<span style='cursor:pointer; display:inline-block;margin: 5px;' class='redBtnNB' onclick='hideModal()'>Ясно</span>";

var FilePathFNErr  		=	"<p><h1>Ошибка в имени файла</h1><br>";
FilePathFNErr           +=  "Имя файла не указано после значения пути!</p>";
FilePathFNErr           +=  "<span style='cursor:pointer; display:inline-block;margin: 5px;' class='redBtnNB' onclick='hideModal()'>Ясно</span>";

var FileOversize  		=	"<p><h1>Ошибка!</h1><br>";
    FileOversize        +=  "Файл должен быть менее 200КБ!</p>";
    FileOversize        +=  "<span style='cursor:pointer; display:inline-block;margin: 5px;' class='redBtnNB' onclick='hideModal()'>Ясно</span>";

var ServerDiconn  		=	"<p><h1>СЕРВЕР ПРЕРВАЛ СОЕДИНЕНИЕ!</h1><br>";
ServerDiconn            +=  "Сервер неожиданно прервал соединение!<br>";
ServerDiconn            +=  "Страница будет перезагружена!</p>";
ServerDiconn            +=  "<span style='cursor:pointer; display:inline-block;margin: 5px;' class='redBtnNB' onclick='hideModal()'>Ясно</span>";

var CloseBtn			=	"<span style='cursor:pointer; display:inline-block;margin: 5px;' class='redBtnNB' onclick='hideModal()'>Ясно</span>";