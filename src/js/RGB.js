function RGB(r, g, b) {
    if (r != null && (g == null || b == null)) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r);
        r = parseInt(result[1], 16);
        g = parseInt(result[2], 16);
        b = parseInt(result[3], 16);
    }
    this.r = r;
    this.g = g;
    this.b = b;
}

RGB.prototype.toString = function () {
    return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
};

RGB.prototype.toHex = function () {
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? '0' + hex : hex;
    }

    return '#' + componentToHex(this.r) + componentToHex(this.g) + componentToHex(this.b);
};

RGB.prototype.toHSL = function () {

    function min3(a, b, c) {
        return (a < b) ? ((a < c) ? a : c) : ((b < c) ? b : c);
    }

    function max3(a, b, c) {
        return (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);
    }

    var h;
    var s;
    var l;
    var max = max3(this.r, this.g, this.b);
    var dif = max - min3(this.r, this.g, this.b);
    s = (max == 0.0) ? 0 : (100 * dif / max);
    if (s == 0) {
        h = 0;
    }
    else if (this.r == max) {
        h = 60.0 * (this.g - this.b) / dif;
    }
    else if (this.g == max) {
        h = 120.0 + 60.0 * (this.b - this.r) / dif;
    }
    else if (this.b == max) {
        h = 240.0 + 60.0 * (this.r - this.g) / dif;
    }
    if (h < 0.0) {
        h += 360.0;
    }
    l = Math.round(max * 100 / 255);
    h = Math.round(h);
    s = Math.round(s);
    return new HSL(h, s, l);
};

RGB.prototype.complement = function () {
    return this.toHSL().complement().toRGB();
};

RGB.prototype.opposite = function () {
    return this.toHSL().opposite().toRGB();
};


