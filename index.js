const fs = require("fs");
const http = require("http");
const url = require("url");

// Files
// Synchronous blocking code
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log("Sync reading: ", textIn, "\n");

// const textOut = `This is an example of writing file to existing file: ${textIn}. \n Created on ${Date.now()}`;
// fs.writeFileSync("./txt/Output.txt", textOut);

// Asynchronous non-blocking code
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) {
//     console.log("Error!!! 👎👎");
//     return;
//   }
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log("async reading: ", data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       console.log("async reading: ", data3);
//       fs.writeFile(
//         "./txt/final.txt",
//         `${data2} \n ${data3}`,
//         "utf-8",
//         (err) => {
//           console.log("async writing completed ✔");
//         }
//       );
//     });
//   });
// });

// HTTP and URL

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productData = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is overview");
  } else if (pathName === "/product") {
    res.end("This is product");
  } else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "test header",
    });
    res.end("<h2> Page Not found</h2>");
  }
});

server.listen(8000, "127.0.0.1", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Listening to the incoming request...");
});
