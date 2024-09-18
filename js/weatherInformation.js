let weatherData = null
let weatherIcons = null
let options = { weekday: 'long' };

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
	weatherIcons = newData;
    //console.log(weatherData)
}


//updates the viewport every 10 seconds
function updateWeatherViewport(){
    //console.log(weatherData);
    if(weatherIcons == null){
        return;
    }
    
    if(weatherData == null){
        return;
    }
		var image = null;
		var imageDay1 = null;
		var imageDay2 = null;
		var imageDay3 = null;
		if(weatherData.current.is_day == 1){
		    image = weatherIcons[weatherData.current.weather_code].day.image;
		    imageDay1 = weatherIcons[weatherData.daily.weather_code[1]].day.image;
		    imageDay2 = weatherIcons[weatherData.daily.weather_code[2]].day.image;
		    imageDay3 = weatherIcons[weatherData.daily.weather_code[3]].day.image;
		} 
		else {
		    image = weatherIcons[weatherData.current.weather_code].night.image;
		    imageDay1 = weatherIcons[weatherData.daily.weather_code[1]].night.image;
		  	imageDay2 = weatherIcons[weatherData.daily.weather_code[2]].night.image;
		    imageDay3 = weatherIcons[weatherData.daily.weather_code[3]].night.image;
		}
		document.getElementById("temperature").innerText  = Math.round(weatherData.current.temperature_2m) + " °C";
		document.getElementById('weatherImg').src = image
		var date1 = new Date(weatherData.daily.time[1]);
		var date2 = new Date(weatherData.daily.time[2]);
		var date3 = new Date(weatherData.daily.time[3]);
		date1 = date1.toLocaleDateString("de-DE", options).substring(0,2);
		date2 = date2.toLocaleDateString("de-DE", options).substring(0,2);
		date3 = date3.toLocaleDateString("de-DE", options).substring(0,2);
		document.getElementById('forecastDay0').innerText = date1;
		document.getElementById('forecastDay1').innerText = date2;
		document.getElementById('forecastDay2').innerText = date3;
		document.getElementById('weatherImg0').src = imageDay1;
		document.getElementById('weatherImg1').src = imageDay2;
		document.getElementById('weatherImg2').src = imageDay3;
		document.getElementById("temperatureMinMax").innerText  = Math.round(weatherData.daily.temperature_2m_min[0]) + " °C bis " + Math.round(weatherData.daily.temperature_2m_max[0]) + " °C";
		document.getElementById("humidity").innerText  = weatherData.current.relative_humidity_2m + " % rF";
		document.getElementById('forecast0').innerText = weatherData.daily.temperature_2m_min[1] + " °C\nbis\n" + weatherData.daily.temperature_2m_max[1] + " °C";
		document.getElementById('forecast1').innerText = weatherData.daily.temperature_2m_min[2] + " °C\nbis\n" + weatherData.daily.temperature_2m_max[2] + " °C";
		document.getElementById('forecast2').innerText = weatherData.daily.temperature_2m_min[3] + " °C\nbis\n" + weatherData.daily.temperature_2m_max[3] + " °C";
    

   	//setTimeout(updateWeatherViewport, 10000);
}

function switchWeatherIcon(icon) {
  var pic = document.getElementById('weatherImg');
  pic.src = 'img/weather/' + icon +'d@2x.png';
}


loadWeatherIcons()
updateWeather()
setInterval(updateWeatherViewport, 10000 );
setInterval(updateWeather, 1800000 );

