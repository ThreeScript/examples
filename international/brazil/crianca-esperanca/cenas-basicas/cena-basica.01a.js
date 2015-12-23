var ce = ts;

var cn = ce.cena();

var rw = ce.renderizador_webgl({antiAlias: true}, 0xeeeeee);

var ed = ce.elemento_dom(null, rw);

var cm = ce.camera_perspectiva(45, ed.w / ed.h, 0.1, 10000);
ce.alterar_matriz_de_projecao(cm);
ce.posicionar(cm, -30, 40, 30);
ce.olhar_para(cm, cn);

ce.ao_redimensionar(ed, cm, rw);

var la = ce.luz_ambiente(0x0c0c0c);

var lh = ce.luz_de_holofote(0xffffff);
ce.posicionar(lh, -40, 20, -10);

var pl = ce.malha_de_plano(ce.material_lambert({color: 0xffffff}), 60, 20, 1, 1);
ce.receber_sombra(pl);
ce.posicionar(pl, 15, 0, 0);
ce.girar(pl, -0.5 * Math.PI);

var bx = ce. malha_de_caixa(ce.material_lambert({color: 0xff0000}), 4, 4, 4);
ce.posicionar(bx, -3, 3, 0);

var sp = ce.malha_de_esfera(ce.material_lambert({color: 0x7777ff}), 4, 20, 20);
ce.posicionar(sp, 20, 0, 2);

ce.lancar_sombra(bx, sp);

ce.adicionar(cn, la, lh, pl, bx, sp);

ce.animar(rw, cn, cm, inicioAnimacao, iteracaoAnimacao);

function inicioAnimacao(animador) {
   animador.passo = 0;
}

function iteracaoAnimacao(animador) {
   animador.passo += 0.04;
   var rw = bx.rotation;
   ce.girar(bx, rw.x + 0.02, rw.y + 0.02, rw.z + 0.02);
   ce.posicionar(sp, 20 + (10 * (Math.cos(animador.passo))), 2 + (10 * Math.abs(Math.sin(animador.passo))));
}
