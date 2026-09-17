const personagem = document.getElementById("personagem");

let x = window.innerWidth / 2;
let y = window.innerHeight / 2;

const velocidade = 5;

const teclas = {};

document.addEventListener("keydown", function(event) {
  teclas[event.key.toLowerCase()] = true;
});

document.addEventListener("keyup", function(event) {
  teclas[event.key.toLowerCase()] = false;
});

function entrar() {
  const nome = document.getElementById("nome").value.trim();

  document.getElementById("nomeJogador").textContent =
    nome || "ADM";

  document.getElementById("menu").style.display = "none";
  document.getElementById("jogo").style.display = "block";

  x = window.innerWidth / 2;
  y = window.innerHeight / 2;

  atualizar();
}

function atualizar() {

  if (
    teclas["w"] ||
    teclas["arrowup"]
  ) {
    y -= velocidade;
  }

  if (
    teclas["s"] ||
    teclas["arrowdown"]
  ) {
    y += velocidade;
  }

  if (
    teclas["a"] ||
    teclas["arrowleft"]
  ) {
    x -= velocidade;
  }

  if (
    teclas["d"] ||
    teclas["arrowright"]
  ) {
    x += velocidade;
  }

  const largura = 42;
  const altura = 62;

  x = Math.max(largura / 2, x);
  y = Math.max(altura / 2, y);

  x = Math.min(window.innerWidth - largura / 2, x);
  y = Math.min(window.innerHeight - altura / 2, y);

  personagem.style.left = x + "px";
  personagem.style.top = y + "px";

  requestAnimationFrame(atualizar);
}

window.addEventListener("resize", function() {
  x = Math.min(x, window.innerWidth - 25);
  y = Math.min(y, window.innerHeight - 35);
});
