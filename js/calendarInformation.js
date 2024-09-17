var calendarEvents = null

function parseICS(icsString) {
    const lines = icsString.split('\n');
    const events = [];
    let event;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line === 'BEGIN:VEVENT') {
            event = {};
            } 
        else if (line === 'END:VEVENT') {
            events.push(event);
            } 
        else if (event) {
            const match = /^([A-Z]+):(.*)$/.exec(line);
            if (match) {
                key = match[0].split(':');
                event[key[0]] = match[2]
                }
            }
        }
    return events;
    }

function loadCalendar(){
    fetch('js/calendar.ics')
    .then((res) => res.text())
    .then((text) => {
        calendarEvents = parseICS(text);
        //logCalendar(calendarEvents);
    })
    .catch((e) => console.error(e));
}

function logCalendar(events){
    for (event of events){
        var eventDate = event['DTSTAMP'];
        var eventDesc = event['DESCRIPTION'];
        eventDate = new Date(eventDate.substring(0,4), eventDate.substring(4,6) -1, eventDate.substring(6,8), 0, 0, 0, 0);
        console.log(eventDate);
        //console.log(eventDesc);
    }
    updateCalendarViewport();
}

//updates the viewport every 10 seconds
function updateCalendarViewport(){
	if(calendarEvents != null){
	    for (let i = 0; i < 8; i++){
	        var eventDate = calendarEvents[i]['DTSTAMP'].toString();
            var eventDesc = calendarEvents[i]['DESCRIPTION'];
            eventDate = new Date(eventDate.substring(0,4), eventDate.substring(4,6) -1, eventDate.substring(6,8), 0, 0, 0, 0);
            //document.getElementById(i+"_desc").innerText = eventDesc;
		    //document.getElementById(i+"_date").innerText = eventDate;    
		}
    }

   	//setTimeout(updateWeatherViewport, 10000);
}

loadCalendar()
