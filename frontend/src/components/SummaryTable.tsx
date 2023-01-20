import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning"
import { HabitDayContainer } from "./HabitDayContainer"

export function SummaryTable() {
    const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

    const summaryDates = generateDatesFromYearBeginning();

    const minimumSummaryDatesSize = 18 * 7;
    const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekDays.map((day, index) => (
                    <div
                        key={`${day} - ${index}`}
                        className="flex justify-center h-10 w-10 text-xl text-zinc-400 font-bold"
                    >
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {summaryDates.map(day => (
                    <HabitDayContainer key={day.toString()} />
                ))}

                {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, index) => {
                    return (
                        <div
                            key={index}
                            className="h-10 w-10 border-2 border-zinc-800 bg-zinc-900 rounded-lg opacity-40 cursor-not-allowed"
                        />
                    );
                })}
            </div>
        </div>
    )
}