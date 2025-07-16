document.addEventListener("DOMContentLoaded", () => {
  const choices = ["rock", "paper", "scissors"];
  const choicePanel = document.getElementById("choice-panel");
  const resultPanel = document.getElementById("result-panel");
  const hurrayPanel = document.getElementById("hurray-panel");

  const yourPick = document.getElementById("your-pick");
  const pcPick = document.getElementById("pc-pick");
  const resultText = document.getElementById("result-text");

  const playerScore = document.getElementById("player-score");
  const computerScore = document.getElementById("computer-score");

  const rulesBtn = document.getElementById("rules-btn");
  const rulesPopup = document.getElementById("rules-overlay");

  const closeRules = document.getElementById("close-rules");

  const playAgain = document.getElementById("play-again");
  const playAgainHurray = document.getElementById("play-again-hurray");
  const nextBtn = document.getElementById("next-btn");

  let player = +localStorage.getItem("playerScore") || 0;
  let computer = +localStorage.getItem("computerScore") || 0;
  let playerWonRound = false;

  playerScore.innerText = player;
  computerScore.innerText = computer;

  // Event Listener for Choice Buttons
  document.querySelectorAll(".choice").forEach(btn => {
    btn.addEventListener("click", () => {
      const userChoice = btn.dataset.choice;
      const pcChoice = choices[Math.floor(Math.random() * 3)];
      showResult(userChoice, pcChoice);
    });
  });

  function showResult(user, pc) {
    choicePanel.classList.add("hidden");
    resultPanel.classList.remove("hidden");
    document.querySelector('.triangle-container').classList.add('hidden');

    let isTie = user === pc;
    playerWonRound = false;

    if (isTie) {
      resultText.innerHTML = `<span class="result-main">TIE UP</span>`;
      nextBtn.style.display = "none";
    } else if (
      (user === "rock" && pc === "scissors") ||
      (user === "paper" && pc === "rock") ||
      (user === "scissors" && pc === "paper")
    ) {
      playerWonRound = true;
      resultText.innerHTML = `<span class="result-main">YOU WIN</span><br><span class="result-sub">AGAINST PC</span>`;
      player++;
      localStorage.setItem("playerScore", player);
      playerScore.innerText = player;
      nextBtn.style.display = "inline-block";
    } else {
      resultText.innerHTML = `<span class="result-main">YOU LOST</span><br><span class="result-sub">AGAINST PC</span>`;
      computer++;
      localStorage.setItem("computerScore", computer);
      computerScore.innerText = computer;
      nextBtn.style.display = "none";
    }

    yourPick.innerHTML = getChoiceHTML(user, playerWonRound);
    pcPick.innerHTML = getChoiceHTML(pc, !playerWonRound && !isTie);
  }

  function getChoiceHTML(choice, isWinner = false) {
    let circleImg = "";
    if (choice === "rock") circleImg = "bluecircle.png";
    if (choice === "paper") circleImg = "page.png";
    if (choice === "scissors") circleImg = "scissorcircle.png";

    return `
      <div class="result-choice ${isWinner ? "winner-glow" : ""}">
        ${isWinner ? `
          <img src="./Assets/circle1.png" class="glow-circle glow1" />
          <img src="./Assets/circle2.png" class="glow-circle glow2" />
          <img src="./Assets/circle3.png" class="glow-circle glow3" />
        ` : ""}
        <img class="circle" src="../Assets/${circleImg}" />
        <img class="icon" src="../Assets/${choice}.svg" />
      </div>
    `;
  }

  // Replay Buttons
  playAgain?.addEventListener("click", () => {
    resultPanel.classList.add("hidden");
    choicePanel.classList.remove("hidden");
    document.querySelector('.triangle-container').classList.remove('hidden');
  });

  playAgainHurray?.addEventListener("click", () => {
    hurrayPanel.classList.add("hidden");
    choicePanel.classList.remove("hidden");
    document.querySelector('.triangle-container').classList.remove('hidden');
  });

  rulesBtn?.addEventListener("click", () => {
  rulesPopup.classList.remove("hidden");
});
  closeRules?.addEventListener("click", () => {
  rulesPopup.classList.add("hidden");
});


  // Next Button
  nextBtn?.addEventListener("click", () => {
    resultPanel.classList.add("hidden");
    if (playerWonRound) {
      hurrayPanel.classList.remove("hidden");
      hurrayPanel.style.display = "flex";
    } else {
      choicePanel.classList.remove("hidden");
      document.querySelector('.triangle-container').classList.remove('hidden');
    }
  });
});
