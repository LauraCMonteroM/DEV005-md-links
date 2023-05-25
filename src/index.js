const fs = require('fs');
const path = require ('path')
const { validPath , toAbsolutePath, isAdirectory} = require('./flowchart.js')

const mdLinks = (userPath, options) => {
  return new Promise((resolve, reject) =>{
    if (validPath(userPath)){
      const absolutePath = toAbsolutePath(userPath);
      isAdirectory(absolutePath).then((isAdirectory)=>{
        if(isAdirectory){
          // recorrerlo
        } else if(path.extname(absolutePath) === '.md') /* si es .md guardarlo en un array*/ {
          let mdFiles = [];
          mdFiles.push(absolutePath);
          console.log(mdFiles.length)
        } else {
          
        }
      })
      resolve(absolutePath);
    } else {
      reject ('Error')
    }
})};

mdLinks('C:/Users/Laura Montero/Desktop/MdLinks/DEV005-md-links/src/Prueba1/archivosvarios.md/nolinks.md')

module.exports = {
  mdLinks,
};