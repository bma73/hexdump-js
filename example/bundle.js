(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var hexdump = require('hexdump-js');

var view = new DataView(new ArrayBuffer(0x60));
view.setUint16(0, 0xaaaa);
view.setUint32(0x25, 0x12345678);
view.setUint32(0x50, 0xffffbbbb);

console.log(hexdump(view.buffer));



},{"hexdump-js":2}],2:[function(require,module,exports){
(function () {
    var _fillUp = function (value, count, fillWith) {
            var l = count - value.length;
            var ret = "";
            while (--l > -1)
                ret += fillWith;
            return ret + value;
        },
        hexdump = function (arrayBuffer, offset, length) {

            var view = new DataView(arrayBuffer);
            offset = offset || 0;
            length = length || arrayBuffer.byteLength;

            var out = _fillUp("Offset", 8, " ") + "  00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F\n";
            var row = "";
            for (var i = 0; i < length; i += 16) {
                row += _fillUp(offset.toString(16).toUpperCase(), 8, "0") + "  ";
                var n = Math.min(16, length - offset);
                var string = "";
                for (var j = 0; j < 16; ++j) {
                    if (j < n) {
                        var value = view.getUint8(offset);
                        string += value >= 32 ? String.fromCharCode(value) : ".";
                        row += _fillUp(value.toString(16).toUpperCase(), 2, "0") + " ";
                        offset++;
                    }
                    else {
                        row += "   ";
                        string += " ";
                    }
                }
                row += " " + string + "\n";
            }
            out += row;
            return out;
        };

    module.exports = hexdump;
})();

},{}]},{},[1])