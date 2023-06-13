/* eslint-disable linebreak-style */
const fs = require('fs');
const path = require('path');

const findMdFiles = (userPath) => {
  const arrayMdFiles = [];

  const processPath = (filePath) => {
    if (fs.statSync(filePath).isFile() && path.extname(filePath) === '.md') {
      arrayMdFiles.push(path.resolve(filePath));
    } else if (fs.statSync(filePath).isDirectory()) {
      const filesInside = fs.readdirSync(filePath);
      filesInside.forEach((file) => {
        const pathPlusFileInside = path.join(filePath, file);
        processPath(pathPlusFileInside);
      });
    }
  };

  if (fs.existsSync(userPath)) {
    const absolutePath = path.resolve(userPath);
    processPath(absolutePath);
  } else {
    return 'El archivo o directorio no existe';
  }

  return arrayMdFiles;
};

module.exports = {
  findMdFiles,
};
