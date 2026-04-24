const params = new URLSearchParams(window.location.search);
const type = params.get("type") || "hira";
const kana = params.get("kana") || "a";
const module = await import(`../data/${type}_${kana}.js`);
const data = module.default;
const timerDisplay = document.getElementById("timer-display");
const missDisplay = document.getElementById("miss-display");

// 表示用
const kanaLabelMap = {
  a: "あ", i: "い", u: "う", e: "え", o: "お",
  ka: "か", ki: "き", ku: "く", ke: "け", ko: "こ",
  sa: "さ", shi: "し", su: "す", se: "せ", so: "そ"
};

const kanaDisplay = kanaLabelMap[kana] || kana;
const typeDisplay = type === "hira" ? "ひらがな" : "カタカナ";

// 🔥 DOMキャッシュ（重要）
const romajiDisplay = document.getElementById("romaji-display");
const cardsDiv = document.getElementById("cards");
const remainingDisplay = document.getElementById("remaining-display");
const resultTextEl = document.getElementById("result-text");
const resultModal = document.getElementById("result-modal");

// 状態
let questionCount = 0;
let missCount = 0;
let startTime = performance.now();
let timerInterval;
let correctAnswer = null;
let wrongAnswers = [];
let usedQuestions = [];

// =====================
// 初期描画
// =====================
remainingDisplay.textContent = "のこり：" + data.length;
missDisplay.textContent = "ミス：0";

// シャッフル
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// 問題生成
function loadQuestion() {
  // 残り計算
  const remaining = data.filter(item => !usedQuestions.includes(item.id));

  // 🔥 表示更新
  if (questionCount === 0) {
    startTime = performance.now();

    timerInterval = setInterval(() => {
      const t = (performance.now() - startTime) / 1000;
      document.getElementById("timer-display").textContent = t.toFixed(2);
    }, 50);
  }

  remainingDisplay.textContent = "のこり：" + remaining.length;

  // 終了チェック
  if (remaining.length === 0) {
    showResult();
    return;
  }

  // 正解選択
  correctAnswer = remaining[Math.floor(Math.random() * remaining.length)];
  usedQuestions.push(correctAnswer.id);

  // 問題表示
  romajiDisplay.textContent = correctAnswer.romaji;

  // カード生成
  const selected = shuffle([...data]);
  cardsDiv.innerHTML = "";

  selected.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = `images/${item.img}`;

    const label = document.createElement("div");
    label.className = "card-label";
    label.textContent = item.word;

    card.appendChild(img);
    card.appendChild(label);

    card.onclick = () => checkAnswer(item, card);

    cardsDiv.appendChild(card);
  });

  // 音声
  setTimeout(() => {
    playAudio();
  }, 500);
}

// 音声
window.playAudio = function () {
  const utter = new SpeechSynthesisUtterance(correctAnswer.sentence);
  utter.lang = "ja-JP";
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
};

document.getElementById("sound-btn").addEventListener("click", playAudio);

// 判定
function checkAnswer(selected, card) {
  if (selected.id === correctAnswer.id) {
    speechSynthesis.cancel();

    const sound = new Audio("sounds/correct.mp3");
    sound.volume = 0.4;
    sound.play();

    questionCount++;

    setTimeout(() => {
      loadQuestion();
    }, 500);

  } else {
    const sound = new Audio("sounds/wrong.mp3");
    sound.volume = 0.4;
    sound.play();

    missCount++;
    missDisplay.textContent = "ミス：" + missCount;

    if (!wrongAnswers.includes(correctAnswer.id)) {
      wrongAnswers.push(correctAnswer.id);
    }

    card.style.animation = "shake 0.3s";
    setTimeout(() => {
      card.style.animation = "";
    }, 300);
  }
}

// 結果表示
function showResult() {
  clearInterval(timerInterval);

  const endTime = performance.now();
  const time = ((endTime - startTime) / 1000).toFixed(2);

  const now = new Date();
  const dateStr = now.toLocaleString();

  let wordList = "";

  data.forEach(item => {
    const isWrong = wrongAnswers.includes(item.id);
    const mark = isWrong ? "★" : "　";
    wordList += `${mark} ${item.word}（${item.lesson}課）<br>`;
  });

  const resultText = `
    実施日時：${dateStr}<br><br>
    【${typeDisplay}　${kanaDisplay}】<br>
    時間：${time}秒<br>
    ミス★：${missCount}回<br><br>
    ＜今回の単語＞<br>
    ${wordList}
  `;

  resultTextEl.innerHTML = resultText;
  resultModal.classList.remove("hidden");
}

// 再スタート
window.restartGame = function () {
  questionCount = 0;
  missCount = 0;
  startTime = Date.now();
  usedQuestions = [];
  wrongAnswers = [];
  missDisplay.textContent = "ミス：0";
  remainingDisplay.textContent = "のこり：" + data.length;
  resultModal.classList.add("hidden");

  loadQuestion();
};

// 戻る
window.goBack = function () {
  history.back();
};

// 初期実行
loadQuestion();