var timeScale = 'hsl';


function scale(max, val, cap) {
    return Math.floor((val / cap) * max);
}

function scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max) {
    return (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
}

function dotime() {
    $("body").css({"transition": "all 0.8s", "-webkit-transition": "all 0.8s"});

    var d = new Date();
    var hours = d.getHours();
    var mins = d.getMinutes();
    var secs = d.getSeconds();

    if (hours < 10) {
        hours = "0" + hours
    }
    if (mins < 10) {
        mins = "0" + mins
    }
    if (secs < 10) {
        secs = "0" + secs
    }

    hours.toString();
    mins.toString();
    secs.toString();

    var hex = new RGB("#" + hours + mins + secs);
    var hexScaled = new RGB(scale(255, hours, 24), scale(255, mins, 60), scale(255, secs, 60));
    var hsl = new HSL(scale(360, hours, 24), scaleBetween(mins, 20, 80, 0, 60), scaleBetween(secs, 20, 80, 0, 60));

    $("#t").html(hours + " : " + mins + " : " + secs);
    $("#h").html(hex.toHex());
    $("#h2").html(hexScaled.toHex());
    $("#h3").html(hsl.toString());

    if (timeScale == 'hsl') {
        color = hsl;
    } else if (timeScale == 'hex') {
        color = hex;
    } else {
        color = hexScaled;
    }

    document.body.style.background = color.toString();
    document.body.style.color = color.opposite().toString();
    setTimeout(function () {
        dotime();
    }, 1000);
}
