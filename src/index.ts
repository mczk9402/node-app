const sayHello = (name: string) => {
  return `Hello, ${name}!`;
};

console.log(sayHello('Michael Jacson'));
process.stdout.write(sayHello('Michael Jacson'));

const printLine = (text: string, breakeLine: boolean = true) => {
  process.stdout.write(text + (breakeLine ? '\n' : ''));
};
