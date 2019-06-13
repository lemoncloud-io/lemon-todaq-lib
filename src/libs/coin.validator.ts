/**
 * coin.validator.ts
 * - common error handler.
 *
 *
 * @author steve@lemoncloud.io
 * @date   2019-06-04
 * @copyright (C) lemoncloud.io 2019 - All Rights Reserved.
 */
export class CoinValidator {
    /**
     * coin-code should be upper-case alphabet.
     */
    public static isCoinCode = (text: string) => /^[A-Z][A-Z0-9+/]{2,}$/.test(text);

    /**
     * coin-name should be string without '/' string with trim()
     */
    public static isCoinName = (text: string) => /^[^\s][^\/]{1,}[^\s]$/.test(text);
}
