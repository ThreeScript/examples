var _ = null;

var s = ts.scene();

var r = ts.wglren({antiAlias: true}, 0xeeeeee);

var ct = ts.container("id-threescript-animation", r);

var camgroup = ts.obj3d();
camgroup.rotation.y = Math.PI;

var c = ts.percam(45, ct.w / ct.h, 0.1, 10000);
var sl = ts.rot(ts.spolig(0xffffff, 1, 10000), null, Math.PI);
ts.add(camgroup, c, sl);

ts.onresize(ct, c, r);
ts.onmouse(ct, camgroup, 1, {x: 1, y: 2, z: 1}, {x: 1, y: 1, z: -1});

var pl = ts.plames(ts.lammat({color: 0xffffff}), 60, 20, 1, 1);
ts.recsha(pl);
ts.rot(pl, -0.5 * Math.PI);
ts.pos(pl, 15, 0, 0);

var bx = ts.boxmes(ts.lammat({color: 0xff0000}, 4, 4, 4));
ts.pos(bx, -4, 3, 0);

var sp = ts.sphmes(ts.lammat({color: 0x7777ff}), 4, 20, 20);
ts.pos(sp, 20, 0, 2);

var al = ts.amblig(0x0c0c0c);

ts.cassha(bx, sp, sl);

ts.add(s, camgroup, pl, bx, sp, al);

var step = 16; // 1
var max = 256; // 256;

var addCubeLight = false;

var boxdim = 5;

 ts.perlooxyz(0, max, step, function(x, y, z) {
    var mbox = ts.boxmes(ts.lammat({color: 0xaaaaaa}),boxdim, boxdim, boxdim);
    if (addCubeLight) {
        var box = ts.obj3d();
        ts.pos(box, x * boxdim, y * boxdim, z * boxdim);
        var slbox = ts.spolig("rgb(" + x + ", " + y + ", " + z + ")");
        ts.pos(slbox, step * boxdim / 2, step * boxdim / 2, step * boxdim / 2);
        slbox.lookAt(mbox);
        ts.add(box, mbox, slbox);
        ts.add(s, box);
    } else {
        ts.pos(mbox, x * boxdim, y * boxdim, z * boxdim);
        ts.add(s, mbox);
    }
});
/*
var x = 0;
while (x < max) {
   var y = 0;
   while (y < max) {
      var z = 0;
      while (z < max) {
         var mbox = boxmes(ts.lammat({color: 0xaaaaaa}),boxdim, boxdim, boxdim);
         if (addCubeLight) {
            var box = ts.obj3d();
            ts.pos(box, x * boxdim, y * boxdim, z * boxdim);
            var slbox = ts.spolig("rgb(" + x + ", " + y + ", " + z + ")");
            ts.pos(slbox, step * boxdim / 2, step * boxdim / 2, step * boxdim / 2);
            slbox.lookAt(mbox);
            ts.add(box, mbox, slbox);
            ts.add(s, box);
         } else {
            ts.pos(mbox, x * boxdim, y * boxdim, z * boxdim);
            ts.add(s, mbox);
         }
         z += step;
      }
      y += step;
   }
   x += step;
}
*/

ts.animate(r, s, c, startCallback, loopCallback);

function startCallback(loop) {
   loop.step = 0;
}

function loopCallback(loop) {
   bx.rotation.x += 0.02;
   bx.rotation.y += 0.02;
   bx.rotation.z += 0.02;

   loop.step += 0.04;
   ts.pos(sp, 20 + (10 * (Math.cos(step))), y = 2 + (10 * Math.abs(Math.sin(step))));
}
