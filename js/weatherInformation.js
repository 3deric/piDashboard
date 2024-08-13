let weatherData = null

function updateWeather(){
	console.log("fetching data from weather web api")
	fetch('https://api.open-meteo.com/v1/forecast?latitude=51.0509&longitude=13.7383&current=temperature_2m,relative_humidity_2m,is_day,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m,wind_direction_10m&daily=temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin', {
	}).then(response => response.json())
	.then(data => updateWeatherData(data))
	setTimeout(updateWeather, 120000);
}

//function to update the departure containers
function updateWeatherData(newData){
	weatherData = newData
    console.log(weatherData)
}

//updates the viewport every 10 seconds
function updateViewport(){
	if(data != null){
		var style = null
		if(weatherData.current.is_day == 1){style = 'd'} else {style ='n'}
		document.getElementById("temperature").innerText  = weatherData.current.temperature_2m + " °C";
		document.getElementById('weatherImg').src = 'img/weather/' + weatherData.current.weather_code.toString().padStart(2,'0') + style +'@2x.png';
		document.getElementById("temperatureMinMax").innerText  = weatherData.daily.temperature_2m_min[0] + " °C bis " + weatherData.daily.temperature_2m_max[0] + " °C";
		document.getElementById("humidity").innerText  = weatherData.current.relative_humidity_2m + " % Luftfeuchtigkeit";
    }

   	setTimeout(updateViewport, 10000);
}


updateWeather()
updateViewport()

function weatherCondition(wmoCode){
    let condition = null
    console.log(wmoCode)
    switch(wmoCode){
        case 0: condition = '00'; break;
        case 1: condition = '01'; break;
        case 3: condition = '03'; break;
        case 10: condition = '01'; break;
    }
    return condition
}


function switchWeatherIcon(icon) {
  var pic = document.getElementById('weatherImg');
  pic.src = 'img/weather/' + icon +'d@2x.png';
}

