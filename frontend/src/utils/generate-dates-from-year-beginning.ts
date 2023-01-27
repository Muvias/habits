import dayjs from "dayjs";

export function generateDatesFromYearBeginning() {
    const firstDayOfTheYear = dayjs().startOf('year');
    const today = new Date();

    const dates = [];

    let compareDate = firstDayOfTheYear;

    // isBefore, toDate e add estão vindo do dayjs. Este while vai adicionar as datas ao array do primeiro dia do ano até o dia atual da requisição.
    while(compareDate.isBefore(today)) {
        dates.push(compareDate.toDate());

        compareDate = compareDate.add(1, 'day');
    }

    return dates;
}