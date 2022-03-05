import { deepFreeze } from '../deepFreeze';

interface Example {
    b: {
        c: string;
    };
}

describe('Deep Freeze', () => {
    it('must throw an error when you try to change the object source', () => {
        const a: Example = deepFreeze({
            b: {
                c: '123',
            },
        });

        expect(() => (a.b.c = '456')).toThrow(TypeError);
    });
});
