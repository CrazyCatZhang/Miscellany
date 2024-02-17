let canvas = document.getElementById("canvas") as HTMLCanvasElement;
let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.width = screen.availWidth;
canvas.height = screen.availHeight;

const str: string[] = "HELLOWORLD010101".split("");
const arr = Array(Math.ceil(canvas.width / 10)).fill(0);

const rain = () => {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0f0";
  arr.forEach((a, i) => {
    const text = str[Math.floor(Math.random() * str.length)];
    ctx.fillText(text, i * 10, a);
    arr[i] = a > canvas.height && Math.random() > 0.975 ? 0 : arr[i] + 10;
  });
};

setInterval(rain, 40);
