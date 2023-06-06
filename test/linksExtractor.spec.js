const fs = require('fs');
const { extractLinks } = require('../linksExtractor');

describe('extractLinks', () => {
  test('debería devolver un array vacío si no hay enlaces en el archivo', () => {
    const userPath = 'C:/Users/Laura Montero/Desktop/MdLinks/DEV005-md-links/src/Prueba1/archivosvariosmarkdown/nolinks.md';
    const data = '';

    jest.spyOn(fs, 'readFileSync').mockReturnValue(data);

    const result = extractLinks(userPath);

    expect(fs.readFileSync).toHaveBeenCalledWith(userPath, 'utf-8');
    expect(result).toEqual([]);
  });

  test('debería devolver los enlaces extraídos del archivo', () => {
    const userPath = 'C:/Users/Laura Montero/Desktop/MdLinks/DEV005-md-links/src/Prueba1/archivosvariosmarkdown/treslinks.md';
    const data = `
          [Mi primera canción favorita de Sam Smith](https://youtu.be/Uq9gPaIzbe8)
          [Mi segunda canción favorita de Sam Smith](https://youtu.be/HaMq2nn5ac0)
          [Mi tercera canción favorita de Sam Smith](https://youtu.be/kkLk2XWMBf8)
            `;

    jest.spyOn(fs, 'readFileSync').mockReturnValue(data);

    const result = extractLinks(userPath);

    expect(fs.readFileSync).toHaveBeenCalledWith(userPath, 'utf-8');
    expect(result).toEqual([
      {
        file: 'C:/Users/Laura Montero/Desktop/MdLinks/DEV005-md-links/src/Prueba1/archivosvariosmarkdown/treslinks.md',
        texto: 'Mi primera canción favorita de Sam Smith',
        url: 'https://youtu.be/Uq9gPaIzbe8',
      },
      {
        file: 'C:/Users/Laura Montero/Desktop/MdLinks/DEV005-md-links/src/Prueba1/archivosvariosmarkdown/treslinks.md',
        texto: 'Mi segunda canción favorita de Sam Smith',
        url: 'https://youtu.be/HaMq2nn5ac0',
      },
      {
        file: 'C:/Users/Laura Montero/Desktop/MdLinks/DEV005-md-links/src/Prueba1/archivosvariosmarkdown/treslinks.md',
        texto: 'Mi tercera canción favorita de Sam Smith',
        url: 'https://youtu.be/kkLk2XWMBf8',
      },
    ]);
  });

  test('debería devolver undefined si ocurre un error al leer el archivo', () => {
    const userPath = 'ruta/al/archivo/inexistente.md';

    jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
      throw new Error('Error al leer el archivo');
    });

    const result = extractLinks(userPath);

    expect(fs.readFileSync).toHaveBeenCalledWith(userPath, 'utf-8');
    expect(result).toBeUndefined();
  });
});
