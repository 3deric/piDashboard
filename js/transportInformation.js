//request to read departures for desired station
//requests 10 departures
//shows all transport types
function updateStation(){
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
}

//function to update the departure containers
function updateDepartures(data){
    console.log(data)
    console.log(data.Name)
    console.log(data.Departures[0].LineName)
    console.log(data.Departures[0].State)
    console.log(data.Departures[0].ScheduledTime)
    console.log(data.Departures[0].Platform.Name)
    console.log(data.Departures[0].Direction)
}

//updateStation();


