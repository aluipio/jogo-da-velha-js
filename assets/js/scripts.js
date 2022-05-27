// Define as variáveis básicas
const jogador = {'X':'jogador_marca_x', 'O':'jogador_marca_o'};
const comunicacao = document.getElementById('comunicacao');

// Carregamento de Audios
var somJogada = document.getElementById("jogada");
var somfinal = document.getElementById("final");
var somMusicaFundo = document.getElementById("musica_fundo");

// Permutação de possibilidades de panhar
const ganhador = [ '123', '147', '159', '456', '258', '357', '789', '369' ]
var marcador = {'X':[], 'O':[]};

// 0-x / 1-o
var vez = 'X';

////////////////////////////////
//
// Sorteia o jogador inicial
//
////////////////////////////////
function sortear(){
	let rand = Math.floor(10* Math.random() + 1);
	vez = rand%2 == 0 ? 'O' : 'X';
	comunicacao.innerHTML = 'Vez de: ' + vez;
}

////////////////////////////////
//
// Checa se o jogador venceu com a jogada
//
////////////////////////////////
function checarGanhador(){
	let retorno = false
	for(var a in marcador[vez]){
		for(var b in marcador[vez]){
			for(var c in marcador[vez]){
				let val = marcador[vez][a]+marcador[vez][b]+marcador[vez][c];
				if (ganhador.includes(String(val))){
					alert('O GANHADOR é '+vez);
					comunicacao.innerHTML = 'GANHADOR é '+vez;
					document.getElementById('q'+marcador[vez][a]).classList.add('vencedor');
					document.getElementById('q'+marcador[vez][b]).classList.add('vencedor');
					document.getElementById('q'+marcador[vez][c]).classList.add('vencedor');
					let quadro = document.querySelectorAll('.quadro').forEach(x => x.disabled = true);
					somMusicaFundo.pause();
					retorno = true;
				}
			}
		}
	}
	return retorno;
}

function marcadorSelecao(quadro){
	marcador[vez].push(String(quadro));
	marcador[vez].sort();
	return checarGanhador();
}

function marcarQuadro(btn,quadro){
	btn.classList.remove('indefinido');
	btn.classList.add(jogador[vez]);
	btn.innerHTML = vez;
	btn.disabled = true;
	if ( marcadorSelecao(quadro) === false) {
		vez = vez === 'X' ? 'O' : 'X';
		comunicacao.innerHTML = 'Vez de: ' + vez;
	}
	somJogada.play();
}

////////////////////////////////
//
// Reinicia o jogo
//
////////////////////////////////

let questConfirma = "Iniciar novo Jogo?";

function reiniciar(){
	if ( confirm(questConfirma) ){
		// Questionamento
		questConfirma = "Reiniciar novo Jogo?";
		document.getElementById("btn-iniciar").innerHTML = "Reiniciar Jogo"

		// somfinal.pause();
		// somfinal.currentTime = 0;

		somMusicaFundo.play();
		somMusicaFundo.currentTime = 0;

		let quadro = document.querySelectorAll('.quadro');
		for (var i = 0; i < 9; i++) {
			if (quadro[i].classList.contains('jogador_marca_x')){
				quadro[i].classList.remove('jogador_marca_x');
				quadro[i].classList.add('indefinido');	
			}
			if (quadro[i].classList.contains('jogador_marca_o')){
				quadro[i].classList.remove('jogador_marca_o');
				quadro[i].classList.add('indefinido');	
			}
			if (quadro[i].classList.contains('vencedor')){
				quadro[i].classList.remove('vencedor');
			}			
			quadro[i].innerHTML = '-';
			quadro[i].disabled = false;
		}
		marcador['X'] = [];
		marcador['O'] = [];
		sortear();
	}
}

//iniciar();