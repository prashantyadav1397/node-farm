const fs = require("fs");
const http = require("http");

// Files

// Synchronous blocking code
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log("Sync reading: ", textIn, "\n");

const textOut = `This is an example of writing file to existing file: ${textIn}. \n Created on ${Date.now()}`;
fs.writeFileSync("./txt/Output.txt", textOut);

// Asynchronous non-blocking code
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) {
    console.log("Error!!! 👎👎");
    return;
  }
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log("async reading: ", data2);
    fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
      console.log("async reading: ", data3);
      fs.writeFile(
        "./txt/final.txt",
        `${data2} \n ${data3}`,
        "utf-8",
        (err) => {
          console.log("async writing completed ✔");
        }
      );
    });
  });
});

// HTTP

const server = http.createServer((req, res) => {
  console.log(req);
  res.end("Hello from the server!");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to the incoming request...");
});
