const mdLinks = require('./mdlinks');

const path = process.argv[2];

const validateValue = process.argv.filter((argument) => argument === '--validate').length >= 1;
const statsValue = process.argv.filter((argument) => argument === '--stats').length >= 1;

mdLinks(path, { validate: validateValue, stats: statsValue })
  .then((result) => {
    console.log(result);
  }).catch((error) => {
    console.error(error);
  });
