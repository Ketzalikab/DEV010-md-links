const mdLinks = require('./mdLinks.js');
const pathModule = require('path');
const filePath = pathModule.join(__dirname, 'prueba.md');
mdLinks(filePath)
  .then(links => {
    console.log('Enlaces encontrados:', links);
    console.log(links);

    if (Array.isArray(links)) {
      console.log('Prueba 2: links es un array')
    } else {
      console.error('Prueba 2: links NO es un array.');
    }
    if (links.length > 0) {
      console.log('Prueba 3: No se econtraron al menos un enlace.');
    } else {
      console.error('Prueba 3: No se encontraron enlaces.');
    }
  })
  .catch(err => {
    console.error(err);
  });
