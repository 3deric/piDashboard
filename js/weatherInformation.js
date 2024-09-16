let weatherData = null
let weatherIcons = null

function loadWeatherIcons(){
    fetch('https://gist.githubusercontent.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c/raw/76b0cb0ef0bfd8a2ec988aa54e30ecd1b483495d/descriptions.json', {
	}).then(response => response.json())
	.then(data => updateWeatherIcons(data))
}

function updateWeather(){
	//console.log("fetching data from weather web api")
	fetch('https://api.open-meteo.com/v1/forecast?latitude=51.0509&longitude=13.7383&current=temperature_2m,relative_humidity_2m,is_day,rain,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,rain,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,rain_sum&timezone=Europe%2FBerlin', {
	}).then(response => response.json())
	.then(data => updateWeatherData(data))
	//setTimeout(updateWeather, 120000);
}

//function to update the departure containers
function updateWeatherData(newData){
	weatherData = newData;
	updateWeatherViewport();
    //console.log(weatherData)
}

//function to update the departure containers
function updateWeatherIcons(newData){
	weatherIcons = newData
    //console.log(weatherData)
}


//updates the viewport every 10 seconds
function updateWeatherViewport(){
    console.log(data);
	if(weatherData != null){
		var image = null
		if(weatherData.current.is_day == 1){image = weatherIcons[weatherData.current.weather_code].day.image;} else {image = weatherIcons[weatherData.current.weather_code].night.image;}
		document.getElementById("temperature").innerText  = Math.round(weatherData.current.temperature_2m) + " °C";
		document.getElementById('weatherImg').src = image
		document.getElementById("temperatureMinMax").innerText  = Math.round(weatherData.daily.temperature_2m_min[0]) + " °C bis " + Math.round(weatherData.daily.temperature_2m_max[0]) + " °C";
		document.getElementById("humidity").innerText  = weatherData.current.relative_humidity_2m + " % rF";
    }

   	//setTimeout(updateWeatherViewport, 10000);
}

function switchWeatherIcon(icon) {
  var pic = document.getElementById('weatherImg');
  pic.src = 'img/weather/' + icon +'d@2x.png';
}


loadWeatherIcons()
updateWeather()
//setInterval(updateWeatherViewport, 600000 );
//setInterval(updateWeather, 1800000 );

