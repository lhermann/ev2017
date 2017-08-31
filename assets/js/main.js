/**
 * Resize Sections
 */
$(window).resize(function() {
    $('.jsHeight100').css('height', $(window).width() * 0.56).css('max-height', $(window).height() * 0.95);
});
$(window).trigger('resize');

/**
 * Countdown Timer
 */
var countdownObject = $('#jsCountdown');
var countdown =
    countdown(
        new Date(2017, 9, 13, 19, 30),
        function(ts) {
            // console.log( ts.days );
            countdownObject.find('#days').html( spanEach(ts.days) );
            countdownObject.find('#hours').html( spanEach(ts.hours) );
            countdownObject.find('#minutes').html( spanEach(ts.minutes) );
            countdownObject.find('#seconds').html( spanEach(ts.seconds) );
        },
        countdown.DAYS | countdown.HOURS|countdown.MINUTES|countdown.SECONDS
    );


function spanEach(string) {
    var array = String(string).split("");
    string = "";
    for (var i = 0; i < array.length; i++) {
        string += "<span>" + array[i] + "</span>";
    }
    return string;
}

/*
 * Start Animation
 */
$(window).ready(function(){
    $(".jsAniStart").addClass("u-ani--start");
});
