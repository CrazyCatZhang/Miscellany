interface I {
  events: Map<string, Function[]>;
  once: (event: string, callback: Function) => void;
  on: (event: string, callback: Function) => void;
  off: (event: string, callback: Function) => void;
  emit: (event: string, ...args: any[]) => void;
}

class Emitter implements I {
  events: Map<string, Function[]>;

  constructor() {
    this.events = new Map();
  }

  on(event: string, callback: Function) {
    if (this.events.has(event)) {
      const callbackList = this.events.get(event);
      callbackList && callbackList.push(callback);
    } else {
      this.events.set(event, [callback]);
    }
  }

  off(event: string, callback: Function) {
    const callbackList = this.events.get(event);
    callbackList && callbackList.splice(callbackList.indexOf(callback), 1);
  }

  emit(event: string, ...args: any[]) {
    const callbackList = this.events.get(event);
    callbackList &&
      callbackList.forEach((fn) => {
        fn(...args);
      });
  }

  once(event: string, callback: Function) {
    const fn = (...args: any[]) => {
      callback(...args);
      this.off(event, fn);
    };
    this.on(event, fn);
  }
}

const bus = new Emitter();

const fn = (...args: any[]) => {
  console.log(args);
};

bus.on("test", fn);
bus.off("test", fn);

bus.emit("test", false, 1);
