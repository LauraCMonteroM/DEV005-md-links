const fs = require('fs');

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) =>{
    // ¿la ruta es válida?
    if (fs.existsSync(path)){
      // ¿es una ruta absoluta?
      
    } else {
      // si no existe la ruta
      reject ('La ruta no existe');
    }
  })
  // Identificar si la ruta existe
  
};