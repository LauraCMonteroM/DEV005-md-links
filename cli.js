const mdLinks = require('./mdlinks');

const path = process.argv[2];

const validate = process.argv.filter((argument) => argument === '--validate').length === 1;
const stats = process.argv.filter((argument) => argument === '--stats').length === 1;

mdLinks(path, { validate, stats }).then((result) => {
  console.log('es usted?', result);
}).catch((error) => {
  console.error('error');
});
