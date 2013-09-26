var insultGenerator = {
    /* URL for our insult, returns a JSON insult */
    insultURL: "http://deride.me/insults",
    
    /* our insult */
    insult: "derp",
    
    /* request a new insult */
    requestInsult: function () {
        var request = new XMLHttpRequest();
        request.open("GET", this.insultURL, true);
        request.onload = this.setInsult.bind(this);     // call setInsult when we get a good result
        request.send();                                 // send out the request
    },
    
    displayInsult: function () {
        alert(this.insult);
    },
    
    /* parse and set the insult */
    setInsult: function (result) {
        var data = JSON.parse(result.target.responseText);
        this.insult = data.insult;
        this.insult = this.insult.replace("is", "You are");
    },
    
    /* shortcut function, displays and seeds an insult */
    insultMe: function () {
        /* display the current insult */
        this.displayInsult();
        
        /* seed a new insult */
        this.requestInsult();
    }
};

/* seed the insult generator */
insultGenerator.requestInsult();

/* create a timer, we could have this recur, but I want the duration between 
   insults to be random */
chrome.alarms.create("insult", {delayInMinutes: 1});

/* called when our timer goes off */
chrome.alarms.onAlarm.addListener(function () {        
    /* display and seed a new insult*/
    insultGenerator.insultMe();
    
    /* seed a random duration */
    var alarmDelay = (Math.random() * 5) + 1
    console.log("Time till next alarm: " + alarmDelay);
    
    /* add another alarm */
    chrome.alarms.create({delayInMinutes: alarmDelay});
});
