import { CryptHelper } from '../../src/';
import { DateHelper } from '../../src/';

describe('CryptHelper', () => {
    const service = CryptHelper;

    //! see online sha256 function: `https://emn178.github.io/online-tools/sha256.html`
    const MSG_BODY = 'hello lemon';
    const MSG_HASH = 'c29d8aaaad96d728b27a95705b8d8dcd73e276578217ebcbd95ec90eb790166c';
    const EXPIRED = '2019-06-14 01:36:06'; // 한국 시간으로...
    const EXPIRED2 = '2020-06-14 01:36:06'; // 한국 시간으로...

    it('sha256', () => {
        expect(service.sha256(MSG_BODY)).toBe(MSG_HASH);
    });

    it('signature', () => {
        const expired = DateHelper.asDate(EXPIRED);
        const expired2 = DateHelper.asDate(EXPIRED2);
        const PASSCODE = '12345';
        const PASSCODE2 = '123456';
        const AUTHCODE = '1234';
        const SIGNAGURE = 'v1.d82197a19c097ac99e12c270f89f8ed364fb0c176ab9862a42d6d28ef2409921.1560443766000';
        const SIGNAGURE1 = 'v2.d82197a19c097ac99e12c270f89f8ed364fb0c176ab9862a42d6d28ef2409921.1560443766000';
        const SIGNAGURE2 = 'v1.d82197a19c097ac99e12c270f89f8ed364fb0c176ab9862a42d6d28ef2409922.1560443766000';
        const SIGNAGURE3 = 'v1.d82197a19c097ac99e12c270f89f8ed364fb0c176ab9862a42d6d28ef2409921.1560443765000';
        const SIGNAGURE4 = 'v1..1560443765000';
        const SIGNAGURE5 = 'v1.d82197a19c097ac99e12c270f89f8ed364fb0c176ab9862a42d6d28ef2409921';

        expect(() => service.signature('', '')).toThrow('passcode is required');
        expect(() => service.signature(PASSCODE, '')).toThrow('message is required');

        expect(() => service.checkSignature('', '', '')).toThrow('passcode is required');
        expect(() => service.checkSignature(PASSCODE, '', '')).toThrow('message is required');
        expect(() => service.checkSignature(PASSCODE, MSG_BODY, '')).toThrow('signature is required');

        const SIGN_PASSCODE = 'v1.deb018332c49eeace764b17ba86ac728889020fa021b65ce048b7cd002dc6ddc.1592066166000';
        expect(service.signature(PASSCODE, PASSCODE, expired2)).toBe(SIGN_PASSCODE);
        const SIGN_PASSCODE2 = 'v1.9b1449dfd5b74cb94d3d286067140a2c21eed02fc5b38124286a394e2a620a78.1592066166000';
        expect(service.signature(PASSCODE, PASSCODE2, expired2)).toBe(SIGN_PASSCODE2);
        expect(service.signature(PASSCODE, MSG_BODY, expired)).toBe(SIGNAGURE);
        const SIGN_AUTHCODE = 'v1.6afb26cf9f94191e65832861f9faa011c440e058398ae27bc182494f8822f24c.1592066166000';
        expect(service.signature(AUTHCODE, AUTHCODE, expired2)).toBe(SIGN_AUTHCODE);

        expect(service.checkSignature(PASSCODE, MSG_BODY, SIGNAGURE, expired)).toBe('');
        expect(service.checkSignature(PASSCODE, MSG_BODY, SIGNAGURE1, expired)).toBe('invalid version');
        expect(service.checkSignature(PASSCODE, MSG_BODY, SIGNAGURE2, expired)).toBe('invalid signature');
        expect(service.checkSignature(PASSCODE, MSG_BODY, SIGNAGURE3, expired)).toBe('expired time');
        expect(service.checkSignature(PASSCODE, MSG_BODY, SIGNAGURE4, expired)).toBe('invalid hash');
        expect(service.checkSignature(PASSCODE, MSG_BODY, SIGNAGURE5, expired)).toBe('invalid time');
    });
});
