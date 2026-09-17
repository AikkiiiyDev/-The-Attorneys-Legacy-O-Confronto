const loginScreen = document.getElementById("loginScreen");
const gameScreen = document.getElementById("gameScreen");

const nameInput = document.getElementById("playerName");
const avatarInput = document.getElementById("avatarInput");
const avatarPreview = document.getElementById("avatarPreview");

const imageStatus = document.getElementById("imageStatus");
const errorMessage = document.getElementById("errorMessage");
const enterButton = document.getElementById("enterButton");

const playerAvatar = document.getElementById("playerAvatar");
const playerNameTag = document.getElementById("playerNameTag");
const player = document.getElementById("player");
const lobby = document.getElementById("lobby");

let avatarURL = "";
let playerX = 0;
let playerY = 0;

const speed = 5;


// ==============================
// ESCOLHER IMAGEM
// ==============================

avatarInput.addEventListener("change", function () {

  const file = this.files[0];

  if (!file) {
    imageStatus.textContent = "Nenhuma imagem selecionada";
    imageStatus.classList.remove("success");
    return;
  }

  // Confere o tamanho
  if (file.size > 5 * 1024 * 1024) {
    imageStatus.textContent = "❌ A imagem precisa ter até 5 MB.";
    imageStatus.classList.remove("success");

    avatarInput.value = "";
    avatarPreview.style.display = "none";
    avatarURL = "";

    return;
  }

  // Cria a imagem
  avatarURL = URL.createObjectURL(file);

  avatarPreview.src = avatarURL;
  avatarPreview.style.display = "block";

  // CONFIRMAÇÃO
  imageStatus.textContent = "✓ Imagem selecionada!";
  imageStatus.classList.add("success");

});


// ==============================
// ENTRAR NO LOBBY
// ==============================

enterButton.addEventListener("click", enterGame);

function enterGame() {

  errorMessage.textContent = "";

  const name = nameInput.value.trim();

  if (name === "") {
    errorMessage.textContent = "⚠️ Digite um nome primeiro!";
    nameInput.focus();
    return;
  }

  // Nome do jogador
  playerNameTag.textContent = name;

  // Avatar
  if (avatarURL !== "") {
    playerAvatar.style.backgroundImage = `url("${avatarURL}")`;
  } else {
    playerAvatar.style.backgroundImage = "none";
  }

  // Troca de tela
  loginScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  // Coloca o jogador no centro
  playerX = lobby.clientWidth / 2 - 40;
  playerY = lobby.clientHeight / 2 - 50;

  updatePlayerPosition();
}


// ==============================
// TECLADO
// ==============================

const keys = {};

document.addEventListener("keydown", function (event) {

  const key = event.key.toLowerCase();

  if (
    key === "w" ||
    key === "a" ||
    key === "s" ||
    key === "d" ||
    key === "arrowup" ||
    key === "arrowdown" ||
    key === "arrowleft" ||
    key === "arrowright"
  ) {
    event.preventDefault();
    keys[key] = true;
  }

});

document.addEventListener("keyup", function (event) {

  keys[event.key.toLowerCase()] = false;

});


// ==============================
// MOVIMENTO
// ==============================

function updatePlayerPosition() {

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

  // Não deixa sair do mapa
  const maxX = lobby.clientWidth - player.offsetWidth;
  const maxY = lobby.clientHeight - player.offsetHeight;

  playerX = Math.max(0, Math.min(playerX, maxX));
  playerY = Math.max(0, Math.min(playerY, maxY));

  player.style.left = playerX + "px";
  player.style.top = playerY + "px";

  requestAnimationFrame(updatePlayerPosition);
}

updatePlayerPosition();
