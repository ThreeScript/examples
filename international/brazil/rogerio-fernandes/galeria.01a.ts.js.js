var _ = null;

var roomWidth = 50;
var roomHeight = 20;
var roomDepth = 500;

var roomHalfWidth = roomWidth / 2;
var roomHalfHeight = roomHeight / 2;
var roomHalfDepth = roomDepth / 2;

var s = ts.scene();

var r = ts.webgl_renderer({antiAlias: true}, 0xeeeeee);

var ct = ts.container(null, r);

var c = ts.perspective_camera(45, ct.w / ct.h, 0.1, 10000);
ts.pos(c, _, _, 280);

ts.onresize(ct, c, r);

// ts.onmouse(ct, c, false, {x: -10, y: -10, z: -10});

function roombox(color, w, h, d, params) {
    var wall = ts.boxmes(ts.lammat({color: color}), w, h, d, 2, 2, 2, params);
    ts.cassha(wall);
    ts.add(s, wall);
    return wall;
}


var leftwall = roombox(0xff0000, roomDepth, roomHeight, 0.3, {pos: {x: -25}, rot: {y: Math.PI / 2}});
var rightwall = roombox(0x00ff00, roomDepth, roomHeight, 0.3, {pos: {x: 25}, rot: {y: -Math.PI / 2}});
var backwall = roombox(0x0000ff, roomWidth, roomHeight, 0.3, {pos: {z: -roomHalfDepth}});
var ceiling = roombox(0xff8800, roomDepth, roomWidth, 0.3, {pos: {y: roomHalfHeight}, rot: {x: Math.PI / 2, z: -Math.PI / 2}});
var floor = roombox(0xff8800, roomDepth, roomWidth, 0.3, {pos: {y: -roomHalfHeight}, rot: {x: Math.PI / 2, z: -Math.PI / 2}});

var paint1 = ts.plames(ts.lammat({color: 0xff00ff}), 5, 3);
ts.pos(paint1, _, -roomHalfHeight, roomHalfDepth);

ts.add(s, paint1);
    
var al = ts.ambient_light(0xffffff);

var sl = ts.spot_light(0xffff00);

ts.add(s, al);

// render(r, s, c);
ts.animate(r, s, c);
