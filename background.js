chrome.alarms.create("insult", {delayInMinutes: 1});

chrome.alarms.onAlarm.addListener(function() {
    /* get an insult */
    var insults = new Array("Idiot", "Looser", "Democrat");
    var insult = insults[Math.floor(Math.random()*insults.length)];
    
    /* insult the user */
    alert(insult);
    
    /* add another alarm */
    chrome.alarms.create({delayInMinutes: 1});
});
