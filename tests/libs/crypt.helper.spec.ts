import { CryptHelper } from '../../src/';
import { DateHelper } from '../../src/';

describe('CryptHelper', () => {
    const service = CryptHelper;

    //! see online sha256 function: `https://emn178.github.io/online-tools/sha256.html`
    const MSG_BODY = 'hello lemon';
    const MSG_HASH = 'c29d8aaaad96d728b27a95705b8d8dcd73e276578217ebcbd95ec90eb790166c';
    const EXPIRED = '2019-06-14 01:36:06'; // 한국 시간으로...

    it('sha256', () => {
        expect(service.sha256(MSG_BODY)).toBe(MSG_HASH);
    });

    it('signature', () => {
        const expired = DateHelper.asDate(EXPIRED);
        const PASSCODE = '12345';
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

        expect(service.signature(PASSCODE, MSG_BODY, expired)).toBe(SIGNAGURE);

        expect(service.checkSignature(PASSCODE, MSG_BODY, SIGNAGURE, expired)).toBe('');
        expect(service.checkSignature(PASSCODE, MSG_BODY, SIGNAGURE1, expired)).toBe('invalid version');
        expect(service.checkSignature(PASSCODE, MSG_BODY, SIGNAGURE2, expired)).toBe('invalid signature');
        expect(service.checkSignature(PASSCODE, MSG_BODY, SIGNAGURE3, expired)).toBe('expired time');
        expect(service.checkSignature(PASSCODE, MSG_BODY, SIGNAGURE4, expired)).toBe('invalid hash');
        expect(service.checkSignature(PASSCODE, MSG_BODY, SIGNAGURE5, expired)).toBe('invalid time');
    });
});
