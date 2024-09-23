let message1: string = 'Hello';
let age1: number = 20;
let isActive: boolean = false;

let numbers: number[] = [1, 2, 3];

function add(number1: number, number2: number): number {
  return number1 + number2;
}

add(2, 3);

type User = {
  name: string;
  age: number;
};

let user: User = {
  name: 'Bob',
  age: 34,
};
