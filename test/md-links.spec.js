const fs = require('fs');
const { extractLinks } = require('../linksExtractor');
const { findMdFiles } = require('../paths');
const { validateLinks, statsLinks, brokenLinks } = require('../validatestats');
const mdLinks = require('../mdlinks');

jest.mock('fs');
jest.mock('../linksExtractor');
jest.mock('../paths');
jest.mock('../validatestats');

describe('mdLinks', () => {
  beforeEach(() => {
    fs.existsSync.mockClear();
    findMdFiles.mockClear();
    extractLinks.mockClear();
    validateLinks.mockClear();
    statsLinks.mockClear();
    brokenLinks.mockClear();
  });

  test('debería rechazar con un error si la ruta no existe', () => {
    fs.existsSync.mockReturnValue(false);

    return expect(mdLinks('./src/Prueba21', {})).rejects.toThrow('This is an incorrect path/it doesn´t exist');
  });

  test('debería resolver con un array de enlaces cuando no se proporcionan opciones', () => {
    const enlacesMockeados = [
      { url: 'https://open.spotify.com/show/1Et8hZk1DwKw6PtBFGpwSD?si=45ef2a912d304e53', text: 'Estoy escuchando los podcast de Midudev' },
    ];

    fs.existsSync.mockReturnValue(true);
    findMdFiles.mockReturnValue(['C:/Users/Laura Montero/Desktop/MdLinks/DEV005-md-links/src/Prueba1/carpetaparatest/aquíhayunlink.md']);
    extractLinks.mockReturnValue(enlacesMockeados);

    return expect(mdLinks('C:/Users/Laura Montero/Desktop/MdLinks/DEV005-md-links/src/Prueba1/carpetaparatest', {})).resolves.toEqual(enlacesMockeados);
  });

  test('debería resolver con enlaces validados cuando la opción "validate" es verdadera', () => {
    const enlacesValidadosMockeados = [
      {
        url: 'https://open.spotify.com/show/1Et8hZk1DwKw6PtBFGpwSD?si=45ef2a912d304e53', text: 'Estoy escuchando los podcast de Midudev', status: 200, ok: true,
      },
      {
        url: 'https://open.spotify.com/playlist/3zUnR3X51GZkQ63vC27Mmu?si=eb2e52fd57f64d7djajaja', text: 'Este no es el link de mi playlist', status: 404, ok: false,
      },
    ];

    fs.existsSync.mockReturnValue(true);
    findMdFiles.mockReturnValue(['C:/Users/Laura Montero/Desktop/MdLinks/DEV005-md-links/src/Prueba1/carpetaparatest/aquíhayunlink.md']);
    extractLinks.mockReturnValue(enlacesValidadosMockeados);
    validateLinks.mockReturnValue(enlacesValidadosMockeados);

    return expect(mdLinks('C:/Users/Laura Montero/Desktop/MdLinks/DEV005-md-links/src/Prueba1/carpetaparatest', { validate: true })).resolves.toEqual(enlacesValidadosMockeados);
  });

  test('debería resolver con estadísticas sobre los enlaces cuando la opción "stats" es verdadera', () => {
    const estadisticasMockeadas = {
      total: 2,
      unique: 2,
    };

    fs.existsSync.mockReturnValue(true);
    findMdFiles.mockReturnValue(['C:/Users/Laura Montero/Desktop/MdLinks/DEV005-md-links/src/Prueba1/carpetaparatest/aquíhayunlink.md']);
    extractLinks.mockReturnValue(estadisticasMockeadas);
    statsLinks.mockReturnValue(estadisticasMockeadas);

    return expect(mdLinks('C:/Users/Laura Montero/Desktop/MdLinks/DEV005-md-links/src/Prueba1/carpetaparatest', { stats: true })).resolves.toEqual(estadisticasMockeadas);
  });

  test('debería resolver con enlaces rotos cuando tanto las opciones "validate" como "stats" son verdaderas', () => {
    const enlacesRotosMockeados = [
      {
        url: 'https://open.spotify.com/playlist/3zUnR3X51GZkQ63vC27Mmu?si=eb2e52fd57f64d7djajaja', text: 'Este no es el link de mi playlist', status: 404, ok: false,
      },
    ];

    fs.existsSync.mockReturnValue(true);
    findMdFiles.mockReturnValue(['C:/Users/Laura Montero/Desktop/MdLinks/DEV005-md-links/src/Prueba1/carpetaparatest/aquíhayunlink.md']);
    extractLinks.mockReturnValue(enlacesRotosMockeados);
    brokenLinks.mockReturnValue(enlacesRotosMockeados);

    return expect(mdLinks('C:/Users/Laura Montero/Desktop/MdLinks/DEV005-md-links/src/Prueba1/carpetaparatest', { validate: true, stats: true })).resolves.toEqual(enlacesRotosMockeados);
  });
});
