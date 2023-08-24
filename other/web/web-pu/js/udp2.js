function colorLed(a)
{
	if(a == 0)
	{
		return "gray";
	}
	return "red";
}

function colorBut(a)
{
	if(a == 0)
	{
		return "gray";
	}
	return "blue";
}

//GET VALUES
function getValues()
{
	let xhr = new XMLHttpRequest(); 
	xhr.open('GET', '/api/getValues.api'); 
	xhr.responseType = 'json'; 
	xhr.send();
	xhr.onload = function()
	{
		let resJsonObj = xhr.response;
		
		console.log(xhr.response);

		document.getElementById('UDP[0].leds[0]').style.backgroundColor = colorLed(resJsonObj.UDP[0].leds[0]);
		document.getElementById('UDP[0].leds[1]').style.backgroundColor = colorLed(resJsonObj.UDP[0].leds[1]);
		document.getElementById('UDP[0].leds[2]').style.backgroundColor = colorLed(resJsonObj.UDP[0].leds[2]);

		document.getElementById('UDP[0].buttons[0]').style.backgroundColor = colorBut(resJsonObj.UDP[0].buttons[0]);
		document.getElementById('UDP[0].buttons[1]').style.backgroundColor = colorBut(resJsonObj.UDP[0].buttons[1]);
		document.getElementById('UDP[0].buttons[2]').style.backgroundColor = colorBut(resJsonObj.UDP[0].buttons[2]);
	}  
}