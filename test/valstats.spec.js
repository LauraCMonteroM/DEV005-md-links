const fetch = require('node-fetch');
const { validateLinks, statsLinks, brokenLinks } = require('../validatestats');

jest.mock('node-fetch', () => jest.fn().mockImplementation((url) => {
  if (url === 'https://open.spotify.com/show/1Et8hZk1DwKw6PtBFGpwSD?si=45ef2a912d304e53') {
    return Promise.resolve({
      status: 200,
      statusText: 'OK',
    });
  } if (url === 'https://open.spotify.com/playlist/3zUnR3X51GZkQ63vC27Mmu?si=eb2e52fd57f64d7djajajaja') {
    return Promise.resolve({
      status: 404,
      statusText: 'Not Found',
    });
  }
}));

describe('validateLinks', () => {
  test('debería validar los enlaces correctamente', async () => {
    const arrayLinks = [
      { url: 'https://open.spotify.com/show/1Et8hZk1DwKw6PtBFGpwSD?si=45ef2a912d304e53', status: null, message: null },
      { url: 'https://open.spotify.com/playlist/3zUnR3X51GZkQ63vC27Mmu?si=eb2e52fd57f64d7djajajaja', status: null, message: null },
    ];

    const result = await validateLinks(arrayLinks);

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenNthCalledWith(1, 'https://open.spotify.com/show/1Et8hZk1DwKw6PtBFGpwSD?si=45ef2a912d304e53');
    expect(fetch).toHaveBeenNthCalledWith(2, 'https://open.spotify.com/playlist/3zUnR3X51GZkQ63vC27Mmu?si=eb2e52fd57f64d7djajajaja');

    expect(result).toEqual([
      { url: 'https://open.spotify.com/show/1Et8hZk1DwKw6PtBFGpwSD?si=45ef2a912d304e53', status: 200, message: 'OK' },
      { url: 'https://open.spotify.com/playlist/3zUnR3X51GZkQ63vC27Mmu?si=eb2e52fd57f64d7djajajaja', status: 404, message: 'Not Found' },
    ]);
  });
});

describe('statsLinks', () => {
  test('debería devolver el objeto de estadísticas correctamente', () => {
    const arrayLinks = [
      { url: 'https://youtu.be/pmbcl0YN4lg' },
      { url: 'https://youtu.be/NLH6IKh_8RQ' },
    ];

    const expectedStats = {
      Total: 2,
      Uniques: 2,
    };

    const result = statsLinks(arrayLinks);

    expect(result).toEqual(expectedStats);
  });

  describe('brokenLinks', () => {
    test('debería devolver el objeto de enlaces rotos correctamente', () => {
      const arrayLinks = [
        { url: 'https://youtu.be/NLH6IKh_8RQ', message: 'OK' },
        { url: 'https://open.spotify.com/playlist/3zUnR3X51GZkQ63vC27Mmu?si=eb2e52fd57f64d7djajajaja', message: 'Not Found' },
        { url: 'https://open.spotify.com/playlist/3zUnR3X51GZkQ63vC27Mmu?si=eb2e52fd57f64d7djajajaja', message: 'Not Found' },
      ];

      const expectedBrokenLinks = {
        Total: 3,
        Broken: 2,
        Uniques: 2,
      };

      const result = brokenLinks(arrayLinks);

      expect(result).toEqual(expectedBrokenLinks);
    });
  });
});
