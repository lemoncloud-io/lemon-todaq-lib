/**
 * `date-helper.spec.ts`
 *
 * @author      Steve Jung <steve@lemoncloud.io>
 * @date        2021-01-22 optimized
 *
 * @copyright (C) 2021 LemonCloud Co Ltd. - All Rights Reserved.
 */
import { DateHelper } from '../../src/';

describe('DateHelper', () => {
    const service = DateHelper;
    const dt = new Date(1560443766000); // Fri Jun 14 2019 01:36:06 GMT+0900 (Korean Standard Time)
    const ts = '2019-06-14 01:36:06'; // 한국 시간으로...
    const ts7 = '2019-06-13 23:36:06'; // 베트남 시간으로..

    it('timestamp', () => {
        expect(service.timestamp(dt)).toBe(ts);
        expect(service.parseTimestamp(ts).getTime()).toBe(dt.getTime());
        expect(service.timestamp(service.asDate())).toBe(service.timestamp(new Date()));
        expect(service.timestamp(service.asDate(new Date().getTime()))).toBe(service.timestamp());
        expect(service.timestamp(service.asDate('2019-06-14', 9))).toBe('2019-06-14 00:00:00');
        expect(service.timestamp(service.asDate('2019-06-14 13:10'))).toBe('2019-06-14 13:10:00');
        expect(service.timestamp(service.asDate('2019-06-14 13:10:00'))).toBe('2019-06-14 13:10:00');
        expect(service.timestamp(service.asDate('20190614'))).toBe('2019-06-14 00:00:00');
        expect(service.timestamp(service.asDate('20190614 1310'))).toBe('2019-06-14 13:10:00');
        expect(service.timestamp(service.asDate(1560443766000))).toBe(ts);
        expect(() => service.timestamp(service.asDate('20190614 13:10'))).toThrow();
    });

    it('timestamp-timezone', () => {
        expect(service.timestamp(dt, 7)).toBe(ts7);
        expect(service.parseTimestamp(ts7, 7).getTime()).toBe(dt.getTime());
        expect(() => service.parseTimestamp('2019-06-14', 8).getTime()).toThrow();
    });
});
