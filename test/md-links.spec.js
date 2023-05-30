const fs = require('fs');
const path = require ('path');

let arrayMdFiles = [];

const paths = require('./paths');

describe ('paths function', () =>{
  beforeEach (() => {
    arrayMdFiles = [];
  });
  it('should return an array with the resolved path if the userPath is a valid .md file', () => {
    const userPath = '';
    const resolvedPath = path.resolve(userPath);

    const result = paths(userPath);

    expect(result).toEqual([resolvedPath]);
    expect(arrayMdFiles).toEqual([resolvedPath]);
  });
  
})
