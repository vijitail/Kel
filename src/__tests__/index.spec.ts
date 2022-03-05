import Kel from '..';

interface Example {
    foo: string;
    bar: number;
    baz: object;
}
describe('Kel: A Simple Store implementation', () => {
    const build = () => {
        const exampleObj: Example = {
            foo: 'bla',
            bar: 1223,
            baz: {
                buh: '1232',
            },
        };

        return { exampleObj };
    };

    it('Kel: store must be the same one as the init function', () => {
        const { exampleObj } = build();
        const store = new Kel<Example>(exampleObj);

        expect(store.getState()).toStrictEqual(exampleObj);
    });

    it('Kel: store emit can be called without callbacks', () => {
        const { exampleObj } = build();
        const store = new Kel<Example>(exampleObj, ['example:run']);

        store.emit('example:run', { ...exampleObj, foo: '111' });

        expect(store.getState()).toStrictEqual({ ...exampleObj, foo: '111' });
    });

    it('Kel: store emit can be called without callbacks', () => {
        const { exampleObj } = build();
        const store = new Kel<Example>(exampleObj);

        store.on('example:run');
        store.emit('example:run', { ...exampleObj, foo: '222' });

        expect(store.getState()).toStrictEqual({ ...exampleObj, foo: '222' });
    });

    it('Kel: store emit can be called with callbacks', () => {
        const { exampleObj } = build();
        const store = new Kel<Example>(exampleObj);

        const fn = jest.fn();
        store.on('example:run', fn);
        store.emit('example:run', { ...exampleObj, foo: '333' });

        expect(store.getState()).toStrictEqual({ ...exampleObj, foo: '333' });
        expect(fn).toBeCalled();
    });

    it('Kel: store must handle functions on emit', () => {
        const { exampleObj } = build();
        const store = new Kel<Example>(exampleObj);

        const fn = jest.fn();
        store.on('example:run', fn, ['foo']);
        store.emit('example:run', (ctx) => ({
            bar: ctx.bar!,
            baz: ctx.baz!,
            foo: '444',
        }));

        expect(store.getState()).toStrictEqual({ ...exampleObj, foo: '444' });
        expect(fn).toBeCalled();
    });

    it('Kel: store must throw an error on undefined emit event call', () => {
        const { exampleObj } = build();
        const store = new Kel<Example>(exampleObj);

        const fn = () =>
            store.emit('example:run', (ctx) => ({
                bar: ctx.bar!,
                baz: ctx.baz!,
                foo: '444',
            }));

        expect(fn).toThrow(TypeError);
    });
});
