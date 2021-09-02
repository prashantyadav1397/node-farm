const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");
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

// Reading Json Data from file for response in the API
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

// Reading template from the file for updating the UI
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const server = http.createServer((req, res) => {
  const path = req.url;
  const { query, pathname } = url.parse(path, true);

  // Overview Page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardsHtml = dataObj
      .map((product) => replaceTemplate(tempCard, product))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  }

  // Products page
  else if (pathname === "/product") {
    const oneProduct = dataObj[query.id];
    const output = replaceTemplate(tempProduct, oneProduct);

    res.end(output);
  }

  // API
  else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  }

  // Not found
  else {
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
