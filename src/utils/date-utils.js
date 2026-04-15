import dayjs from "dayjs";

export const DATE_FORMAT = 'YYYY-MM-DD';

export const nextWeek = {
    start: dayjs().add(1, 'week').startOf('week'),
    end: dayjs().add(1, 'week').endOf('week'),
}

export function formatDay(date) {
    const day = date.get?.('date') ?? date;
    console.log("day:", day);
    return day.toString().padStart(2, "0");
}

export function formatDate(date) {
    return date.format(DATE_FORMAT);
}

// TODO igyvendinti namuose
export function getNextAvailableWeek(busyIntervals) {
    let availableStart;
    let availableEnd;
    let isBusy = true;
    let weekCount = 1;

    while(isBusy) {
        availableStart = dayjs().add(weekCount, 'week').startOf('week');
        availableEnd = dayjs().add(weekCount, 'week').endOf('week');
        console.log(`Try week: ${availableStart} - ${availableEnd}`);
        console.log(busyIntervals);
        isBusy = busyIntervals.some(({start, end}) => {
            const busyStart = dayjs(start);
            const busyEnd = dayjs(end);
            return isBetween(availableStart, busyStart, busyEnd) || isBetween(availableEnd, busyEnd, busyEnd);
        });
        weekCount++;
    }

    console.log(`Available: ${availableStart} - ${availableEnd}`);
    return {
        start: availableStart,
        end: availableEnd,
    }
}

export function getNextAvailableWeekRecursion(busyIntervals, availableWeek= nextWeek) {
    const availableStart = availableWeek.start;
    const availableEnd = availableWeek.end;
    if(busyIntervals.some(({start, end}) => isBetween(availableStart, dayjs(start), dayjs(end)) || isBetween(availableEnd, dayjs(start), dayjs(end)))) {
        return getNextAvailableWeekRecursion(busyIntervals, {start: availableStart.add(1, 'week'), end: availableEnd.add(1, 'week')});
    } else {
        console.log(`No busy intervals found: ${availableStart} v- ${availableEnd}`);
        return {
            start: availableStart,
            end: availableEnd,
        }
    }
}

function isBetween(date, startDate, endDate) {
    return (date.isAfter(startDate) || date.isSame(startDate)) && (date.isBefore(endDate) || date.isSame(endDate));
}