'use strict';

const
    js0 = require('js0'),
    moment = require('moment-timezone')
;

// if (typeof moment === 'undefined') {
//     console.log('Here?');
//     const
//         moment = require('moment')
//     ;
//     console.log('A', moment);
// }
// console.log('B', moment);

class abDate_Class
{

    get utcOffset() {
        throw new Error(`'abDate.utcOffset' is deprecated.`);
    }


    constructor() {
        this.span_Minute = 60;
        this.span_Hour = 60 * 60;
        this.span_Day = 24 * 60 * 60;

        this.formats_Date = 'DD.MM.YYYY';
        this.formats_DateTime = 'DD.MM.YYYY HH:mm';
        this.formats_Time = 'HH:mm';

        this._timezone = null;
        this.setTimezone('UTC');
    }

    format(time, format, timezone = null) {
        js0.args(arguments, [ 'number', js0.Null ], 'string', [ 'string', js0.Null, 
                js0.Default ])
        
        if (time === null)
            return '-';

        return moment.tz(time * 1000, timezone === null ? 
            this._timezone : timezone).format(format);
    }

    format_Date(time, timezone = null) {
        js0.args(arguments, [ 'number', js0.Null ], [ 'string', js0.Null, js0.Default ]);

        return this.format(time, this.formats_Date, timezone);
    }

    format_Date_UTC(time) {
        return this.format_Date(time, 'UTC');
    }

    format_DateTime(time, timezone = null) {
        js0.args(arguments, 'number', [ 'string', js0.Null, js0.Default ]);

        return this.format(time, this.formats_DateTime, timezone);
    }

    format_DateTime_UTC(time) {
        return this.format_DateTime(time, 'UTC');
    }

    format_Time(time) {
        js0.args(arguments, 'number');

        return this.format(time, this.formats_Time, 'UTC');
    }

    format_UTC(time, format) {
        js0.args(arguments, 'number', 'string');

        return this.format(time, format, 'UTC');
    }

    getDate(time = null) {
        js0.args(arguments, [ 'number', js0.Null, js0.Default ]);

        if (time === null)
            return new Date();
            
        return new Date(time * 1000);
    }

    getDay(time = null) {
        js0.args(arguments, [ 'number', js0.Null, js0.Default ]);

        if (time === null)
            time = this.getTime();

        return this.getDay_UTC(time + this.getUTCOffset_Time(time)) - 
                this.getUTCOffset_Time(time);
    }

    getDay_UTC(time = null) {
        js0.args(arguments, [ 'number', js0.Null, js0.Default ]);

        if (time === null)
            time = this.getTime();

        // return Math.floor(time / this.span_Day) * this.span_Day;
        return time - time % this.span_Day;
    }

    getDayOfWeek(time = null) {
        js0.args(arguments, [ 'number', js0.Null, js0.Default ]);

        if (time === null)
            time = this.getTime();
        time += this.getUTCOffset_Time(time);

        return this.getDayOfWeek_UTC(time);
    }

    getDayOfWeek_UTC(time) {
        js0.args(arguments, [ 'number', js0.Null, js0.Default ]);

        let date = new Date(time * 1000);

        return date.getUTCDay();
    }

    getDayNr(time = null) {
        js0.args(arguments, [ 'number', js0.Null, js0.Default ]);

        if (time === null)
            time = this.getTime();
        time += this.getUTCOffset_Time(time);

        return this.getDayNr_UTC(time);
    }

    getDayNr_UTC(time = null) {
        js0.args(arguments, [ 'number', js0.Null, js0.Default ]);

        if (time === null)
            time = this.getTime();

        return this.getDate(time).getUTCDate() - 1;
    }

    getDaysCountInMonth(time = null) {
        js0.args(arguments, [ 'number', js0.Null, js0.Default ]);

        if (time === null)
            time = this.getTime();
        time += this.getUTCOffset_Time(time);

        return this.getDaysCountInMonth_UTC(time);
    }

    getDaysCountInMonth_UTC(time = null) {
        js0.args(arguments, [ 'number', js0.Null, js0.Default ]);

        if (time === null)
            time = abDate.getTime();

        let year = this.getYearNr_UTC(time);
        let month = this.getMonthNr_UTC(time);

        return (new Date(year, month + 1, 0)).getDate();

    }

    getMonth(time = null) {
        js0.args(arguments, [ 'number', js0.Null, js0.Default ]);

        return this.getDay(time) - this.getDayNr(time) * this.span_Day;
    }

    getMonth_UTC(time = null) {
        js0.args(arguments, [ 'number', js0.Null, js0.Default ]);

        return this.getDay_UTC(time) - this.getDayNr_UTC(time) * this.span_Day;
    }

    getMonthNr(time = null) {
        js0.args(arguments, [ 'number', js0.Null, js0.Default ]);

        if (time === null)
            time = this.getTime();
        time += this.getUTCOffset_Time(time);

        return this.getMonthNr_UTC(time);
    }
    
    getMonthNr_UTC(time = null) {
        js0.args(arguments, [ 'number', js0.Null, js0.Default ]);

        if (time === null)
            time = this.getTime();

        return this.getDate(time).getUTCMonth();
    }

    getTime(date = new Date()) {
        js0.args(arguments, [ Date, js0.Default ]);

        return Math.floor(date.getTime() / 1000);
    }

    getTime_Rel(time = null) {
        js0.args(arguments, [ 'number', js0.Default ]);

        if (time === null)
            time = this.getTime();

        return time - this.getUTCOffset_Time(time);
    }

    getUTCOffset(time = null) {
        js0.args(arguments, [ 'number', js0.Null, js0.Default ]);

        return moment.tz.zone(this._timezone).utcOffset(time === null ?
                this.getTime() : time) / 60;
    }

    getUTCOffset_Time(time = null) {
        js0.args(arguments, [ 'number', js0.Null, js0.Default ]);

        return this.getUTCOffset(time) * this.span_Hour;
    }

    getYearNr(time = null) {
        js0.args(arguments, [ 'number', js0.Null, js0.Default ]);

        if (time === null)
            time = this.getTime();
        time += this.getUTCOffset_Time(time);

        return this.getYearNr_UTC(time);
    }

    getYearNr_UTC(time = null) {
        js0.args(arguments, [ 'number', js0.Null, js0.Default ]);

        if (time === null)
            time = abDate.getTime();

        return this.getDate(time).getUTCFullYear();
    }

    setTimezone(timezone) {
        if (moment.tz.zone(timezone) === null)
            throw new Error(`Cannot find timezone: ${timezone}.`);
        
        this._timezone = timezone;
    }

    strToTime(str, timeFormat) {
        js0.args(arguments, 'string', 'string');

        console.log(moment.tz(str, timeFormat, this._timezone).isValid());
        return moment.tz(str, timeFormat, this._timezone).toDate()
                .getTime() / 1000;
    }

    strToTime_UTC(str, timeFormat) {
        js0.args(arguments, 'string', 'string');

        return moment.utc(str, timeFormat).toDate().getTime() / 1000;
    }

    strToTime_Date(str) {
        js0.args(arguments, 'string');

        if (str === '')
            return null;

        return this.strToTime(str, this.formats_Date);
    }

    strToTime_Date_UTC(str) {
        js0.args(arguments, 'string');

        if (str === '')
            return null;

        return this.strToTime_UTC(str, this.formats_Date);
    }

    strToTime_DateTime(str) {
        js0.args(arguments, 'string');

        if (str === '')
            return null;

        return this.strToTime(str, this.formats_DateTime);
    }

    strToTime_DateTime_UTC(str) {
        js0.args(arguments, 'string');

        if (str === '')
            return null;

        return this.strToTime_UTC(str, this.formats_DateTime);
    }

    strToTime_Time(str) {
        js0.args(arguments, 'string');

        if (str === '')
            return null;

        var timestamp = moment.utc(str, this.formats_Time)
                .toDate().getTime() / 1000;

        return timestamp % this.span_Day;
    }

}
module.exports = new abDate_Class();
