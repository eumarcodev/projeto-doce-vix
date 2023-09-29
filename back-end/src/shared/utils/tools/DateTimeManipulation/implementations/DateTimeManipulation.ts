import { addDays, addHours, addMinutes } from "date-fns";

import { IDateTimeManipulation, WeekDay } from "../IDateTimeManipulation";

const mappedWeekDays = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
};

const weekDays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];

export class DateTimeManipulation implements IDateTimeManipulation {
    addDays(date: Date, days: number): Date {
        return addDays(date, days);
    }

    addHours(date: Date, hours: number): Date {
        return addHours(date, hours);
    }

    isAM(dateTime: Date): boolean {
        return dateTime.getHours() < 12;
    }

    isPM(dateTime: Date): boolean {
        return dateTime.getHours() >= 12;
    }

    nextWeekDay(weekDay: WeekDay): WeekDay {
        const currentWeekDayNumber = <number>mappedWeekDays[weekDay];

        return <WeekDay>weekDays[currentWeekDayNumber + 1];
    }

    isTimeOfDateBefore(compareDateTime: Date, dateTime: Date): boolean {
        const compareTimezone = compareDateTime.getTimezoneOffset();
        const compareDate = addMinutes(compareDateTime, compareTimezone);

        const timezone = dateTime.getTimezoneOffset();
        const date = addMinutes(compareDateTime, timezone);

        const compareTime = compareDate.getTime();
        const time = date.getTime();

        return compareTime < time;
    }

    convertStrHourToDateTime(
        hourString: string | null | undefined,
    ): Date | null {
        if (!hourString) {
            return null;
        }

        return new Date(`1970-01-01 ${hourString}`);
    }

    isTimeOfDateBetween(
        compareDateTime: Date,
        firstDateTime: Date,
        secondDateTime: Date,
    ): boolean {
        const compareTimezone = compareDateTime.getTimezoneOffset();

        const compareDate = addMinutes(compareDateTime, compareTimezone);

        const currentTime = compareDate.getTime();

        const firstTimezone = firstDateTime.getTimezoneOffset();
        const firstDate = addMinutes(firstDateTime, firstTimezone);

        const secondTimezone = secondDateTime.getTimezoneOffset();
        const secondDate = addMinutes(secondDateTime, secondTimezone);

        const firstTime = firstDate.getTime();
        const secondTime = secondDate.getTime();

        return firstTime <= currentTime && currentTime <= secondTime;
    }
}
