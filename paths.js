/* eslint-disable linebreak-style */
const fs = require('fs');
const path = require('path');

const paths = (userPath) => {
  if (fs.existsSync(userPath) === true && fs.statSync(userPath).isFile() === true && path.extname(userPath) === '.md') {
    console.log('si existe');
  }
};

paths('./src/Prueba1/archivosvarios.md/doslinks.md');
