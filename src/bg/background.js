var defaultConfig = {
    'clickAction': 'calendar',
    'color': '#000',
    'hoursFormat': 'H',
    'titleDateFormat_date': 'd.m.Y',
    'titleDateFormat_time': 'G\\:i',
    'titleDateFormat_week': 'week'
};

for(var i in defaultConfig) {
    if(defaultConfig.hasOwnProperty(i)) {
        if(typeof localStorage[i] === 'undefined') {
            localStorage[i] = defaultConfig[i];
        }
    }
}


var getTitleFormat = function(date) {
    var format =
    localStorage.titleDateFormat_date+'\\,\\ '+
    localStorage.titleDateFormat_time+'\\,\\ '+
    '\\'+localStorage.titleDateFormat_week.split('').join('\\')+
    '\ W';

    return date.format(format);
}

function createTab(tab) {
    window.open(localStorage.clickAction_url, '_blank');
}
var setBrowserAction = function() {
    chrome.browserAction.onClicked.removeListener(createTab);

    if( localStorage.clickAction === 'url' ) {
        chrome.browserAction.setPopup({'popup': ''});
        chrome.browserAction.onClicked.addListener(createTab);
    }
    else {
        chrome.browserAction.setPopup({'popup': 'src/browser_action/browser_action.html'});
    }
}

var canvas = document.createElement('canvas');
canvas.width = 38;
canvas.height = 38;

var ctx = canvas.getContext('2d');
ctx.font = '16pt Arial';

var setTime = function() {
    ctx.fillStyle = localStorage.color;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var now = new Date();

    ctx.fillText(now.format(localStorage.hoursFormat)+':', 0, 16);
    ctx.fillText(now.format('i'), 14, 38);

    chrome.browserAction.setIcon({'imageData': ctx.getImageData(0, 0, canvas.width, canvas.height)});
    chrome.browserAction.setTitle({'title': getTitleFormat(now)});

    setTimeout(setTime, (60-now.getSeconds())*1000);
}

setTime();
setBrowserAction();

chrome.extension.onMessage.addListener(
    function() {
        setTime();
        setBrowserAction();
    }
);
