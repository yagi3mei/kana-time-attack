const params = new URLSearchParams(window.location.search);
const kana = params.get("kana") || "a";

const module = await import(`../data/${kana}.js`);
const data = module.default;

let current = 0;
let correctAnswer = null;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
  const shuffled = shuffle([...data]);
  const selected = shuffled.slice(0, 5);

  correctAnswer = selected[Math.floor(Math.random() * 5)];

  document.getElementById("romaji-display").textContent = correctAnswer.romaji;

  const cardsDiv = document.getElementById("cards");
  cardsDiv.innerHTML = "";

  selected.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = `../images/${item.img}`;

    const label = document.createElement("div");
    label.className = "card-label";
    label.textContent = item.word;

    card.appendChild(img);
    card.appendChild(label);

    card.onclick = () => checkAnswer(item);

    cardsDiv.appendChild(card);
  });
}

window.goBack = function() {
  window.history.back();
};

window.playAudio = function() {
  const utter = new SpeechSynthesisUtterance(correctAnswer.sentence);
  utter.lang = "ja-JP";
  speechSynthesis.speak(utter);
};

function checkAnswer(selected) {
  if (selected.id === correctAnswer.id) {
    alert("正解！");
    current++;
    loadQuestion();
  } else {
    alert("不正解！");
  }
}

loadQuestion();