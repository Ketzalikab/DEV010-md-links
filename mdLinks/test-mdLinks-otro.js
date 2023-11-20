
const mdLinks = require('./mdLinks.js');
const pathModule = require('path');

const directorioPath = pathModule.join(__dirname, 'mi_directorio');

mdLinks(directorioPath)
  .then(links => {
    console.log('Enlaces encontrados:', links);

    if (Array.isArray(links)) {
      console.log('Prueba 2: links es un array');
    } else {
      console.error('Prueba 2: links NO es un array.');
    }
    if (links.length > 0) {
      console.log('Prueba 3: Se encontraron al menos un enlace.');
    } else {
      console.error('Prueba 3: No se encontraron enlaces.');
    }
  })
  .catch(err => {
    console.error(err);
  });
