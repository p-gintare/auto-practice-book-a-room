import dayjs from "dayjs";

export const DATE_FORMAT = 'YYYY-MM-DD';

export const nextWeek = {
    start: dayjs().add(1, 'week').startOf('week'),
    end: dayjs().add(1, 'week').endOf('week'),
}

export function formatDay(date) {
    const day = date.get?.('date') ?? date;
    return day.toString().padStart(2, "0");
}

export function formatDate(date) {
    return date.format(DATE_FORMAT);
}

// TODO igyvendinti namuose
export function getNextAvailableWeek(busyIntervals) {
    let availableStart;
    let availableEnd;

    // implementacija
    return {
        start: availableStart,
        end: availableEnd,
    }
}