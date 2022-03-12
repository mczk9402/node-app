// ターミナルに出力させるログ
const printLine = (text: string, breakeLine: boolean = true) => {
  process.stdout.write(text + (breakeLine ? '\n' : ''));
};

const proptInput = async (text: string) => {
  printLine(`\n${text}\n`, false);
  const input: string = await new Promise((resolve) => {
    return process.stdin.once('data', (data) => {
      return resolve(data.toString());
    });
  });

  return input.trim();
};

class HitAndBlow {
  private readonly answerSource = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  private answer: string[] = [];
  private tryCount = 0;

  // setting
  /*
  1「answerSource」からランダムに値を一つ取り出す
  2 その値がまだ使用されていないものであれば「answer」配列に追加する
  3「answer」配列が所定の数埋まるまで1~2を繰り返す
  */

  setting() {
    const answerLength = 3;

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
    proptInput(`正解は${this.answer}`);
    const inputArr = (await proptInput('「,」区切りで三つの数字を入力してください')).split(',');
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
      //　正解だったら終了
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
    process.exit();
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

(async () => {
  // const name = await proptInput('名前を入力してください');
  // console.log(name);
  // const age = await proptInput('年齢を入力してください');
  // console.log(age);
  // process.exit();

  const hitAndBlow = new HitAndBlow();
  hitAndBlow.setting();
  await hitAndBlow.play();
  hitAndBlow.end();
})();
