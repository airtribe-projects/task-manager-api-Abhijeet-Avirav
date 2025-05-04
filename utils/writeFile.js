const fs = require("fs");

const writeFile = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data), (err) => {
      if (err) {
        return reject(err);
      } else {
        return resolve("File written successfully");
      }
    });
  });
};

module.exports = {
  writeFile,
};
