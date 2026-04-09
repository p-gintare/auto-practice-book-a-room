import dayjs from "dayjs";
import {formatDay} from "../src/utils/date-utils.js";
import {getRoomInformation} from "../src/api/room-api.js";

// console.log(dayjs());
const today = dayjs().add(2, 'days');
console.log(today.get('date'));
console.log(today.get('date').toString().padStart(2, "0"));

console.log(dayjs().add(1, 'week').startOf('week').format('YYYY-MM-DD'));

console.log(formatDay(dayjs()));
console.log(formatDay("2"));
console.log(formatDay(2));

console.log(JSON.stringify(await getRoomInformation(1), null, 2));

const url = "https://automationintesting.online/reservation/2?checkin=2026-04-09&checkout=2026-04-10"
const roomId = url.split("?")[0].split("/").pop();
console.log("room id:", roomId);