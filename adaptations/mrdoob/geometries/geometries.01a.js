// adapted from http://mrdoob.github.io/three.js/examples/webgl_geometries.html

var _ = null;

var s = ts.scene();

var r = ts.wglren({antiAlias: true}, 0xeeeeee);

var ct = ts.container(_, r);

var c = ts.percam(45, ct.w / ct.h, 0.1, 20000);
ts.updpromat(c);

ts.onresize(ct, c, r);

var al = ts.amblig(0x404040);

var dl = ts.pos(ts.dirlig(0xffffff), 0, 1, 0);

var tx = ts.loatex('examples/adaptations/mrdoob/geometries/uv_grid_sm.jpg');
ts.repwra(tx, 1, 16);

var lm = ts.lammat({map: tx, side: THREE.DoubleSide});

var sp = ts.pos(ts.sphmes(lm, 75, 20, 10),-400, 0, 200);

var ic = ts.pos(ts.icomes(lm, 75, 1), -200, 0, 200);

var oc = ts.pos(ts.octmes(lm, 75, 2), 0, 0, 200);

var te = ts.pos(ts.tetmes(lm, 75, 0), 200, 0, 200);

var pl = ts.pos(ts.plames(lm, 100, 100, 4, 4), -400, 0, 0);

var bx = ts.pos(ts.boxmes(lm, 100, 100, 100, 4, 4, 4), -200, 0, 0);

var ci = ts.pos(ts.cirmes(lm, 50, 20, 0, Math.PI * 2), 0, 0, 0);

var ri = ts.pos(ts.rinmes(lm, 10, 50, 20, 5, 0, Math.PI * 2), 200, 0, 0);

var cy = ts.pos(ts.cylmes(lm,25, 75, 100, 40, 5),  400, 0, 0);

var points = [];
ts.sngloo(0, 50, 1, points, function(index, points) {
    points.push(ts.vec3(Math.sin(index * 0.2) * Math.sin(index * 0.1) * 15 + 50, 0, (index - 5) * 2));
});

var la = ts.pos(ts.latmes(lm, points, 20), -400, 0, -200);

var to = ts.pos(ts.tormes(lm, 50, 20, 20, 20), -200, 0, -200);

var kn = ts.pos(ts.knomes(lm, 50, 10, 50, 20), 0, 0, -200);

var ax = ts.pos(new THREE.AxisHelper(50), 200, 0, -200);

var ar =ts.pos(new THREE.ArrowHelper(ts.vec3(0, 1, 0), ts.vec3(0, 0, 0), 50), 400, 0, -200);

ts.add(s, al, dl, sp, ic, oc, te, pl, bx, ci, ri, cy, la, to, kn, ax, ar);

ts.animate(r, s, c, _, loopCallback);

function loopCallback(loop) {
   var timer = Date.now() * 0.0001;
   ts.pos(c, Math.cos(timer) * 400, _, Math.sin(timer) * 400);
   ts.lookat(c, s);
   for (var i = 0, l = s.children.length; i < l; i++) {
      ts.rot(s.children[i], timer * 5, timer * 2.5);
   }
}
