var defaults = {
    'clickAction': {
        'type': 'calendar'
    },
    'color': '#000',
    'titleDateFormat': 'd.m.Y, H:i'
}

//set "title on hover"-options
var now = new Date();

//Date
var dateformats = ['d/m/m', 'd-m-Y', 'd.m.Y', 'n/j/y', 'j/n/y', 'j/m/y', 'd/m/y', 'j/n/Y', 'd/m/Y', 'Y-m-d', 'Y/m/d'];
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
$('#calenderweek').text(now.format('W'));

//change actions:
$('[name="clickAction"]').change(function() {
    $('#clickActionURL').attr('disabled', true);

    switch($(this).val()) {
        case 'calendar':
            localStorage.clickAction = 'calendar';
            break;
        case 'link':
            $('#clickActionURL').attr('disabled', false);
            break;
    }
});

$('#clickActionURL').keyup(function() {
    if( $(this).is(':valid') ) {
        localStorage.clickAction = 'link';
        localStorage.clickAction_link = $(this).val();
    }
});

$('#color').change(function() {
    localStorage.color = $(this).val();
});