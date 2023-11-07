const fsPromises = require('fs').promises;
const pathModule = require('path');
const axios = require('axios');
const fs = require('fs');

function mdLinks(path, validate) {
    return new Promise((resolve, reject) => {
        if (path === null) {
            throw new Error('Ruta no proporcionada.');
            return;
        }
        const absolutePath = pathModule.resolve(path);

        if (!fs.existsSync(absolutePath)) {
            throw new Error('Ruta no proporcionada.');
        }

        if (fs.lstatSync(absolutePath).isDirectory()) {
            const files = getMarkdownFiles(absolutePath);
            const allLinks = [];

            const processFilePromises = files.map(file => {
                const filePath = pathModule.join(absolutePath, file);
                return processMarkdownFile(filePath, validate, absolutePath);

            });

            Promise.all(processFilePromises)
            .then((results) => {
                resolve([].concat(...results));
            })
            .catch((err) =>{
                reject(err);
            });
        } else if (fs.lstatSync(absolutePath).isFile() && path.endsWith('.md')) {
            processMarkdownFile(absolutePath, validate, absolutePath)
            .then((links) => {
                resolve(links);

            })
            .catch((err) => {
                reject(err);
            });
        } else {
            resolve ([]);
        }
    });
}
function getMarkdownFiles(dirPath) {
    const files =fs.readdirSync(dirPath);
    return files.filter(file => file.endsWith('.md'));
}

function processMarkdownFile(filePath, validate, absolutePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, fileContent) => {
            if (err) {
                reject(new Error(`Error al leer el archivo: ${err.message}`));
                return;
            }
     
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
            });
        });

        }
 
module.exports = mdLinks;
