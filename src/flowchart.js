const path = require("path");
const fs = require ('fs')


// ¿la ruta existe?
const validPath = (path) => {
          if (fs.existsSync(path)){
                    console.log(`La ruta existe: ${path}`);
                    return true
                  } else {
                    console.log ('La ruta no existe');
                    return false
                  }}


// ¿la ruta es absoluta?
const toAbsolutePath = (userRoute) => {
          if(path.isAbsolute(userRoute)){
                    console.log('Esta es la ruta absoluta ' + userRoute)
          } else {
                    console.log('convertida a absoluta es:' + path.resolve(userRoute));
          }
}


        module.exports = { validPath , toAbsolutePath }