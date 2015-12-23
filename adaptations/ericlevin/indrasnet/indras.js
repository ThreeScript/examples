// based on: http://ericrius1.github.io/IndrasNet/public/

var indras = {
   fov: 70,
   numLights: 3,
   sphereRadius: 30,
   movementSpeed: 77,
   lookSpeed: 0.11,
   lightIntensity: 33.0,
   lightDistance: 200
};

var s = ts.scene();

var r = ts.wglren({antialias: true}, 0x000000);

var ct = ts.container(null, r);

var c = ts.percam(indras.fov, ct.w / ct.h, 0.1, 1000);

var cc = ts.cubcam(1, 1000, 256);
cc.renderTarget.minFilter = THREE.LinearMipMapLinearFilter;

var fpc = ts.firpercon(c, ct, indras.movementSpeed, indras.lookSpeed, -90, true);

ts.onresize(ct, c, r, function() {
   c.projectionMatrix.makePerspective(indras.fov, ct.w / ct.h, 1, 1100);
   fpc.handleResize();
});

var dir = 'examples/adaptations/ericlevin/indrasnet/';
var urls = [dir + 'sky1.jpg', dir + 'sky2.jpg', dir + 'sky4.jpg',
   dir + 'sky3.jpg', dir + 'sky5.jpg', dir + 'sky6.jpg'];
var cubemap = ts.loatexcub(urls);
var envmat = ts.lammat({color: 0xffffff, envMap: cubemap});
var envmesh = ts.sphmes(envmat, 500, 60, 40);
ts.scale(envmesh, -1);

var al = ts.amblig(0xffffff);

ts.add(s, cc, envmesh, al);

var nodes = createNodes();

var light = addLights(nodes);

document.addEventListener('mousewheel', onDocumentMouseWheel, false);
document.addEventListener('DOMMouseScroll', onDocumentMouseWheel, false);

function startCallback(loop) {
   loop.clock = new THREE.Clock();
}

function loopCallback(loop) {
   var i, l, n, p, op, time = Date.now() * 0.0004;

   for (i = 0, len = indras.numLight; i < len; i++) {
      l = lights[i];
      p = l.sceneLight.position;
      op = l.originalPosition;
      p.x = Math.sin(time * 0.5) * 111 + op.x;
      p.y = Math.cos(time * 0.5) * 111 + op.y;
      p.z = Math.cos(time * 0.5) * 111 + op.z;
   }

   for (i = 0, len = nodes.length; i < len; i++) {
      n = nodes[i];
      p = n.sphere.position;
      op = n.originalPosition;
      if (i % 2 === 0) {
         p.x = Math.sin(time * 0.2) * 3 + op.x;
         p.y = Math.cos(time * 0.5) * 5 + op.y;
         p.z = Math.cos(time * 0.3) * 2 + op.z;
      } else {
         p.x = Math.sin(time * 0.3) * 1 + op.x;
         p.y = Math.cos(time * 0.4) * 8 + op.y;
         p.z = Math.cos(time * 0.2) * 1 + op.z;
      }
   }
   cc.updateCubeMap(r, s);
   fpc.update(loop.clock.getDelta());
}

ts.animate(r, s, c, startCallback, loopCallback);

function createNodes() {
   var nodes = [];
   var cubeTarget = cc.renderTarget;
   var shinymat = ts.phomat({color: 0xffffff, ambient: 0xffffff, envMap: cubeTarget});
   var spacing = indras.sphereRadius * 4;
   ts.perlooxyz(-300, 300, spacing, function(x, y, z) {
      var sphere = ts.sphmes(shinymat, indras.sphereRadius, 30, 15);
      var position = ts.vec3(
              x + Math.random() * 20,
              y + Math.random() * 20,
              z + Math.random() * 20);
      sphere.position.copy(position);
      nodes.push({originalPosition: position, sphere: sphere});
      ts.add(s, sphere);
   });
   return nodes;
}

function addLights(nodes) {
   var lights = [];
   for (var i = 0; i < indras.numLights; i++) {
      var nodeIndex = Math.floor(Math.random() * nodes.length);
      var node = nodes[nodeIndex];
      var randColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      var light = ts.poilig(randColor, indras.lightIntensity, indras.lightDistance);
      var op = node.originalPosition;
      lights.push({originalPosition: ts.vec3(op.x, op.y, op.z), sceneLight: light});
      ts.add(s, light);
   }
   return lights;
}

function onDocumentMouseWheel(event) {
   if (event.wheelDeltaY)  // WebKit
      indras.fov -= event.wheelDeltaY * 0.005;
   else if (event.wheelDelta)  // Opera / Explorer 9    
      indras.fov -= event.wheelDelta * 0.005;
   else if (event.detail)  // Firefox
      indras.fov += event.detail * 1.0;
   c.projectionMatrix.makePerspective(indras.fov, ct.w / ct.h, 1, 1100);
}
