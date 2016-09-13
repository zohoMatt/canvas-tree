/**
 * Created by Zoho on 16/9/13.
 */
export function randomColorPicker() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function randomInteger(lo, hi) {
    return Math.floor(Math.random() * (hi - lo) ) + lo;
}

export function randomNumber(lo, hi) {
    return Math.random() * (hi - lo ) + lo;
}