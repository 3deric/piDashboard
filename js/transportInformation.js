let data = null
let departures = 8

//construct the ui elements to show the stop information
window.onload = function(){
	for (let i = 0; i < departures; i++){
	    //generate container for all shown departures
	    const container = document.createElement("div");
	    container.id = i;
	    container.classList.add("departure");
	    const containerParent = document.getElementById("departureContainer");
	    containerParent.appendChild(container);
	    
	    //assign text paragraphs for all departures
	    //line ID
		const pLine = document.createElement("p");
		pLine.id = i+"_line";
		pLine.classList.add("line");
		const tLine = document.createTextNode("Line");
		pLine.appendChild(tLine);
		container.appendChild(pLine);
		//Destination
		/*
		const pDir = document.createElement("p");
		pDir.id = i+"_dir";
		const tDir = document.createTextNode("Dir");
		pDir.appendChild(tDir);
		container.appendChild(pDir);
		*/
		
		//scheduled time
		const pSchd = document.createElement("p");
		pSchd.id = i+"_schd";
		pSchd.classList.add("schedule");
		const tSchd = document.createTextNode("Schd");
		pSchd.appendChild(tSchd);
		container.appendChild(pSchd);
		
		//delta time
	    const pDelta = document.createElement("p");
		pDelta.id = i+"_delta";
		pDelta.classList.add("delta");
		const tDelta = document.createTextNode("Delta");
		pDelta.appendChild(tDelta);
		container.appendChild(pDelta);
				
		//state
	    const pState = document.createElement("p");
		pState.id = i+"_state";
		pState.classList.add("state");
		const tState = document.createTextNode("State");
		pState.appendChild(tState);
		container.appendChild(pState);
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
function updateTransportViewport(){
    console.log("updating viewport")
	if(data != null){
		console.log(new Date())
		document.getElementById("clock").innerText  = getTime(new Date);
    	for (let i = 0; i < departures; i++){
    		const currentDate = new Date();
    		const date = new Date(parseInt(data.Departures[i].ScheduledTime.substr(6)));
    		const diff = Math.abs(date - currentDate);
    		const minutes = Math.floor((diff/1000)/60);
    		const dir = data.Departures[i].Direction;
    		const state = data.Departures[i].State;
    		const line = data.Departures[i].LineName;
    		document.getElementById(i+"_line").innerText  = line + " " + dir;
    		document.getElementById(i+"_schd").innerText  = getTime(date);
    		document.getElementById(i+"_delta").innerText  = "in " + minutes + " Min";
    		document.getElementById(i+"_state").innerText  = getState(state);
    	}
    }
   	setTimeout(updateTransportViewport, 10000);
}

function getTime(time) {
  let hour = time.getHours();
  let minute = time.getMinutes();
  return hour.toString().padStart(2,'0') + ":" + minute.toString().padStart(2,'0');
}

function getState(state)
{
    if (state == "InTime")
    {
        return "pünktlich";
    }
    else if (state == "Delayed")
    {
        return "verspätet";
    }
    return "undefiniert";
}


updateTransportViewport();
updateStation();

//console.log(data)
//console.log(data.Name)
//console.log(data.Departures[0].LineName)
//console.log(data.Departures[0].State)
//console.log(data.Departures[0].ScheduledTime)
//console.log(data.Departures[0].Platform.Name)
//console.log(data.Departures[0].Direction)


