if (!Detector.webgl)
   Detector.addGetWebGLMessage();

var _ = null;

var s, c, r, ct, stats;
var mixers = [];

var radius = 600;
var theta = 0;

function prepareScene() {
   s = ts.scene();
   // s.fog = ts.fog(0xffffff, 2000, 10000);
   r = ts.wglren({antiAlias: true}, 0x888888);
   r.gammaInput = true;
   r.gammaOutput = true;
   r.shadowMap.enabled = true;
   ct = ts.container(_, r);
   c = ts.percam(45, ct.w / ct.h, 0.1, 20000);
   c.target = ts.vec3(0, 150, 0);
   ts.pos(c, _, 300);
   ts.updpromat(c);
   ts.pos(c, _, _, 150);
   ts.onresize(ct, c, r);
   // clock = new THREE.Clock();
   stats = new Stats();
   ct.appendChild(stats.domElement);
}

function prepareLigths() {
   var hl = ts.hemlig(0x443333, 0x222233);
   var dl = ts.dirlig(0xffffff, 1);
   ts.pos(dl, 1, 1, 1);
   s.add(hl, dl);
}

var loader = ts.jsoloa();

function load(geo, compute, color, morphNormals, shading, meshParams) {
   if (compute) {
      geo.computeVertexNormals();
      geo.computeMorphNormals();
   }
   var mp = {
      color: color,
      morphTargets: true,
      vertexColors: THREE.FaceColors,
      shading: shading
   };
   if (morphNormals)
      mp.morphNormals = morphNormals;
   var mat = ts.phomat(mp);
   var mesh = ts.mesh(geo, mat, meshParams);
   ts.add(s, mesh);
   var mixer = ts.animix(mesh, {action: ts.aniact(geo.animations[0]).warpToDuration(1)});
   mixers.push(mixer);
   return mesh;
}

function prepareLoaders() {
   loader.load("models/birds/flamingo.json", function(geo) {
      load(geo, false, 0xffffff, false, THREE.FlatShading, {pos: {x: -150, y: 150}, sca: {x: 1.5, y: 1.5, z: 1.5}});
      load(geo, true, 0xffffff, true, THREE.SmoothShading, {pos: {x: 150, y: 250}, sca: {x: 1.5, y: 1.5, z: 1.5}});
      load(geo, false, 0xffffff, false, THREE.FlatShading, {pos: {x: -250, y: 350}, sca: {x: 1.5, y: 1.5, z: 1.5}});
      load(geo, true, 0xffffff, true, THREE.SmoothShading, {pos: {x: 350, y: 50}, sca: {x: 1.5, y: 1.5, z: 1.5}});
      load(geo, true, 0xffffff, true, THREE.SmoothShading, {pos: {x: 50, y: 50, z: 50}, sca: {x: 1.5, y: 1.5, z: 1.5}});
      ts.animate(r, s, c, startCallback, loopCallback);
   });
}

prepareScene();
prepareLigths();
prepareLoaders();

function startCallback(anim) {
   anim.clock = new THREE.Clock();
}

function loopCallback(anim) {
   theta += 0.1;
   ts.pos(c, radius * Math.sin(THREE.Math.degToRad(theta)), _, radius * Math.cos(THREE.Math.degToRad(theta)));
   c.lookAt(c.target);
   var delta = anim.clock.getDelta();
   for (var i = 0; i < mixers.length; i++) {
      mixers[i].update(delta);
   }
   stats.update();
}
