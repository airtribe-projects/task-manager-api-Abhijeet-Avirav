const fs = require("fs");

const readFile = (filePath) => {
  console.log("filePath", { filePath });
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        return reject(err);
      } else {
        try {
          const jsonData = JSON.parse(data);
          return resolve(jsonData);
        } catch (error) {
          return reject(error);
        }
      }
    });
  });
};

module.exports = {
  readFile,
};
