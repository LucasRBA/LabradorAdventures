const labrador = document.querySelector(".labrador");
const background = document.querySelector(".background");

let isJumping = false;
let isGameOver = false;
let position = 0;

function bark() {
  var bark = new Audio("/assets/bark.mp3");
  bark.play();
}

function howl() {
  var howl = new Audio("/assets/howl.mp3");
  howl.play();
}

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    bark();
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 230) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 55;
          labrador.style.bottom = position + "px";
        }
      }, 70);
    } else {
      // Subindo
      position += 50;
      labrador.style.bottom = position + "px";
    }
  }, 55);
}

function scored() {
  var start = new Date().getTime(),
    score = "1";

  var interval = window.setInterval(function () {
    var time = new Date().getTime() - start;

    globalThis.scoring = score = Math.floor(time / 1000);
  }, 100);
  if (isGameOver === true) {
    howl();
    window.clearInterval(interval);
  }
}

function createBear() {
  const bear = document.createElement("div");
  let bearPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  bear.classList.add("bear");
  background.appendChild(bear);
  bear.style.left = bearPosition + "px";

  let leftTimer = setInterval(() => {
    if (bearPosition < -110) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(bear);
    } else if (bearPosition > 0 && bearPosition < 110 && position < 110) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      howl();
      document.body.innerHTML = `<div><h1 class="game-over">Fim de jogo </h1> <h2 font>Pontuação: ${
        scoring * 10
      }</h2> </div>`;
      //  document.body.innerHTML = `<h2 class="pontos">Pontuação: ${scoring*10}</h2>`;
    } else {
      bearPosition -= 10;
      bear.style.left = bearPosition + "px";
    }
  }, 30);

  setTimeout(createBear, randomTime);
}

createBear();
scored();
document.addEventListener("keyup", handleKeyUp);
