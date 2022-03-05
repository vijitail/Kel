import { deepFreeze } from './Utils/deepFreeze';

type KelAction<T> = (ctx: Partial<T>) => T;

type KelTKeys<T> = Array<keyof Partial<T>>;

type KelEvent<T> = {
    dep: KelTKeys<T>;
    cb?: KelAction<T>;
};

export default class Kel<T extends object> {
    private store: T;
    private events: {
        [key: string]: Array<KelEvent<T>>;
    };

    constructor(initialStore: T, eventsNames?: Array<string>) {
        this.store = initialStore;
        this.events = {
            ...eventsNames?.reduce((acc, next) => ({ ...acc, [next]: [] }), {}),
        };
    }

    emit(eventName: string, payload: T | KelAction<T>): void {
        try {
            if (typeof payload == 'function') {
                const fn = payload as KelAction<T>;
                this.store = {
                    ...this.store,
                    ...fn(deepFreeze(this.store)),
                };
            } else {
                this.store = { ...this.store, ...payload };
            }

            this.events[eventName].forEach(({ dep, cb }) => {
                if (cb)
                    if (dep.length == 0) cb(deepFreeze(this.store));
                    else {
                        const t: Partial<T> = {};
                        dep.forEach((k) => {
                            if (this.store.hasOwnProperty(k))
                                t[k] = this.store[k];
                        });

                        cb(t);
                    }
            });
        } catch (e) {
            console.error('Kel: error on "emit" call: \n');
            throw e;
        }
    }

    on(eventName: string, cb?: KelAction<T>, dep: KelTKeys<T> = []): void {
        this.events[eventName] = [];
        this.events[eventName].push({ dep, cb });
    }

    getState(): T {
        return { ...this.store };
    }
}
