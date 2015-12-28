var s = ts.scene();
s.fog = ts.fogexp2(0x9999ff, 0.00025);

var r;

if (Detector.webgl)
   r = ts.wglren({antiAlias: true}, 0xeeeeee);
else
   r = ts.canren();

var ct = ts.container(null, r);

var c = ts.percam(45, ct.w / ct.h, 0.1, 20000);
ts.updpromat(c);
ts.pos(c, 0, 150, 400);
ts.lookat(c, s);

ts.onresize(ct, c, r);

ts.onmouse(ct, c, 1, 2, 4);

var pl = ts.poilig(0xffffff);
ts.pos(pl, 0, 250, 0);

var sp = ts.sphmes(ts.lammat({color: 0x8888ff}), 50, 32, 16);
ts.pos(sp, 100, 50, -50);

var cm = ts.bascolmat([0xff3333, 0xff8800, 0xffff33, 0x33ff33, 0x3333ff, 0x8833ff]);
var bx = ts.boxmes(cm, 100, 100, 100, 1, 1, 1);
ts.pos(bx, -100, 50, -50);

var axes = new THREE.AxisHelper(100);

var ftex = ts.loatex('examples/adaptations/stemkoski/basic/checkerboard.jpg');
ts.repwra(ftex,10);

var floor = ts.plames(ts.basmat({map: ftex, side: THREE.DoubleSide}), 1000, 1000, 1, 1);
ts.pos(floor, null, -0.5);
ts.rot(floor, Math.PI / 2);

var sky = ts.boxmes(ts.basmat({color: 0x9999ff, side: THREE.BackSide}, 10000, 10000, 10000));

ts.add(s, c, pl, sp, bx, axes, floor, sky);

ts.animate(r, s, c);
