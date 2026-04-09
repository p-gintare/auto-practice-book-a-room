import dayjs from "dayjs";

// console.log(dayjs());
const today = dayjs().add(2, 'days');
console.log(today.get('date'));
console.log(today.get('date').toString().padStart(2, "0"));