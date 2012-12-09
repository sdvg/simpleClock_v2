// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


var pad = function(i) {
    return i >= 10 ? i : '0'+i;
}

var getFormatedDate = function(date) {
    //todo: formats, calendar week
    return pad(date.getDate())+'.'+pad(date.getMonth())+'.'+date.getFullYear();
}

var canvas = document.createElement('canvas');
canvas.width = 19;
canvas.height = 19;

var ctx = canvas.getContext('2d');
ctx.fillStyle = '#000';
ctx.font = '8pt Arial';


var setTime = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var now = new Date();
    var hours = pad(now.getHours());
    var minutes = pad(now.getMinutes());

    ctx.fillText(hours+':', 0, 8);
    ctx.fillText(minutes, 7, 19);

    chrome.browserAction.setIcon({'imageData': ctx.getImageData(0, 0, canvas.width, canvas.height)});
    chrome.browserAction.setTitle({'title': getFormatedDate(now)+', '+hours+':'+minutes});

    setTimeout(setTime, (60-now.getSeconds())*1000);
}

setTime();