var s = scene();

var r = wrend({antiAlias: true}, 0xeeeeee);

var ct = container(null, r);

var c = pcam(45, ct.w / ct.h, 0.1, 10000);
updpromat(c);
objpos(c, 0, 0, 100);
lookat(c, s);

onresize(ct, c, r);

onmouse(ct, c, false, {x: 1, y: 2, z: 0.1});

var pele = lammat({color: 0xffffff});

var chest = messph(pele, 40, 20, 20);
var neck = mesh(cylgeo(20, 20, 50, 20, 20), pele);
objadd(chest, neck);
objpos(neck, null, 65)
var head = messph(pele, 30, 20, 20);
objadd(neck, head);
objpos(head, null, 55)

var sl = spolig(0xffffff);
objpos(sl, -100, 100, 100);

cassha(head);
objadd(s, sl, chest);

// render(r, s, c);
animate(r, s, c, startCallback, loopCallback);

function startCallback(loop) {
}

function loopCallback(loop) {
}
