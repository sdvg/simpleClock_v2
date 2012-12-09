var getTitleFormat = function(date) {
    //todo: format from config
    return date.format('d.m.Y, \\K\\W W, H:i');
}

var canvas = document.createElement('canvas');
canvas.width = 19;
canvas.height = 19;

var ctx = canvas.getContext('2d');
//todo: color from config
ctx.fillStyle = '#000';
ctx.font = '8pt Arial';


var setTime = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var now = new Date();

    ctx.fillText(now.format('H')+':', 0, 8);
    ctx.fillText(now.format('i'), 7, 19);

    chrome.browserAction.setIcon({'imageData': ctx.getImageData(0, 0, canvas.width, canvas.height)});
    chrome.browserAction.setTitle({'title': getTitleFormat(now)});

    setTimeout(setTime, (60-now.getSeconds())*1000);
}

setTime();