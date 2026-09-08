import moment from "moment-timezone";

export class abDate_Class {
    span_Minute        ;
    span_Hour        ;
    span_Day        ;

    formats_Date        ;
    formats_DateTime        ;
    formats_Time        ;
    formats_Time_WithSeconds        ;

    #timezone        ;


    get utcOffset()       {
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

    format(time        , format        , timezone              = null)         {
        if (time === null)
            return '-';

        return moment.tz(time * 1000, timezone === null ? 
            this.#timezone : timezone).format(format);
    }

    format_Date(time        , timezone              = null)         {
        return this.format(time, this.formats_Date, timezone);
    }

    format_Date_UTC(time        )         {
        return this.format_Date(time, 'UTC');
    }

    format_DateTime(time        , timezone              = null)         {
        return this.format(time, this.formats_DateTime, timezone);
    }

    format_DateTime_UTC(time        )         {
        return this.format_DateTime(time, 'UTC');
    }

    format_Time(time        , withSeconds          = false, 
            timezone              = null)         {
        return this.format(time, withSeconds ? 
                this.formats_Time_WithSeconds : this.formats_Time, timezone);
    }

    format_Time_UTC(time        , withSeconds          = false)         {
        return this.format(time, withSeconds ? 
                this.formats_Time_WithSeconds : this.formats_Time, 'UTC');
    }

    format_UTC(time        , format        )         {
        return this.format(time, format, 'UTC');
    }

    getDate(time              = null)       {
        if (time === null)
            return new Date();
            
        return new Date(time * 1000);
    }

    getDay(time              = null)         {
        if (time === null)
            time = this.getTime();

        return this.getDay_UTC(time + this.getUTCOffset_Time(time)) - 
                this.getUTCOffset_Time(time);
    }

    getDay_UTC(time              = null)         {
        if (time === null)
            time = this.getTime();

        // return Math.floor(time / this.span_Day) * this.span_Day;
        return time - time % this.span_Day;
    }

    getDayOfWeek(time              = null)         {
        if (time === null)
            time = this.getTime();

        time += this.getUTCOffset_Time(time);

        return this.getDayOfWeek_UTC(time);
    }

    getDayOfWeek_UTC(time        )         {
        let date = new Date(time * 1000);

        return date.getUTCDay();
    }

    getDayNr(time              = null)         {
        if (time === null)
            time = this.getTime();

        time += this.getUTCOffset_Time(time);

        return this.getDayNr_UTC(time);
    }

    getDayNr_UTC(time              = null)         {
        if (time === null)
            time = this.getTime();

        return this.getDate(time).getUTCDate() - 1;
    }

    getDaysCountInMonth(time              = null)         {
        if (time === null)
            time = this.getTime();
        time += this.getUTCOffset_Time(time);

        return this.getDaysCountInMonth_UTC(time);
    }

    getDaysCountInMonth_UTC(time              = null)         {
        if (time === null)
            time = abDate.getTime();

        let year = this.getYearNr_UTC(time);
        let month = this.getMonthNr_UTC(time);

        return (new Date(year, month + 1, 0)).getDate();

    }

    getMonth(time              = null)         {
        return this.getDay(time) - this.getDayNr(time) * this.span_Day;
    }

    getMonth_UTC(time              = null)         {
        return this.getDay_UTC(time) - this.getDayNr_UTC(time) * this.span_Day;
    }

    getMonthNr(time              = null)         {
        if (time === null)
            time = this.getTime();
        time += this.getUTCOffset_Time(time);

        return this.getMonthNr_UTC(time);
    }
    
    getMonthNr_UTC(time              = null)         {
        if (time === null)
            time = this.getTime();

        return this.getDate(time).getUTCMonth();
    }

    getTime(date = new Date())         {
        return Math.floor(date.getTime() / 1000);
    }

    getTime_Rel(time              = null)         {
        if (time === null)
            time = this.getTime();

        return time - this.getUTCOffset_Time(time);
    }

    getUTCOffset(time              = null)         {
        // @ts-expect-error
        return -moment.tz.zone(this.#timezone).utcOffset(time === null ?
                this.getTime() : time) / 60;
    }

    getUTCOffset_Time(time              = null)         {
        return this.getUTCOffset(time) * this.span_Hour;
    }

    getYearNr(time              = null)         {
        if (time === null)
            time = this.getTime();
        time += this.getUTCOffset_Time(time);

        return this.getYearNr_UTC(time);
    }

    getYearNr_UTC(time              = null)         {
        if (time === null)
            time = abDate.getTime();

        return this.getDate(time).getUTCFullYear();
    }

    setTimezone(timezone        )       {
        if (moment.tz.zone(timezone) === null)
            throw new Error(`Cannot find timezone: ${timezone}.`);
        
        this.#timezone = timezone;
    }

    strToTime(str        , timeFormat        )              {
        return moment.tz(str, timeFormat, this.#timezone).toDate()
                .getTime() / 1000;
    }

    strToTime_UTC(str        , timeFormat        )              {
        return moment.utc(str, timeFormat).toDate().getTime() / 1000;
    }

    strToTime_Date(str        )              {
        if (str === '')
            return null;

        return this.strToTime(str, this.formats_Date);
    }

    strToTime_Date_UTC(str        )              {
        if (str === '')
            return null;

        return this.strToTime_UTC(str, this.formats_Date);
    }

    strToTime_DateTime(str        )              {
        if (str === '')
            return null;

        return this.strToTime(str, this.formats_DateTime);
    }

    strToTime_DateTime_UTC(str        )              {
        if (str === '')
            return null;

        return this.strToTime_UTC(str, this.formats_DateTime);
    }

    strToTime_Time(str        , withSeconds          = false)              {
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
