import {getNextAvailableWeek} from "../src/utils/date-utils.js";

const intervals = [
    {
        "start": "2026-02-01",
        "end": "2026-02-05",
        "title": "Unavailable"
    },
    {
        "start": "2026-04-12",
        "end": "2026-04-19",
        "title": "Unavailable"
    }
]

console.log(await getNextAvailableWeek(intervals));