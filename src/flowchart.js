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
                    return userRoute
          } else {
                    return path.resolve(userRoute)
          }
}

const isAdirectory = (path) =>{
  return new Promise((resolve, reject) =>{
    fs.stat(path, (err, stats) => {
      if( !err ){
           if(stats.isFile()){
              resolve(false)
               console.log('is file ? ' + stats.isFile());
           }  else if(stats.isDirectory()){
              resolve(true)
               console.log('is directory? ' + stats.isDirectory());
           }
       }}) 
  }) 
}

        module.exports = { validPath, toAbsolutePath,  isAdirectory}