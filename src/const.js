const MSEC_IN_SEC = 1000;
const SEC_IN_MIN = 60;
const MIN_IN_HOUR = 60;
const HOUR_IN_DAY = 24;
const DATE_FORMATS = {
  time: 'HH:mm',
  shortDate: 'MMM DD',
  formDateTime: 'DD/MM/YY HH:mm',
};
const DURATION_FORMATS = {
  days: 'DD[D] HH[H] mm[M]',
  hours: 'HH[H] mm[M]',
  mins: 'mm[M]',
};

const MSEC_IN_HOUR = MSEC_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR;
const MSEC_IN_DAY = MSEC_IN_HOUR * HOUR_IN_DAY;

export { DATE_FORMATS, MSEC_IN_HOUR, MSEC_IN_DAY, DURATION_FORMATS };
