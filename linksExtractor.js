/* eslint-disable linebreak-style */
const fs = require('fs');
const path = require('path');

const extractLinks = (userPath) => {
  try {
    const data = fs.readFileSync(userPath, 'utf-8');

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
      file: path.resolve(userPath).replace(/\\/g, '/'),
    }));
    return completeLinks;
  } catch (err) {
    return undefined;
  }
};

module.exports = {
  extractLinks,
};
