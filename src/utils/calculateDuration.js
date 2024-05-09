import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);
import { MSEC_IN_HOUR, MSEC_IN_DAY, DURATION_FORMATS } from "../const.js";

export const calculateDuration = (dateFrom, dateTo) => {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom)); //Вычисление разницы в мс между двумя датами

  let pointDuration;

  switch (true) {
    case diff >= MSEC_IN_DAY:
      pointDuration = dayjs.duration(diff).format(DURATION_FORMATS.days);
      break;
    case diff >= MSEC_IN_HOUR:
      pointDuration = dayjs.duration(diff).format(DURATION_FORMATS.hours);
      break;
    case diff < MSEC_IN_HOUR:
      pointDuration = dayjs.duration(diff).format(DURATION_FORMATS.mins);
      break;
  }

  return pointDuration;
};
