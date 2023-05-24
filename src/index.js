const fs = require('fs');
const { validPath , toAbsolutePath } = require('./flowchart.js')

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) =>{
    if (validPath(path)){
      const absolutePath = toAbsolutePath(path);
      resolve(absolutePath);
    } else {
      reject ('Error')
    }
  
// es archivo .md o directorio?
fs.stat(path, (err, stats) => {
  if( !err ){
       if(stats.isFile()){
           console.log('is file ? ' + stats.isFile());
       }  else if(stats.isDirectory()){
           console.log('is directory? ' + stats.isDirectory());
       }
   }   
  });
})};

  

   //   mdLinks(path)
  //   .then((res) => {
  //   console.log(`La ruta: ${res} es válida`)
  // })
  // .catch((error) =>{
  //   console.log(error);
  // })



mdLinks('./Prueba1')

module.exports = {
  mdLinks,
};