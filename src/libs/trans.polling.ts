export class TransactionPolling {
    public static polling = async (
        callback: (tick: number) => Promise<any>,
        timeout: number = 30000,
        interval = 3000,
    ): Promise<any> =>
        new Promise((resolve, reject) => {
            const max = timeout / interval;
            const next = (tick: number): any =>
                Promise.resolve(tick)
                    .then(callback)
                    .then((data: any) => {
                        if (data) resolve(data);
                        else if (tick > max) reject(new Error('timeout'));
                        else {
                            setTimeout(() => {
                                next(tick + 1);
                            }, interval);
                        }
                    })
                    .catch(e => reject(e));
            next(0);
        });
}
