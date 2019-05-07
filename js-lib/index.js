'use strict';

const
    js0 = require('js0')
;

class abDate_Class
{

    constructor()
    {
        this.span_Minute = 60;
        this.span_Hour = 60 * 60;
        this.span_Day = 24 * 60 * 60;

        this.formats_Date = 'DD.MM.YYYY';
        this.formats_DateTime = 'DD.MM.YYYY HH:mm';
        this.formats_Time = 'HH:ii';

        this.utcOffset = 0;
    }

    format_Date(time, format = null, utcOffset = null)
    {
        format = format === null ? this.formats_Date : format;
        utcOffset = utcOffset === null ? this.utcOffset : utcOffset;

        return moment.utc(time * 1000).utcOffset(utcOffset)
                .format(format);
    }

    format_Date_UTC(time, format = null)
    {
        return this.format_Date(time, format, 0);
    }

    format_DateTime(time, format = null, utcOffset = null)
    {
        format = format === null ? this.formats_DateTime : format;
        utcOffset = utcOffset === null ? this.utcOffset : utcOffset;

        return moment.utc(time * 1000).utcOffset(utcOffset).format(format);
    }

    format_DateTime_UTC(time, format = null)
    {
        return this.format_DateTime(time, format, 0);
    }

    format_Time(time, format = null, utcOffset = null)
    {
        if (str === '')
            return null;

        format = format === null ? this.formats_Time : format;
        utcOffset = utcOffset === null ? this.utcOffset : utcOffset;

        /* UTC because we are interested only in day. */
        return moment.utc(time * 1000).utcOffset(utc).format(format);
    }

    format_Time_UTC(time, format = null)
    {
        return this.format_Time(time, format, 0);
    }

    getDate(time = null)
    {
        if (time === null)
            return new Date();
            
        return new Date(time * 1000);
    }

    getDay(time)
    {
        return this.getDay_UTC(time) - this.utfOffset * this.span_Hour;
    }

    getDay_UTC(time)
    {
        time  = Math.floor(time / this.span_Day) * this.span_Day;

        return time;
    }

    getDayOfWeek(time)
    {
        return this.getDayOfWeek(time - this.utcOffset * this.span_Hour);
    }

    getDayOfWeek_UTC(time)
    {
        let date = new Date(time * 1000);

        return date.getUTCDay();
    }

    getTime(date = new Date())
    {
        js0.args(arguments, [ Date, js0.Default ]);

        return Math.floor(date.getTime() / 1000);
    }

    getTime_Rel(date = new Date())
    {
        return this.getTime(date) - this.utcOffset * this.span_Hour;
    }

    strToTime_Date(str)
    {
        if (str === '')
            return null;

        /* UTC because we are interested only in day. */
        return moment.utc(str, this.formats_Date)
                .toDate().getTime() / 1000;
    }

    strToTime_DateTime(str)
    {
        if (str === '')
            return null;

        return moment.utc(str, this.formats_DateTime)
                .toDate().getTime() / 1000; // - (this.utcOffset * 60 * 60);
    }

    strToTime_Time(str)
    {
        if (str === '')
            return null;

        var timestamp = moment.utc(str, this.formats_Time)
                .toDate().getTime() / 1000 - (this.utcOffset * 60 * 60);

        return timestamp % this.span_Day;
    }

}
module.exports = new abDate_Class();
