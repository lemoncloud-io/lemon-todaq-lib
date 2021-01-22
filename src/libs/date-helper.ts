/**
 * date-helper.ts
 * - helper class for date
 *
 * **NOTE**
 * - TIME_ZONE 과 `TimezoneOffset`와는 개념상 약간 차이가 있음.
 * - 썸머타임을 이용하는 나라의 경우, `TimezoneOffset`이 수시로 바뀜 => TODO:IMPROVE.
 *
 * @author      Steve Jung <steve@lemoncloud.io>
 * @date        2019-06-12 initial version
 * @date        2021-01-22 optimzied and cleanup
 *
 * @copyright (C) 2021 LemonCloud Co Ltd. - All Rights Reserved.
 */
export class DateHelper {
    /**
     * default time-zone for this api. (Asia/Seoul - 9 hours)
     */
    public static DEFAULT_TIME_ZONE = 9;

    /**
     * convert to date of input.
     */
    public static asDate = (dt?: string | number, timeZone?: number): Date => {
        dt = dt === undefined ? new Date().getTime() : dt;
        timeZone = timeZone === undefined ? DateHelper.DEFAULT_TIME_ZONE : timeZone;
        let ret = null;
        if (typeof dt == 'string') {
            let timestamp = '';
            if (/^[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(dt)) {
                //! like 1978-12-01
                timestamp = dt + ' 00:00:00';
            } else if (/^[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(dt)) {
                //! like 1978-12-01 12:34
                timestamp = dt + ':00';
            } else if (
                /^[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(dt)
            ) {
                //! like 1978-12-01 12:34:20
                timestamp = dt + '';
            } else if (/^[12]\d{3}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/.test(dt)) {
                //! like 19781201
                timestamp = dt.substr(0, 4) + '-' + dt.substr(4, 2) + '-' + dt.substr(6, 2) + ' 00:00:00';
            } else if (/^[12]\d{3}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01]) ([01]?[0-9]|2[0-3])[0-5][0-9]$/.test(dt)) {
                //! like 19781201 1234
                timestamp =
                    dt.substr(0, 4) +
                    '-' +
                    dt.substr(4, 2) +
                    '-' +
                    dt.substr(6, 2) +
                    ' ' +
                    dt.substr(9, 2) +
                    ':' +
                    dt.substr(11, 2) +
                    ':00';
            } else {
                throw new Error('Invalid format:' + dt);
            }
            ret = DateHelper.parseTimestamp(timestamp, timeZone);
        } else if (typeof dt == 'number') {
            ret = new Date(dt);
        }
        return ret;
    };

    /**
     * parse timestamp string like 'YYYY-MM-DD HH:ii:SS'
     * - api 실행환경의 타임존이 UTC인데, 서비스 시간대는 한국일때 오차가 생길 수 있음
     * - 이를 보완해 주기위해서 `timeZone` 값으로 보정해 준다.
     *
     * @param ts    timestamp
     * @param timeZone timezone shift
     */
    public static parseTimestamp(ts: string, timeZone?: number): Date {
        timeZone = timeZone === undefined ? DateHelper.DEFAULT_TIME_ZONE : timeZone;
        if (!/^[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(ts))
            throw new Error('Invalid format:' + ts);
        let aa = ts.split(' ');
        let dd = aa[0].split('-');
        let hh = aa[1].split(':');
        let y = parseInt(dd[0]),
            m = parseInt(dd[1]) - 1,
            d = parseInt(dd[2]);
        let h = parseInt(hh[0]),
            i = parseInt(hh[1]),
            s = parseInt(hh[2]);
        const dt = new Date(y, m, d, h, i, s, 0);
        //! adjust by time-zone.
        const time = dt.getTime();
        const tzo = dt.getTimezoneOffset();
        const diff = -1 * (timeZone * 60 + tzo);
        return new Date(time + diff * 60 * 1000);
    }

    /**
     * as timestamp.
     *
     * @param dt    date object
     * @param timeZone time-zone shift.
     */
    public static timestamp(dt?: Date, timeZone?: number) {
        dt = dt === undefined ? new Date() : dt;
        timeZone = timeZone === undefined ? DateHelper.DEFAULT_TIME_ZONE : timeZone;

        const tzo = dt.getTimezoneOffset();
        const diff = timeZone * 60 + tzo;
        const time = dt.getTime();
        const dt2 = new Date(time + diff * 60 * 1000);

        const y = dt2.getFullYear();
        const m = dt2.getMonth() + 1; //Months are zero based
        const d = dt2.getDate();
        const h = dt2.getHours();
        const i = dt2.getMinutes();
        const s = dt2.getSeconds();

        const a1 = [y, m, d].map(d => (d < 10 ? `0${d}` : `${d}`));
        const a2 = [h, i, s].map(d => (d < 10 ? `0${d}` : `${d}`));

        return a1.join('-') + ' ' + a2.join(':');
    }
}
