import dayjs from "dayjs";

export const today = dayjs(new Date()).format("YYYY-MM-DD");
export const tomorrow = dayjs(new Date()).add(1, 'day').format("YYYY-MM-DD");