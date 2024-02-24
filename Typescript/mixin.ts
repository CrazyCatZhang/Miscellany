class Logger {
  log(msg: string) {
    console.log(msg);
  }
}

class Html {
  render() {
    console.log("render");
  }
}

class App {
  run() {
    console.log("run");
  }
}

type Constructor<T> = new (...args: any[]) => T;

function mixins<T extends Constructor<{}>>(base: T) {
  return class extends base {
    private html = new Html();
    private logger = new Logger();
    constructor(...args: any[]) {
      super(...args);
    }

    run() {
      this.logger.log("run");
    }

    render() {
      this.logger.log("render");
      this.html.render();
    }
  };
}

const MyApp = mixins(App);
const myApp = new MyApp();
myApp.run();
myApp.render();
