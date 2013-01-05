/*
 * config restore
 */
//set clickaction value:
$('[name="clickAction"][value="'+localStorage.clickAction+'"]')
    .attr('checked', true);

//set clickaction_URL value:
if(localStorage.clickAction === 'url' &&
   typeof localStorage.clickAction_url !== 'undefined') {
    $('#clickActionURL').attr('disabled', false)
                        .val(localStorage.clickAction_url);
}

//set color value:
if(typeof localStorage.color !== 'undefined') {
    $('#color').val(localStorage.color);
}

//set "title on hover"-options
var now = new Date();

//Date
var dateformats = ['d.m.Y', 'd/m/m', 'd-m-Y', 'n/j/y', 'j/n/y', 'j/m/y',
                   'd/m/y', 'j/n/Y', 'd/m/Y', 'Y-m-d', 'Y/m/d'];
var dateOptions = '';
dateformats.forEach(function(format) {
    dateOptions += '<option value="'+format+'">'+format+' ('+now.format(format)+')</option>'
});
$('#titleDateFormat_date').html(dateOptions);

//Time
var timeOptions = '<option value="G\\:i">24h ('+now.format('G\\:i')+')</option> \
                   <option value="h\\:i\ A">12h ('+now.format('h\\:i\ A')+')</option>';
$('#titleDateFormat_time').html(timeOptions);

//Week
if(typeof localStorage.titleDateFormat_week !== 'undefined') {
    $('#titleDateFormat_week').val(localStorage.titleDateFormat_week);
}
$('#calenderweek').text(now.format('W'));

/*
 * change actions:
 */
$('[name="clickAction"]').change(function() {
    $('#clickActionURL').attr('disabled', true);

    switch($(this).val()) {
        case 'calendar':
            localStorage.removeItem('clickAction_url');
            $('#clickActionURL').val('');
            localStorage.clickAction = 'calendar';
            chrome.extension.sendMessage({});
            break;
        case 'url':
            $('#clickActionURL').attr('disabled', false);
            break;
    }
});

$('#clickActionURL').keyup(function() {
    if( $(this).is(':valid') ) {
        localStorage.clickAction = 'url';
        localStorage.clickAction_url = $(this).val();
        chrome.extension.sendMessage({});
    }
});

$('#color').change(function() {
    localStorage.color = $(this).val();
    chrome.extension.sendMessage({});
});

$('[id^=titleDateFormat_]').bind('change keyup', function() {
    localStorage.titleDateFormat_date = $('#titleDateFormat_date').val();
    localStorage.titleDateFormat_time = $('#titleDateFormat_time').val();
    localStorage.titleDateFormat_week = $('#titleDateFormat_week').val();

    chrome.extension.sendMessage({});
});