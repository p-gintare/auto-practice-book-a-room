import dayjs from "dayjs";
import {DATE_FORMAT} from "./utils/date-utils.js";

export const today = dayjs(new Date()).format(DATE_FORMAT);
export const tomorrow = dayjs(new Date()).add(1, 'day').format(DATE_FORMAT);