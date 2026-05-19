/* =========================================
   File: storage.js
   Purpose: 学習記録の保存・取得 共通モジュール
   Author: やぎさん
   Created: 2026-05-19

   Notes:
   - localStorage を使用
   - 各ゲームの最高記録のみ保存
   - ミス数優先 → 時間優先
========================================= */

/* =========================
   localStorage キー名
========================= */
const STORAGE_KEY = "kotorun-score";


/* =========================
   全スコア取得
========================= */
export function loadScores() {

    const data = localStorage.getItem(STORAGE_KEY);

    // 初回起動時
    if (!data) {
        return {};
    }

    try {
        return JSON.parse(data);

    } catch (error) {

        console.error("score load error", error);

        return {};
    }
}


/* =========================
   全スコア保存
========================= */
function saveAllScores(scores) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(scores)
    );
}


/* =========================
   スコア更新判定

   true  → 更新する
   false → 更新しない
========================= */
export function shouldUpdate(oldScore, newScore) {

    // データがないなら保存
    if (!oldScore) {
        return true;
    }

    // ミス数優先
    if (newScore.miss < oldScore.miss) {
        return true;
    }

    if (newScore.miss > oldScore.miss) {
        return false;
    }

    // ミス同じなら時間比較
    if (newScore.time < oldScore.time) {
        return true;
    }

    return false;
}


/* =========================
   スコア保存

   category:
       kana
       karuta
       family
       counter
       など

   key:
       hiragana_seion
       a
       watashi_no
       tsu
       など
========================= */
export function saveScore(category, key, result) {

    const scores = loadScores();

    // category がないなら作成
    if (!scores[category]) {
        scores[category] = {};
    }

    const oldScore = scores[category][key];

    // 更新判定
    if (shouldUpdate(oldScore, result)) {

        scores[category][key] = {

            time: result.time,
            miss: result.miss,
            date: result.date
        };

        saveAllScores(scores);

        return true;
    }

    return false;
}


/* =========================
   スコア取得
========================= */
export function getScore(category, key) {

    const scores = loadScores();

    return scores?.[category]?.[key] || null;
}


/* =========================
   category 単位取得

   例:
   getCategoryScores("kana")
========================= */
export function getCategoryScores(category) {

    const scores = loadScores();

    return scores?.[category] || {};
}


/* =========================
   全削除（開発用）
========================= */
export function clearScores() {

    localStorage.removeItem(STORAGE_KEY);
}