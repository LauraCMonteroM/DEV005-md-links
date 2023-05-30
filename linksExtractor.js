const fs = require('fs');
const { paths } = require('./paths'); // borrar en un futuro

const extractLinks = (userPath) => {
  const buffer = fs.readFileSync('./src/Prueba1/archivosvariosmarkdown/doslinks.md');
  
  console.log(buffer);
};

// console.log(extractLinks(paths('./src/Prueba1')[0]));

// extractLinks puede (opcional) ser una promesa y se cosume asi  extractLinks(paths('README.md')[0]).then(res=>console.log(res)).catch(err=>console.log(err))

module.exports = {
  extractLinks,
};
