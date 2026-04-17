const params = new URLSearchParams(window.location.search);
const type = params.get("type") || "hira";
const kana = params.get("kana") || "a";
const module = await import(`../data/${type}_${kana}.js`);
const data = module.default;

let questionCount = 0;
let missCount = 0;
let startTime = Date.now();

let correctAnswer = null;
let wrongAnswers = [];
let usedQuestions = [];

// シャッフル
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// 問題生成
function loadQuestion() {
  // 5問終了チェック
  if (questionCount >= 5) {
    showResult();
    return;
  }

  // 🔥 これを追加
  const remaining = data.filter(item => !usedQuestions.includes(item.id));

  // 念のため
  if (remaining.length === 0) {
    showResult();
    return;
  }
  
  // 正解選択（未出題から）
  correctAnswer = remaining[Math.floor(Math.random() * remaining.length)];

  // 履歴に追加
  usedQuestions.push(correctAnswer.id);

  document.getElementById("romaji-display").textContent = correctAnswer.romaji;

  // カードは全データから5枚（ここ重要）
  const shuffled = shuffle([...data]);
  const selected = shuffled.slice(0, 5);

  const cardsDiv = document.getElementById("cards");
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

  // 自動音声
  playAudio();
}

// 音声
window.playAudio = function () {
  const utter = new SpeechSynthesisUtterance(correctAnswer.sentence);
  utter.lang = "ja-JP";
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
};

// 判定
function checkAnswer(selected, card) {
  if (selected.id === correctAnswer.id) {
    // 正解
    const sound = new Audio("sounds/correct.mp3");
    sound.volume = 0.6;  // 0.0〜1.0
    sound.play();

    questionCount++;

    setTimeout(() => {
      loadQuestion();
    }, 500);

  } else {
    // 不正解
    const sound = new Audio("sounds/wrong.mp3");
    sound.volume = 0.6;
    sound.play();
    // ミスカウント
    missCount++;
    // 不正解履歴に追加（重複なし）
    if (!wrongAnswers.includes(correctAnswer.id)) {
      wrongAnswers.push(correctAnswer.id);
    }
    // シェイク
    card.style.animation = "shake 0.3s";
    setTimeout(() => {
      card.style.animation = "";
    }, 300);
  }
}

// 結果表示
function showResult() {
  const endTime = Date.now();
  const time = ((endTime - startTime) / 1000).toFixed(1);

  const now = new Date();
  const dateStr = now.toLocaleString();

  // 単語一覧生成
  let wordList = "";

  data.forEach(item => {
    const isWrong = wrongAnswers.includes(item.id);
    const mark = isWrong ? "★" : "　";

    wordList += `${mark} ${item.word}（${item.lesson}課）<br>`;
  });

  const resultText = `
    実施日時：${dateStr}<br><br>
    時間：${time}秒<br>
    ミス★：${missCount}回<br><br>
    ＜今回の単語＞<br>
    ${wordList}
  `;

  document.getElementById("result-text").innerHTML = resultText;
  document.getElementById("result-modal").classList.remove("hidden");
}

// 再スタート
window.restartGame = function () {
  questionCount = 0;
  missCount = 0;
  startTime = Date.now();
  usedQuestions = [];
  wrongAnswers = [];

  document.getElementById("result-modal").classList.add("hidden");

  loadQuestion();
};

// 戻る
window.goBack = function () {
  history.back();
};

// 初期実行
loadQuestion();