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

    format_DateTime(time, format = null, utcOffset = null)
    {
        format = format === null ? this.formats_DateTime : format;
        utcOffset = utcOffset === null ? this.utcOffset : utcOffset;

        return moment.utc(time * 1000).utcOffset(utcOffset).format(format);
    }

    format_Time(str, format = null)
    {
        if (str === '')
            return null;

        format = format === null ? this.formats_Time : format;

        /* UTC because we are interested only in day. */
        return moment.utc(str, format).toDate().getTime() / 1000;
    }

    getDate(time = null)
    {
        if (time === null)
            return new Date();
            
        return new Date(time * 1000);
    }

    getDay(time)
    {
        time  = Math.floor(time / this.span_Day) * this.span_Day;

        return time;
    }

    getDayOfWeek(time)
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
        return this.getTime(date) + this.utcOffset * this.span_Hour;
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
