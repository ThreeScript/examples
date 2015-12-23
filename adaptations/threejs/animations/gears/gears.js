//

var floorY = -250;

var _ = null;

var s = ts.scene();
s.fog = ts.fog(0xffffff, 2000, 10000);

var r = ts.wglren({antiAlias: true}, s.fog.color);

var ct = ts.container(_, r);

var c = ts.percam(45, ct.w / ct.h, 0.1, 20000);
ts.updpromat(c);
ts.pos(c, _, _, 150);

ts.onresize(ct, c, r);

var mixer;

var mouseX = 0, mouseY = 0;

var clock = new THREE.Clock();

var ground = ts.plabufmes(ts.phomat({emissive: 0x000000}, 1600, 1600), {
   pos: {y: floorY}, rot: {x: -Math.PI / 2}, recsha: true});

r.gammaInput = true;
r.gammaOutput = true;

r.shadowMap.enabled = true;

var stats = new Stats();
ct.appendChild(stats.domElement);

var loader = new THREE.ObjectLoader();
loader.load("models/gears/scene-animation.json", function(loadedScene) {
   s = loadedScene;
   s.fog = ts.fog(0xffffff, 2000, 10000);
   s.add(c);
   mixer = ts.animix(s, {action: ts.aniact(s.animations[0])});
   ts.animate(r, s, c, _, loopCallback);
   ts.onmoumov(ct, function(event) {
      mouseX = (event.clientX - ct.hw);
      mouseY = (event.clientY - ct.hh);
   });

});

function loopCallback(loop) {
   var delta = 0.75 * clock.getDelta();

   ts.posadd(c, (mouseX - c.position.x) * 0.05);
   ts.pos(c, _, THREE.Math.clamp(ts.getpos(c).y + (-mouseY - ts.getpos(c).y) * 0.05, 0, 1000));

   ts.lookat(c, s);

   if (mixer) {
      mixer.update(delta);
   }
   stats.update();
}
