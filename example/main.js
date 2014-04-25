var hexdump = require('hexdump-js');

var view = new DataView(new ArrayBuffer(0x60));
view.setUint16(0, 0xaaaa);
view.setUint32(0x25, 0x12345678);
view.setUint32(0x50, 0xffffbbbb);

console.log(hexdump(view.buffer));


