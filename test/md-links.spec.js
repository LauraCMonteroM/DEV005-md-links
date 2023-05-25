const mdLinks = require("../src/index.js");
const { validPath } = require("../src/flowchart.js");

describe("validPath", () => {
  test("debería devolver true si la ruta existe", () => {
    
    const path = "/ruta/valida/";

    const result = validPath(path);

    expect(fs.existsSync).toHaveBeenCalledWith(path);
    expect(result).toBe(true);
  });
});
