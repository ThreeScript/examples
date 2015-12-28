var s = ts.scene();

var r = ts.webgl_renderer({antiAlias: true}, 0xeeeeee);

var ct = ts.container(null, r);

var c = ts.perspective_camera(45, ct.w / ct.h, 0.1, 10000);
ts.updpromat(c);
ts.pos(c, -30, 40, 30);
ts.lookat(c, s);

ts.onresize(ct, c, r);

var pl = ts.plane_mesh(ts.lammat({color: 0xffffff}), 60, 20, 1, 1);
ts.recsha(pl);
ts.position(pl, 15, 0, 0);
ts.rotation(pl, -0.5 * Math.PI);

var bx = ts.boxmes(ts.lammat({color: 0xff0000}), 4, 4, 4);
ts.position(bx, -3, 3, 0);

var sp = ts.sphmes(ts.lammat({color: 0x7777ff}), 4, 20, 20);
ts.position(sp, 20, 0, 2);

var al = ts.ambient_light(0x0c0c0c);

var sl = ts.spot_light(0xffffff);
ts.position(sl, -40, 20, -10);

ts.cassha(bx, sp, sl);
ts.add(s, pl, bx, sp, al, sl);

// render(r, s, c);
ts.animate(r, s, c, startCallback, loopCallback);

function startCallback(objanim) {
   objanim.step = 0;
}

function loopCallback(objanim) {
   objanim.step += 0.04;
   var r = bx.rotation;
   ts.rot(bx, r.x + 0.02, r.y + 0.02, r.z + 0.02);
   ts.pos(sp, 20 + (10 * (Math.cos(objanim.step))), 2 + (10 * Math.abs(Math.sin(objanim.step))));
}
