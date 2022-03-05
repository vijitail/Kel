export function deepFreeze<T extends object>(o: T | object) {
    Object.freeze(o);

    Object.keys(o).forEach((key: string) => {
        const k = key as keyof typeof o;
        if (
            o.hasOwnProperty(key) &&
            o[k] !== null &&
            (typeof o[k] === 'object' || typeof o[k] === 'function') &&
            !Object.isFrozen(o[k])
        ) {
            deepFreeze(o[k]);
        }
    });

    return o as T;
}
