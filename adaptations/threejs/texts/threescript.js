
if (!Detector.webgl)
   Detector.addGetWebGLMessage();

var _ = null;

var stats;

var composer;
var effectFXAA;

var text = "ThreeScript";

var height = 20;
var size = 70;
var hover = 30;

var curveSegments = 4;

var bevelThickness = 2;
var bevelSize = 1.5;
var bevelSegments = 3;
var bevelEnabled = true;

var font = "optimer"; // helvetiker, optimer, gentilis, droid sans, droid serif
var weight = "bold"; // normal bold
var style = "normal"; // normal italic

var mirror = true;

var fontMap = {
   "helvetiker": 0,
   "optimer": 1,
   "gentilis": 2,
   "droid sans": 3,
   "droid serif": 4

};

var weightMap = {
   "normal": 0,
   "bold": 1

};

var postprocessing = {enabled: false};
var glow = 0.9;
var fontIndex = 0;

var s = ts.scene();
s.fog = ts.fog(0x000000, 250, 1400);

var r = ts.wglren({antialias: true}, s.fog.color);

var ct = ts.container(null, r);

var c = ts.percam(45, ct.w / ct.h, 0.1, 10000);
ts.pos(c, 0, 400, 700);

var cameraTarget = ts.vec3(0, 150, 0);

ts.onresize(ct, c, r);

var group = new THREE.Group();
ts.pos(group, _, 300);

// ts.onmouse(ct, c, _, _, {x: -1, y: -2, z:-1});

var dl = ts.dirlig(0xffffff, 0.125);
dl.position.set(0, 0, 1).normalize();

var pl = ts.pos(ts.poilig(0xffffff, 1.5), 0, 100, 90);

var material = ts.phofacmat(
        {color: 0xffffff, shading: THREE.FlatShading},
{color: 0xffffff, shading: THREE.SmoothShading});

createText();

var pn = ts.plames(ts.basmat({color: 0xffffff, opacity: 0.5, transparent: true}), 10000, 10000);
// ts.pos(pn, _,100);
ts.rot(pn, -Math.PI / 2);

ts.add(group, pn);

ts.add(s, dl, pl, group);

function loopCallback() {
   ts.lookat(c, cameraTarget);
   // stats.update();
   /*
    var gr = group.rotation;
    gr.y = gr.y + (( targetRotation - gr.y ) * 0.05);
    */
}

function renderCallback() {
   renderer.clear();
   if (postprocessing.enabled) {
      composer.render(0.05);
   } else {
      renderer.render(s, c);
   }
}

ts.animate(r, s, c, _, loopCallback);

/*
 var stats = new Stats();
 stats.domElement.style.position = 'absolute';
 stats.domElement.style.top = '0px';
 
 document.getElementById( "postprocessing" ).addEventListener( 'click', function() {
 
 postprocessing.enabled = !postprocessing.enabled;
 updatePermalink();
 
 }, false );
 */
function preparePostProcessing() {
   r.autoClear = false;

   var renderModel = new THREE.RenderPass(s, c);
   var effectBloom = new THREE.BloomPass(0.25);
   var effectFilm = new THREE.FilmPass(0.5, 0.125, 2048, false);

   effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);

   var width = ct.w || 2;
   var height = ct.h || 2;

   effectFXAA.uniforms.resolution.value.set(1 / width, 1 / height);

   effectFilm.renderToScreen = true;

   composer = new THREE.EffectComposer(renderer);

   composer.addPass(renderModel);
   composer.addPass(effectFXAA);
   composer.addPass(effectBloom);
   composer.addPass(effectFilm);
}
//

function createText() {

   var textGeo = new THREE.TextGeometry(text, {
      size: size,
      height: height,
      curveSegments: curveSegments,
      font: font,
      weight: weight,
      style: style,
      bevelThickness: bevelThickness,
      bevelSize: bevelSize,
      bevelEnabled: bevelEnabled,
      material: 0,
      extrudeMaterial: 1
   });

   textGeo.computeBoundingBox();
   textGeo.computeVertexNormals();

   computeBevel(textGeo);

   // "fix" side normals by removing z-component of normals for side faces
   // (this doesn't work well for beveled geometry as then we lose nice curvature around z-axis)


   var centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

   var t1 = ts.mesh(textGeo, material);
   ts.pos(t1, centerOffset, hover, 0);
   ts.rot(t1, 0, Math.PI * 2);
   ts.add(group, t1);

   if (mirror) {
      var t2 = new THREE.Mesh(textGeo, material);
      ts.pos(t2, centerOffset, -hover, height);
      ts.rot(t2, Math.PI, Math.PI * 2);
      ts.add(group, t2);
   }
}

function computeBevel(textGeo) {
   var face, va, vb, vc, ta, k;
   if (!bevelEnabled) {
      var triangleAreaHeuristics = 0.1 * (height * size);
      for (var i = 0; i < textGeo.faces.length; i++) {
         face = textGeo.faces[ i ];
         if (face.materialIndex === 1) {
            for (var j = 0; j < face.vertexNormals.length; j++) {
               face.vertexNormals[ j ].z = 0;
               face.vertexNormals[ j ].normalize();
            }
            va = textGeo.vertices[face.a];
            vb = textGeo.vertices[face.b];
            vc = textGeo.vertices[face.c];
            ta = THREE.GeometryUtils.triangleArea(va, vb, vc);
            if (ta > triangleAreaHeuristics) {
               for (k = 0, lenk = face.vertexNormals.length; k < lenk; k ++)
                  face.vertexNormals[k].copy(face.normal);

            }
         }
      }
   }
}
/*
 function refreshText() {
 
 updatePermalink();
 
 group.remove( t1 );
 if ( mirror ) group.remove( t2 );
 
 if ( !text ) return;
 
 createText();
 
 }
 
 */
