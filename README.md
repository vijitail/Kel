# Kel
A dead simple, event driven state management library for Vanilla JS apps.

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

store.on("countChange", ({ count }) => {
  document.querySelectorAll("span.counter-value")[0].textContent = count;
});

document.getElementById("inc").addEventListener("click", function () {
  store.emit("countChange", ({ count }) => ({ count: count + 1 }));
});

document.getElementById("dec").addEventListener("click", function () {
  store.emit("countChange", ({ count }) => ({ count: count - 1 }));
});
```
