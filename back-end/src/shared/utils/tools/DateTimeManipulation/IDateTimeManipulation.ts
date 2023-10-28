export type WeekDay =
    | "sunday"
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday";

export interface IDateTimeManipulation {
    nextWeekDay(weekDay: WeekDay): WeekDay;
    isTimeOfDateBetween(
        compareDateTime: Date,
        firstDateTime: Date,
        secondDateTime: Date,
    ): boolean;
    convertStrHourToDateTime(
        hourString: string | null | undefined,
    ): Date | null;
    isTimeOfDateBefore(compareDateTime: Date, dateTime: Date): boolean;
    isAM(dateTime: Date): boolean;
    isPM(dateTime: Date): boolean;
    addDays(date: Date, days: number): Date;
    addHours(date: Date, hours: number): Date;
}
