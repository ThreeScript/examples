// #

var _ = null;

var c, s, r, m, ct, stats;
var cr, cp, co, cph, coh, ac, ah;

function prepareScene() {
   s = ts.scene();
   r = ts.wglren({antiAlias: true}, 0x010101);
   r.autoClear = false;
   // r.domElement.style.position = "relative";
   ct = ts.container(_, r);
   c = ts.percam(50, ct.hw / ct.h, 1, 10000);
   ts.pos(c, _, _, 2500);
   cp = ts.percam(50, ct.hw / ct.h, 150, 1000);
   cph = ts.camhel(cp);
   co = ts.ortcam(-ct.hw / 2, ct.hw / 2, ct.hh, -ct.hh, 150, 1000);
   coh = ts.camhel(co);
   ts.rot(co, _, Math.PI);
   ts.rot(cp, _, Math.PI);
   cr = ts.group();
   ts.add(cr, cp, co);
   ts.add(s, cph, coh, cr);
   ac = cp;
   ah = cph;
   stats = new Stats();
   ct.appendChild(stats.domElement);
   ts.onresize(ct, null, r, function(event, container, camera, renderer) {
      var a = 0.5 * (ct.w / ct.h);
      c.aspect = a;
      ts.updpromat(c);
      cp.aspect = a;
      ts.updpromat(cp);
      var w = 0.5 * ct.hw;
      co.left = -w;
      co.right = w;
      co.top = ct.hh;
      co.bottom = -ct.hh;
      ts.updpromat(co);
   });
}

var mesh, mesh2, mesh3;

function prepareMeshes() {
   mesh = ts.sphbufmes(ts.basmat({color: 0xffffff, wireframe: true}), 100, 16, 8);
   mesh2 = ts.sphbufmes(ts.basmat({color: 0x00ff00, wireframe: true}), 50, 16, 8);
   mesh3 = ts.sphbufmes(ts.basmat({color: 0x0000ff, wireframe: true}), 5, 16, 8);
   ts.pos(mesh2, _, 150)
   ts.pos(mesh3, _, _, 150)
   var g = ts.geometry();
   for (var i = 0; i < 10000; i++) {
      g.vertices.push(ts.vec3(
              THREE.Math.randFloatSpread(2000),
              THREE.Math.randFloatSpread(2000),
              THREE.Math.randFloatSpread(2000)));
   }
   var p = ts.points(g, ts.poimat({color: 0x888888}));
   ts.add(s, mesh, p);
   ts.add(mesh, mesh2);
   ts.add(cr, mesh3);
}

prepareScene();
prepareMeshes();

ts.animate(r, s, c, _, loopCallback, renderCallback);

function loopCallback(anim) {
   stats.update();
}

function renderCallback() {
   var d = Date.now() * 0.0005;
   var cos = 700 * Math.cos(d);
   var sin = 700 * Math.sin(d);
   ts.pos(mesh, cos, sin, sin);
   ts.pos(mesh.children[0], 70 * Math.cos(2 * d), _, 70 * Math.sin(d));
   if (ac === cp) {
      cp.fov = 35 + 30 * Math.sin(0.5 * d);
      var pos = ts.getpos(mesh);
      cp.far = pos.length();
      ts.updpromat(cp);
      cph.update();
      cph.visible = true;
      coh.visible = false;
   } else {
      co.far = ts.getpos(length());
      ts.updpromat(co);
      coh.update();
      coh.visible = true;
      cph.visible = false;
   }
   ts.lookat(cr, mesh);
   r.clear();
   ah.visible = false;
   r.setViewport(0, 0, ct.hw, ct.h);
   r.render(s, ac);
   ah.visible = true;
   r.setViewport(ct.hw, 0, ct.hw, ct.h);
   r.render(s, c);
}
