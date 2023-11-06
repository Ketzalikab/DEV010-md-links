const fsPromises = require('fs').promises;
const pathModule = require('path');

function mdLinks(path) {
    return new Promise((resolve, reject) => {
        if (!path) {
            throw new Error('Ruta no proporcionada.');
            reject(new Error('Debes proporcionar una ruta válida.'));
            return;
        }

        const absolutePath = pathModule.resolve(path);
        fsPromises.access(absolutePath, fsPromises.constants.F_OK)
        .then(() => {
        return fsPromises.readFile(absolutePath, 'utf8');
     })
            .then(fileContent => {
                const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g;
                const links = [];
                let match;

                while ((match = linkRegex.exec(fileContent)) !== null) {
                    const text = match[1];
                    const href = match[2];
                    links.push({
                        href,
                        text,
                        file: absolutePath,
                    });
                }

                console.log('Enlaces encontrados:', links);
                resolve(links);
            })
            .catch(err => {
                console.log('Error al leer el archivo:', err);
            });
    });
}

module.exports = mdLinks;
