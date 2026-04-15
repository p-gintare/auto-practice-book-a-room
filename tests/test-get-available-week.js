import {getNextAvailableWeek, getNextAvailableWeekRecursion} from "../src/utils/date-utils.js";
import dayjs from "dayjs";

const intervals = [
    {
        "start": "2025-02-01",
        "end": "2026-02-05",
        "title": "Unavailable"
    },
    {
        "start": "2026-02-01",
        "end": "2026-02-05",
        "title": "Unavailable"
    },
    {
        "start": "2026-04-12",
        "end": "2026-04-19",
        "title": "Unavailable"
    },
    {
        "start": "2026-04-25",
        "end": "2026-04-26",
        "title": "Unavailable"
    }
]

console.log(getNextAvailableWeek(intervals));
console.log(getNextAvailableWeekRecursion((intervals)));


const date1 = dayjs('2026-05-09')
const date2 = dayjs('2026-06-01')

console.log(date2.diff(date1, "month"));
console.log(dayjs().date(1).format("YYYY-MM-DD"));