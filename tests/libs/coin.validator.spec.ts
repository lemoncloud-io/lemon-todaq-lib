import { CoinValidator } from '../../src/';

describe('CoinValidator', () => {
    // const validator = new CoinValidator();
    const validator = CoinValidator;
    it('code-test', () => {
        expect(validator.isCoinCode('ABC')).toBe(true);
        expect(validator.isCoinCode('SOM')).toBe(true);
        expect(validator.isCoinCode('123')).toBe(false);
        expect(validator.isCoinCode('0AB')).toBe(false);
    });

    it('code-test-a', () => {
        expect(validator.isCoinCode('a')).toBe(false);
        expect(validator.isCoinCode('A')).toBe(false);
        expect(validator.isCoinCode('AA')).toBe(false);
    });

    it('name-test-a', () => {
        expect(validator.isCoinName(' ')).toBe(false);
        expect(validator.isCoinName(' abc')).toBe(false);
        expect(validator.isCoinName('A/A')).toBe(false);
        expect(validator.isCoinName('10원')).toBe(true);
    });
});
