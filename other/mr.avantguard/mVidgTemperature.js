function addZero(val)
{
  if (val < 10) {  val='0'+val; }
  return val;
}

function date_time()
{ var curr_dt = new Date();

  var day   = addZero(curr_dt.getDate());
  var month = addZero(curr_dt.getMonth()+1);
  var year  = curr_dt.getFullYear();
  var hours = addZero(curr_dt.getHours());
  var min   = addZero(curr_dt.getMinutes());
  var sec   = addZero(curr_dt.getSeconds());

  return day+"."+month+"."+year+" "+hours+":"+min+":"+sec;
}

function weekday()
{
  var date = new Date();
  var day = date.getDay();
  var days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  document.getElementById('iWeekDay').innerHTML = days[day];

  returns( days[day] );
}
