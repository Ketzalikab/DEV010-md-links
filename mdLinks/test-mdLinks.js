const mdLinks = require('./mdLinks.js');
const pathModule = require('path');
const filePath = pathModule.join(__dirname, 'prueba.md');
mdLinks(filePath)
  .then(links => {
    console.log('Enlaces encontrados:', links);
  })
  .catch(err => {
    console.error(err);
  });