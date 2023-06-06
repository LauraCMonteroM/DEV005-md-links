const { extractLinks } = require('./linksExtractor');
const { findMdFiles } = require('./paths');

const mdLinks = (path) => new Promise((resolve, reject) => {
  const files = findMdFiles(path);
  const promises = files.map((route) => extractLinks(route));

  Promise.all(promises)
    .then((results) => {
      const allLinks = results.flat();
      resolve(allLinks);
    })
    .catch((error) => {
      reject(error);
    });
});

mdLinks('./src/Prueba1/jajajajaja')
  .then((links) => {
    console.log('nosotros somos los links :', links);
  })
  .catch((error) => {
    console.error('es un error encontrar links en un archivo inexistente', error);
  });

module.exports = mdLinks;
