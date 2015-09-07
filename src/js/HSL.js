function HSL(hue, sat, lum) {
    this.hue = hue;
    this.sat = sat;
    this.lum = lum;
}

HSL.prototype.toRGB = function () {
    var rgb = new RGB();
    if (this.sat == 0) {
        rgb.r = rgb.g = rgb.b = Math.round(this.lum * 2.55);
    } else {
        this.hue /= 60;
        this.sat /= 100;
        this.lum /= 100;
        i = Math.floor(this.hue);
        f = this.hue - i;
        p = this.lum * (1 - this.sat);
        q = this.lum * (1 - this.sat * f);
        t = this.lum * (1 - this.sat * (1 - f));
        switch (i) {
            case 0:
                rgb.r = this.lum;
                rgb.g = t;
                rgb.b = p;
                break;
            case 1:
                rgb.r = q;
                rgb.g = this.lum;
                rgb.b = p;
                break;
            case 2:
                rgb.r = p;
                rgb.g = this.lum;
                rgb.b = t;
                break;
            case 3:
                rgb.r = p;
                rgb.g = q;
                rgb.b = this.lum;
                break;
            case 4:
                rgb.r = t;
                rgb.g = p;
                rgb.b = this.lum;
                break;
            default:
                rgb.r = this.lum;
                rgb.g = p;
                rgb.b = q;
        }
        rgb.r = Math.round(rgb.r * 255);
        rgb.g = Math.round(rgb.g * 255);
        rgb.b = Math.round(rgb.b * 255);
    }
    return rgb;
};

HSL.prototype.toHex = function () {
    return this.toRGB().toHex();
};

HSL.prototype.toString = function () {
    return "hsl(" + this.hue + ", " + this.sat + "%, " + this.lum + "%)"
};

HSL.prototype.shift = function (amount) {
    this.hue += amount;
    while (this.hue >= 360.0) this.hue -= 360.0;
    while (this.hue < 0.0) this.hue += 360.0;
    return this;
};

HSL.prototype.complement = function () {
    console.log();
    return this.shift(180);
};
HSL.prototype.opposite = function () {
    this.sat = 100 - this.sat;
    if (this.sat > 40 && this.sat < 60)
        this.sat = 75;
    this.lum = 100 - this.lum;
    if (this.lum > 40 && this.lum < 60)
        this.lum = 75;
    this.shift(180);
    return this;
};

HSL.prototype.analogous = function (amount) {
    amount = amount || 30;
    return [this.clone().shift(-amount), this.clone(), this.clone().shift(amount)];
};

HSL.prototype.triad = function (amount) {
    amount = amount || 30;
    return [this.clone().shift(180 - amount), this.clone(), this.clone().shift(180 + amount)];
};

HSL.prototype.secondary = function () {
    return [this.clone().shift(60), this.clone().shift(180), this.clone().shift(300)];
};

HSL.prototype.clone = function () {
    return new HSL(this.hue, this.sat, this.lum);
};

HSL.prototype.darken = function (amount) {
    this.lum = Math.max(0, this.lum - amount);
    return this;
};

HSL.prototype.lighten = function (amount) {
    this.lum = Math.min(100, this.lum += amount);
    return this;
};

HSL.prototype.desaturate = function (amount) {
    this.sat = Math.max(0, this.sat - amount);
    return this;
};

HSL.prototype.saturate = function (amount) {
    this.sat = Math.min(100, this.sat += amount);
    return this;
};


