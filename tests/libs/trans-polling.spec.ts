import { TransactionPolling } from '../../src/';

describe('CoinValidator', () => {
    const service = TransactionPolling;
    const wait10 = () =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 10);
        });

    it('polling-end', async () => {
        await expect(
            service.polling(
                async (tick: number) => {
                    await wait10();
                    if (tick == 1) return 10;
                },
                1000,
                100,
            ),
        ).resolves.toBe(10);
    });

    it('polling-timeout', async () => {
        await expect(
            service.polling(
                async (tick: number) => {
                    await wait10();
                },
                1000,
                100,
            ),
        ).rejects.toThrow('timeout');
    });

    it('polling-error', async () => {
        await expect(
            service.polling(
                async (tick: number) => {
                    await wait10();
                    if (tick > 1) throw new Error('tick1');
                },
                1000,
                100,
            ),
        ).rejects.toThrow('tick1');
    });
});
