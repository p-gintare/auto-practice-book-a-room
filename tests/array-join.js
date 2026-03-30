const a =  ["Firstname should not be blank", "size must be between 3 and 18", 1, 345345];

// console.log("sujungti per tarpa:",a.join(" "), "\n");
//
// console.log("sujungti per dash'a:",a.join("-"),"\n");
// console.log("sujungti per new line:",a.join("\n"));


const a1 = [1,2,3];
const a2 = [3,2,1];
const a3 = [1,2,3];
const a4 = a1;

const a6 = new Array(...a1);

console.log(a6 === a1); //

console.log(a4 === a1); // true

a1.push(5);

console.log(a4 === a1); // true
console.log(a1);
console.log(a4);

a4.push(6);

console.log(a4 === a1); // true
console.log(a1);
console.log(a4);

console.log(a1 === a3); // false
console.log(a1 === a2); // false
console.log(a1.toString() === a2.toString()); // false svarbu eiles tvarka
console.log(a1.sort().toString() === a2.sort().toString()); //true nesvarbu kokia eiles tvarka