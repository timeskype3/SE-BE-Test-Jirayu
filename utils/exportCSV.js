
function createFile({ path, data, options }) {
  const fs = require('fs');
  const stream = fs.createWriteStream(path, {
    flags: "w",
    encoding: options,
  });
  for (let i of data) {
    stream.write(i.join(",") + "\r\n");
  }
  stream.end();
  console.log(path + " is exported.")
}

function exportCsv(data) {
  createFile({ path: "exportFile.csv", data, options: "utf8" });
}

module.exports = { exportCsv };