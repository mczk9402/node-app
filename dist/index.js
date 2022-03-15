"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
// ターミナルに出力させるログ
var printLine = function (text, breakeLine) {
    if (breakeLine === void 0) { breakeLine = true; }
    process.stdout.write(text + (breakeLine ? '\n' : ''));
};
var promptInput = function (text) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        printLine("\n" + text + "\n", false);
        return [2 /*return*/, readLine()];
    });
}); };
var readLine = function () { return __awaiter(void 0, void 0, void 0, function () {
    var input;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new Promise(function (resolve) {
                    process.stdin.once('data', function (data) {
                        return resolve(data.toString());
                    });
                })];
            case 1:
                input = _a.sent();
                return [2 /*return*/, input.trim()];
        }
    });
}); };
// ジェネリクスで指定しないと同じ型でも違う値が返ってくるため？
var promptSelect = function (text, values) { return __awaiter(void 0, void 0, void 0, function () {
    var input;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                printLine("\n" + text);
                values.forEach(function (value) {
                    printLine("- " + value);
                });
                printLine('>', false);
                return [4 /*yield*/, readLine()];
            case 1:
                input = (_a.sent());
                if (values.includes(input)) {
                    return [2 /*return*/, input];
                }
                else {
                    return [2 /*return*/, promptSelect(text, values)];
                }
                return [2 /*return*/];
        }
    });
}); };
var gameTitles = ['hit and blow', 'janken'];
var nextActions = ['play again', 'change game', 'exit'];
var GameProcedure = /** @class */ (function () {
    function GameProcedure(gameStore) {
        this.gameStore = gameStore;
        this.currentGameTitle = "";
        this.currentGame = null;
    }
    GameProcedure.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.select()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.play()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GameProcedure.prototype.select = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, promptSelect('ゲームのタイトルを入力してください', gameTitles)];
                    case 1:
                        _a.currentGameTitle = _b.sent();
                        this.currentGame = this.gameStore[this.currentGameTitle];
                        return [2 /*return*/];
                }
            });
        });
    };
    GameProcedure.prototype.play = function () {
        return __awaiter(this, void 0, void 0, function () {
            var action, neverValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.currentGame)
                            throw new Error('ゲームが選択されていません');
                        printLine("===\n" + this.currentGameTitle + "\u3092\u958B\u59CB\u3057\u307E\u3059\n===");
                        return [4 /*yield*/, this.currentGame.setting()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.currentGame.play()];
                    case 2:
                        _a.sent();
                        this.currentGame.end();
                        return [4 /*yield*/, promptSelect('ゲームを続けますか？', nextActions)];
                    case 3:
                        action = _a.sent();
                        if (!(action === 'play again')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.play()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 5:
                        if (!(action === 'change game')) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.select()];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.play()];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        if (action === 'exit') {
                            this.end();
                        }
                        else {
                            neverValue = action;
                            throw new Error(neverValue + " is an invalid action.");
                        }
                        _a.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    GameProcedure.prototype.end = function () {
        printLine('ゲームを終了しました');
        process.exit();
    };
    return GameProcedure;
}());
// type Mode = 'normal' | 'hard' | 'very hard';
var modes = ['normal', 'hard', 'very hard'];
// number どのインデックスとは明示せずに全ての中身を対象する役割
// typeof hoge[number]
var HitAndBlow = /** @class */ (function () {
    function HitAndBlow() {
        this.answerSource = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        this.answer = [];
        this.tryCount = 0;
        this.mode = 'normal';
    }
    HitAndBlow.prototype.getAnswerLength = function () {
        switch (this.mode) {
            case 'normal':
                return 3;
            case 'hard':
                return 4;
            case 'very hard':
                return 5;
            default:
                var neverValue = this.mode;
                throw new Error(neverValue + "\u306F\u7121\u52B9\u306A\u30E2\u30FC\u30C9\u3067\u3059");
        }
    };
    // setting
    /*
    1「answerSource」からランダムに値を一つ取り出す
    2 その値がまだ使用されていないものであれば「answer」配列に追加する
    3「answer」配列が所定の数埋まるまで1~2を繰り返す
    */
    HitAndBlow.prototype.setting = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, answerLength, randomNum, selectItem;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, promptSelect('モードを入力してください', modes)];
                    case 1:
                        _a.mode = _b.sent();
                        answerLength = this.getAnswerLength();
                        while (this.answer.length < answerLength) {
                            randomNum = Math.floor(Math.random() * this.answerSource.length);
                            selectItem = this.answerSource[randomNum];
                            if (!this.answer.includes(selectItem)) {
                                // this.answer.push(selectItem);
                                this.answer = __spreadArray(__spreadArray([], this.answer), [selectItem]);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    HitAndBlow.prototype.play = function () {
        return __awaiter(this, void 0, void 0, function () {
            var answerLength, inputArr, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promptInput("\u6B63\u89E3\u306F" + this.answer);
                        answerLength = this.getAnswerLength();
                        return [4 /*yield*/, promptInput("\u300C,\u300D\u533A\u5207\u308A\u3067" + answerLength + "\u3064\u306E\u6570\u5B57\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044")];
                    case 1:
                        inputArr = (_a.sent()).split(',');
                        result = this.check(inputArr);
                        if (!!this.validate(inputArr)) return [3 /*break*/, 3];
                        printLine('無効な入力です');
                        return [4 /*yield*/, this.play()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3:
                        if (!(result.hit !== this.answer.length)) return [3 /*break*/, 5];
                        // 不正解だったら抜ける
                        printLine("---\nHit: " + result.hit + "\nBlow: " + result.blow + "\n---");
                        this.tryCount += 1;
                        return [4 /*yield*/, this.play()];
                    case 4:
                        _a.sent(); //ここでループするからthis.tryCountをifの下にかけない？
                        return [3 /*break*/, 6];
                    case 5:
                        // 正解だったら終了
                        this.tryCount += 1;
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    HitAndBlow.prototype.check = function (input) {
        var _this = this;
        var hitCount = 0;
        var blowCount = 0;
        input.forEach(function (value, index) {
            if (value === _this.answer[index]) {
                hitCount += 1;
            }
            else if (_this.answer.includes(value)) {
                blowCount += 1;
            }
        });
        return {
            hit: hitCount,
            blow: blowCount
        };
    };
    HitAndBlow.prototype.end = function () {
        printLine("\u6B63\u89E3\u3067\u3059\uFF01\n\u8A66\u884C\u56DE\u6570: " + this.tryCount + "\u56DE");
    };
    HitAndBlow.prototype.validate = function (inputArr) {
        // 三種類のバリデート？
        // every(),includes()もbooleanを返す？
        // every()テスト用
        var _this = this;
        // 入力された数字の数とこちらで用意した数があっているか
        var isLengthValid = inputArr.length === this.answer.length;
        // 入力された数字がこちらで用意した入力できる数字とあっているか
        var isAllAnswerSourceOption = inputArr.every(function (val) {
            // amswerSourceの中にvalが含まれているか
            return _this.answerSource.includes(val);
        });
        // 入力された数字が重複していないか
        var isAllDifferentValues = inputArr.every(function (val, i) {
            // 重複していたらindexOfが同じ番号を返す
            // 同じ番号だとindexとマッチしなくてfalseを返す
            return inputArr.indexOf(val) === i;
        });
        // 三つがtrueならtrueを返す？
        return isLengthValid && isAllAnswerSourceOption && isAllDifferentValues;
    };
    return HitAndBlow;
}());
var jankenOptions = ['rock', 'paper', 'scissors'];
var Janken = /** @class */ (function () {
    function Janken() {
        this.rounds = 0;
        this.currentRound = 1;
        this.result = {
            win: 0,
            lose: 0,
            draw: 0
        };
    }
    Janken.prototype.setting = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rounds, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Number;
                        return [4 /*yield*/, promptInput('何本勝負にしますか？')];
                    case 1:
                        rounds = _a.apply(void 0, [_b.sent()]);
                        if (!(Number.isInteger(rounds) && 0 < rounds)) return [3 /*break*/, 2];
                        this.rounds = rounds;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.setting()];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Janken.prototype.play = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userSelected, randomSelected, result, resultText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promptSelect("\u3010" + this.currentRound + "\u56DE\u6226\u3011\u9078\u629E\u80A2\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002", jankenOptions)];
                    case 1:
                        userSelected = _a.sent();
                        randomSelected = jankenOptions[Math.floor(Math.random() * 3)];
                        result = Janken.judge(userSelected, randomSelected);
                        switch (result) {
                            case 'win':
                                this.result.win += 1;
                                resultText = '勝ち';
                                break;
                            case 'lose':
                                this.result.lose += 1;
                                resultText = '負け';
                                break;
                            case 'draw':
                                this.result.draw += 1;
                                resultText = 'あいこ';
                                break;
                        }
                        printLine("---\n\u3042\u306A\u305F: " + userSelected + "\n\u76F8\u624B" + randomSelected + "\n" + resultText + "\n---");
                        if (!(this.currentRound < this.rounds)) return [3 /*break*/, 3];
                        this.currentRound += 1;
                        return [4 /*yield*/, this.play()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Janken.prototype.end = function () {
        printLine("\n" + this.result.win + "\u52DD" + this.result.lose + "\u6557" + this.result.draw + "\u5F15\u304D\u5206\u3051\u3067\u3057\u305F\u3002");
        this.reset();
    };
    Janken.prototype.reset = function () {
        this.rounds = 0;
        this.currentRound = 1;
        this.result = {
            win: 0,
            lose: 0,
            draw: 0
        };
    };
    Janken.judge = function (userSelected, randomSelected) {
        if (userSelected === 'rock') {
            if (randomSelected === 'rock')
                return 'draw';
            if (randomSelected === 'paper')
                return 'lose';
            return 'win';
        }
        else if (userSelected === 'paper') {
            if (randomSelected === 'rock')
                return 'win';
            if (randomSelected === 'paper')
                return 'draw';
            return 'lose';
        }
        else {
            if (randomSelected === 'rock')
                return 'lose';
            if (randomSelected === 'paper')
                return 'win';
            return 'draw';
        }
    };
    return Janken;
}());
var Game = /** @class */ (function () {
    function Game() {
    }
    return Game;
}());
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        new GameProcedure({
            'hit and blow': new HitAndBlow(),
            'janken': new Janken()
        }).start();
        return [2 /*return*/];
    });
}); })();
