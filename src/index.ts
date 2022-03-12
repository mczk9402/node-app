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

(async () => {
  const name = await proptInput('名前を入力してください');
  console.log(name);
  const age = await proptInput('年齢を入力してください');
  console.log(age);
  process.exit();
})();
