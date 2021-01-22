/**
 * coin-validator.ts
 * - common error handler.
 *
 *
 * @author      Steve Jung <steve@lemoncloud.io>
 * @date        2019-06-12 initial version
 * @date        2021-01-22 optimzied and cleanup
 *
 * @copyright (C) 2021 LemonCloud Co Ltd. - All Rights Reserved.
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
