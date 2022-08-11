import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const dateTimeLongFormat = "YYYY-MM-DD hh:mm:ss";
/**
 * @name getServerFormattedDate
 * @description Method for getting date as server format yyyy-MM-ddTHH:mm:ss.SSSZ => YYYY-MM-DDTHH:mm:ss.SSSZZ
 * @param value
 */

export const getTimeFromNow = (value: Date) => dayjs(value).fromNow();

/**
 * @name getServerFormattedDate
 * @description Method for getting date as server format yyyy-MM-ddTHH:mm:ss.SSSZ => YYYY-MM-DDTHH:mm:ss.SSSZZ
 * @param value
 */

export const getServerFormattedDate = (value: Date | null) =>
  value ? dayjs(value).second(0).millisecond(0).format("YYYY-MM-DDTHH:mm:ss.SSSZZ") : null;

export const getJSDateFromDateString = (value: Date | string) => dayjs(value).toDate();

export const getLocalizedFormat = (value: Date | string, format: string = "LLLL") =>
  dayjs(value).format(format);

export const allMonths = (
  type: "long" | "short" = "short",
  local: string = "en-US"
): Array<string> =>
  Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString(local, { month: type }));

export const rangeYears = (prevYearFromNow = 100, nextYearFromNow = 50): Array<number> => {
  const currentYear = new Date().getFullYear();
  let years: number[] = [];
  for (let index = currentYear - prevYearFromNow; index <= currentYear + nextYearFromNow; index++) {
    years.push(index);
  }
  return years;
};

export const getYear = (value: Date | string) => dayjs(value).year();
export const getMonth = (value: Date | string) => dayjs(value).month();
export const getLongformattedDateTime = (value: Date | string) =>
  dayjs(value).format(dateTimeLongFormat);
