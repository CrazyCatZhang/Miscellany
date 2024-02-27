import axios from "axios";
import "reflect-metadata";

const Base = (name: string) => {
  const fn: ClassDecorator = (target) => {
    target.prototype.test = () => {
      console.log("test");
    };
    target.prototype.name = name;
  };
  return fn;
};

const Get = (url: string) => {
  const fn: MethodDecorator = (target, _, descriptor: PropertyDescriptor) => {
    const result = Reflect.getMetadata("result", target);
    axios.get(url).then((res) => {
      descriptor.value(result ? res.data[result] : res.data);
    });
  };

  return fn;
};

const Result = () => {
  const fn: ParameterDecorator = (target) => {
    Reflect.defineMetadata("result", "result", target);
  };
  return fn;
};

@Base("hello")
class Http {
  @Get("https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10")
  getList(@Result() data: any) {
    console.log(data);
  }
}

const http = new Http() as any;
http.test();
console.log(http.name);
