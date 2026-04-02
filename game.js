// ひらがな清音の配列
const SEION = [
    { kana_char: "あ", romaji: "a" }, { kana_char: "い", romaji: "i" }, { kana_char: "う", romaji: "u" }, { kana_char: "え", romaji: "e" }, { kana_char: "お", romaji: "o" },
    { kana_char: "か", romaji: "ka" }, { kana_char: "き", romaji: "ki" }, { kana_char: "く", romaji: "ku" }, { kana_char: "け", romaji: "ke" }, { kana_char: "こ", romaji: "ko" },
    { kana_char: "さ", romaji: "sa" }, { kana_char: "し", romaji: "shi" }, { kana_char: "す", romaji: "su" }, { kana_char: "せ", romaji: "se" }, { kana_char: "そ", romaji: "so" },
    { kana_char: "た", romaji: "ta" }, { kana_char: "ち", romaji: "chi" }, { kana_char: "つ", romaji: "tsu" }, { kana_char: "て", romaji: "te" }, { kana_char: "と", romaji: "to" },
    { kana_char: "な", romaji: "na" }, { kana_char: "に", romaji: "ni" }, { kana_char: "ぬ", romaji: "nu" }, { kana_char: "ね", romaji: "ne" }, { kana_char: "の", romaji: "no" },
    { kana_char: "は", romaji: "ha" }, { kana_char: "ひ", romaji: "hi" }, { kana_char: "ふ", romaji: "fu" }, { kana_char: "へ", romaji: "he" }, { kana_char: "ほ", romaji: "ho" },
    { kana_char: "ま", romaji: "ma" }, { kana_char: "み", romaji: "mi" }, { kana_char: "む", romaji: "mu" }, { kana_char: "め", romaji: "me" }, { kana_char: "も", romaji: "mo" },
    { kana_char: "や", romaji: "ya" }, { kana_char: "", romaji: "" }, { kana_char: "ゆ", romaji: "yu" }, { kana_char: "", romaji: "" }, { kana_char: "よ", romaji: "yo" },
    { kana_char: "ら", romaji: "ra" }, { kana_char: "り", romaji: "ri" }, { kana_char: "る", romaji: "ru" }, { kana_char: "れ", romaji: "re" }, { kana_char: "ろ", romaji: "ro" },
    { kana_char: "わ", romaji: "wa" }, { kana_char: "", romaji: "" }, { kana_char: "を", romaji: "wo" }, { kana_char: "", romaji: "" }, { kana_char: "ん", romaji: "n" }
];
// ひらがな濁音・半濁音の配列
const DAKUON = [
    { kana_char: "が", romaji: "ga" }, { kana_char: "ぎ", romaji: "gi" }, { kana_char: "ぐ", romaji: "gu" }, { kana_char: "げ", romaji: "ge" }, { kana_char: "ご", romaji: "go" },
    { kana_char: "ざ", romaji: "za" }, { kana_char: "じ", romaji: "ji" }, { kana_char: "ず", romaji: "zu" }, { kana_char: "ぜ", romaji: "ze" }, { kana_char: "ぞ", romaji: "zo" },
    { kana_char: "だ", romaji: "da" }, { kana_char: "ぢ", romaji: "di" }, { kana_char: "づ", romaji: "du" }, { kana_char: "で", romaji: "de" }, { kana_char: "ど", romaji: "do" },
    { kana_char: "ば", romaji: "ba" }, { kana_char: "び", romaji: "bi" }, { kana_char: "ぶ", romaji: "bu" }, { kana_char: "べ", romaji: "be" }, { kana_char: "ぼ", romaji: "bo" },
    { kana_char: "ぱ", romaji: "pa" }, { kana_char: "ぴ", romaji: "pi" }, { kana_char: "ぷ", romaji: "pu" }, { kana_char: "ぺ", romaji: "pe" }, { kana_char: "ぽ", romaji: "po" }
];
// ひらがな拗音の配列
const YOUON = [
    { kana_char: "きゃ", romaji: "kya" }, { kana_char: "", romaji: "" }, { kana_char: "きゅ", romaji: "kyu" }, { kana_char: "", romaji: "" }, { kana_char: "きょ", romaji: "kyo" },
    { kana_char: "しゃ", romaji: "sha" }, { kana_char: "", romaji: "" }, { kana_char: "しゅ", romaji: "shu" }, { kana_char: "", romaji: "" }, { kana_char: "しょ", romaji: "sho" },
    { kana_char: "ちゃ", romaji: "cha" }, { kana_char: "", romaji: "" }, { kana_char: "ちゅ", romaji: "chu" }, { kana_char: "", romaji: "" }, { kana_char: "ちょ", romaji: "cho" },
    { kana_char: "にゃ", romaji: "nya" }, { kana_char: "", romaji: "" }, { kana_char: "にゅ", romaji: "nyu" }, { kana_char: "", romaji: "" }, { kana_char: "にょ", romaji: "nyo" },
    { kana_char: "ひゃ", romaji: "hya" }, { kana_char: "", romaji: "" }, { kana_char: "ひゅ", romaji: "hyu" }, { kana_char: "", romaji: "" }, { kana_char: "ひょ", romaji: "hyo" },
    { kana_char: "みゃ", romaji: "mya" }, { kana_char: "", romaji: "" }, { kana_char: "みゅ", romaji: "myu" }, { kana_char: "", romaji: "" }, { kana_char: "みょ", romaji: "myo" },
    { kana_char: "りゃ", romaji: "rya" }, { kana_char: "", romaji: "" }, { kana_char: "りゅ", romaji: "ryu" }, { kana_char: "", romaji: "" }, { kana_char: "りょ", romaji: "ryo" },
    { kana_char: "ぎゃ", romaji: "gya" }, { kana_char: "", romaji: "" }, { kana_char: "ぎゅ", romaji: "gyu" }, { kana_char: "", romaji: "" }, { kana_char: "ぎょ", romaji: "gyo" },
    { kana_char: "じゃ", romaji: "ja" }, { kana_char: "", romaji: "" }, { kana_char: "じゅ", romaji: "ju" }, { kana_char: "", romaji: "" }, { kana_char: "じょ", romaji: "jo" },
    { kana_char: "びゃ", romaji: "bya" }, { kana_char: "", romaji: "" }, { kana_char: "びゅ", romaji: "byu" }, { kana_char: "", romaji: "" }, { kana_char: "びょ", romaji: "byo" },
    { kana_char: "ぴゃ", romaji: "pya" }, { kana_char: "", romaji: "" }, { kana_char: "ぴゅ", romaji: "pyu" }, { kana_char: "", romaji: "" }, { kana_char: "ぴょ", romaji: "pyo" },
];
// ひらがな清音をカタカナに変換する関数
const KATAKANA_SEION = SEION.map(q => ({
    kana_char: q.kana_char ? toKatakana(q.kana_char) : "",
    romaji: q.romaji
}));
// ひらがな濁音・半濁音をカタカナに変換する関数
const KATAKANA_DAKUON = DAKUON.map(q => ({
    kana_char: q.kana_char ? toKatakana(q.kana_char) : "",
    romaji: q.romaji
}));
// ひらがな拗音をカタカナに変換する関数
const KATAKANA_YOUON = YOUON.map(q => ({
    kana_char: q.kana_char ? toKatakana(q.kana_char) : "",
    romaji: q.romaji
}));
// カタカナの外来語由来の拡張音（ファ行、ティ・ディ、チェ・ジェ・シェなど）
const KATAKANA_EXTRA = [
    { kana_char: "ファ", romaji: "fa" }, { kana_char: "フィ", romaji: "fi" }, { kana_char: "", romaji: "" }, { kana_char: "フェ", romaji: "fe" }, { kana_char: "フォ", romaji: "fo" },
    { kana_char: "", romaji: "" }, { kana_char: "", romaji: "" }, { kana_char: "", romaji: "" }, { kana_char: "シェ", romaji: "she" }, { kana_char: "", romaji: "" },
    { kana_char: "", romaji: "" }, { kana_char: "", romaji: "" }, { kana_char: "", romaji: "" }, { kana_char: "ジェ", romaji: "je" }, { kana_char: "", romaji: "" },
    { kana_char: "", romaji: "" }, { kana_char: "", romaji: "" }, { kana_char: "", romaji: "" }, { kana_char: "チェ", romaji: "che" }, { kana_char: "", romaji: "" },
    { kana_char: "", romaji: "" }, { kana_char: "ティ", romaji: "thi" }, { kana_char: "", romaji: "" }, { kana_char: "", romaji: "" }, { kana_char: "", romaji: "" },
    { kana_char: "", romaji: "" }, { kana_char: "ディ", romaji: "dhi" }, { kana_char: "", romaji: "" }, { kana_char: "", romaji: "" }, { kana_char: "", romaji: "" },
    { kana_char: "", romaji: "" }, { kana_char: "", romaji: "" }, { kana_char: "トゥ", romaji: "twu" }, { kana_char: "", romaji: "" },  { kana_char: "", romaji: "" },
];
// ひらがな→カタカナ変換関数
function toKatakana(str) {
    return str.replace(/[\u3041-\u3096]/g, ch =>
        String.fromCharCode(ch.charCodeAt(0) + 0x60)
    );
}

// =====================
// ゲームタイプ判定
// =====================
const urlParams = new URLSearchParams(window.location.search);
const gameType = urlParams.get("type");

// =====================
// データ（あなた版）
// =====================
let QUESTIONS = [];

if (gameType === "seion") {
    QUESTIONS = SEION;
} else if (gameType === "dakuon") {
    QUESTIONS = DAKUON;
} else if (gameType === "youon") {
    QUESTIONS = YOUON;
} else if (gameType === "katakana-seion") {
    QUESTIONS = KATAKANA_SEION;
} else if (gameType === "katakana-dakuon") {
    QUESTIONS = KATAKANA_DAKUON;
} else if (gameType === "katakana-youon") {
    QUESTIONS = KATAKANA_YOUON;
} else if (gameType === "katakana-extra") {
    QUESTIONS = KATAKANA_EXTRA;
}


// =====================
let remaining = {};
let current = "";
let startTime = 0;
let timerInterval;
let missCount = 0;

// =====================
// 初期描画
// =====================
document.getElementById("remaining-display").textContent = "のこり：-";
document.getElementById("miss-display").textContent = "ミス：-";

const container = document.getElementById("card-container");

QUESTIONS.forEach(q => {
    const div = document.createElement("div");

    if (q.kana_char === "") {
        div.className = "card-custom empty";
    } else {
        div.className = "card-custom kana-button";
        div.dataset.kana = q.kana_char;
        div.dataset.romaji = q.romaji;
        div.textContent = q.kana_char;

        div.addEventListener("click", handleClick);
    }

    container.appendChild(div);
});

// =====================
// スタート
// =====================
document.getElementById("start-btn").addEventListener("click", startGame);

function startGame() {
    remaining = {};
    missCount = 0;

    document.querySelectorAll(".kana-button").forEach(card => {
        card.style.visibility = "visible";
        remaining[card.dataset.romaji] = card.dataset.kana;
    });

    updateRemainingDisplay();

    document.getElementById("start-btn").style.display = "none";
    document.getElementById("card-container").classList.remove("disabled");

    document.getElementById("remaining-display").textContent = "のこり：" + Object.keys(remaining).length;

    document.getElementById("miss-display").textContent = "ミス：0";

    startTime = performance.now();

    timerInterval = setInterval(() => {
        const t = (performance.now() - startTime) / 1000;
        document.getElementById("timer-display").textContent = t.toFixed(2);
    }, 50);

    nextQuestion();
}

// =====================
function nextQuestion() {
    const keys = Object.keys(remaining);
    current = keys[Math.floor(Math.random() * keys.length)];
    document.getElementById("romaji-display").textContent = current;
}

// =====================
function handleClick(e) {
    const card = e.target;

    if (card.dataset.romaji === current) {
        // 正解時の動作
        // // 🔊 正解音
        // document.getElementById("sound-correct").play();
        // カード消去
        card.style.visibility = "hidden";
        delete remaining[current];

        document.getElementById("remaining-display").textContent = "のこり：" + Object.keys(remaining).length;

        if (Object.keys(remaining).length === 0) {
            endGame();
        } else {
            nextQuestion();
        }

    } else {
        // ❌ ミス時の動作
        // 🔊 ミス音
        const wrongSound = document.getElementById("sound-wrong");
        wrongSound.volume = 0.3; // 0〜1（0.3くらいがちょうどいい）
        wrongSound.currentTime = 0; // 連続で鳴らすために再生位置をリセット
        wrongSound.play();
        //  画面シェイク
        document.body.style.animation = "shake 0.2s";
        setTimeout(() => document.body.style.animation = "", 200);
        // ミス数インクリメント
        missCount++;
        document.getElementById("miss-display").textContent =
    "ミス：" + missCount;

    }
}

// =====================
function endGame() {
    clearInterval(timerInterval);

    const time = ((performance.now() - startTime) / 1000).toFixed(2);

    document.getElementById("final-time").textContent = time + " 秒";
    document.getElementById("miss-result").textContent =
    "ミス：" + missCount + " 回";
    document.getElementById("game-type-label").textContent =
        "モード：" + getGameLabel(gameType);
    document.getElementById("result-modal").classList.remove("hidden");
}

// モーダル表示用のラベル
function getGameLabel(type) {
    if (type === "seion") return "ひらがな（せいおん）";
    if (type === "dakuon") return "ひらがな（だくおん）";
    if (type === "youon") return "ひらがな（ようおん）";

    if (type === "katakana-seion") return "カタカナ（せいおん）";
    if (type === "katakana-dakuon") return "カタカナ（だくおん）";
    if (type === "katakana-youon") return "カタカナ（ようおん）";
    if (type === "katakana-extra") return "カタカナ（外来語）";

    return type;
}

// =====================
function restartGame() {
    location.reload();
}

function goMenu() {
    location.href = "index.html";
}

document.getElementById("card-container").classList.add("disabled");

function updateRemainingDisplay() {
    const count = Object.keys(remaining).length;
    document.getElementById("remaining-display").textContent = count;
}