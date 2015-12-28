// baseado em http://ericrius1.github.io/IndrasNet/public/

var indras = {
   fov: 70,
   numero_de_luzes: 3,
   sphereRadius: 30,
   movementSpeed: 77,
   lookSpeed: 0.11,
   intensidade_da_luz: 33.0,
   distancia_da_luz: 200
};

var ce = ts;

var s = ce.cena();

var r = ce.renderizador_webgl({antialias: true}, 0x000000);

var ct = ce.elemento_dom(null, r);

var c = ce.camera_perspectiva(indras.fov, ct.w / ct.h, 0.1, 1000);

var cc = ce.camera_cubica(1, 1000, 256);
cc.renderTarget.minFilter = THREE.LinearMipMapLinearFilter;

var fpc = ce.controle_de_primeira_pessoa(c, ct, indras.movementSpeed, indras.lookSpeed, -90, true);

ce.ao_redimensionar(ct, c, r, function() {
   c.projectionMatrix.makePerspective(indras.fov, ct.w / ct.h, 1, 1100);
   fpc.handleResize();
});

var dir = 'examples/adaptations/ericlevin/indrasnet/';
var urls = [dir + 'sky1.jpg', dir + 'sky2.jpg', dir + 'sky4.jpg',
   dir + 'sky3.jpg', dir + 'sky5.jpg', dir + 'sky6.jpg'];
var mc = ce.carregar_textura_de_cubo(urls);
var ma = ce.material_lambert({color: 0xffffff, envMap: mc});
var me = ce.malha_de_esfera(ma, 500, 60, 40);
ce.escala(me, -1);

var al = ce.luz_ambiente(0xffffff);

ce.adicionar(s, cc, me, al);

var nos = criarNodos();

var light = criarLuzes(nos);

document.addEventListener('mousewheel', onDocumentMouseWheel, false);
document.addEventListener('DOMMouseScroll', onDocumentMouseWheel, false);

ce.animar(r, s, c, startCallback, loopCallback);

function criarNodos() {
   var nos = [];
   var cubeTarget = cc.renderTarget;
   var shinymat = ce.material_phong({color: 0xffffff, ambient: 0xffffff, envMap: cubeTarget});
   var spacing = indras.sphereRadius * 4;
   ce.perlooxyz(-300, 300, spacing, function(x, y, z) {
      var esfera = ce.malha_de_esfera(shinymat, indras.sphereRadius, 30, 15);
      var position = ce.vec3(
              x + Math.random() * 20,
              y + Math.random() * 20,
              z + Math.random() * 20);
      esfera.position.copy(position);
      nos.push({posicao_original: position, esfera: esfera});
      ce.adicionar(s, esfera);
   });
   return nos;
}

function criarLuzes(nos) {
   var luzes = [];
   for (var i = 0; i < indras.numero_de_luzes; i++) {
      var indiceNo = Math.floor(Math.random() * nos.length);
      var no = nos[indiceNo];
      var randColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      var luz = ce.luz_de_ponto(randColor, indras.intensidade_da_luz, indras.distancia_da_luz);
      var op = no.posicao_original;
      luzes.push({posicao_original: ce.vec3(op.x, op.y, op.z), luz_de_cena: luz});
      ce.adicionar(s, luz);
   }
   return luzes;
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

function startCallback(loop) {
   loop.clock = new THREE.Clock();
}

function loopCallback(loop) {
   var i, l, n, p, op, time = Date.now() * 0.0004;

   for (i = 0, len = indras.numLight; i < len; i++) {
      l = lights[i];
      p = l.luz_de_cena.position;
      op = l.posicao_original;
      p.x = Math.sin(time * 0.5) * 111 + op.x;
      p.y = Math.cos(time * 0.5) * 111 + op.y;
      p.z = Math.cos(time * 0.5) * 111 + op.z;
   }
   
   for (i = 0, len = nos.length; i < len; i++) {
      n = nos[i];
      p = n.esfera.position;
      op = n.posicao_original;
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
