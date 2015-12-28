// created by betobyte

/*------------------------------------------------------------------------------*/

if (!Detector.webgl)
  Detector.addGetWebGLMessage();

/*------------------------------------------------------------------------------*/
  
globalSceneMaker = new S3D.S3dSceneMaker(enumControlType.positional);

/*------------------------------------------------------------------------------*/

globalSceneMaker.createObjects(document.body, 0xFFFFFF, true, devicePixelRatio);

var tourParams = {
   materialList: {},
   fontParamList: {},
   textParamList: {}
};

/*------------------------------------------------------------------------------*/

var tourParams = ts.kitdef();

/*------------------------------------------------------------------------------*/

var ml = tourParams.materialList;

/*------------------------------------------------------------------------------*/

var tpl = tourParams.textParamList;

/*------------------------------------------------------------------------------*/

var fpl = tourParams.fontParamList;

/*------------------------------------------------------------------------------*/

var sliderParams = {
  owner: null,
  scene: globalSceneMaker.scene,
  sceneMaker: globalSceneMaker,
  materialList: ml,
  fontParamList: fpl,
  textParamList: tpl,
  geometryStyleArray: globalSceneMaker.geometryStyleArray,
  s3dObjArray: globalSceneMaker.s3dObjArray,
  actionChain: globalSceneMaker.actionChain
};

/*------------------------------------------------------------------------------*/

S3D.tourSlider = function(presentationParam) {
   S3D.S3dSlider.call(this, presentationParam);
};

/*----------------------------------------------------------------------------*/

S3D.tourSlider.prototype = new S3D.S3dSlider();
S3D.tourSlider.prototype.constructor = S3D.tourSlider;

/*----------------------------------------------------------------------------*/

S3D.tourSlider.prototype.loadPresentation = function() {
    
   this.tpbig = this.textParamList.BigDsbn;
   this.tpnormal = this.textParamList.MediumDsbn;
   this.tpsmall = this.textParamList.SmallDsbn;

   this.tpbig2 = this.textParamList.Dsbn320x34;
   this.tpnormal2 = this.textParamList.Dsbn144x16;

   this.mgray6 = this.materialList.gray6;
   this.mgray3 = this.materialList.gray3;
   
   this.tourStart();
};

/*----------------------------------------------------------------------------*/

slides.actions.tourStart = function(owner) {
   return {
      type: "to",
      origin: {x: 0, y: 0, z: 0},
      target: {x: 0, y: 0, z: -1000},
      position: {x: 0, y: 0, z: 0},
      time: {
         start: 0,
         total: 3000,
         step: 20
      },
      callback: owner.showPaintings,
      center: true
   };
};

/*----------------------------------------------------------------------------*/

S3D.tourSlider.prototype.tourStart = function() {
   this._tourStart = S3D.slitex(this, {
      texts: [
         ["Rogério Fernandes", 0, 100, 0, 0, 0, 0, this.tpbig2, this.mgray3, null],
         ["galeria 3D", 0, -100, 0, 0, 0, 0, this.tpnormal2, this.mgray6, null]
      ],
      action: slides.actions.tourStart(this)
    });
    this._tourStart.obj3d.position.z = -3000;
};

var z_pictures = -6000;

var x_picture_delta = 1000;
var z_picture_delta = -1000;

var ts_pictures_01 = 3000;
var tt_pictures_01 = 3000;
var st_pictures_01 = 20;
var xTo_pictures_01 = 0;
var yTo_pictures_01 = 0;
var zTo_pictures_01 = z_pictures + 1000;

var ts_pictures_02 = 6000;
var tt_pictures_02 = 120000;
var st_pictures_02 = 20;
var xTo_pictures_02 = 23000;
var yTo_pictures_02 = 0;
var zTo_pictures_02 = z_pictures - 23000;

/*----------------------------------------------------------------------------*/

S3D.tourSlider.prototype.showPaintingImage = function(file, text, x, y, z) {
   var sp = this;
   var richTextParam = {
      textParam: this.tpnormal,
      material: this.mgray6,
      geometryStyleArray: null
   };
   var img = new Image();
   img.onload = function() {
      sp.addSlideImagePlaneWithText(sp.paintingImages, text, richTextParam,
              x, y, z, this.width, this.height, sp.dir + file);
   };
   img.src = this.dir + file;
};

S3D.paisli = function() {
    
};

/*----------------------------------------------------------------------------*/

S3D.tourSlider.prototype.showPaintings = function() {
   var sp = this;
   var onCreate = function() {
      var onStop2 = function() {
         setTimeout(function() {
            sp.tourEnd.call(sp);
         }, 100);
      };
      var onStop1 = function() {
         this.owner.sceneMaker.moveTo(xTo_pictures_02, yTo_pictures_02, zTo_pictures_02, ts_pictures_02, tt_pictures_02, st_pictures_02, onStop2);
      };
      this.sceneMaker.moveTo(xTo_pictures_01, yTo_pictures_01, zTo_pictures_01, ts_pictures_01, tt_pictures_01, st_pictures_01, onStop1);
   };

   this.paintingSlide = this.getSlide(onCreate);
   this.paintingSlide.obj3d.position.z = z_pictures;
   this.paintingImages = new S3D.S3dPlaneChain({owner: this.paintingSlide, scene: this.paintingSlide.obj3d});
   this.dir = "examples/international/brazil/rogerio-fernandes/paintings/all/";
   var files = [
        "1193_586490498034936_1285933354_n.jpg", "1013845_660962907296756_299202646_n.jpg", "1097585_682019161839435_1420678614_n.jpg",
        "1186892_658529674206746_1694296635_n.jpg", "1193_586490498034936_1285933354_n.jpg", "12278132_1092405534144686_1819484847_n_2.jpg",
        "la-frida-sirena.jpg", "ladycartolagravura_1.jpg", "lagrimas-de-chanel-rosa.jpg",
        "lagrimas-que-chovem3.jpg", "lampi_o-e-leminski.jpg", "lampia_o-e-chanel.jpg",
        "lampiao1_1.jpg", "lampiaochanelgravura_1.jpg", "lights-will-guide-you-to-home.jpg",
        "love-in-diesel_1.jpg", "luiz-gonzaga-sempre-chorava-quando-chovia-no-sert_o.jpg", "luminaria-ali-rfs_1.jpg",
        "luminária-dali_1.jpg", "luminária-frida_1.jpg", "luminária-john_1.jpg",
        "luminária-kurt_1.jpg", "luminárias_amor_inesperado_chanel_e_lampião_1.jpg", "o-descanso-da-bailarina.700x700.jpg"
   ];
   var texts = [
        "", "", "", 
        "", "", "", 
        "La Frida Sirena", "Lady Cartola", "Lágrimas de chanel rosa",
        "lágrimas que chovem", "lampião e Leminski", "Lampião e Chanel",
        "lampião", "Lampiao e Chanel", "Lights Will Guide You To Home",
        "love-in-diesel_1", "luiz-gonzaga-sempre-chorava-quando-chovia-no-sert_o", "luminaria-ali-rfs_1",
        "luminária-dali_1", "luminária-frida_1", "luminária-john_1",
        "luminária-kurt_1", "luminárias_amor_inesperado_chanel_e_lampião_1", "o-descanso-da-bailarina"
   ];
   var y = 0;
   for (var i = 0; i < files.length; i++) {
      this.showPaintingImage(files[i], texts[i], i * x_picture_delta, y, i * z_picture_delta);
   }
};

/*----------------------------------------------------------------------------*/

S3D.tourSlider.prototype.tourEnd = function() {};

/*------------------------------------------------------------------------------*/

globalStudddioPresentation = new S3D.tourSlider(sliderParams);

/*----------------------------------------------------------------------------*/

Animate();

/*----------------------------------------------------------------------------*/

function Animate() {
   requestAnimationFrame(Animate);
   if (globalUseTrackball) {
      globalSceneMaker.trackballControls.update();
   } else {
      Render();
   }
}

/*----------------------------------------------------------------------------*/

function Render() {
   var callback = null;
   var usarCallback = false;
   if (usarCallback)
      callback = function() {
      };
   globalSceneMaker.render(callback);
}

/*----------------------------------------------------------------------------*/
