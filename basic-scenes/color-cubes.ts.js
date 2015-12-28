var _ = null;

var s = ts.scene();

var r = ts.wglren({antiAlias: true}, 0xeeeeee);

var ct = ts.container("id-threescript-animation", r);

var c = ts.percam(45, ct.w / ct.h, 0.1, 10000);
ts.updpromat(c);
ts.rot(c, _, Math.PI);

ts.onresize(ct, c, r);

ts.onmouse(ct, c, 1, 2, 4);

var al = ts.amblig(0x0c0c0c);

var sl = ts.spolig(0xffffff);
ts.rot(sl, _, Math.PI);
ts.add(s, al, sl);

//sl.position.set(-40, 20, -10);

var step = 64; // 1
var max = 256; // 256;

var boxdim = 5;
var x = 0;
while (x < max) {
   var y = 0;
   while (y < max) {
      var z = 0;
      while (z < max) {
         var box = ts.boxmes(ts.lammat({color: "rgb(" + x + ", " + y + ", " + z + ")"}),
         boxdim, boxdim, boxdim);
         ts.pos(box, x * boxdim, y * boxdim, z * boxdim);
         ts.add(s, box);
         z += step;
      }
      y += step;
   }
   x += step;
}

ts.animate(r, s, c, startCallback, loopCallback);

function startCallback(loop) {
}

function loopCallback(loop) {
}
