# Kel

A dead simple, event driven state management library for Vanilla JS apps.

[Form demo](https://kel.vijitail.dev/form/)

## Initialize the global store

```js
const initialStore = {};
const store = Kel(initialStore);
```

## Subscribe to an event

```js
store.on(eventName, (store) => {
  // do something
});
```

## Emit an event

```js
store.emit(eventName, (store) => {
  // do something and return the updated store
});
```

## Counter Example

```js
const store = Kel({ count: 0 });

const COUNT_CHANGE = "countChange";

store.on(COUNT_CHANGE, ({ count }) => {
  document.querySelectorAll("span.counter-value")[0].textContent = count;
});

document.getElementById("inc").addEventListener("click", function () {
  store.emit(COUNT_CHANGE, ({ count }) => ({ count: count + 1 }));
});

document.getElementById("dec").addEventListener("click", function () {
  store.emit(COUNT_CHANGE, ({ count }) => ({ count: count - 1 }));
});
```
