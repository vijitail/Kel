# Kel.ts

A dead simple, event driven state management library for Typescript apps.

## Install

You can install it using npm or yarn:

```sh
npm i ts-kel
# or
yarn add ts-kel
```

## Usage

You can import it from the default lib export:

```ts
import Kel from 'ts-kel';
```

If you're looking for the CDN / Vanilla implementation, go to the [original repo](https://github.com/vijitail/Kel).

## Initialize the global store

```ts
interface Example {
    a?: object;
}

const initialStore: Example = {};
const store = Kel<Example>(initialStore);
```

## Subscribe to an event

```ts
store.on(eventName, (store) => {
    // do something
});
```

## Emit an event

```ts
store.emit(eventName, (store) => {
    // do something and return the updated store
});
```

## Counter Example

```ts
interface Counter {
    count: number;
}

const store = Kel<Counter>({ count: 0 });

const COUNT_CHANGE = 'countChange';

store.on(COUNT_CHANGE, ({ count }) => {
    (document.querySelector('span.counter-value') as HTMLElement).textContent =
        count;
});

document.getElementById('inc').addEventListener('click', function () {
    store.emit(COUNT_CHANGE, ({ count }) => ({ count: count + 1 }));
});

document.getElementById('dec').addEventListener('click', function () {
    store.emit(COUNT_CHANGE, ({ count }) => ({ count: count - 1 }));
});
```

# Special Thanks

This was created based on a fork of the [Kel.js library](https://github.com/vijitail/Kel).

Thanks to vijitail to creating such usefull library.

Just hope that this implementation can help those looking for a TS implementation of this lib.
