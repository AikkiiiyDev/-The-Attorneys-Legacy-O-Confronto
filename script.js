const loginScreen = document.getElementById("loginScreen");
const gameScreen = document.getElementById("gameScreen");

const nameInput = document.getElementById("playerName");
const avatarInput = document.getElementById("avatarInput");

const avatarPreview = document.getElementById("avatarPreview");
const playerAvatar = document.getElementById("playerAvatar");
const playerNameTag = document.getElementById("playerNameTag");

const player = document.getElementById("player");
const lobby = document.getElementById("lobby");

let playerX = 0;
let playerY = 0;

const speed = 5;

let avatarURL = "";

// Mostrar prévia da imagem
avatarInput.addEventListener("change", function () {
  const file = this.files[0];

  if (!file) return;

  avatarURL = URL.createObjectURL(file);

  avatarPreview.src = avatarURL;
  avatarPreview.style.display = "block";
});

// Entrar no jogo
function enterGame() {

  let name = nameInput.value.trim();

  if (name === "") {
    name = "Jogador";
  }

  playerNameTag.textContent = name;

  if (avatarURL !== "") {
    playerAvatar.style.backgroundImage = `url("${avatarURL}")`;
  }

  loginScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  // Começa no centro
  playerX = lobby.clientWidth / 2 - 40;
  playerY = lobby.clientHeight / 2 - 50;

  updatePlayer();
}

// Movimento
const keys = {};

document.addEventListener("keydown", function (event) {

  keys[event.key.toLowerCase()] = true;

});

document.addEventListener("keyup", function (event) {

  keys[event.key.toLowerCase()] = false;

});

function updatePlayer() {

  if (keys["w"] || keys["arrowup"]) {
    playerY -= speed;
  }

  if (keys["s"] || keys["arrowdown"]) {
    playerY += speed;
  }

  if (keys["a"] || keys["arrowleft"]) {
    playerX -= speed;
  }

  if (keys["d"] || keys["arrowright"]) {
    playerX += speed;
  }

  // Impede sair do mapa
  const maxX = lobby.clientWidth - player.offsetWidth;
  const maxY = lobby.clientHeight - player.offsetHeight;

  playerX = Math.max(0, Math.min(playerX, maxX));
  playerY = Math.max(0, Math.min(playerY, maxY));

  player.style.left = playerX + "px";
  player.style.top = playerY + "px";

  requestAnimationFrame(updatePlayer);
}

updatePlayer();    teclas["arrowup"]
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
