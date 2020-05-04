(function (window) {
  function once(fn, context) {
    var result;

    return function () {
      if (fn) {
        result = fn.apply(context || this, arguments);
        fn = null;
      }

      return result;
    };
  }

  function deepFreeze(o) {
    Object.freeze(o);

    Object.keys(o).forEach(function (key) {
      if (
        o.hasOwnProperty(key) &&
        o[key] !== null &&
        (typeof o[key] === "object" || typeof o[key] === "function") &&
        !Object.isFrozen(o[key])
      ) {
        deepFreeze(o[key]);
      }
    });

    return o;
  }

  let store = {};

  const events = {};
  function Kel(initialStore = {}) {
    if (!(this instanceof Kel)) return new Kel(initialStore);

    store = initialStore;
  }

  Kel.prototype.emit = function (eventName, payload) {
    if (typeof payload == "function") payload = payload(deepFreeze(store));

    if (Object.prototype.toString.call(payload) !== "[object Object]") {
      console.error("Payload should be an object");
      return false;
    }

    if (!events.hasOwnProperty(eventName)) {
      console.error(`Event "${eventName}" does not exists`);
      return false;
    }

    store = { ...store, ...payload };

    events[eventName].forEach(({ dep, cb }) => {
      if (dep.length == 0) cb(deepFreeze(store));
      else {
        const t = {};
        dep.forEach((k) => {
          if (store.hasOwnProperty(k)) t[k] = store[k];
        });

        cb(t);
      }
    });

    return true;
  };

  Kel.prototype.on = function (eventName, cb, dep = []) {
    if (typeof cb !== "function") {
      console.error("on() method expects 2nd argument as a callback function");
      return false;
    }
    if (!events.hasOwnProperty(eventName)) events[eventName] = [];

    events[eventName].push({ dep, cb });

    return true;
  };

  window.Kel = once(Kel);
})(window);
