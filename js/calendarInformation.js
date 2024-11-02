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
    fetch('cal/cal.ics')
    .then((res) => res.text())
    .then((text) => {
        calendarEvents = parseICS(text);
        updateCalendarViewport();
    })
    .catch((e) => console.error(e));
}

function logCalendar(events){
    for (event of events){
        var eventDate = event['DTSTAMP'];
        var eventDesc = event['DESCRIPTION'];
        eventDate = new Date(eventDate.substring(0,4), eventDate.substring(4,6) -1, eventDate.substring(6,8), 0, 0, 0, 0);
    }
    updateCalendarViewport();
}

//updates the viewport
//could be replaced with a while loop
function updateCalendarViewport(){
    var calendarOptions = { day: 'numeric', year: 'numeric', month: 'numeric', day: 'numeric' };
	if(calendarEvents != null)
	{
	  for (let i = 0; i < calendarEvents.length -1; i++){
	        var eventDate0 =  calendarEvents[i]['DTSTAMP'].toString();
	        var eventDate1 =  calendarEvents[i+1]['DTSTAMP'].toString();
	        var eventDesc0 = calendarEvents[i]['SUMMARY'];
	        var eventDesc1 = calendarEvents[i+1]['SUMMARY'];
	        eventDate0 = new Date(eventDate0.substring(0,4), eventDate0.substring(4,6) -1, eventDate0.substring(6,8), 0, 0, 0, 0);
	        eventDate1 = new Date(eventDate1.substring(0,4), eventDate1.substring(4,6) -1, eventDate1.substring(6,8), 0, 0, 0, 0);
	        if(compareDate(eventDate0)){
	            document.getElementById("0_desc").innerText = eventDesc0;
	    	    document.getElementById("0_date").innerText = eventDate0.toLocaleDateString("de-DE", calendarOptions);   
	    	    document.getElementById("1_desc").innerText = eventDesc1;
	    	    document.getElementById("1_date").innerText = eventDate1.toLocaleDateString("de-DE", calendarOptions);   
	            break;         
	        }
	        else{
	            document.getElementById("0_desc").innerText = 'Keine Termine'
	            document.getElementById("0_date").innerText = 'Keine Daten'
	            document.getElementById("1_desc").innerText = 'Keine Termine'
	            document.getElementById("1_date").innerText = 'Keine Daten'
	        }
	    }
    }   
}

loadCalendar()

function compareDate(date) {
    if(date < new Date()){
        return false;
    }
    else{
        return true;
    }
}
