/**
 * index.ts
 * - main index
 *
 * @author      Steve Jung <steve@lemoncloud.io>
 * @date        2019-06-12 initial version
 * @date        2021-01-22 optimzied and cleanup
 *
 * @copyright (C) 2021 LemonCloud Co Ltd. - All Rights Reserved.
 */
export default class Main {
    public constructor() {}

    public hello() {
        return 'hello todaq-lib';
    }
}

export * from './libs';
