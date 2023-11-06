const mdLinks = require('./mdLinks');

mdLinks('prueba.md', false)
.then(links => {
    console.log('Enlaces sin validacion:', links);
})
.catch(error => {
    console.error('Error:', error);
});

mdLinks('prueba.md', true)
.then(links => {
    console.log('Enlaces con validacion:', links);

})
.catch(error => {
    console.error('Error:', error);
});