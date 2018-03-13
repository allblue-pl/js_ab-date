'use strict';

class abDate_Class
{

    constructor()
    {
        this.span_Minute = 60;
        this.span_Hour = 60 * 60;
        this.span_Day = 24 * 60 * 60;

        this.date_Format = 'd.m.Y';
        this.dateTime_Format = 'd.m.Y H:i';
        this.time_Format = 'H:i';

        this.utcOffset = 0;
    }

    format_Date(time, format = null)
    {
        format = typeof format === null ? this.date_Format : format;

        return moment.utc(time * 1000).utcOffset(this.utcOffset)
                .format(format);
    }

    format_Datetime(time, format = null)
    {
        format = typeof format === null ? this.dateTime_Format : format;

        return moment.utc(time * 1000).utcOffset(this.utcOffset).format(format);
    }

    format_Time(str, format = null)
    {
        if (str === '')
            return null;

        format = typeof format === null ? this.time_Format : format;

        /* UTC because we are interested only in day. */
        return moment.utc(str, format).toDate().getTime() / 1000;
    }

    getDayOfWeek(time)
    {
        let date = new Date(time * 1000);

        return date.getUTCDay();
    }

    strToTime_Date(str)
    {
        if (str === '')
            return null;

        /* UTC because we are interested only in day. */
        return moment.utc(str, this.date_Format)
                .toDate().getTime() / 1000;
    }

    strToTime_DateTime(str)
    {
        if (str === '')
            return null;

        return moment.utc(str, SPK.$eText.get('SPK:dateTime_Format'))
                .toDate().getTime() / 1000 - (this.utcOffset * 60 * 60);
    }

    strToTime_Time(str)
    {
        if (str === '')
            return null;

        var timestamp = moment.utc(str, SPK.$eText.get('SPK:time_Format'))
                .toDate().getTime() / 1000 - (this.utcOffset * 60 * 60);

        return timestamp % this.span_Day;
    }

}
module.exports = new abDate_Class();
