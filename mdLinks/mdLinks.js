const fsPromises = require('fs').promises;
const pathModule = require('path');
const axios = require('axios');
const fs = require('fs');

function mdLinks(path, validate) {
    return new Promise((resolve, reject) => {
        if (path === null || path === undefined) {
            reject(new Error('Ruta no proporcionada.'));
            return;
        }
        fs.promises.lstat(path)
            .then(stats => {
                if (stats.isDirectory()) {
                    return getMarkdownFiles(path, validate);
                } else if (stats.isFile() && path.endsWith('.md')) {
                    return processMarkdownFile(path, validate);
                } else {
                    resolve([]);
                }
            })
            .then(results => {
                resolve([].concat(...results));
            })
            .catch(err => {
                reject(new Error(`Error en mdLinks: ${err.message}`));
    });
});

function getMarkdownFiles(dirPath, validate) {
    return fsPromises.readdir(dirPath)
        .then(files => {
            const processFilePromises = files.map(file =>
                processMarkdownFile(pathModule.join(dirPath, file), validate, dirPath)
            );
            return Promise.all(processFilePromises);
        });
}

function processMarkdownFile(filePath, validate, fileDir) {
    console.log('Processing file:', filePath);
    return fsPromises.readFile(filePath, 'utf8')
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
                    file: filePath,
                };
                links.push(linkObj);

                if (validate) {
                    const linkValidation = axios.head(href)
                        .then(response => {
                            linkObj.status = response.status;
                            linkObj.ok = response.status >= 200 && response.status < 400 ? 'ok' : 'fail';
                        })
                        .catch(error => {
                            linkObj.status = 'N/A';
                            linkObj.ok = 'fail';
                        });

                    promises.push(linkValidation);
                }
            }

            return validate ? Promise.all(promises).then(() => links) : links;
        });
    }
}

module.exports = mdLinks;