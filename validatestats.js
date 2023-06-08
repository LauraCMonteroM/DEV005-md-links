const fetch = require('node-fetch');

const validateLinks = (arrayLinks) => new Promise((resolve, reject) => {
  const promises = arrayLinks.map((link) => fetch(link.url)
    .then((res) => {
      link.status = res.status;
      link.message = res.statusText;
      return link;
    })
    .catch((err) => {
      link.status = 'Not Found';
      return link;
    }));

  Promise.all(promises)
    .then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
});

const statsLinks = (arrayLinks) => {
  const uniqueSet = new Set(arrayLinks.map((link) => link.url)).size;
  return {
    Total: arrayLinks.length,
    Uniques: uniqueSet,
  };
};

const brokenLinks = (arrayLinks) => {
  const uniqueSet = new Set(arrayLinks.map((link) => link.url)).size;
  return {
    Total: arrayLinks.length,
    Broken: (arrayLinks.filter((e) => e.message === 'Not Found')).length,
    Uniques: uniqueSet,
  };
};

module.exports = {
  validateLinks, statsLinks, brokenLinks,
};
