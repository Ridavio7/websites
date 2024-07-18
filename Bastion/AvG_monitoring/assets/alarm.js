const url = "https://api.avantguard.pro:9999/json";
const web_url = "https://dev.proektit.ru/AvG_monitoring/templates/alarm.html";
let   tid = 0, userId = 0, sat = 0, ts = 0,  line_chart_h = null, line_chart_m = null,
        data_line_h = [], labels_h = [], lines_h = [], data_line_m = [], labels_m = [],
        lines_m = [], count_obj = 0, HrefOper;
const tab_content_obj = `
<div class="tab_nav">
    <a class="tablinks" onclick="openTab(event, 'fast_info')">Опер. инфо</a>
    <a class="tablinks" onclick="openTab(event, 'zones')">Зоны</a>
    <a class="tablinks" onclick="openTab(event, 'users')">Пользователи</a>
    <a class="tablinks" onclick="openTab(event, 'sensors')">Датчики</a>
    <a class="tablinks" onclick="openTab(event, 'device')">Устройства</a>
    <a class="tablinks" onclick="openTab(event, 'schedule')">Расписание</a>
    <a class="tablinks" onclick="openTab(event, 'scheme')">Схема</a>
    <a class="tablinks" onclick="openTab(event, 'connect')">Связь</a>
    <a class="tablinks" onclick="openTab(event, 'services')">Услуги</a>
    <a class="tablinks" onclick="openTab(event, 'info')">Инфо</a>
</div>
<div class="fast_info tabcontent">
    <div class="block_inputs_fast_info">
        <div  class="input_line_double">
            <input type="text" class="obj_cid input_obj_text input_width_100" placeholder="CID объекта" readonly>
            <input type="text" class="obj_chop_name input_obj_text input_margin_l input_width_100" id="name_security" placeholder="Название ЧОП" readonly>
            <input type="text" class="obj_time_start input_obj_text input_margin_l input_width_100 " id="start_service" placeholder="Начало обслуживания" readonly>
        </div>
        <div class="input_line_text">
            <label class="lable_obj_text" for="name_obj">Название объекта</label>
            <textarea type="text" class="obj_name textarea_obj_text" cols="10" rows="1" readonly></textarea>
        </div>
        <div class="input_line_text">
            <label class="lable_obj_text" for="address_obj">Адрес объекта</label>
            <textarea type="text" class="obj_address textarea_obj_text" cols="10" rows="1" readonly></textarea>
        </div>
        <div class="input_line_double">
            <div class="input_line_text">
                <label class="lable_obj_text" for="phone">Номер телефона</label>
                <input type="text" class="obj_phone input_obj_text" id="phone" placeholder="Номер телефона" readonly>
            </div>
            <div class="input_line_text">
                <label class="lable_obj_text label_margin_l" for="responsible_person">Ответственное лицо</label>
                <input type="text" class="obj_main_person input_obj_text input_margin_l" id="responsible_person" placeholder="Ответственное лицо" readonly>
            </div>
        </div><!--
        <div class="search_list_info">
            <input type="datetime-local" class="input_obj_text">
            <a>-</a>
            <input type="datetime-local" class="input_obj_text">
        </div>-->
    </div>
    <div class="tb_obj_mes">
        <table class="table_obj_mes">
            <thead>
                <tr>
                    <td>Время</td>
                    <td>Сообщение</td>
                    <td class="td_main_num">0</td>
                    <td class="td_main_num">1</td>
                    <td class="td_main_num">2</td>
                    <td class="td_main_num">3</td>
                    <td class="td_main_num">4</td>
                    <td class="td_main_num">5</td>
                    <td class="td_main_num">6</td>
                </tr>
            </thead>
        </table>
    </div>
</div>
<div class="zones tabcontent">
    <div class="tabcontent_block_child">
        <div class="block_tb_list">
            <table class="table_zones">
                <tr>
                    <td></td>
                    <td>№</td>
                    <td>Зона</td>
                </tr>
            </table>
        </div>
        <div>
            <div class="tab_nav_child">
                <a class="tablinks tablinks_child" onclick="openTabChild(event, 'zone_descript')">Описание</a>
                <a class="tablinks tablinks_child" onclick="openTabChild(event, 'zone_message')">Сообщение</a>
                <a class="tablinks tablinks_child" onclick="openTabChild(event, 'zone_video')">Рассылка</a>
            </div>
            <div class="zone_descript tabcontent_child tabcontent_options">
                <div class="input_line_double">
                    <div class="input_line_text">
                        <label class="lable_obj_text" for="zone_descript_CID">CID</label>
                        <input type="text" class="input_obj_text input_width_short" id="zone_descript_CID" placeholder="CID" readonly>
                    </div>
                    <div class="input_line_text">
                        <label class="lable_obj_text label_margin_l" for="zone_descript_number">Номер</label>
                        <input type="text" class="input_obj_text input_width_short input_margin_l" id="zone_descript_number" placeholder="Номер" readonly>
                    </div>
                    <div class="input_line_text">
                        <label class="lable_obj_text label_margin_l" for="zone_descript_address">Адрес</label>
                        <input type="text" class="input_obj_text input_width_short input_margin_l" id="zone_descript_address" placeholder="Адрес" readonly>
                    </div>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="zone_descript_name">Название</label>
                    <input type="text" class="input_obj_text" id="zone_descript_name" placeholder="Название" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="select_type_zone">Тип зоны</label>
                    <div class="select_type">
                        <select name="select_type_zone" id="select_type_zone">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                        <div class="select_type_arrow"></div>
                    </div>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="zones_in_section">Зона входит в разделы</label>
                    <div class="container_child">
                        <div class="block_checkbox">
                            <input type="checkbox" id="zones_in_section" name="zones_in_section" class=""/>
                            <label class="lable_checkbox_text" for="zones_in_section">1 Раздел 1</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="zone_message tabcontent_child tabcontent_options">
                <div class="input_line_text">
                    <label class="lable_obj_text" for="select_type_zone">Тип зоны</label>
                    <div class="select_type">
                        <select name="select_type_zone" id="select_type_zone">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                        <div class="select_type_arrow"></div>
                    </div>
                </div>
                <div class="input_line_double">
                    <div class="input_line_text"  style="width: 196%;">
                        <label class="lable_obj_text" for="zone_message_violation">Сообщение при нарушении</label>
                        <input type="text" class="input_obj_text" id="zone_message_violation" placeholder="Сообщение при нарушении" readonly>
                    </div>
                    <div class="input_line_text">
                        <label class="lable_obj_text label_margin_l" for="zone_message_violation_CID">CID</label>
                        <input type="text" class="input_obj_text input_margin_l input_width_short" id="zone_message_violation_CID" placeholder="CID" readonly>
                    </div>
                </div>
                <div class="input_line_double">
                    <div class="input_line_text" style="width: 196%;">
                        <label class="lable_obj_text" for="zone_message_restore">Сообщение при восстановлении</label>
                        <input type="text" class="input_obj_text" id="zone_message_restore" placeholder="Сообщение при восстановлении" readonly>
                    </div>
                    <div class="input_line_text">
                        <label class="lable_obj_text label_margin_l" for="zone_message_restore_CID">CID</label>
                        <input type="text" class="input_obj_text input_margin_l input_width_short" id="zone_message_restore_CID" placeholder="CID" readonly>
                    </div>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="select_type_transformation">Преобразование</label>
                    <div class="select_type">
                        <select name="select_type_transformation" id="select_type_transformation">
                            <option>Включено</option>
                            <option>Выключено</option>
                        </select>
                        <div class="select_type_arrow"></div>
                    </div>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="zone_message_change_obj">Заменить на объект</label>
                    <input type="text" class="input_obj_text" id="zone_message_change_obj" placeholder="Заменить на объект" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="zone_message_change_zone_num">Заменить на номер зоны</label>
                    <input type="text" class="input_obj_text" id="zone_message_change_zone_num" placeholder="Заменить на номер зоны" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="zones_in_section">Зона входит в разделы</label>
                    <div class="container_child">
                        <div class="block_checkbox">
                            <input type="checkbox" id="zones_in_section" name="zones_in_section" class=""/>
                            <label class="lable_checkbox_text" for="zones_in_section">1 Раздел 1</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="zone_video tabcontent_child tabcontent_options">
                <div class="block_checkbox">
                    <input type="checkbox" id="user_mailing_active" name="user_mailing_active" class=""/>
                    <label class="lable_checkbox_text" for="user_mailing_active">Активен</label>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="user_mailing_address">Адрес</label>
                    <input type="text" class="input_obj_text" id="user_mailing_address" placeholder="Адрес" readonly>
                </div>
                <div class="block_checkbox">
                    <input type="checkbox" id="user_mailing_filter_section" name="user_mailing_filter_section" class=""/>
                    <label class="lable_checkbox_text" for="user_mailing_filter_section">Фильтр по разделам</label>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="users_in_section">Обработка сообщений</label>
                    <div class="container_child">
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Открытие/Закрытие</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Тревога/Восстановление</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Общие неисправности</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Прохождение теста</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Системные неисправности</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Информационное</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Инженерное</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Инженерное</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Отключение 220В</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Контроль связи</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="users tabcontent">
    <div class="tabcontent_block_child">
    <div class="block_tb_list">
        <table class="table_users">
            <tr>
                <td></td>
                <td>№</td>
                <td>Пользователь</td>
            </tr>
        </table>
    </div>
        <div>
            <div class="tab_nav_child">
                <a class="tablinks tablinks_child" onclick="openTabChild(event, 'user_descript')">Описание</a>
                <a class="tablinks tablinks_child" onclick="openTabChild(event, 'user_message')">Сообщение</a>
                <a class="tablinks tablinks_child" onclick="openTabChild(event, 'user_mailing')">Рассылка</a>
            </div>
            <div class="user_descript tabcontent_child tabcontent_options">
                <div class="input_line_double">
                    <div class="input_line_text">
                        <label class="lable_obj_text" for="user_descript_CID">CID</label>
                        <input type="text" class="input_obj_text" id="user_descript_CID" placeholder="CID" readonly>
                    </div>
                    <div class="input_line_text">
                        <label class="lable_obj_text label_margin_l" for="user_descript_number">Номер</label>
                        <input type="text" class="input_obj_text input_margin_l" id="user_descript_number" placeholder="Номер" readonly>
                    </div>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="user_descript_name">ФОИ ответственного лица</label>
                    <input type="text" class="input_obj_text" id="user_descript_name" placeholder="ФОИ ответственного лица" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="user_descript_address">Место жительства (работы)</label>
                    <input type="text" class="input_obj_text" id="user_descript_address" placeholder="Место жительства (работы)" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="user_descript_phone">Номер телефона</label>
                    <input type="text" class="input_obj_text" id="user_descript_phone" placeholder="Номер телефона" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="zones_in_section">Доступные разделы</label>
                    <div class="container_child">
                        <div class="block_checkbox">
                            <input type="checkbox" id="zones_in_section" name="zones_in_section" class=""/>
                            <label class="lable_checkbox_text" for="zones_in_section">1 Раздел 1</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="user_message tabcontent_child tabcontent_options">
                <div class="input_line_text">
                    <label class="lable_obj_text" for="select_type_transformation">Преобразование</label>
                    <div class="select_type">
                        <select name="select_type_transformation" id="select_type_transformation">
                            <option>Включено</option>
                            <option>Выключено</option>
                        </select>
                        <div class="select_type_arrow"></div>
                    </div>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="user_message_change_obj">Заменить на объект</label>
                    <input type="text" class="input_obj_text" id="user_message_change_obj" placeholder="Заменить на объект" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="user_message_change_zone_num">Заменить на номер зоны</label>
                    <input type="text" class="input_obj_text" id="user_message_change_zone_num" placeholder="Заменить на номер зоны" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="users_in_section">Обработка сообщений</label>
                    <div class="container_child">
                        <div class="block_checkbox">
                            <label class="lable_obj_text" for="users_in_section">Тревога при открытии</label>
                        </div>
                        <div class="block_checkbox">
                            <label class="lable_obj_text" for="users_in_section">Оповещение при открытии</label>
                        </div>
                        <div class="block_checkbox">
                            <label class="lable_obj_text" for="users_in_section">Оповещение при закрытии</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="user_mailing tabcontent_child tabcontent_options">
                <div class="block_checkbox">
                    <input type="checkbox" id="user_mailing_active" name="user_mailing_active" class=""/>
                    <label class="lable_checkbox_text" for="user_mailing_active">Активен</label>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="user_mailing_address">Адрес</label>
                    <input type="text" class="input_obj_text" id="user_mailing_address" placeholder="Адрес" readonly>
                </div>
                <div class="block_checkbox">
                    <input type="checkbox" id="user_mailing_filter_section" name="user_mailing_filter_section" class=""/>
                    <label class="lable_checkbox_text" for="user_mailing_filter_section">Фильтр по разделам</label>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="users_in_section">Обработка сообщений</label>
                    <div class="container_child">
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Открытие/Закрытие</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Тревога/Восстановление</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Общие неисправности</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Прохождение теста</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Системные неисправности</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Информационное</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Инженерное</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Инженерное</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Отключение 220В</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Контроль связи</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="sensors tabcontent">
    <div class="tabcontent_block_child">
    <div class="block_tb_list">
        <table class="table_sensors">
            <tr>
                <td></td>
                <td>№</td>
                <td>Датчик</td>
                <td>Показания</td>
            </tr>
        </table>
    </div>
        <div>
            <div class="tab_nav_child">
                <a class="tablinks tablinks_child" onclick="openTabChild(event, 'sensors_descript')">Описание</a>
                <a class="tablinks tablinks_child" onclick="openTabChild(event, 'sensors_message')">Сообщение</a>
                <a class="tablinks tablinks_child" onclick="openTabChild(event, 'sensors_mailing')">Рассылка</a>
            </div>
            <div class="sensors_descript tabcontent_child tabcontent_options">
                <div class="input_line_double">
                    <div class="input_line_text">
                        <label class="lable_obj_text" for="sensors_descript_CID">CID</label>
                        <input type="text" class="input_obj_text" id="sensors_descript_CID" placeholder="CID" readonly>
                    </div>
                    <div class="input_line_text">
                        <label class="lable_obj_text label_margin_l" for="sensors_descript_number">Номер</label>
                        <input type="text" class="input_obj_text input_margin_l" id="sensors_descript_number" placeholder="Номер" readonly>
                    </div>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="sensors_descript_name">ФОИ ответственного лица</label>
                    <input type="text" class="input_obj_text" id="sensors_descript_name" placeholder="ФОИ ответственного лица" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="sensors_descript_address">Место жительства (работы)</label>
                    <input type="text" class="input_obj_text" id="sensors_descript_address" placeholder="Место жительства (работы)" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="sensors_descript_phone">Номер телефона</label>
                    <input type="text" class="input_obj_text" id="sensors_descript_phone" placeholder="Номер телефона" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="zones_in_section">Доступные разделы</label>
                    <div class="container_child">
                        <div class="block_checkbox">
                            <input type="checkbox" id="zones_in_section" name="zones_in_section" class=""/>
                            <label class="lable_checkbox_text" for="zones_in_section">1 Раздел 1</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sensors_message tabcontent_child tabcontent_options">
                <div class="input_line_text">
                    <label class="lable_obj_text" for="select_type_transformation">Преобразование</label>
                    <div class="select_type">
                        <select name="select_type_transformation" id="select_type_transformation">
                            <option>Включено</option>
                            <option>Выключено</option>
                        </select>
                        <div class="select_type_arrow"></div>
                    </div>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="sensors_message_change_obj">Заменить на объект</label>
                    <input type="text" class="input_obj_text" id="sensors_message_change_obj" placeholder="Заменить на объект" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="sensors_message_change_zone_num">Заменить на номер зоны</label>
                    <input type="text" class="input_obj_text" id="sensors_message_change_zone_num" placeholder="Заменить на номер зоны" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="sensors_in_section">Обработка сообщений</label>
                    <div class="container_child">
                        <div class="block_checkbox">
                            <label class="lable_obj_text" for="sensors_in_section">Тревога при открытии</label>
                        </div>
                        <div class="block_checkbox">
                            <label class="lable_obj_text" for="sensors_in_section">Оповещение при открытии</label>
                        </div>
                        <div class="block_checkbox">
                            <label class="lable_obj_text" for="sensors_in_section">Оповещение при закрытии</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sensors_mailing tabcontent_child tabcontent_options">
                <div class="block_checkbox">
                    <input type="checkbox" id="sensors_mailing_active" name="sensors_mailing_active" class=""/>
                    <label class="lable_checkbox_text" for="sensors_mailing_active">Активен</label>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="sensors_mailing_address">Адрес</label>
                    <input type="text" class="input_obj_text" id="sensors_mailing_address" placeholder="Адрес" readonly>
                </div>
                <div class="block_checkbox">
                    <input type="checkbox" id="sensors_mailing_filter_section" name="sensors_mailing_filter_section" class=""/>
                    <label class="lable_checkbox_text" for="sensors_mailing_filter_section">Фильтр по разделам</label>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="sensors_in_section">Обработка сообщений</label>
                    <div class="container_child">
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Открытие/Закрытие</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Тревога/Восстановление</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Общие неисправности</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Прохождение теста</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Системные неисправности</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Информационное</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Инженерное</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Инженерное</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Отключение 220В</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Контроль связи</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="device tabcontent">
    <div class="tabcontent_block_child">
    <div class="block_tb_list">
        <table class="table_device">
            <tr>
                <td></td>
                <td>№</td>
                <td>Устройство</td>
                <td>Описание</td>
            </tr>
        </table>
    </div>
        <div>
            <div class="tab_nav_child">
                <a class="tablinks tablinks_child" onclick="openTabChild(event, 'device_descript')">Описание</a>
                <a class="tablinks tablinks_child" onclick="openTabChild(event, 'device_message')">Сообщение</a>
                <a class="tablinks tablinks_child" onclick="openTabChild(event, 'device_mailing')">Рассылка</a>
            </div>
            <div class="device_descript tabcontent_child tabcontent_options">
                <div class="input_line_double">
                    <div class="input_line_text">
                        <label class="lable_obj_text" for="device_descript_CID">CID</label>
                        <input type="text" class="input_obj_text" id="device_descript_CID" placeholder="CID" readonly>
                    </div>
                    <div class="input_line_text">
                        <label class="lable_obj_text label_margin_l" for="device_descript_number">Номер</label>
                        <input type="text" class="input_obj_text input_margin_l" id="device_descript_number" placeholder="Номер" readonly>
                    </div>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="device_descript_name">ФОИ ответственного лица</label>
                    <input type="text" class="input_obj_text" id="device_descript_name" placeholder="ФОИ ответственного лица" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="device_descript_address">Место жительства (работы)</label>
                    <input type="text" class="input_obj_text" id="device_descript_address" placeholder="Место жительства (работы)" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="device_descript_phone">Номер телефона</label>
                    <input type="text" class="input_obj_text" id="device_descript_phone" placeholder="Номер телефона" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="zones_in_section">Доступные разделы</label>
                    <div class="container_child">
                        <div class="block_checkbox">
                            <input type="checkbox" id="zones_in_section" name="zones_in_section" class=""/>
                            <label class="lable_checkbox_text" for="zones_in_section">1 Раздел 1</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="device_message tabcontent_child tabcontent_options">
                <div class="input_line_text">
                    <label class="lable_obj_text" for="select_type_transformation">Преобразование</label>
                    <div class="select_type">
                        <select name="select_type_transformation" id="select_type_transformation">
                            <option>Включено</option>
                            <option>Выключено</option>
                        </select>
                        <div class="select_type_arrow"></div>
                    </div>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="device_message_change_obj">Заменить на объект</label>
                    <input type="text" class="input_obj_text" id="device_message_change_obj" placeholder="Заменить на объект" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="device_message_change_zone_num">Заменить на номер зоны</label>
                    <input type="text" class="input_obj_text" id="device_message_change_zone_num" placeholder="Заменить на номер зоны" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="device_in_section">Обработка сообщений</label>
                    <div class="container_child">
                        <div class="block_checkbox">
                            <label class="lable_obj_text" for="device_in_section">Тревога при открытии</label>
                        </div>
                        <div class="block_checkbox">
                            <label class="lable_obj_text" for="device_in_section">Оповещение при открытии</label>
                        </div>
                        <div class="block_checkbox">
                            <label class="lable_obj_text" for="device_in_section">Оповещение при закрытии</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="device_mailing tabcontent_child tabcontent_options">
                <div class="block_checkbox">
                    <input type="checkbox" id="device_mailing_active" name="device_mailing_active" class=""/>
                    <label class="lable_checkbox_text" for="device_mailing_active">Активен</label>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="device_mailing_address">Адрес</label>
                    <input type="text" class="input_obj_text" id="device_mailing_address" placeholder="Адрес" readonly>
                </div>
                <div class="block_checkbox">
                    <input type="checkbox" id="device_mailing_filter_section" name="device_mailing_filter_section" class=""/>
                    <label class="lable_checkbox_text" for="device_mailing_filter_section">Фильтр по разделам</label>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="device_in_section">Обработка сообщений</label>
                    <div class="container_child">
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Открытие/Закрытие</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Тревога/Восстановление</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Общие неисправности</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Прохождение теста</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Системные неисправности</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Информационное</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Инженерное</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Инженерное</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Отключение 220В</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Контроль связи</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="schedule tabcontent">
    <table class="tb_schedule">
        <tr class="tr_schedule">
            <td class="td_main">Понедельник</td>
            <td class="input_width_100"><input type="text" class="input_obj_text input_schedule" id="user_descript_CID" readonly></td>
        </tr>
        <tr class="tr_schedule">
            <td class="td_main">Вторник</td>
            <td class="input_width_100"><input type="text" class="input_obj_text input_schedule" id="user_descript_CID" readonly></td>
        </tr>
        <tr class="tr_schedule">
            <td class="td_main">Среда</td>
            <td class="input_width_100"><input type="text" class="input_obj_text input_schedule" id="user_descript_CID" readonly></td>
        </tr>
        <tr class="tr_schedule">
            <td class="td_main">Четверг</td>
            <td class="input_width_100"><input type="text" class="input_obj_text input_schedule" id="user_descript_CID" readonly></td>
        </tr>
        <tr class="tr_schedule">
            <td class="td_main">Пятница</td>
            <td class="input_width_100"><input type="text" class="input_obj_text input_schedule" id="user_descript_CID" readonly></td>
        </tr>
        <tr class="tr_schedule">
            <td class="td_main">Суббота</td>
            <td class="input_width_100"><input type="text" class="input_obj_text input_schedule" id="user_descript_CID" readonly></td>
        </tr>
        <tr class="tr_schedule">
            <td class="td_main">Воскресенье</td>
            <td class="input_width_100"><input type="text" class="input_obj_text input_schedule" id="user_descript_CID" readonly></td>
        </tr>
    </table>
</div>
<div class="scheme tabcontent">
    <div class="block_tab_scheme">
        <div class="tab_scheme">
            <button class="tablinks_scheme" onclick="openTabScheme(event, 'button_scheme_1')">Схема 1</button>
        </div>
        <div id="button_scheme_1" class="tabcontent_scheme">
            <div class="tab_scheme_child">
                <div class="input_line_text">
                    <label class="lable_obj_text" for="scheme_descript">Описание</label>
                    <input type="text" class="title_scheme_1 input_obj_text" placeholder="Описание" readonly>
                </div>
                <img src="" class="img_scheme_1 img_scheme">
            </div>
        </div>
    </div>
</div>
<div class="connect tabcontent">
    <div class="block_tab_connect">
        <div class="tab_connect">
            <button class="tablinks_connect" onclick="openTabConnect(event, 'connect_1')">Контроль</button>
            <div class="block_connect_button">
                <input type="checkbox" id="connect_controll_message" name="connect_controll_message" class=""/>
                <img class="lt_icon" src="../images/online.svg" alt="">
                <button class="tablinks_connect" onclick="openTabConnect(event, 'connect_2')">GSM Data</button>
            </div>
            <div class="block_connect_button">
                <input type="checkbox" id="connect_controll_message" name="connect_controll_message" class=""/>
                <img class="lt_icon" src="../images/online.svg" alt="">
                <button class="tablinks_connect" onclick="openTabConnect(event, 'connect_3')">GSM GPRS</button>
            </div>
        </div>
        <div id="connect_1" class="tabcontent_connect">
            <div class="input_line_text">
                <label class="lable_obj_text" for="select_type_zone">Тип контроля связи</label>
                <div class="select_type">
                    <select name="select_type_zone" id="select_type_zone">
                        <option>Периодический</option>
                        <option>Не периодический</option>
                    </select>
                    <div class="select_type_arrow"></div>
                </div>
            </div>
            <div class="input_line_text">
                <label class="lable_obj_text" for="connect_test">Тестовый интервал</label>
                <input type="text" class="input_obj_text" id="connect_test" placeholder="Тестовый интервал" readonly>
            </div>
            <div class="input_line_double">
                <div class="input_line_text"  style="width: 300%;">
                    <label class="lable_obj_text" for="connect_type">Тип контроля связи</label>
                    <input type="text" class="input_obj_text" id="connect_type" placeholder="Тип контроля связи" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text label_margin_l" for="connect_type_through">Через</label>
                    <input type="text" class="input_obj_text input_margin_l input_width_short" id="connect_type_through" placeholder="Через" readonly>
                </div>
            </div>
            <div class="input_line_double">
                <div class="input_line_text" style="width: 300%;">
                    <label class="lable_obj_text" for="connect_mode">Режим формирования</label>
                    <input type="text" class="input_obj_text" id="connect_mode" placeholder="Режим формирования" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text label_margin_l" for="connect_mode_through">Через</label>
                    <input type="text" class="input_obj_text input_margin_l input_width_short" id="connect_mode_through" placeholder="Через" readonly>
                </div>
            </div>
            <div class="block_checkbox">
                <input type="checkbox" id="connect_controll_message" name="connect_controll_message" class=""/>
                <label class="lable_checkbox_text" for="connect_controll_message">Контроль максимального количества сообщений</label>
            </div>
            <div class="input_line_double">
                <div class="input_line_text">
                    <label class="lable_obj_text" for="connect_period_month">В месяц:</label>
                    <input type="text" class="input_obj_text input_connect_short" id="connect_period_month" placeholder="В месяц" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text label_margin_l" for="connect_period_day">В день:</label>
                    <input type="text" class="input_obj_text input_connect_short input_margin_l" id="connect_period_day" placeholder="В день" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text label_margin_l" for="connect_period_hours">За 4 часа:</label>
                    <input type="text" class="input_obj_text input_connect_short input_margin_l" id="connect_period_hours" placeholder="За 4 часа" readonly>
                </div>
            </div>
        </div>
        <div id="connect_2" class="tabcontent_connect">
            <div class="input_line_text">
                <label class="lable_obj_text" for="select_type_zone">Тип контроля связи</label>
                <div class="select_type">
                    <select name="select_type_zone" id="select_type_zone">
                        <option>Периодический</option>
                        <option>Не периодический</option>
                    </select>
                    <div class="select_type_arrow"></div>
                </div>
            </div>
            <div class="input_line_text">
                <label class="lable_obj_text" for="connect_test">Тестовый интервал</label>
                <input type="text" class="input_obj_text" id="connect_test" placeholder="Тестовый интервал" readonly>
            </div>
            <div class="input_line_double">
                <div class="input_line_text"  style="width: 300%;">
                    <label class="lable_obj_text" for="connect_type">Тип контроля связи</label>
                    <input type="text" class="input_obj_text" id="connect_type" placeholder="Тип контроля связи" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text label_margin_l" for="connect_type_through">Через</label>
                    <input type="text" class="input_obj_text input_margin_l input_width_short" id="connect_type_through" placeholder="Через" readonly>
                </div>
            </div>
            <div class="input_line_double">
                <div class="input_line_text" style="width: 300%;">
                    <label class="lable_obj_text" for="connect_mode">Режим формирования</label>
                    <input type="text" class="input_obj_text" id="connect_mode" placeholder="Режим формирования" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text label_margin_l" for="connect_mode_through">Через</label>
                    <input type="text" class="input_obj_text input_margin_l input_width_short" id="connect_mode_through" placeholder="Через" readonly>
                </div>
            </div>
            <div class="block_checkbox">
                <input type="checkbox" id="connect_controll_message" name="connect_controll_message" class=""/>
                <label class="lable_checkbox_text" for="connect_controll_message">Контроль максимального количества сообщений</label>
            </div>
            <div class="input_line_double">
                <div class="input_line_text">
                    <label class="lable_obj_text" for="connect_period_month">В месяц:</label>
                    <input type="text" class="input_obj_text input_connect_short" id="connect_period_month" placeholder="В месяц" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text label_margin_l" for="connect_period_day">В день:</label>
                    <input type="text" class="input_obj_text input_connect_short input_margin_l" id="connect_period_day" placeholder="В день" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text label_margin_l" for="connect_period_hours">За 4 часа:</label>
                    <input type="text" class="input_obj_text input_connect_short input_margin_l" id="connect_period_hours" placeholder="За 4 часа" readonly>
                </div>
            </div>
        </div>
        <div id="connect_3" class="tabcontent_connect">
            <div class="input_line_text">
                <label class="lable_obj_text" for="select_type_zone">Тип контроля связи</label>
                <div class="select_type">
                    <select name="select_type_zone" id="select_type_zone">
                        <option>Периодический</option>
                        <option>Не периодический</option>
                    </select>
                    <div class="select_type_arrow"></div>
                </div>
            </div>
            <div class="input_line_text">
                <label class="lable_obj_text" for="connect_test">Тестовый интервал</label>
                <input type="text" class="input_obj_text" id="connect_test" placeholder="Тестовый интервал" readonly>
            </div>
            <div class="input_line_double">
                <div class="input_line_text"  style="width: 300%;">
                    <label class="lable_obj_text" for="connect_type">Тип контроля связи</label>
                    <input type="text" class="input_obj_text" id="connect_type" placeholder="Тип контроля связи" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text label_margin_l" for="connect_type_through">Через</label>
                    <input type="text" class="input_obj_text input_margin_l input_width_short" id="connect_type_through" placeholder="Через" readonly>
                </div>
            </div>
            <div class="input_line_double">
                <div class="input_line_text" style="width: 300%;">
                    <label class="lable_obj_text" for="connect_mode">Режим формирования</label>
                    <input type="text" class="input_obj_text" id="connect_mode" placeholder="Режим формирования" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text label_margin_l" for="connect_mode_through">Через</label>
                    <input type="text" class="input_obj_text input_margin_l input_width_short" id="connect_mode_through" placeholder="Через" readonly>
                </div>
            </div>
            <div class="block_checkbox">
                <input type="checkbox" id="connect_controll_message" name="connect_controll_message" class=""/>
                <label class="lable_checkbox_text" for="connect_controll_message">Контроль максимального количества сообщений</label>
            </div>
            <div class="input_line_double">
                <div class="input_line_text">
                    <label class="lable_obj_text" for="connect_period_month">В месяц:</label>
                    <input type="text" class="input_obj_text input_connect_short" id="connect_period_month" placeholder="В месяц" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text label_margin_l" for="connect_period_day">В день:</label>
                    <input type="text" class="input_obj_text input_connect_short input_margin_l" id="connect_period_day" placeholder="В день" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text label_margin_l" for="connect_period_hours">За 4 часа:</label>
                    <input type="text" class="input_obj_text input_connect_short input_margin_l" id="connect_period_hours" placeholder="За 4 часа" readonly>
                </div>
            </div>
        </div>
    </div>
    <table class="tb_comm_list">
        <tbody>
            <tr>
                <td class="td_main"></td>
                <td class="td_main">Время</td>
                <td class="td_main">Дата</td>
                <td class="td_main">Сообщение</td>
            </tr>
        </tbody>
    </table>
</div>
<div class="services tabcontent">
    <div class="tabcontent_block_child">
    <div class="block_tb_list">
        <table class="table_services">
            <tr>
                <td>ФИО</td>
                <td>Адрес</td>
                <td>Тип</td>
            </tr>
        </table>
    </div>
        <div>
            <div class="tab_nav_child">
                <a class="tablinks tablinks_child" onclick="openTabChild(event, 'services_descript')">Описание</a>
                <a class="tablinks tablinks_child" onclick="openTabChild(event, 'services_message')">Сообщение</a>
                <a class="tablinks tablinks_child" onclick="openTabChild(event, 'services_mailing')">Рассылка</a>
            </div>
            <div class="services_descript tabcontent_child tabcontent_options">
                <div class="input_line_double">
                    <div class="input_line_text">
                        <label class="lable_obj_text" for="services_descript_CID">CID</label>
                        <input type="text" class="input_obj_text" id="services_descript_CID" placeholder="CID" readonly>
                    </div>
                    <div class="input_line_text">
                        <label class="lable_obj_text label_margin_l" for="services_descript_number">Номер</label>
                        <input type="text" class="input_obj_text input_margin_l" id="services_descript_number" placeholder="Номер" readonly>
                    </div>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="services_descript_name">ФОИ ответственного лица</label>
                    <input type="text" class="input_obj_text" id="services_descript_name" placeholder="ФОИ ответственного лица" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="services_descript_address">Место жительства (работы)</label>
                    <input type="text" class="input_obj_text" id="services_descript_address" placeholder="Место жительства (работы)" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="services_descript_phone">Номер телефона</label>
                    <input type="text" class="input_obj_text" id="services_descript_phone" placeholder="Номер телефона" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="zones_in_section">Доступные разделы</label>
                    <div class="container_child">
                        <div class="block_checkbox">
                            <input type="checkbox" id="zones_in_section" name="zones_in_section" class=""/>
                            <label class="lable_checkbox_text" for="zones_in_section">1 Раздел 1</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="services_message tabcontent_child tabcontent_options">
                <div class="input_line_text">
                    <label class="lable_obj_text" for="select_type_transformation">Преобразование</label>
                    <div class="select_type">
                        <select name="select_type_transformation" id="select_type_transformation">
                            <option>Включено</option>
                            <option>Выключено</option>
                        </select>
                        <div class="select_type_arrow"></div>
                    </div>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="services_message_change_obj">Заменить на объект</label>
                    <input type="text" class="input_obj_text" id="services_message_change_obj" placeholder="Заменить на объект" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="services_message_change_zone_num">Заменить на номер зоны</label>
                    <input type="text" class="input_obj_text" id="services_message_change_zone_num" placeholder="Заменить на номер зоны" readonly>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="м_in_section">Обработка сообщений</label>
                    <div class="container_child">
                        <div class="block_checkbox">
                            <label class="lable_obj_text" for="services_in_section">Тревога при открытии</label>
                        </div>
                        <div class="block_checkbox">
                            <label class="lable_obj_text" for="services_in_section">Оповещение при открытии</label>
                        </div>
                        <div class="block_checkbox">
                            <label class="lable_obj_text" for="services_in_section">Оповещение при закрытии</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="services_mailing tabcontent_child tabcontent_options">
                <div class="block_checkbox">
                    <input type="checkbox" id="services_mailing_active" name="services_mailing_active" class=""/>
                    <label class="lable_checkbox_text" for="services_mailing_active">Активен</label>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="services_mailing_address">Адрес</label>
                    <input type="text" class="input_obj_text" id="services_mailing_address" placeholder="Адрес" readonly>
                </div>
                <div class="block_checkbox">
                    <input type="checkbox" id="services_mailing_filter_section" name="services_mailing_filter_section" class=""/>
                    <label class="lable_checkbox_text" for="services_mailing_filter_section">Фильтр по разделам</label>
                </div>
                <div class="input_line_text">
                    <label class="lable_obj_text" for="services_in_section">Обработка сообщений</label>
                    <div class="container_child">
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Открытие/Закрытие</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Тревога/Восстановление</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Общие неисправности</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Прохождение теста</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Системные неисправности</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Информационное</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Инженерное</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Инженерное</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Отключение 220В</label>
                        </div>
                        <div class="block_checkbox">
                            <input type="checkbox" id="" name="" class=""/>
                            <label class="lable_checkbox_text" for="">Контроль связи</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="info tabcontent">
    <div  class="input_line_double">
        <input type="text" class="input_obj_text input_width_100" id="CID_obj" placeholder="CID объекта" readonly>
        <input type="text" class="input_obj_text input_margin_l input_width_100" id="name_security" placeholder="Название ЧОП" readonly>
        <input type="text" class="input_obj_text input_margin_l input_width_100 " id="start_service" placeholder="Начало обслуживания" readonly>
    </div>
    <div class="input_line_double">
        <div class="input_line_text">
            <label class="lable_obj_text" for="display_section">Отображаемый раздел</label>
            <input type="text" class="input_obj_text" id="display_section" placeholder="Отображаемый раздел" readonly>
        </div>
        <div class="input_line_text">
            <label class="lable_obj_text label_margin_l" for="all_sections">Разделов</label>
            <input type="text" class="input_obj_text input_margin_l" id="all_sections" placeholder="Разделов" readonly>
        </div>
    </div>
    <div class="input_line_text">
        <label class="lable_obj_text" for="name_obj">Название объекта</label>
        <textarea type="text" class="textarea_obj_text" id="address_obj" cols="10" rows="1" readonly></textarea>
    </div>
    <div class="input_line_text">
        <label class="lable_obj_text" for="address_obj">Адрес объекта</label>
        <textarea type="text" class="textarea_obj_text" id="address_obj" cols="10" rows="1" readonly></textarea>
    </div>
    <div class="input_line_double">
        <div class="input_line_text">
            <label class="lable_obj_text" for="phone">Номер телефона</label>
            <input type="text" class="input_obj_text" id="phone" placeholder="Номер телефона" readonly>
        </div>
        <div class="input_line_text">
            <label class="lable_obj_text label_margin_l" for="responsible_person">Ответственное лицо</label>
            <input type="text" class="input_obj_text input_margin_l" id="responsible_person" placeholder="Ответственное лицо" readonly>
        </div>
    </div>
    <div class="input_line_text">
        <label class="lable_obj_text" for="device">Выносное устройство</label>
        <input type="text" class="input_obj_text" id="device" placeholder="Выносное устройство" readonly>
    </div>
    <div class="input_line_text">
        <label class="lable_obj_text" for="security_obj">Охраняемая область</label>
        <textarea type="text" class="textarea_obj_text" id="address_obj" cols="10" rows="1" readonly></textarea>
    </div>
    <div class="input_line_text">
        <label class="lable_obj_text" for="description">Описание</label>
        <textarea type="text" class="textarea_obj_text" id="address_obj" cols="10" rows="1" readonly></textarea>
    </div>
    <div class="input_line_double">
        <div class="input_line_text">
            <label class="lable_obj_text" for="control_device">Приемно - контрольный прибор</label>
            <input type="text" class="input_obj_text" id="control_device" placeholder="Приемно - контрольный прибор" readonly>
        </div>
        <div class="input_line_text">
            <label class="lable_obj_text label_margin_l" for="installer">Установщик системы</label>
            <input type="text" class="input_obj_text input_margin_l" id="installer" placeholder="Установщик системы" readonly>
        </div>
    </div>
    <div class="input_line_text">
        <label class="lable_obj_text" for="fixed_obj">Объект закреплен</label>
        <input type="text" class="input_obj_text" id="fixed_obj" placeholder="Объект закреплен" readonly>
    </div>
</div>`;

window.onload = function(){
    sform_tid();
    funcGetMessage();
    setInterval(() => {funcGetMessage()}, 5000);
    funcGetObjectList();
    funcDashboards();
    //setInterval(() => {funcDashboards()}, 5000);
    setUserId();
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

function sform_tid(){
    let curr_dt = new Date();
    tid = curr_dt.getDate() + curr_dt.getMonth() + curr_dt.getFullYear() + curr_dt.getHours() + curr_dt.getMinutes() + curr_dt.getSeconds();
    ts = parseInt(((new Date().getTime() / 1000) + 10800).toFixed(0));
}

function setUserId(){
    let user_id = document.getElementById("user_id");
    user_id.innerHTML = localStorage.getItem("idlogin");
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

function addRow(CID, Name, Address, Status){
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
        "<i class='fas fa-exclamation-triangle' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top' title='Неисправность'></i>"+
        "<i class='fas fa-battery-three-quarters' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top' title='Питание'></i>"+
        "<i class='fas fa-wifi' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top' title='Связь'></i>"+
        "<i class='fas fa-ghost' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top' title='Сигнализация'></i>"+
        "<i class='fas fa-fire-alt' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top' title='Пожар'></i>"+
        "<i class='fas fa-skull-crossbones' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top' title='Тревожная кнопка'></i>";

        // неисправности
        query = "9";
        filteredItems = Status.filter(item => `${item.i}`.includes(query));
        cellStatus.childNodes[0].style.color = filteredItems[0].c;
        // питание
        query = "7";
        filteredItems = Status.filter(item => `${item.i}`.includes(query));
        cellStatus.childNodes[1].style.color = filteredItems[0].c;
        //связь
        query = "8";
        filteredItems = Status.filter(item => `${item.i}`.includes(query));
        if(filteredItems[0] !== undefined){
            cellStatus.childNodes[2].style.color = filteredItems[0].c;
        } else if(filteredItems[0] === undefined) {
            cellStatus.childNodes[2].style.color = "#b3b3b3";
        }
        // датчик сигнала
        query = "Датчики сигн. в норме";
        filteredItems = Status.filter(item => `${item.t}`.includes(query));
        if(filteredItems[0] !== undefined){
            cellStatus.childNodes[3].style.color = filteredItems[0].c;
        } else if(filteredItems[0] === undefined) {
            query = "Пожар";
            filteredItems = Status.filter(item => `${item.t}`.includes(query));
            cellStatus.childNodes[3].style.color = filteredItems[0].c;
        }
        // датчик пожара
        query = "3";
        filteredItems = Status.filter(item => `${item.i}`.includes(query));
        cellStatus.childNodes[4].style.color = filteredItems[0].c;
        // тревожная кнопка
        query = "4";
        filteredItems = Status.filter(item => `${item.i}`.includes(query));
        cellStatus.childNodes[5].style.color = filteredItems[0].c;
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
        "lengthMenu": [[12, 25, 50, -1], [12, 25, 50, "Все"]]
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
            } else {
                Status = Status.aState;
                query = "Присутствует неисправность";
                filteredItems = Status.filter(item => `${item.t}`.includes(query));
                if (filteredItems.length === 0){
                } else {
                    addRow(CID, Name, Address, Status);
                }
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
        /*for (let key in respobj.aData) {
            let list_obj = respobj.aData[key];
            let status_obj = list_obj.jState;
            if (status_obj === undefined){
            } else {
                status_obj = list_obj.jState.StGlbl;
                console.log(status_obj);
                query1 = "1";
                list_obj_StBurg = status_obj.filter(item => `${item.i}`.includes(query1));
                query2 = "3";
                list_obj_StFire = status_obj.filter(item => `${item.i}`.includes(query2));
                query3 = "4";
                list_obj_StPanic = status_obj.filter(item => `${item.i}`.includes(query3));

                let list = {};
                list = Object.assign(list, [list_obj_StBurg, list_obj_StFire, list_obj_StPanic]);
                for (let i in list) {
                    let list_data_obj = list[i];
                    console.log(list_data_obj);
                }
            }
        }*/

        for (let key in respobj.aData) {
            users_obj = respobj.aData[key];
            let CID = users_obj.sAcnt;
            let Name = users_obj.sName;
            let Address = users_obj.sAddr;
            let Status = users_obj.jState;
            if (Status === undefined){
            } else {
                Status = Status.aState;
                query = "Присутствует неисправность";
                filteredItems = Status.filter(item => `${item.t}`.includes(query));
                if (filteredItems.length === 0){
                } else {
                    addRow(CID, Name, Address, Status);
                }
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

function addRowListInfo(Name, Address, Type, tableRef){
    let newRow = tableRef.insertRow(-1);

    let cellName = newRow.insertCell(0);
    let cellAddress  = newRow.insertCell(1);
    let cellType = newRow.insertCell(2);

    let cellNametext = document.createTextNode(Name);
    cellName.appendChild(cellNametext);
    let cellAddresstext = document.createTextNode(Address);
    cellAddress.appendChild(cellAddresstext);

    if (Type === 0){
        cellType.innerHTML = "<i class='fas fa-question' style='color: #4e73df;' data-toggle='tooltip' data-placement='top'></i>";
    } else if (Type === 1){
        cellType.innerHTML = "<i class='fas fa-comment-sms' style='color: #4e73df;' data-toggle='tooltip' data-placement='top'></i>";
    } else if (Type === 2) {
        cellType.innerHTML = "<i class='fas fa-envelope' style='color: #4e73df;' data-toggle='tooltip' data-placement='top'></i>";
    } else if (Type === 3){
        cellType.innerHTML = "<i class='fas fa-paper-plane' style='color: #4e73df;' data-toggle='tooltip' data-placement='top'></i>";
    } else if (Type === 4){
        cellType.innerHTML = "<i class='fas fa-chrome' style='color: #4e73df;' data-toggle='tooltip' data-placement='top'></i>";
    } else if (Type === 5) {
        cellType.innerHTML = "<i class='fas fa-mobile-screen' style='color: #4e73df;' data-toggle='tooltip' data-placement='top'></i>";
    }

    cellName.style.whiteSpace = "unset";
}

function callbackGetNextObjectListInfo(err, respobj){
    if(err){
        //Error!
    } else {
        let Href = respobj.lsAcnt;
        let table_zones = document.getElementById("i" + Href);
        let tableRef = table_zones.getElementsByClassName("table_services");
        for (i in respobj) {
            list_obj = respobj.aData;
        }
        for (let j in list_obj){
            let data_obj = list_obj[j];
            name_s = data_obj.sFlNm;
            adr_s = data_obj.sRcpt;
            type_s = data_obj.tRcpt;
            addRowListInfo(name_s, adr_s, type_s, tableRef[0]);
        }
    }
}

function funcProcessGetObjectListInfo( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "61" ){
        console.log( "Запрос принят, услуг объекта нет" );
    } else if( respobj.pn == "63"){
        console.log(respobj);
        callbackGetNextObjectListInfo(respobj.sErr, respobj);
    } else {
        console.log( "Не определено: " + respobj.pn );
    }
}

function funcGetObjectListInfo(Href){
    let body = { "mt":113, "pn":60, "tid":"", "userId":"", "lat":"",  "lsAcnt":"", "nPg":"",  "nPgSz":"", "aui":"web" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.lsAcnt   = Href;
    body.nPg      = 1;
    body.nPgSz    = 5000;
    funcCommand( body, funcProcessGetObjectListInfo );
}

function funcProcessGetObjectDevice( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "71" ){
        console.log( "Запрос принят, устройств объекта нет" );
    } else if( respobj.pn == "73"){
        console.log(respobj);
        //callbackGetNextObjectDevice(respobj.sErr, respobj);
    } else {
        console.log( "Не определено: " + respobj.pn );
    }
}

function funcGetObjectDevice(Href){
    let body = { "mt":113, "pn":70, "tid":"", "userId":"", "lat":"",  "lsAcnt":"", "nPg":"",  "nPgSz":"", "aui":"web" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.lsAcnt   = Href;
    body.nPg      = 1;
    body.nPgSz    = 5000;
    funcCommand( body, funcProcessGetObjectDevice );
}

function addRowSensors(Num, Name, Value, Unit, tableRef){
    let newRow = tableRef.insertRow(-1);

    let cellIcon = newRow.insertCell(0);
    let cellNum  = newRow.insertCell(1);
    let cellName = newRow.insertCell(2);
    let cellValue = newRow.insertCell(3);

    if (Name.indexOf("Напряжение") >= 0 || Name.indexOf("Частота") >= 0){
        cellIcon.innerHTML = "<i class='fas fa-plug' style='color: #1cc88a;' data-toggle='tooltip' data-placement='top'></i>";
    } else if (Name.indexOf("Ветер") >= 0 || Name.indexOf("Направление ветра") >= 0 || Name.indexOf("Сила ветра") >= 0){
        cellIcon.innerHTML = "<i class='fas fa-stream' style='color: #1cc88a;' data-toggle='tooltip' data-placement='top'></i>";
    } else {
        cellIcon.innerHTML = "<i class='fas fa-thermometer' style='color: #4e73df;' data-toggle='tooltip' data-placement='top'></i>";
    }

    let cellNumtext = document.createTextNode(Num);
    cellNum.appendChild(cellNumtext);
    let cellNametext = document.createTextNode(Name);
    cellName.appendChild(cellNametext);
    let cellValuetext = document.createTextNode(Value + " " + Unit);
    cellValue.appendChild(cellValuetext);

    cellName.style.whiteSpace = "unset";
}

function callbackGetNextObjectSensors(err, respobj){
    if(err){
        //Error!
    } else {
        console.log("Датчики", respobj);
        let Href = respobj.lsAcnt;
        let table_zones = document.getElementById("i" + Href);
        let tableRef = table_zones.getElementsByClassName("table_sensors");
        for (i in respobj) {
            list_obj = respobj.aData;
        }
        for (let j in list_obj){
            let data_obj = list_obj[j];
            num_s = data_obj.nSensor;
            name_s = data_obj.sSensor;
            value_s = data_obj.nValue;
            unit_s = data_obj.sUnit;
            addRowSensors(num_s, name_s, value_s, unit_s, tableRef[0]);
        }
    }
}

function funcProcessGetObjectSensors( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "45" ){
        console.log( "Запрос принят, датчиков объекта нет" );
    } else if( respobj.pn == "47"){
        callbackGetNextObjectSensors(respobj.sErr, respobj);
    } else {
        console.log( "Не определено: " + respobj.pn );
    }
}

function funcGetObjectSensors(Href){
    let body = { "mt":113, "pn":46, "tid":"", "userId":"", "lat":"",  "lsAcnt":"", "nPg":"",  "nPgSz":"", "aui":"web" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.lsAcnt   = Href;
    body.nPg      = 1;
    body.nPgSz    = 5000;
    funcCommand( body, funcProcessGetObjectSensors );
}

function callbackGetObjectPictures(err, respobj){
    if(err){
        //Error!
    } else {
        if(respobj.nPicture === 1){
            console.log("Схемы:", respobj);
            let Href = respobj.lsAcnt;
            let table_zones = document.getElementById("i" + Href);
            let title_scheme = table_zones.getElementsByClassName("title_scheme_1");
            let img_scheme = table_zones.getElementsByClassName("img_scheme_1");
    
            img_title = respobj.sShTitle;
            img_data = respobj.zPicture;
    
            title_scheme[0].value = img_title;
            img_scheme[0].src = "data:image/png;base64," + img_data;
            
        } else if(respobj.nPicture === 2){
            console.log(respobj);
            let Href = respobj.lsAcnt;
            let table_zones = document.getElementById("i" + Href);
            let tab_scheme = table_zones.getElementsByClassName("tab_scheme");
            let block_tab_scheme = table_zones.getElementsByClassName("block_tab_scheme");
            tab_scheme[0].insertAdjacentHTML("beforeend", `<button class='tablinks_scheme' onclick='openTabScheme(event, "button_scheme_2")'>Схема 2</button>`);
            block_tab_scheme[0].insertAdjacentHTML("beforeend", `<div id="button_scheme_2" class="tabcontent_scheme">
                                                                    <div class="tab_scheme_child">
                                                                        <div class="input_line_text">
                                                                            <label class="lable_obj_text" for="scheme_descript">Описание</label>
                                                                            <input type="text" class="title_scheme_2 input_obj_text" placeholder="Описание" readonly>
                                                                        </div>
                                                                    </div>
                                                                    <img src="" class="img_scheme_2 img_scheme">
                                                                </div>`);

            let title_scheme = table_zones.getElementsByClassName("title_scheme_2");
            let img_scheme = table_zones.getElementsByClassName("img_scheme_2");

            img_title = respobj.sShTitle;
            img_data = respobj.zPicture;
    
            title_scheme[0].value = img_title;
            img_scheme[0].src = "data:image/png;base64," + img_data;
        }
    }
}

function funcProcessGetObjectPictures( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "35" ){
        console.log( "Запрос принят, схем объекта нет" );
    } else if( respobj.pn == "37"){
        callbackGetObjectPictures(respobj.sErr, respobj);
    } else {
        console.log( "Не определено: " + respobj.pn );
    }
}

function funcGetObjectPictures(Href, n){
    let body = { "mt":113, "pn":34, "tid":"", "userId":"", "lat":"",  "lsAcnt":"", "aui":"web", "nPicture":"" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.lsAcnt   = Href;
    body.nPicture = n;
    funcCommand( body, funcProcessGetObjectPictures );
}

function addRowUser(Num, Name, tableRef){
    let newRow = tableRef.insertRow(-1);

    let cellIcon = newRow.insertCell(0);
    let cellNum  = newRow.insertCell(1);
    let cellName = newRow.insertCell(2);

    cellIcon.innerHTML = "<i class='fas fa-user' style='color: #fff;' data-toggle='tooltip' data-placement='top'></i>";
    let cellNumtext = document.createTextNode(Num);
    cellNum.appendChild(cellNumtext);
    let cellNametext = document.createTextNode(Name);
    cellName.appendChild(cellNametext);
    cellName.style.whiteSpace = "unset";
}

function callbackGetNextObjectUsers(err, respobj){
    if(err){
        //Error!
    } else {
        console.log("Пользователи:", respobj);
        let Href = respobj.lsAcnt;
        let table_zones = document.getElementById("i" + Href);
        let tableRef = table_zones.getElementsByClassName("table_users");
        for (i in respobj) {
            list_obj = respobj.aData;
        }
        for (let j in list_obj){
            let data_obj = list_obj[j];
            num_z = data_obj.sShUser;
            name_z = data_obj.sUser;
            addRowUser(num_z, name_z, tableRef[0]);
        }
    }
}

function funcProcessGetObjectUsers( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "25" ){
        console.log( "Запрос принят, пользователей объекта нет" );
    } else if( respobj.pn == "27"){
        callbackGetNextObjectUsers(respobj.sErr, respobj);
    } else {
        console.log( "Не определено: " + respobj.pn );
    }
}

function funcGetObjectUsers(Href){
    let body = { "mt":113, "pn":24, "tid":"", "userId":"", "lat":"",  "lsAcnt":"", "nPg":"",  "nPgSz":"", "aui":"web" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.lsAcnt   = Href;
    body.nPg      = 1;
    body.nPgSz    = 5000;
    funcCommand( body, funcProcessGetObjectUsers );
}

function addRowZone(Num, Name, tableRef){
    let newRow = tableRef.insertRow(-1);

    let cellIcon = newRow.insertCell(0);
    let cellNum  = newRow.insertCell(1);
    let cellName = newRow.insertCell(2);

    cellIcon.innerHTML = "<i class='fas fa-shield-halved' style='color: #fff;' data-toggle='tooltip' data-placement='top'></i>";
    let cellNumtext = document.createTextNode(Num);
    cellNum.appendChild(cellNumtext);
    let cellNametext = document.createTextNode(Name);
    cellName.appendChild(cellNametext);
    cellName.style.whiteSpace = "unset";
}

function callbackGetObjectZones(err, respobj){
    if(err){
        //Error!
    } else {
        console.log("Зоны:", respobj);
        let Href = respobj.lsAcnt;
        let table_zones = document.getElementById("i" + Href);
        let tableRef = table_zones.getElementsByClassName("table_zones");
        for (i in respobj) {
            list_obj = respobj.aData;
        }
        for (let j in list_obj){
            let data_obj = list_obj[j];
            num_z = data_obj.sShZone;
            name_z = data_obj.sZone;
            addRowZone(num_z, name_z, tableRef[0]);
        }
    }
}

function funcProcessGetObjectZones( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "15" ){
        console.log( "Запрос принят, зон объекта нет" );
    } else if( respobj.pn == "17"){
        callbackGetObjectZones(respobj.sErr, respobj);
    } else {
        console.log( "Не определено: " + respobj.pn );
    }
}

function funcGetObjectZones(Href){
    let body = { "mt":113, "pn":14, "tid":"", "userId":"", "lat":"",  "lsAcnt":"", "nPg":"",  "nPgSz":"", "aui":"web" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.lsAcnt   = Href;
    body.nPg      = 1;
    body.nPgSz    = 5000;
    funcCommand( body, funcProcessGetObjectZones );
}

function callbackGetObjectOperInfo(err, respobj){
    if(err){
        //Error!
    } else {
        console.log("Инфо:", respobj)
        let table_zones = document.getElementById("i" + HrefOper);
        let obj_cid = table_zones.getElementsByClassName("obj_cid");
        let obj_name = table_zones.getElementsByClassName("obj_name");
        let obj_address = table_zones.getElementsByClassName("obj_address");

        CID = respobj.lsAcnt;
        Name = respobj.sName;
        Address = respobj.sAddr;

        obj_cid[0].value = CID;
        obj_name[0].innerHTML = Name;
        obj_address[0].innerHTML = Address;
    }
}

function funcProcessGetObjectOperInfo( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "1" ){
        console.log( respobj );
    } else if( respobj.pn == "3"){
        callbackGetObjectOperInfo(respobj.sErr, respobj)
    } else {
        console.log( "Не определено: " + respobj.pn );
    }
}

function funcGetObjectOperInfo(Href){
    let body = { "mt":113, "pn":0, "tid":"", "userId":"", "lat":"",  "lsAcnt":"", "aui":"web" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.lsAcnt   = Href;
    body.aui      = "web";

    funcCommand( body, funcProcessGetObjectOperInfo );
}

function addRowObjMes(date, mes, tableRef){
    let newRow = tableRef.insertRow(-1);

    let cellDate = newRow.insertCell(0);
    let cellMes  = newRow.insertCell(1);
    let cell0    = newRow.insertCell(2);
    let cell1    = newRow.insertCell(3);
    let cell2    = newRow.insertCell(4);
    let cell3    = newRow.insertCell(5);
    let cell4    = newRow.insertCell(6);
    let cell5    = newRow.insertCell(7);
    let cell6    = newRow.insertCell(8);

    let cellDatetext = document.createTextNode(date);
    cellDate.appendChild(cellDatetext);
    let cellMestext = document.createTextNode(mes);
    cellMes.appendChild(cellMestext);
    cell0.innerHTML = "<i class='fa fa-wifi' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top'></i>";
    cell1.innerHTML = "<i class='fa fa-phone' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top'></i>";
    cell2.innerHTML = "<i class='fa fa-satellite-dish' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top'></i>";
    cell3.innerHTML = "<i class='fa fa-broadcast-tower' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top'></i>";
    cell4.innerHTML = "<i class='fa fa-broadcast-tower' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top'></i>";
    cell5.innerHTML = "<i class='fa fa-ethernet' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top'></i>";
    cell6.innerHTML = "<i class='fa fa-laptop' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top'></i>";

    cell0.style.textAlign = "center";     cell0.style.verticalAlign = "middle";
    cell1.style.textAlign = "center";     cell1.style.verticalAlign = "middle";
    cell2.style.textAlign = "center";     cell2.style.verticalAlign = "middle";
    cell3.style.textAlign = "center";     cell3.style.verticalAlign = "middle";
    cell4.style.textAlign = "center";     cell4.style.verticalAlign = "middle";
    cell5.style.textAlign = "center";     cell5.style.verticalAlign = "middle";
    cell6.style.textAlign = "center";     cell6.style.verticalAlign = "middle";
}

function callbackGetObjectMessage(err, respobj){
    if(err){
        //Error!
    } else {
        console.log("События:", respobj);
        let Href = respobj.lsAcnt;
        let table_zones = document.getElementById("i" + Href);
        let tableRef = table_zones.getElementsByClassName("table_obj_mes");
        for (i in respobj) {
            list_obj = respobj.aData;
        }
        for (let j in list_obj){
            let data_obj = list_obj[j];
            mes = data_obj.Mes;
            date = data_obj.sMdt;
            date =  date[8] + date[9] + date[4] + date[5] + date[6] + date[7] + date[0] + date[1] + date[2] + date[3] + " " +
            date[11] + date[12] + date[13] + date[14] + date[15];
            addRowObjMes(date, mes, tableRef[0]);
        }
    }
}

function funcProcessGetObjectMessage( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "1" ){
        console.log( respobj );
    } else if( respobj.pn == "3"){
        callbackGetObjectMessage(respobj.sErr, respobj);
    } else {
        console.log( "Не определено: " + respobj.pn );
    }
}

function funcGetObjectMessage(Href){
    let body = { "mt":112, "pn":0, "tid":"", "userId":"", "lat":"",  "lsAcnt":"", "aui":"web", "nPg":"",  "nPgSz":"" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.lsAcnt   = Href;
    body.aui      = "web";
    body.nPg      = 1;
    body.nPgSz    = 5000;

    funcCommand( body, funcProcessGetObjectMessage );
}

function addRowMes(date, CID, mes, Href) {
    let tableRef = document.getElementById("boody_alarm_list");
    let newRow = tableRef.insertRow(-1);

    let cellDate = newRow.insertCell(0);
    let cellCID = newRow.insertCell(1);
    let cellMes = newRow.insertCell(2);

    let cellDatetext = document.createTextNode(date);
    cellDate.appendChild(cellDatetext);

    let tab_cross = document.createElement("span");
    tab_cross.addEventListener("click", function() {
        let tab_open = document.getElementById("i" + Href);
        tab_open.remove();
        this.parentElement.remove();
    }, false);
    tab_cross.insertAdjacentHTML('beforeend', `<img src="../images/cross.svg" alt="" class="tab_cross">`);

    let tab_obj = document.createElement("a");
    tab_obj.className = "tablinks_main";
    tab_obj.href = "#" + "i" + Href;
    tab_obj.append(CID);
    tab_obj.insertAdjacentElement('beforeend', tab_cross);

    let block_tab_connect = document.createElement("div");
    block_tab_connect.className = "tab-content";
    block_tab_connect.id = "i" + Href;
    block_tab_connect.insertAdjacentHTML('afterbegin', tab_content_obj);

    let cellCIDtext = document.createElement("a");
    cellCIDtext.innerHTML = CID;
    cellCIDtext.href = web_url + "#i" + Href;
    cellCID.appendChild(cellCIDtext);

    let cellMestext = document.createTextNode(mes);
    cellMes.appendChild(cellMestext);

    let css = "#i" + Href + ":" + "target~.tab_nav_main>" + "[href='#i" + Href + "']{background-color:#39414B;border: 1px solid #717171;border-bottom:none;padding:5px 15px}";
    let style = document.createElement('style');
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName('head')[0].appendChild(style);

    cellCIDtext.addEventListener('click', function () {
        let tab_objs_main = document.getElementById("tab_objs_main");
        let content_objs = document.getElementById("content_objs");
        content_objs.insertAdjacentElement('afterend', block_tab_connect);
        let tab_open = document.getElementById("i" + Href);
        let tab_next = document.getElementById("i" + Href).nextElementSibling;
        if(tab_open.id != tab_next.id){
            tab_objs_main.insertAdjacentElement('beforeend', tab_obj);
            HrefOper = Href;
            funcGetObjectOperInfo(Href);
            funcGetObjectMessage(Href);
            funcGetObjectZones(Href);
            funcGetObjectUsers(Href);
            funcGetObjectPictures(Href, 1);
            funcGetObjectPictures(Href, 2);
            funcGetObjectSensors(Href);
            funcGetObjectDevice(Href);
        }
    }, true);
}

function addRowsInTable(respobj){
    for (i in respobj) {
        list_obj = respobj.aData;
    }
    query = "Тревог";
    list_obj_alarm_main = list_obj.filter(item => `${item.Mes}`.includes(query));
    for (let i in list_obj_alarm_main) {
        let list_data_obj = list_obj_alarm_main[i];
        if (list_data_obj.length != 0){
                let data_obj = list_data_obj;
                date = data_obj.sMdt;
                CID = data_obj.sAcnt;
                mes = data_obj.Mes;
                Href = data_obj.lsAcnt;
                date =  date[8] + date[9] + date[4] + date[5] + date[6] + date[7] + date[2] + date[3] + " " +
                date[11] + date[12] + date[13] + date[14] + date[15];
                addRowMes(date, CID, mes, Href);
        }
    }
}

function callbackGetMessage(err, respobj){
    if(err){
        //Error!
    } else {
        let table = document.getElementById('tb_alarm_list');
        if (table.rows.length == 0) {
            addRowsInTable(respobj);
        } else {
            let newTbody = document.createElement('tbody');
            newTbody.id = "boody_alarm_list";
            table.replaceChild(newTbody, table.getElementsByTagName('tbody')[0]);
            addRowsInTable(respobj);
        }
    }
}

function funcProcessGetMessage( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "1" ){
        console.log( respobj );
    } else if( respobj.pn == "3"){
        callbackGetMessage(respobj.sErr, respobj);
    } else {
        console.log( "Не определено: " + respobj.pn );
    }
}

function funcGetMessage(){
    let body = { "mt":112, "pn":0, "tid":"", "userId":"", "lat":"", "aui":"web", "nPg":"",  "nPgSz":"" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.aui      = "web";
    body.nPg      = 1;
    body.nPgSz    = 1000;

    funcCommand( body, funcProcessGetMessage );
}

button_up.addEventListener('click', function() {
    block_alarm_list.scrollTo({ top: 0, behavior: 'smooth' });
});

button_down.addEventListener('click', function() {
    block_alarm_list.scrollTop = block_alarm_list.scrollHeight;
});

function openTabChild(evt, openTab){
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent_child");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks_child");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    openTab = document.getElementsByClassName(openTab);
    for(let i of openTab){
        i.style.display = "block";
    }
    evt.currentTarget.className += " active";
}

function openTab(evt, openTab){
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    openTab = document.getElementsByClassName(openTab);
    for(let i of openTab){
        i.style.display = "block";
    }
    evt.currentTarget.className += " active";
}

function openTabScheme(evt, openTab){
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent_scheme");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks_scheme");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(openTab).style.display = "block";
    evt.currentTarget.className += " active";
}

function openTabConnect(evt, openTab){
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent_connect");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks_connect");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(openTab).style.display = "block";
    evt.currentTarget.className += " active";
}