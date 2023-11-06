const fsPromises = require('fs').promises;
const pathModule = require('path');
const axios = require('axios');

function mdLinks(path, validate) {
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
                let promises = [];

                while ((match = linkRegex.exec(fileContent)) !== null) {
                    const text = match[1];
                    const href = match[2];
                    const linkObj = {
                        href,
                        text,
                        file: absolutePath,
                    };
                    links.push(linkObj);

                    if (validate) {
                        const linkValidation = axios.head(href)
                        .then(response => {
                            linkObj.status = response.status;
                            linkObj.ok = response.status >= 200 && response.status <400 ? 'ok' : 'fail';
                        })
                        .catch(error => {
                            linkObj.status = 'N/A';
                            linkObj.ok = 'fail';

                        });
                        promises.push(linkValidation);
                    }
                }

                if (validate) {
                    Promise.all(promises)
                    .then(() => {
                        resolve(links);
                    })
                    .catch(err => {
                        reject(err);
                    });
                } else {
                    resolve(links);
                }
            })
            .catch(err => {
                reject(new Error('Error al leer el archivo: ' + err));
            });
        });
    }

module.exports = mdLinks;
