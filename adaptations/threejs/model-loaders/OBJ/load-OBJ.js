var _ = null;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var s = ts.scene();

var r = ts.wglren({antiAlias: true, useCanvas: true}, 0xeeeeee);

var ct = ts.container(null, r);

var c = ts.percam(45, ct.w / ct.h, 0.1, 20000);
ts.updpromat(c);
ts.pos(c, _, _, 100);

ts.onresize(ct, c, r);

var al = ts.amblig(0x101030);

var dl = ts.dirlig(0xffeedd);
ts.pos(dl, 0, 0, 1);

ts.add(s, al, dl);

var manager = new THREE.LoadingManager();

manager.onProgress = function(item, loaded, total) {
   console.log(item, loaded, total);
};

var texture = new THREE.Texture();

var on_load_image = function(image) {
   texture.image = image;
   texture.needsUpdate = true;
};

var on_progress_img = function(xhr) {
   if (xhr.lengthComputable) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log(Math.round(percentComplete, 2) + '% downloaded');
   }
};

var on_error_img = function(xhr) {
    Alert('error loading image')
};

ts.load(ts.imgloa(manager), 'examples/adaptations/mrdoob/geometries/uv_grid_sm.jpg', on_load_image, on_progress_img, on_error_img);

var on_load_obj = function(obj) {
   obj.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
         child.material.map = texture;
      }
   });
   ts.pos(obj, _, -80);
   ts.add(s, obj);
};

var on_progress_obj = function(xhr) {
   if (xhr.lengthComputable) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log(Math.round(percentComplete, 2) + '% downloaded');
   }
};

var on_error_obj = function(xhr) {
    Alert('error loading object')
};

ts.load(ts.objloa(manager), 'models/obj/male02.obj', on_load_obj, on_progress_obj, on_error_obj);

document.addEventListener('mousemove', onDocumentMouseMove, false);

ts.animate(r, s, c, _, loopCallback);

function onDocumentMouseMove(event) {
   mouseX = (event.clientX - windowHalfX) / 2;
   mouseY = (event.clientY - windowHalfY) / 2;
}

function loopCallback(loop) {
   c.position.x += (mouseX - c.position.x) * 0.05;
   c.position.y += (-mouseY - c.position.y) * 0.05;
   ts.lookat(c, s);
}
