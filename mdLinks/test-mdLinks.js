const mdLinks = require('./mdLinks.js');
const pathModule = require('path');

const filePath = pathModule.join(__dirname, 'prueba.md');

// Caso 1: Obtener solo información básica de los enlaces
mdLinks(filePath, true)
  .then(links => {
    console.log('Enlaces encontrados (sin validación):', links);
  })
  .catch(err => {
    console.error(err);
  });

// Caso 2: Obtener información adicional de validación de los enlaces
mdLinks(filePath, false)
  .then(links => {
    console.log('Enlaces encontrados con validación:', links);
  })
  .catch(err => {
    console.error(err);
  });

  /*Este documento de test va a mandar a llamar a la funcion mdLinks para que
  dentro del archivo de prueba encuentre el el array con los links y los muestre*/
   