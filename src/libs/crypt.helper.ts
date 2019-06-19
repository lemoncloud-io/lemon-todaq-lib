/**
 * crypt.helper.ts
 * - helper class for encryptions
 *
 * **TODO**
 *
 * @author steve@lemoncloud.io
 * @date   2019-06-12
 * @copyright (C) lemoncloud.io 2019 - All Rights Reserved.
 */
import sha256, { Hash, HMAC } from 'fast-sha256';

export class CryptHelper {
    /**
     * get sha256 hex string
     *
     * @param msg string message.
     */
    public static sha256(msg: string): string {
        const hex = (x: any) => new Buffer(x).toString('hex');
        return hex(sha256(new Uint8Array(Buffer.from(msg))));
    }

    public static readonly HASH_DELIMITER = '^';
    public static readonly SIGN_DELIMITER = '.';

    /**
     * get signature for the given message.
     *
     * @param passcode  string passcode
     * @param message   message
     * @param expired   expire due date (default is now)
     * @param version   version of signature.
     */
    public static signature(passcode: string, message: string, expired?: Date, version: number = 1) {
        expired = expired || new Date();
        if (!passcode) throw new Error('passcode is required');
        if (!message) throw new Error('message is required');
        const ver = `v${version}`;
        const ttm = `${expired.getTime()}`;
        const sig = CryptHelper.sha256(message);
        const msg = [ver, passcode, ttm, sig].join(CryptHelper.HASH_DELIMITER);
        const sh2 = CryptHelper.sha256(msg);
        return `${ver}-${sh2}-${ttm}`.split('-').join(CryptHelper.SIGN_DELIMITER);
    }

    /**
     * check signautre.
     * - return '' if success, or error-code.
     *
     * @param passcode  string passcode
     * @param message   message
     * @param signature signature string.
     * @param expired   expire due date (default is now)
     */
    public static checkSignature(passcode: string, message: string, signature: string, expired?: Date) {
        expired = expired || new Date();
        if (!passcode) throw new Error('passcode is required');
        if (!message) throw new Error('message is required');
        if (!signature) throw new Error('signature is required');
        const [ver, sh2, ttm] = signature.split(CryptHelper.SIGN_DELIMITER);
        if (!ver || ver != 'v1') return 'invalid version';
        if (!sh2) return 'invalid hash';
        if (!ttm) return 'invalid time';
        //! check expired.
        const exp0 = parseInt(ttm);
        const exp2 = expired.getTime();
        if (exp0 > 0 && exp0 < exp2) return 'expired time';

        //! check hash-code.
        const sig = CryptHelper.sha256(message);
        const msg = [ver, passcode, ttm, sig].join(CryptHelper.HASH_DELIMITER);
        const sh0 = CryptHelper.sha256(msg);
        if (sh2 != sh0) return 'invalid signature';
        return '';
    }
}
