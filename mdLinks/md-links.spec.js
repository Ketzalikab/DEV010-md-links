const { expect } = require('@playwright/test');
const mdLinks = require('./mdLinks');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');


describe('mdLinks', () => {
  describe('Funcionalidad basica', () => {

  it('deberia encontrar y retornar los enlaces en un archivo Markdown', async () => {
    const links = await mdLinks('./prueba.md');

    expect(links).toBeInstanceOf(Array);
    expect(links).not.toHaveLength(0);

    links.forEach(link => {
      expect(link).toHaveProperty('href');
      expect(link).toHaveProperty('text');
      expect(link).toHaveProperty('file');
    });
  });
  
  it('debería manejar un error si la ruta no es válida',async () => {
    try {
      await mdLinks(null);
      // Debería lanzar una excepción, por lo que no se llega aquí.
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Ruta no proporcionada.');
    }
  });

it('deberia manejar un error al leer el archivo',  async () => {
  try {
    await mdLinks('ruta_invalida.md');
    // Debería lanzar una excepción, por lo que no se llega aquí.
    expect(true).toBe(false);
  } catch (error) {
    expect(error.message).toBe('Ruta no proporcionada.');
  }
});
   
  it('debería encontrar y retornar múltiples enlaces en un archivo llamado Markdown', async () => {
    const links = await mdLinks('./prueba.md');
    expect(links).toBeInstanceOf(Array);
    expect(links).not.toHaveLength(0);
    links.forEach(link => {
      expect(link).toHaveProperty('href');
      expect(link).toHaveProperty('text');
      expect(link).toHaveProperty('file');
    });
    expect(links.length).toBeGreaterThan(1);
  });
  it('deberia encontrar y validar enlaces en un archivo Markdown', async () => {
    const mock = new MockAdapter(axios);

    mock.onHead('https://www.google.com').reply(200)
    mock.onHead('https://www.wikipedia.org').reply(404);

    const links = await mdLinks('./prueba.md', true);

    expect(links).toBeInstanceOf(Array);
    expect(links).not.toHaveLength(0);

    links.forEach(link => {
      expect(link).toHaveProperty('href');
      expect(link).toHaveProperty('text');
      expect(link).toHaveProperty('file');
      expect(link).toHaveProperty('status');
      expect(link).toHaveProperty('ok');
    });
  });
  });
});
