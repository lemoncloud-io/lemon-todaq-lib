import Main from '../src';

describe('Main', () => {
    const main = new Main();
    it('say hello()', () => {
        expect(main.hello()).toBe('hello todaq-lib');
    });
});
