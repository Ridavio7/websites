const url = "https://api.avantguard.pro:9999/json";
const web_url = "https://dev.proektit.ru/AvG_monitoring/templates/alarm.html";
let   tid = 0, userId = 0, sat = 0, ts = 0, data_line = [], count_obj = 0, Href = "";
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
            <input type="text" class="input_obj_text input_width_100" id="CID_obj" placeholder="CID объекта" readonly>
            <input type="text" class="input_obj_text input_margin_l input_width_100" id="name_security" placeholder="Название ЧОП" readonly>
            <input type="text" class="input_obj_text input_margin_l input_width_100 " id="start_service" placeholder="Начало обслуживания" readonly>
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
        </div><!--
        <div class="search_list_info">
            <input type="datetime-local" class="input_obj_text">
            <a>-</a>
            <input type="datetime-local" class="input_obj_text">
        </div>-->
    </div>
    <div class="tb_obj_mes">
        <table class="table_obj_mes">
            <tr>
                <td class="td_main">Время</td>
                <td class="td_main">Сообщение</td>
                <td>0</td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
            </tr>
        </table>
    </div>
</div>
<div class="zones tabcontent">
    <div class="tabcontent_block_child">
        <div class="block_tb_list">
            <table class="table_zones">
                <tr style="padding: 0px 22px; border-top: none;">
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
            <tr style="padding: 0px 22px; border-top: none;">
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
            <tr style="padding: 0px 22px; border-top: none;">
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
            <tr style="padding: 0px 22px; border-top: none;">
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
            <button class="tablinks_scheme" onclick="openTabScheme(event, 'scheme_1')">Схема 1 2D</button>
            <button class="tablinks_scheme" onclick="openTabScheme(event, 'scheme_2')">Схема 2 3D</button>
        </div>
        <div id="scheme_1" class="tabcontent_scheme">
            <div class="tab_scheme_child">
                <div class="input_line_text">
                    <label class="lable_obj_text" for="scheme_descript">Описание</label>
                    <input type="text" class="input_obj_text" id="scheme_descript" placeholder="Описание" readonly>
                </div>
                <img src="../images/scheme_2D.svg" class="img_scheme">
            </div>
        </div>
        <div id="scheme_2" class="tabcontent_scheme">
            <div class="tab_scheme_child">
                <div class="input_line_text">
                    <label class="lable_obj_text" for="scheme_descript">Описание</label>
                    <input type="text" class="input_obj_text" id="scheme_descript" placeholder="Описание" readonly>
                </div>
            </div>
            <img src="../images/scheme_3D.jpg" class="img_scheme">
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
    <table id="tb_alarm_list">
        <tbody>
            <tr>
                <td class="td_main" style="padding-left: 0px;"></td>
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
            <tr style="padding: 0px 22px; border-top: none;">
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
    funcGetObjectList();
    funcDashboards();
    setUserId();
    funcGetMessageToday();
}

function sform_tid(){
    var curr_dt = new Date();
    tid = curr_dt.getDate() + curr_dt.getMonth() + curr_dt.getFullYear() + curr_dt.getHours() + curr_dt.getMinutes() + curr_dt.getSeconds();
    ts = parseInt(((new Date().getTime() / 1000) + 10800).toFixed(0));
}

function setUserId(){
    var user_id = document.getElementById("user_id");
    user_id.innerHTML = localStorage.getItem("idlogin");
}

function funcCommand( body, callbackfunc ){
    var xhr    = new XMLHttpRequest();
    var jsbody = JSON.stringify( body );
    var resp;

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
    body.nPgSz    = 500;

    let start = new Date(); start.setUTCHours(0,0,0,0);
    let end = new Date(); end.setUTCHours(23,59,59,999);
    let start_conv = ((new Date(start.toUTCString()).valueOf()).toString()).slice(0, -3);
    let end_conv = ((new Date(end.toUTCString()).valueOf()).toString()).slice(0, -3);

    body.db       = start_conv;
    body.de       = end_conv;

    funcCommand( body, funcProcessGetMessageToday );
}

function callbackGetDashboardInfo(err, respobj, db_id){
    if(err){
        //Error!
    } else {
        users_obj = respobj.DBInfo;
        let colors = users_obj.aClr;
        let data = users_obj.aData;
        //let text = users_obj.aTxt;

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
        respobj = {DBInfo:{aClr: ["#f6c23e"], aData: [count_obj]}}
        callbackGetDashboardInfo(respobj.sErr, respobj, "db_faults")
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
    body.nPgSz    = 13;
    body.aui      = "web";
    funcCommand( body, funcProcessGetDashboardInfoFifth );
}

function funcProcessGetDashboardInfoFourth( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "1" ){
        console.log( respobj );
    } else if( respobj.pn == "3"){
        callbackGetDashboardInfo(respobj.sErr, respobj, "db_power");
    } else {
        console.log( "Не определено: " + respobj.pn );
    }
}

function funcGetDashboardInfoFourth(){
    let body = { "mt":121, "pn":0, "tid":"", "userId":"", "lat":"", "aui":"web",  "iDB":"" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.iDB      = 6;
    body.aui      = "web";
    funcCommand( body, funcProcessGetDashboardInfoFourth );
}

function funcProcessGetDashboardInfoThird( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "1" ){
        console.log( respobj );
    } else if( respobj.pn == "3"){
        callbackGetDashboardInfo(respobj.sErr, respobj, "db_communication");
    } else {
        console.log( "Не определено: " + respobj.pn );
    }
}

function funcGetDashboardInfoThird(){
    let body = { "mt":121, "pn":0, "tid":"", "userId":"", "lat":"", "aui":"web",  "iDB":"" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.iDB      = 4;
    body.aui      = "web";
    funcCommand( body, funcProcessGetDashboardInfoThird );
}

function funcProcessGetDashboardInfoSecond( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "1" ){
        console.log( respobj );
    } else if( respobj.pn == "3"){
        callbackGetDashboardInfo(respobj.sErr, respobj, "db_alarm");
    } else {
        console.log( "Не определено: " + respobj.pn );
    }
}

function funcGetDashboardInfoSecond(){
    let body = { "mt":121, "pn":0, "tid":"", "userId":"", "lat":"", "aui":"web",  "iDB":"" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.iDB      = 3;
    body.aui      = "web";
    funcCommand( body, funcProcessGetDashboardInfoSecond );
}

function funcProcessGetDashboardInfoFirst( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "1" ){
        console.log( respobj );
    } else if( respobj.pn == "3"){
        callbackGetDashboardInfo(respobj.sErr, respobj, "db_objects");
    } else {
        console.log( "Не определено: " + respobj.pn );
    }
}

function funcGetDashboardInfoFirst(){
    let body = { "mt":121, "pn":0, "tid":"", "userId":"", "lat":"", "aui":"web",  "iDB":"" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.iDB      = 1;
    body.aui      = "web";
    funcCommand( body, funcProcessGetDashboardInfoFirst );
}

function funcDashboards(){
    funcGetDashboardInfoFirst();
    funcGetDashboardInfoSecond();
    funcGetDashboardInfoThird();
    funcGetDashboardInfoFourth();
    funcGetDashboardInfoFifth();
}

function tableSearch(){
    var phrase = document.getElementById('find_list');
    var table = document.getElementById('tb_alarm_obj_list');
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
    let sortedRows = Array.from(tb_alarm_obj_list.rows)
    .slice(1)
    .sort((rowA, rowB) => rowA.cells[number].innerHTML > rowB.cells[number].innerHTML ? 1 : -1);
    tb_alarm_obj_list.tBodies[0].append(...sortedRows);
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
        let table = document.getElementById('tb_alarm_obj_list');
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
    body.nPgSz    = 13;
    body.aui      = "web";
    funcCommand( body, funcProcessGetFiltObjectList );
}

function addRow(CID, Name, Address, Status){
    let tableRef = document.getElementById("tb_alarm_obj_list");
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
        "<i class='fas fa-exclamation-triangle' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top'></i>"+
        "<i class='fas fa-battery-three-quarters' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top'></i>"+
        "<i class='fas fa-wifi' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top'></i>"+
        "<i class='fas fa-ghost' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top'></i>"+
        "<i class='fas fa-fire-alt' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top'></i>"+
        "<i class='fas fa-skull-crossbones' style='color: #b3b3b3;' data-toggle='tooltip' data-placement='top'></i>";

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

function callbackGetObjectList(err, respobj){
    if(err){
        //Error!
    } else {
        console.log(respobj);
        funcFiltList(respobj, "Присутствует неисправность")
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

function funcProcessGetObjectList( result, respobj ){
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
    body.nPgSz    = 13;
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
        //console.log(respobj);
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
    body.nPgSz    = 500;
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
    body.nPgSz    = 500;
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
        console.log(respobj);
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
    let body = { "mt":113, "pn":46, "tid":"", "userId":"", "lat":"",  "lsAcnt":"",  "lsAcntEx":"", "nPg":"",  "nPgSz":"", "aui":"web" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.lsAcnt   = Href;
    body.lsAcntEx = 0;
    body.nPg      = 1;
    body.nPgSz    = 500;
    funcCommand( body, funcProcessGetObjectSensors );
}

function funcProcessGetObjectPictures( result, respobj ){
    if( result === 0 ) return;
    if( respobj.pn == "35" ){
        console.log( "Запрос принят, схем объекта нет" );
    } else if( respobj.pn == "37"){
        console.log(respobj);
    } else {
        console.log( "Не определено: " + respobj.pn );
    }
}

function funcGetObjectPictures(Href){
    let body = { "mt":113, "pn":34, "tid":"", "userId":"", "lat":"",  "lsAcnt":"",  "lsAcntEx":"", "nPg":"",  "nPgSz":"", "aui":"web" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.lsAcnt   = Href;
    body.lsAcntEx = 0;
    body.nPg      = 1;
    body.nPgSz    = 500;
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
        console.log(respobj);
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
    let body = { "mt":113, "pn":24, "tid":"", "userId":"", "lat":"",  "lsAcnt":"",  "lsAcntEx":"", "nPg":"",  "nPgSz":"", "aui":"web" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.lsAcnt   = Href;
    body.lsAcntEx = 0;
    body.nPg      = 1;
    body.nPgSz    = 500;
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
        console.log(respobj);
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
    let body = { "mt":113, "pn":14, "tid":"", "userId":"", "lat":"",  "lsAcnt":"",  "lsAcntEx":"", "nPg":"",  "nPgSz":"", "aui":"web" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.lsAcnt   = Href;
    body.lsAcntEx = 0;
    body.nPg      = 1;
    body.nPgSz    = 500;
    funcCommand( body, funcProcessGetObjectZones );
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

    cellMes.style.whiteSpace = "unset";
    //cellMes.style.width = "600px";
}

function callbackGetObjectMessage(err, respobj){
    if(err){
        //Error!
    } else {
        console.log(respobj);
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
            date[11] + date[12] + date[13] + date[14] + date[15] + date[16] + date[17] + date[18];
            addRowObjMes(date, mes, tableRef[0]);
        }
    }

    var css = 'td:hover { transform: none; text-align: left}';
    var style = document.createElement('style');
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName('head')[0].appendChild(style);
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
    var body = { "mt":112, "pn":0, "tid":"", "userId":"", "lat":"",  "lsAcnt":"", "aui":"web", "nPg":"",  "nPgSz":"" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.lsAcnt   = Href;
    body.aui      = "web";
    body.nPg      = 1;
    body.nPgSz    = 500;

    funcCommand( body, funcProcessGetObjectMessage );
}

function addRowMes(date, CID, mes, Href) {
    let tableRef = document.getElementById("tb_alarm_list");
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
    tab_obj.append(Href);
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

    cellMes.style.whiteSpace = "unset";

    let css = "#i" + Href + ":" + "target~.tab_nav_main>" + "[href='#i" + Href + "']{ background-color: #39414B; border: 1px solid #717171; border-bottom: none;cursor: default;}";
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
            funcGetObjectMessage(Href);
            funcGetObjectZones(Href);
            funcGetObjectUsers(Href);
            funcGetObjectPictures(Href);
            funcGetObjectSensors(Href);
            funcGetObjectDevice(Href);
            //funcGetObjectListInfo(Href);
            //funcGetObjectButton(Href);
        }
    }, true);
}

function callbackGetMessage(err, respobj){
    if(err){
        //Error!
    } else {
        console.log(respobj);
        for (i in respobj) {
            list_obj = respobj.aData;
        }
        
        for (let j in list_obj){
            let data_obj = list_obj[j];
            date = data_obj.sMdt;
            CID = data_obj.sAcnt;
            mes = data_obj.Mes;
            Href = data_obj.lsAcnt;
            date =  date[8] + date[9] + date[4] + date[5] + date[6] + date[7] + date[0] + date[1] + date[2] + date[3] + " " +
            date[11] + date[12] + date[13] + date[14] + date[15] + date[16] + date[17] + date[18];
            addRowMes(date, CID, mes, Href);
        }
        /*
        query1 = "1";
        list_obj_alarm_main = list_obj.filter(item => `${item.bAl}`.includes(query1));
        query2 = "Тревога";
        list_obj_alarm = list_obj.filter(item => `${item.Mes}`.includes(query2));
        query3 = "Пожар в";
        list_obj_alarm_fire = list_obj.filter(item => `${item.Mes}`.includes(query3));
        query4 = "Неисправность";
        list_obj_alarm_fault = list_obj.filter(item => `${item.Mes}`.includes(query4));
        query5 = "Напряжение ниже";
        list_obj_alarm_power = list_obj.filter(item => `${item.Mes}`.includes(query5));
        query6 = "Нет связи";
        list_obj_alarm_comm = list_obj.filter(item => `${item.Mes}`.includes(query6));
        let list = {};
        list = Object.assign(list, [list_obj_alarm_main, list_obj_alarm, list_obj_alarm_fire, list_obj_alarm_fault, list_obj_alarm_power, list_obj_alarm_comm]);
        for (let i in list) {
            let list_data_obj = list[i];
            if (list_data_obj.length != 0){
                for (let j in list_data_obj){
                    let data_obj = list_data_obj[j];
                    date = data_obj.sMdt;
                    CID = data_obj.sAcnt;
                    mes = data_obj.Mes;
                    Href = data_obj.lsAcnt;
                    date =  date[8] + date[9] + date[4] + date[5] + date[6] + date[7] + date[0] + date[1] + date[2] + date[3] + " " +
                    date[11] + date[12] + date[13] + date[14] + date[15] + date[16] + date[17] + date[18];
                    addRowMes(date, CID, mes, Href);
                }
            }
        }*/
    }

    var css = 'td:hover { transform: none; text-align: left}';
    var style = document.createElement('style');
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName('head')[0].appendChild(style);

    let sortedRows = Array.from(tb_alarm_list.rows)
    .slice(1)
    .sort((rowA, rowB) => rowA.cells[0].innerHTML > rowB.cells[0].innerHTML ? -1 : 1);
    tb_alarm_list.tBodies[0].append(...sortedRows);
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
    var body = { "mt":112, "pn":0, "tid":"", "userId":"", "lat":"", "aui":"web", "nPg":"",  "nPgSz":"" };
    body.tid      = tid;
    body.userId   = localStorage.getItem("userId");
    body.lat      = localStorage.getItem("lat");
    body.aui      = "web";
    body.nPg      = 1;
    body.nPgSz    = 500;

    funcCommand( body, funcProcessGetMessage );
}

button_up.addEventListener('click', function() {
    block_alarm_list.scrollTo({ top: 0 });
});

button_down.addEventListener('click', function() {
    //block_alarm_list.scrollTo({ bottom: 0, behavior: 'smooth' });
    block_alarm_list.scrollTop = block_alarm_list.scrollHeight;
});

function openTabChild(evt, openTab){
    var i, tabcontent, tablinks;
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
    var i, tabcontent, tablinks;
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
    var i, tabcontent, tablinks;
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
    var i, tabcontent, tablinks;
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