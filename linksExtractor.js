const fs = require('fs');
const path = require('path');

const { paths } = require('./paths'); // borrar en un futuro

const extractedLinks = [];

const extractLinks = (userPath) => {
fs.readFile(userPath, 'utf-8', (err, data) => {
    if (err) {
      return undefined;
    }
    const regExpLinks = /\[(.*?)\]\((.*?)\)/g;
    const links = [];

    let coincidence;
    while ((coincidence = regExpLinks.exec(data)) !== null) {
      const textLink = coincidence[1];
      const url = coincidence[2];

      links.push({ texto: textLink, url: url });
    }
    links.forEach((link, i) => {
      console.log(` ${i + 1}:`);
      console.log(path.resolve(userPath));
      console.log('TEXT: ', link.texto);
      console.log('URL: ', link.url);
    });
  });
};

extractLinks(paths('./src/Prueba1')[0]);



module.exports = {
  extractLinks,
};
