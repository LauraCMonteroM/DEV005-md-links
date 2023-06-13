const fs = require('fs');
const { extractLinks } = require('./linksExtractor');
const { findMdFiles } = require('./paths');
const { validateLinks, statsLinks, brokenLinks } = require('./validatestats');

const mdLinks = (userPath, options) => new Promise((resolve, reject) => {
  const exist = fs.existsSync(userPath);
  if (!exist) {
    reject(new Error('This is an incorrect path/it doesn´t exist'));
    return;
  }
  const files = findMdFiles(userPath);
  const objLinks = files.map((route) => extractLinks(route)).flat();

  if (options.validate && options.stats) {
    resolve(brokenLinks(objLinks));
  } else if (options.stats && !options.validate) {
    resolve(statsLinks(objLinks));
  } else if (options.validate && !options.stats) {
    resolve(validateLinks(objLinks));
  } else {
    resolve(objLinks);
  }
});

module.exports = mdLinks;
