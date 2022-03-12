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
var proptInput = function (text) { return __awaiter(void 0, void 0, void 0, function () {
    var input;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                printLine("\n" + text + "\n", false);
                return [4 /*yield*/, new Promise(function (resolve) {
                        return process.stdin.once('data', function (data) {
                            return resolve(data.toString());
                        });
                    })];
            case 1:
                input = _a.sent();
                return [2 /*return*/, input.trim()];
        }
    });
}); };
var HitAndBlow = /** @class */ (function () {
    function HitAndBlow() {
        this.answerSource = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        this.answer = [];
        this.tryCount = 0;
    }
    // setting
    /*
    1「answerSource」からランダムに値を一つ取り出す
    2 その値がまだ使用されていないものであれば「answer」配列に追加する
    3「answer」配列が所定の数埋まるまで1~2を繰り返す
    */
    HitAndBlow.prototype.setting = function () {
        var answerLength = 3;
        while (this.answer.length < answerLength) {
            var randomNum = Math.floor(Math.random() * this.answerSource.length);
            var selectItem = this.answerSource[randomNum];
            if (!this.answer.includes(selectItem)) {
                // this.answer.push(selectItem);
                this.answer = __spreadArray(__spreadArray([], this.answer), [selectItem]);
            }
        }
    };
    HitAndBlow.prototype.play = function () {
        return __awaiter(this, void 0, void 0, function () {
            var inputArr, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        proptInput("\u6B63\u89E3\u306F" + this.answer);
                        return [4 /*yield*/, proptInput('「,」区切りで三つの数字を入力してください')];
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
                        //　正解だったら終了
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
        process.exit();
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
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var hitAndBlow;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                hitAndBlow = new HitAndBlow();
                hitAndBlow.setting();
                return [4 /*yield*/, hitAndBlow.play()];
            case 1:
                _a.sent();
                hitAndBlow.end();
                return [2 /*return*/];
        }
    });
}); })();
