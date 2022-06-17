
const request = require('supertest');
const server = require('../../src/config/server');
const database = require('../../src/config/database');
const app = server.createServer();

const postInput = {
    title: 'Post criado pelo teste',
    content: 'conteudo do post teste'
}

describe('posts', () => {
    beforeAll(() => {
        database.connect();
    })

    afterAll(() => {
        database.disconnect();
    })

    // MOCKAR TOKEN JWT OU PEGAR ELE
    // TA DANDO ERRO 401 NAO AUTORIZADO

    it('should return the post created payload', async (done) => {
        const response = await request(app).post('/posts').send(postInput);
        expect(response.statusCode).toBe(200);
    });
})