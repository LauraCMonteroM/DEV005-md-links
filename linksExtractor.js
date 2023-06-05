const fs = require('fs');
const path = require('path');

const { paths } = require('./paths'); // borrar en un futuro

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

      links.push({ texto: textLink, url });
    }
    const completeLinks = links.map((link) => ({
      ...link,
      file: path.resolve(userPath),
    }));
    console.log(completeLinks);
  });
};

extractLinks(paths('README.md')[1]);

module.exports = {
  extractLinks,
};
