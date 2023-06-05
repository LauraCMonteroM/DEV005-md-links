const fs = require('fs');
const path = require('path');
const { paths } = require('../paths');

describe('paths', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('debe devolver la ruta resuelta si la entrada es un archivo válido', () => {
    const userPath = 'C:/Users/Laura Montero/Desktop/MdLinks/DEV005-md-links/src/Prueba1/archivosvariosmarkdown/treslinks.md';
    const existsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const statSyncMock = jest
      .spyOn(fs, 'statSync')
      .mockReturnValue({ isFile: () => true });
    const resolveMock = jest.spyOn(path, 'resolve').mockReturnValue(userPath);

    const result = paths(userPath);

    expect(result).toEqual([userPath]);
  });

  test('debe devolver undefined si la ruta de entrada no existe', () => {
    const userPath = '/ruta/inexistente';
    const existsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result = paths(userPath);

    expect(result).toBeUndefined();
  });

  test('debe devolver undefined si la ruta de entrada no es un archivo ni un directorio', () => {
    const userPath = '/ruta/noSoportada.txt';
    const existsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const statSyncMock = jest
      .spyOn(fs, 'statSync')
      .mockReturnValue({ isFile: () => false, isDirectory: () => false });

    const result = paths(userPath);

    expect(result).toBeUndefined();
  });

  test('debe devolver los archivos dentro de un directorio', () => {
    const userPath = 'C:/Users/Laura Montero/Desktop/MdLinks/DEV005-md-links/src/Prueba1/carpetaparatest'; // Ruta de un directorio válido en tu sistema de archivos
    const filesInsideMock = ['aquíhayunlink.md'];

    jest.spyOn(fs, 'readdirSync').mockReturnValue(filesInsideMock);

    const result = fs.readdirSync(userPath);

    expect(fs.readdirSync).toHaveBeenCalledWith(userPath);
    expect(result).toEqual(filesInsideMock);

    fs.readdirSync.mockRestore();
  });

  test('debe devolver un array con rutas resueltas', () => {
    const userPath = 'C:/Users/Laura Montero/Desktop/MdLinks/DEV005-md-links/src/Prueba1/carpetaparatest/aquíhayunlink.md'; // Ruta de un archivo válido en tu sistema de archivos
    const arrayMdFilesMock = [path.resolve(userPath)];

    const result = paths(userPath);

    expect(result).toEqual(arrayMdFilesMock);
  });
});
