/**
 * `crypt.helper.spec.ts`
 *
 * @author      Steve Jung <steve@lemoncloud.io>
 * @date        2021-01-22 initial version
 *
 * @copyright (C) 2021 LemonCloud Co Ltd. - All Rights Reserved.
 */
import fastSha256 from 'fast-sha256';
function sha256(msg: string): string {
    const hex = (x: any) => Buffer.from(x).toString('hex');
    return hex(fastSha256(new Uint8Array(Buffer.from(msg))));
}

//! main test body.
describe('crypt-helper', () => {
    it(`should pass sha256`, () => {
        // test cases
        expect(sha256('')).toEqual('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
        expect(sha256('1')).toEqual('6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b');
        expect(sha256('a')).toEqual('ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb');
    });
});
