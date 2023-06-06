const { extractLinks } = require('./linksExtractor');
const { paths } = require('./paths');

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  const files = paths(path);
  const objLinks = files.map(ruta => extractLinks(ruta));
  console.log(objLinks.flat());
  resolve();
});

mdLinks('./src/Prueba1')

module.exports = mdLinks;
