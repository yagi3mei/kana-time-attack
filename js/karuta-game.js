// =========================================
//      File: karuta-game.js
//      Purpose: たんごかるたゲームのプレイロジック（問題生成・判定・結果表示）
//      Author: やぎさん
//      Created: 2026-04-09
//      Updated: 2026-04-30: CSSファイル分割に伴う読み込み構造の変更
//      Updated: 2026-05-17: かるたゲームからたんごかるたへ名称変更
//      Updated: 2026-05-20: LocalStorageベスト記録保存・結果モーダル拡張対応
//
//      Notes:
//      - たんごかるたゲームの共通JavaScriptファイル
//      - karuta-list.htmlからURLパラメータ（type, kana）を受け取りゲーム内容を切り替える
//      - 動的importを使用してデータファイル（../data/${type}_${kana}.js）を読み込む
//      - ゲームのロジック（問題選択、入力判定、タイマー、ミスカウントなど）を実装
//      - LocalStorageにベスト記録を保存
// ========================================= 

import { saveScore, getScore } from "./storage.js";

const params = new URLSearchParams(window.location.search);

const type = params.get("type") || "hira";
const group = params.get("group") || "seion";
const kana = params.get("kana") || "a";
const kanaLabel = params.get("label") || kana;

const module =
  await import(`../data/kana/${type}/${group}/${type}_${kana}.js`);

const data = module.default;

const timerDisplay =
  document.getElementById("timer-display");

const missDisplay =
  document.getElementById("miss-display");


/* =========================
    画像フォルダ定数
========================= */

const IMAGE_DIR_MAP = {

  hira: {
    seion: "images/hiragana-seion/",
    dakuon: "images/hiragana-dakuon/",
    youon: "images/hiragana-youon/"
  },

  kata: {
    seion: "images/katakana-seion/"
  }

};


/* type + group に応じて自動切替 */
const IMAGE_DIR =
  IMAGE_DIR_MAP[type]?.[group]
  || "images/hiragana-seion/";

const typeDisplay =
  type === "hira"
    ? "ひらがな"
    : "カタカナ";

const groupDisplayMap = {
  seion: "せいおん",
  dakuon: "だくおん",
  youon: "ようおん"
};

const groupDisplay =
  groupDisplayMap[group] || "";


/* DOMキャッシュ */
const romajiDisplay =
  document.getElementById("romaji-display");

const cardsDiv =
  document.getElementById("cards");

const remainingDisplay =
  document.getElementById("remaining-display");

const resultModal =
  document.getElementById("result-modal");


/* =========================
    結果モーダル用
========================= */
const gameTypeLabel =
  document.getElementById("game-type-label");

const dateTime =
  document.getElementById("date-time");

const missResult =
  document.getElementById("miss-result");

const finalTime =
  document.getElementById("final-time");

const bestMessage =
  document.getElementById("best-message");

const bestDate =
  document.getElementById("best-date");

const bestMiss =
  document.getElementById("best-miss");

const bestTime =
  document.getElementById("best-time");

const wordListArea =
  document.getElementById("word-list-area");


/* 状態管理 */
let questionCount = 0;
let missCount = 0;
let startTime = performance.now();
let timerInterval;

let correctAnswer = null;

let wrongAnswers = [];
let usedQuestions = [];


/* 初期描画 */
remainingDisplay.textContent =
  "のこり：" + data.length;

missDisplay.textContent =
  "ミス：0";


/* =========================
    localStorageキー
========================= */
function getStorageKey() {

  return `${type}-${group}-${kana}`;

}


/* 配列シャッフル */
function shuffle(array) {

  return array.sort(() => Math.random() - 0.5);

}


/* =====================
問題生成
===================== */
function loadQuestion() {

  const remaining = data.filter(
    item => !usedQuestions.includes(item.id)
  );


  if (questionCount === 0) {

    startTime = performance.now();

    timerInterval = setInterval(() => {

      const t =
        (performance.now() - startTime) / 1000;

      timerDisplay.textContent =
        t.toFixed(2);

    }, 50);

  }


  remainingDisplay.textContent =
    "のこり：" + remaining.length;


  if (remaining.length === 0) {

    showResult();
    return;

  }


  correctAnswer =
    remaining[
      Math.floor(Math.random() * remaining.length)
    ];

  usedQuestions.push(correctAnswer.id);

  romajiDisplay.textContent =
    correctAnswer.romaji;


  /* カード生成 */
  const selected = shuffle([...data]);

  cardsDiv.innerHTML = "";

  selected.forEach(item => {

    const card = document.createElement("div");

    card.className = "card";

    const img = document.createElement("img");

    img.src = IMAGE_DIR + item.img;

    const label = document.createElement("div");

    label.className = "card-label";

    label.textContent = item.word;

    card.appendChild(img);
    card.appendChild(label);

    card.onclick =
      () => checkAnswer(item, card);

    cardsDiv.appendChild(card);

  });


  setTimeout(() => {

    playAudio();

  }, 500);

}


/* =====================
音声
===================== */
window.playAudio = function () {

  const utter =
    new SpeechSynthesisUtterance(
      correctAnswer.sentence
    );

  utter.lang = "ja-JP";

  speechSynthesis.cancel();

  speechSynthesis.speak(utter);

};

document
  .getElementById("sound-btn")
  .addEventListener("click", playAudio);


/* =====================
回答判定
===================== */
function checkAnswer(selected, card) {

  if (selected.id === correctAnswer.id) {

    speechSynthesis.cancel();

    const sound =
      new Audio("sounds/correct.mp3");

    sound.volume = 0.4;

    sound.play();

    questionCount++;

    setTimeout(() => {

      loadQuestion();

    }, 500);

  } else {

    const sound =
      new Audio("sounds/wrong.mp3");

    sound.volume = 0.4;

    sound.play();

    missCount++;

    missDisplay.textContent =
      "ミス：" + missCount;


    if (!wrongAnswers.includes(correctAnswer.id)) {

      wrongAnswers.push(correctAnswer.id);

    }


    card.style.animation =
      "shake 0.3s";

    setTimeout(() => {

      card.style.animation = "";

    }, 300);

  }

}


/* =====================
結果表示
===================== */
function showResult() {

  clearInterval(timerInterval);

  const endTime = performance.now();

  const time =
    ((endTime - startTime) / 1000).toFixed(2);

  const now = new Date();

  const dateStr =
    now.toLocaleString();

  /* =====================
      単語一覧生成
  ===================== */
  let wordList = "";

  data.forEach(item => {

    const isWrong =
      wrongAnswers.includes(item.id);

    const mark =
      isWrong ? "★" : "　";

    wordList +=
      `${mark} ${item.word}（${item.lesson}課）<br>`;

  });


  /* =====================
      ベスト判定
  ===================== */
  const oldBest = getScore(
    "karuta",
    getStorageKey()
  );


  const isBest =
    !oldBest
    || missCount < oldBest.miss
    || (
      missCount === oldBest.miss
      && Number(time) < oldBest.time
    );


  /* =====================
      スコア保存
  ===================== */
  saveScore(
    "karuta",
    getStorageKey(),
    {
      time: Number(time),
      miss: missCount,
      date: dateStr
    }
  );


  const best = getScore(
    "karuta",
    getStorageKey()
  );


  /* =====================
      今回結果表示
  ===================== */
  gameTypeLabel.textContent =
    `【${typeDisplay}　${kanaLabel}】`;

  dateTime.textContent =
    dateStr;

  missResult.textContent =
    `ミス：${missCount}回`;

  finalTime.textContent =
    `タイム：${time}秒`;


  /* =====================
      ベスト表示
  ===================== */
  if (isBest) {

    bestMessage.textContent =
      "🎉 ベストきろく　こうしん！";

    bestDate.textContent = "";
    bestMiss.textContent = "";
    bestTime.textContent = "";

  } else {

    bestMessage.textContent = "";

    bestDate.textContent =
      `いつ：${best.date}`;

    bestMiss.textContent =
      `ミス：${best.miss}回`;

    bestTime.textContent =
      `タイム：${best.time}秒`;

  }

  /* =====================
      単語一覧表示
  ===================== */
  wordListArea.innerHTML =
    wordList;


  resultModal.classList.remove("hidden");

}


/* =====================
再スタート
===================== */
window.restartGame = function () {

  questionCount = 0;

  missCount = 0;

  startTime = Date.now();

  usedQuestions = [];
  wrongAnswers = [];

  missDisplay.textContent =
    "ミス：0";

  remainingDisplay.textContent =
    "のこり：" + data.length;

  resultModal.classList.add("hidden");

  loadQuestion();

};


/* =====================
戻る
===================== */
window.goBack = function () {

  location.href =
    `karuta-list.html?type=${type}&group=${group}`;

};


/* 初期実行 */
loadQuestion();