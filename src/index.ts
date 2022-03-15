// ターミナルに出力させるログ
const printLine = (text: string, breakeLine: boolean = true) => {
  process.stdout.write(text + (breakeLine ? '\n' : ''));
};

const promptInput = async (text: string) => {
  printLine(`\n${text}\n`, false);

  return readLine();
};

const readLine = async () => {
  const input: string = await new Promise((resolve) => {
    process.stdin.once('data', (data) => {
      return resolve(data.toString());
    });
  });
  return input.trim();
};

// ジェネリクスで指定しないと同じ型でも違う値が返ってくるため？
const promptSelect = async <T extends string>(text: string, values: readonly T[]): Promise<T> => {
  printLine(`\n${text}`);
  values.forEach((value) => {
    printLine(`- ${value}`);
  });
  printLine('>', false);

  const input = (await readLine()) as T;

  if (values.includes(input)) {
    return input;
  } else {
    return promptSelect<T>(text, values);
  }
};

const gameTitles = ['hit and blow', 'janken'] as const;
type GameTitles = typeof gameTitles[number];

const nextActions = ['play again', 'change game', 'exit'] as const;
type NextAction = typeof nextActions[number];

// [key in ユニオンタイプ]
type GameStore = {
  [key in GameTitles]: Game
}

class GameProcedure {
  private currentGameTitle: GameTitles | "" = "";
  private currentGame: Game | null = null;

  constructor(private readonly gameStore: GameStore) {}

  public async start() {
    await this.select();
    await this.play();
  }

  private async select() {
    this.currentGameTitle = await promptSelect<GameTitles>('ゲームのタイトルを入力してください', gameTitles);
    this.currentGame = this.gameStore[this.currentGameTitle];
  }

  private async play() {
    if (!this.currentGame) throw new Error('ゲームが選択されていません');
    printLine(`===\n${this.currentGameTitle}を開始します\n===`);
    await this.currentGame.setting();
    await this.currentGame.play();
    this.currentGame.end();

    const action = await promptSelect<NextAction>('ゲームを続けますか？', nextActions);
    if (action === 'play again') {
      await this.play();
    } else if (action === 'change game') {
      await this.select();
      await this.play();
    } else if (action === 'exit') {
      this.end();
    } else {
      const neverValue: never = action;
      throw new Error(`${neverValue} is an invalid action.`);
    }
  }

  private end() {
    printLine('ゲームを終了しました');
    process.exit();
  }
}

// type Mode = 'normal' | 'hard' | 'very hard';

const modes = ['normal', 'hard', 'very hard'] as const;

// typeof で型を抜き出す、numberですべてアクセス
type Mode = typeof modes[number];

// number どのインデックスとは明示せずに全ての中身を対象する役割
// typeof hoge[number]

class HitAndBlow implements Game {
  private readonly answerSource = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  private answer: string[] = [];
  private tryCount = 0;
  private mode = 'normal';

  private getAnswerLength() {
    switch (this.mode) {
      case 'normal':
        return 3;
      case 'hard':
        return 4;
      case 'very hard':
        return 5;
      default:
        const neverValue: string = this.mode;
        throw new Error(`${neverValue}は無効なモードです`);
    }
  }

  // setting
  /*
  1「answerSource」からランダムに値を一つ取り出す
  2 その値がまだ使用されていないものであれば「answer」配列に追加する
  3「answer」配列が所定の数埋まるまで1~2を繰り返す
  */

  async setting() {
    this.mode = await promptSelect<Mode>('モードを入力してください', modes);

    const answerLength = this.getAnswerLength();

    while (this.answer.length < answerLength) {
      const randomNum = Math.floor(Math.random() * this.answerSource.length);
      const selectItem = this.answerSource[randomNum];

      if (!this.answer.includes(selectItem)) {
        // this.answer.push(selectItem);
        this.answer = [...this.answer, selectItem];
      }
    }
  }

  async play() {
    promptInput(`正解は${this.answer}`);
    const answerLength = this.getAnswerLength();
    const inputArr = (
      await promptInput(`「,」区切りで${answerLength}つの数字を入力してください`)
    ).split(',');
    const result = this.check(inputArr);

    if (!this.validate(inputArr)) {
      printLine('無効な入力です');
      await this.play();
      return;
    }

    if (result.hit !== this.answer.length) {
      // 不正解だったら抜ける
      printLine(`---\nHit: ${result.hit}\nBlow: ${result.blow}\n---`);
      this.tryCount += 1;
      await this.play(); //ここでループするからthis.tryCountをifの下にかけない？
    } else {
      // 正解だったら終了
      this.tryCount += 1;
    }
  }

  private check(input: string[]) {
    let hitCount = 0;
    let blowCount = 0;

    input.forEach((value, index) => {
      if (value === this.answer[index]) {
        hitCount += 1;
      } else if (this.answer.includes(value)) {
        blowCount += 1;
      }
    });

    return {
      hit: hitCount,
      blow: blowCount,
    };
  }

  end() {
    printLine(`正解です！\n試行回数: ${this.tryCount}回`);
  }

  private validate(inputArr: string[]) {
    // 三種類のバリデート？
    // every(),includes()もbooleanを返す？
    // every()テスト用

    // 入力された数字の数とこちらで用意した数があっているか
    const isLengthValid = inputArr.length === this.answer.length;

    // 入力された数字がこちらで用意した入力できる数字とあっているか
    const isAllAnswerSourceOption = inputArr.every((val) => {
      // amswerSourceの中にvalが含まれているか
      return this.answerSource.includes(val);
    });

    // 入力された数字が重複していないか
    const isAllDifferentValues = inputArr.every((val, i) => {
      // 重複していたらindexOfが同じ番号を返す
      // 同じ番号だとindexとマッチしなくてfalseを返す
      return inputArr.indexOf(val) === i;
    });

    // 三つがtrueならtrueを返す？
    return isLengthValid && isAllAnswerSourceOption && isAllDifferentValues;
  }
}

const jankenOptions = ['rock', 'paper', 'scissors'] as const;
type JankenOption = typeof jankenOptions[number];

class Janken implements Game {
  private rounds = 0;
  private currentRound = 1;
  private result = {
    win: 0,
    lose: 0,
    draw: 0,
  };

  async setting() {
    const rounds = Number(await promptInput('何本勝負にしますか？'));
    if (Number.isInteger(rounds) && 0 < rounds) {
      this.rounds = rounds;
    } else {
      await this.setting();
    }
  }

  async play() {
    const userSelected = await promptSelect(
      `【${this.currentRound}回戦】選択肢を入力してください。`,
      jankenOptions
    );
    const randomSelected = jankenOptions[Math.floor(Math.random() * 3)];
    const result = Janken.judge(userSelected, randomSelected);
    let resultText: string;

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
    printLine(`---\nあなた: ${userSelected}\n相手${randomSelected}\n${resultText}\n---`);

    if (this.currentRound < this.rounds) {
      this.currentRound += 1;
      await this.play();
    }
  }

  end() {
    printLine(`\n${this.result.win}勝${this.result.lose}敗${this.result.draw}引き分けでした。`);
    this.reset();
  }

  private reset() {
    this.rounds = 0;
    this.currentRound = 1;
    this.result = {
      win: 0,
      lose: 0,
      draw: 0,
    };
  }

  static judge(userSelected: JankenOption, randomSelected: JankenOption) {
    if (userSelected === 'rock') {
      if (randomSelected === 'rock') return 'draw';
      if (randomSelected === 'paper') return 'lose';
      return 'win';
    } else if (userSelected === 'paper') {
      if (randomSelected === 'rock') return 'win';
      if (randomSelected === 'paper') return 'draw';
      return 'lose';
    } else {
      if (randomSelected === 'rock') return 'lose';
      if (randomSelected === 'paper') return 'win';
      return 'draw';
    }
  }
}

abstract class Game {
  abstract setting(): Promise<void>
  abstract play(): Promise<void>
  abstract end(): void
}

(async () => {
  new GameProcedure({
    'hit and blow': new HitAndBlow(),
    'janken': new Janken(),
  }).start();
})();
