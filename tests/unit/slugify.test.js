const slugify = require('../../src/helpers/slugify');

const text = 'Título do teste';

describe('Slugify helper', () => {

    it('should return the slug from a string', () => {
        expect(slugify(text)).toBe('titulo-do-teste');
    })
})