/**
 * `index.spec.ts`
 *
 * @author      Steve Jung <steve@lemoncloud.io>
 * @date        2021-01-22 optimized
 *
 * @copyright (C) 2021 LemonCloud Co Ltd. - All Rights Reserved.
 */
import Main from '../src';

describe('Main', () => {
    const main = new Main();
    it('say hello()', () => {
        expect(main.hello()).toBe('hello todaq-lib');
    });
});
