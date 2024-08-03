let data = null
let departures = 10

//construct the ui elements to show the stop information
window.onload = function(){
	for (let i = 0; i < departures; i++){
		const para = document.createElement("p");
		para.id = i
		const node = document.createTextNode("Waiting for data");
		para.appendChild(node);

		const element = document.getElementById("div1");
		element.appendChild(para);
	}
}


//request to read departures for desired station
//requests data every 60 seconds
//requests 10 departures
//shows all transport types
function updateStation(){
	console.log("fetching data from web api")
	fetch('https://webapi.vvo-online.de/dm', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({ 
		stopid: '33000028',
		limit: '10',
		mot: ['Tram', 
			'CityBus', 
			'IntercityBus', 
			'SuburbanRailway', 
			'Train', 
			'Cableway', 
 			'Ferry', 
			'HailedSharedTaxi'
            ]
	}),
	}).then(response => response.json())
	.then(data => updateDepartures(data))
	
	setTimeout(updateStation, 60000);
}

//function to update the departure containers
function updateDepartures(newData){
	data = newData
}

//updates the viewport every 10 seconds
function updateViewport(){
	if(data != null){
		console.log(new Date())
    		for (let i = 0; i < departures; i++){
    			const currentDate = new Date()
    			const date = new Date(parseInt(data.Departures[i].ScheduledTime.substr(6)))
    			const diff = Math.abs(date - currentDate);
    			const minutes = Math.floor((diff/1000)/60);
    			const dir = data.Departures[i].Direction
    			const state = data.Departures[i].State
    			document.getElementById(i).innerText =getTime(date)+" : "+dir + " " +minutes + " " + state
    		}
    	}

   	setTimeout(updateViewport, 10000);
}

function getTime(time) {
  let hour = time.getHours();
  let minute = time.getMinutes();
  return hour.toString().padStart(2,'0') + ":" + minute.toString().padStart(2,'0');
}


updateViewport();
updateStation();

//console.log(data)
//console.log(data.Name)
//console.log(data.Departures[0].LineName)
//console.log(data.Departures[0].State)
//console.log(data.Departures[0].ScheduledTime)
//console.log(data.Departures[0].Platform.Name)
//console.log(data.Departures[0].Direction)


