import moment from "moment-timezone";

export class abDate_Class {
    span_Minute: number;
    span_Hour: number;
    span_Day: number;

    formats_Date: string;
    formats_DateTime: string;
    formats_Time: string;
    formats_Time_WithSeconds: string;

    #timezone: string;


    get utcOffset(): void {
        throw new Error(`'abDate.utcOffset' is deprecated.`);
    }


    constructor() {
        this.span_Minute = 60;
        this.span_Hour = 60 * 60;
        this.span_Day = 24 * 60 * 60;

        this.formats_Date = 'DD.MM.YYYY';
        this.formats_DateTime = 'DD.MM.YYYY HH:mm';
        this.formats_Time = 'HH:mm';
        this.formats_Time_WithSeconds = 'HH:mm:ss';

        this.#timezone = "UTC";
    }

    format(time: number, format: string, timezone: string|null = null): string {
        if (time === null)
            return '-';

        return moment.tz(time * 1000, timezone === null ? 
            this.#timezone : timezone).format(format);
    }

    format_Date(time: number, timezone: string|null = null): string {
        return this.format(time, this.formats_Date, timezone);
    }

    format_Date_UTC(time: number): string {
        return this.format_Date(time, 'UTC');
    }

    format_DateTime(time: number, timezone: string|null = null): string {
        return this.format(time, this.formats_DateTime, timezone);
    }

    format_DateTime_UTC(time: number): string {
        return this.format_DateTime(time, 'UTC');
    }

    format_Time(time: number, withSeconds: boolean = false, 
            timezone: string|null = null): string {
        return this.format(time, withSeconds ? 
                this.formats_Time_WithSeconds : this.formats_Time, timezone);
    }

    format_Time_UTC(time: number, withSeconds: boolean = false): string {
        return this.format(time, withSeconds ? 
                this.formats_Time_WithSeconds : this.formats_Time, 'UTC');
    }

    format_UTC(time: number, format: string): string {
        return this.format(time, format, 'UTC');
    }

    getDate(time: number|null = null): Date {
        if (time === null)
            return new Date();
            
        return new Date(time * 1000);
    }

    getDay(time: number|null = null): number {
        if (time === null)
            time = this.getTime();

        return this.getDay_UTC(time + this.getUTCOffset_Time(time)) - 
                this.getUTCOffset_Time(time);
    }

    getDay_UTC(time: number|null = null): number {
        if (time === null)
            time = this.getTime();

        // return Math.floor(time / this.span_Day) * this.span_Day;
        return time - time % this.span_Day;
    }

    getDayOfWeek(time: number|null = null): number {
        if (time === null)
            time = this.getTime();

        time += this.getUTCOffset_Time(time);

        return this.getDayOfWeek_UTC(time);
    }

    getDayOfWeek_UTC(time: number): number {
        let date = new Date(time * 1000);

        return date.getUTCDay();
    }

    getDayNr(time: number|null = null): number {
        if (time === null)
            time = this.getTime();

        time += this.getUTCOffset_Time(time);

        return this.getDayNr_UTC(time);
    }

    getDayNr_UTC(time: number|null = null): number {
        if (time === null)
            time = this.getTime();

        return this.getDate(time).getUTCDate() - 1;
    }

    getDaysCountInMonth(time: number|null = null): number {
        if (time === null)
            time = this.getTime();
        time += this.getUTCOffset_Time(time);

        return this.getDaysCountInMonth_UTC(time);
    }

    getDaysCountInMonth_UTC(time: number|null = null): number {
        if (time === null)
            time = abDate.getTime();

        let year = this.getYearNr_UTC(time);
        let month = this.getMonthNr_UTC(time);

        return (new Date(year, month + 1, 0)).getDate();

    }

    getMonth(time: number|null = null): number {
        return this.getDay(time) - this.getDayNr(time) * this.span_Day;
    }

    getMonth_UTC(time: number|null = null): number {
        return this.getDay_UTC(time) - this.getDayNr_UTC(time) * this.span_Day;
    }

    getMonthNr(time: number|null = null): number {
        if (time === null)
            time = this.getTime();
        time += this.getUTCOffset_Time(time);

        return this.getMonthNr_UTC(time);
    }
    
    getMonthNr_UTC(time: number|null = null): number {
        if (time === null)
            time = this.getTime();

        return this.getDate(time).getUTCMonth();
    }

    getTime(date = new Date()): number {
        return Math.floor(date.getTime() / 1000);
    }

    getTime_Rel(time: number|null = null): number {
        if (time === null)
            time = this.getTime();

        return time - this.getUTCOffset_Time(time);
    }

    getUTCOffset(time: number|null = null): number {
        // @ts-expect-error
        return -moment.tz.zone(this.#timezone).utcOffset(time === null ?
                this.getTime() : time) / 60;
    }

    getUTCOffset_Time(time: number|null = null): number {
        return this.getUTCOffset(time) * this.span_Hour;
    }

    getYearNr(time: number|null = null): number {
        if (time === null)
            time = this.getTime();
        time += this.getUTCOffset_Time(time);

        return this.getYearNr_UTC(time);
    }

    getYearNr_UTC(time: number|null = null): number {
        if (time === null)
            time = abDate.getTime();

        return this.getDate(time).getUTCFullYear();
    }

    setTimezone(timezone: string): void {
        if (moment.tz.zone(timezone) === null)
            throw new Error(`Cannot find timezone: ${timezone}.`);
        
        this.#timezone = timezone;
    }

    strToTime(str: string, timeFormat: string): number|null {
        return moment.tz(str, timeFormat, this.#timezone).toDate()
                .getTime() / 1000;
    }

    strToTime_UTC(str: string, timeFormat: string): number|null {
        return moment.utc(str, timeFormat).toDate().getTime() / 1000;
    }

    strToTime_Date(str: string): number|null {
        if (str === '')
            return null;

        return this.strToTime(str, this.formats_Date);
    }

    strToTime_Date_UTC(str: string): number|null {
        if (str === '')
            return null;

        return this.strToTime_UTC(str, this.formats_Date);
    }

    strToTime_DateTime(str: string): number|null {
        if (str === '')
            return null;

        return this.strToTime(str, this.formats_DateTime);
    }

    strToTime_DateTime_UTC(str: string): number|null {
        if (str === '')
            return null;

        return this.strToTime_UTC(str, this.formats_DateTime);
    }

    strToTime_Time(str: string, withSeconds: boolean = false): number|null {
        if (str === '')
            return null;

        var timestamp = moment.utc(str, withSeconds ? 
                this.formats_Time_WithSeconds : this.formats_Time)
                .toDate().getTime() / 1000;

        return timestamp % this.span_Day;
    }

}
const abDate = new abDate_Class();
export default abDate;
