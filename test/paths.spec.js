/* eslint-disable no-undef */
const path = require('path');
const { findMdFiles } = require('../paths');

describe('findMdFiles', () => {
  test('debería devolver un array vacío si el directorio está vacío', () => {
    const emptyDirPath = 'C:/Users/Laura Montero/Desktop/MdLinks/DEV005-md-links/src/Prueba1/carpetaparatest/vacía';

    const resultado = findMdFiles(emptyDirPath);

    expect(resultado).toEqual([]);
  });

  test('debería encontrar archivos .md en un directorio', () => {
    const directoryPath = 'C:/Users/Laura Montero/Desktop/MdLinks/DEV005-md-links/src/Prueba1';

    const resultado = findMdFiles(directoryPath);

    expect(resultado).toContain(path.resolve(directoryPath, 'unlink.md'));
    expect(resultado).toContain(path.resolve(directoryPath, 'carpetaparatest/aquíhayunlink.md'));
  });

  test('debería manejar una ruta inexistente', () => {
    const nonexistentPath = 'C:/Users/Laura Montero/Desktop/MdLinks/DEV005-md-links/src/Prueba1/jajajajaja';

    const resultado = findMdFiles(nonexistentPath);

    expect(resultado).toEqual('El archivo o directorio no existe');
  });
});
