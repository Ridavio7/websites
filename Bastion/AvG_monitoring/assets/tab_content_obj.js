export default (name = Date.now()) => `
<div class="tab-content">
                    <div class="tab_nav">
                        <a class="tablinks" onclick="openTab(event, 'fast_info')">Опер. инфо</a>
                        <a class="tablinks" onclick="openTab(event, 'zones')">Зоны</a>
                        <a class="tablinks" onclick="openTab(event, 'users')">Пользователи</a>
                        <a class="tablinks" onclick="openTab(event, 'schedule')">Расписание</a>
                        <a class="tablinks" onclick="openTab(event, 'scheme')">Схема</a>
                        <a class="tablinks" onclick="openTab(event, 'connect')">Связь</a>
                        <a class="tablinks" onclick="openTab(event, 'info')">Инфо</a>
                    </div>
                    <div id="fast_info" class="tabcontent">
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
                            </div>
                            <div class="search_list_info">
                                <input type="datetime-local" class="input_obj_text">
                                <a>-</a>
                                <input type="datetime-local" class="input_obj_text">
                            </div>
                        </div>
                        <table id="tb_alarm_list">
                            <tbody>
                                <tr>
                                    <td style="padding-left: 0px;"></td>
                                    <td class="td_main">Время</td>
                                    <td class="td_main">Дата</td>
                                    <td class="td_main">Сообщение</td>
                                    <td>0</td>
                                    <td>1</td>
                                    <td>2</td>
                                    <td>3</td>
                                    <td>4</td>
                                    <td>5</td>
                                    <td>6</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="zones" class="tabcontent">
                        <div class="tabcontent_child">
                            <table id="tb_zones_list">
                                <tbody>
                                    <tr style="padding: 0px 22px; border-top: none;">
                                        <td></td>
                                        <td>№</td>
                                        <td>Зона</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div>
                                <div class="tab_nav_child">
                                    <a class="tablinks tablinks_child" onclick="openTab(event, 'zone_descript', true)">Описание</a>
                                    <a class="tablinks tablinks_child" onclick="openTab(event, 'zone_message', true)">Сообщение</a>
                                    <a class="tablinks tablinks_child" onclick="openTab(event, 'zone_video', true)">Рассылка</a>
                                </div>
                                <div id="zone_descript" class="tabcontent tabcontent_options">
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
                                <div id="zone_message" class="tabcontent tabcontent_options">
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
                                <div id="zone_video" class="tabcontent tabcontent_options">
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
                    <div id="users" class="tabcontent">
                        <div class="tabcontent_child">
                            <table id="tb_users_list">
                                <tbody>
                                    <tr style="padding: 0px 22px; border-top: none;">
                                        <td></td>
                                        <td>№</td>
                                        <td>Пользователь</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div>
                                <div class="tab_nav_child">
                                    <a class="tablinks tablinks_child" onclick="openTab(event, 'user_descript', true)">Описание</a>
                                    <a class="tablinks tablinks_child" onclick="openTab(event, 'user_message', true)">Сообщение</a>
                                    <a class="tablinks tablinks_child" onclick="openTab(event, 'user_mailing', true)">Рассылка</a>
                                </div>
                                <div id="user_descript" class="tabcontent tabcontent_options">
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
                                <div id="user_message" class="tabcontent tabcontent_options">
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
                                <div id="user_mailing" class="tabcontent tabcontent_options">
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
                    <div id="schedule" class="tabcontent">
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
                    <div id="scheme" class="tabcontent">
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
                    <div id="connect" class="tabcontent">
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
                    <div id="info" class="tabcontent">
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
                    </div>
                </div>
`