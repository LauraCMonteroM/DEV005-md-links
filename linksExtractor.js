const fs = require('fs');
const path = require('path');

const extractLinks = (userPath) => new Promise((resolve, reject) => {
  fs.readFile(userPath, 'utf-8', (err, data) => {
    if (err) {
      reject(err);
      return;
    }
    const regExpLinks = /\[(.*?)\]\((.*?)\)/g;
    const links = [];

    let coincidence;
    while ((coincidence = regExpLinks.exec(data)) !== null) {
      const textLink = coincidence[1];
      const urlLink = coincidence[2];

      const infolink = {
        index: links.length + 1,
        resolvedPath: path.resolve(userPath),
        texto: textLink,
        url: urlLink,
      };
      links.push(infolink);
      console.log(links);
    }

    resolve(links);
  });
});

const userPath = './src/Prueba1'; // ruta de ejemplo
extractLinks(userPath)
  .then((links) => {
    console.log(links); // Hacer algo con los links encontrados
  })
  .catch((error) => {
    console.error(error);
  });

module.exports = {
  extractLinks,
};
