//  Automatic update the year
document.getElementById('year').textContent = new Date().getFullYear();

const levels = [
    {
        title: "Level 001",
        text: "We will start out simple: <br> Press the button!",
        buttons: [
            { text: "Button", correct: true }
        ]
},

    {
        title: "Level 002",
        text: "Good job, you clicked on the button <br> Let's do it again. Click on the right button!",
        buttons: [
            { text: "I'm the button!", correct: false },
            { text:"No, I'm right!", correct: true }
        ]
    },

    {
  title: "Level 003",
  text: 'That was not to hard. Let\'s make it more interesting. <br> Click the <a href="#" class="next-link">button</a> to continue.',
  buttons: [
    { text: "Button 1", correct: false },
    { text: "Button 2", correct: false },
    { text: "Button 3", correct: false }
  ]
}

];


  let currentLevel = 0;

const title = document.getElementById("level-title");
const gameArea = document.getElementById("game-area");

// Ladda första nivån när sidan startar
loadLevel(currentLevel);

function loadLevel(game) {
  const level = levels[game];
  title.textContent = level.title;

  // Skapa text och knappar
  gameArea.innerHTML = `
    <p>${level.text}</p>
    <div class="guess-btn">
      ${level.buttons.map((btn, i) => `
        <div class="lvl-btn" data-correct="${btn.correct}">${btn.text}</div>
      `).join('')}
    </div>
  `;

  // Lägg till klick-händelser
  document.querySelectorAll(".lvl-btn").forEach(btn => {
    btn.addEventListener("click", () => handleClick(btn));
  });

    const link = document.querySelector(".next-link");
  if (link) {
    link.addEventListener("click", e => {
      e.preventDefault(); // förhindrar vanlig länk
      handleClick({ getAttribute: () => "true" }); // simulera “rätt knapp”
    });
  }
}

function handleClick(button) {
  const correct = button.getAttribute("data-correct") === "true";

  if (correct) {
    currentLevel++;
    if (currentLevel < levels.length) {
      loadLevel(currentLevel);
    } else {
      gameArea.innerHTML = `<p>You finished all levels at the moment! <br> More levels are under construction!</p>`;
      title.textContent = "The End";
    }
 } else {
  // Ta bort tidigare felmeddelande om det finns
  const oldMsg = document.querySelector("#wrong-msg");
  if (oldMsg) {
    oldMsg.remove();
  }

  // Skapa nytt felmeddelande
  const msg = document.createElement("p");
  msg.id = "wrong-msg"; // ge det ett ID så vi kan hitta det nästa gång
  msg.textContent = "Oops! Try again!";
  msg.style.color = "red";

  gameArea.appendChild(msg);
} };