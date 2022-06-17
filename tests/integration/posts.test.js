const request = require('supertest');
const server = require('../../src/config/server');
const database = require('../../src/config/database');
const app = server.createServer();
const Post = require('../../src/models/Post');
const Category = require('../../src/models/Category');
database.connect();

const credentials = {
    email: 'teste@teste.com',
    password: '123'
}

describe('Posts', () => {
    describe('Get posts', () => {
        it('should return status 200', async () => {
            const response = await request(app).get('/posts')
            .expect(200);
        })
    });

    describe('Get post by id', () => {
        it('should return status 200',  () => {
            const post = new Post({ title: 'Teste' });
            post.save();

            const postId = post._id.toString();
            request(app).get(`/posts/${postId}`)
            .expect(200);
        })

        it('should return 404 if not find the post',  async () => {
            const postId = '62ab515a403678b05d3fdb895';
            const response = await request(app).get(`/posts/${postId}`)
            .expect(404);
        })
    });

    describe('Authenticated routes', () => {
        var jwtToken;
        beforeAll((done) => {
            request(app).post('/auth/login')
            .send(credentials)
            .end((err, res) => {
                if (err) return done(err);

                jwtToken = res.body.token;
                done();
            });
        })

        describe('Add post', () => {
            it('should return status 201 when post is created', (done) => {
                const category = new Category({ name: 'Categoria de teste' })
                category.save(function(err) {
                    if(err) done(err);
                })

                request(app).post('/posts')
                .set('Authorization', 'Bearer ' + jwtToken)
                .send({
                    title: 'Post criado pelo teste',
                    content: 'conteudo do post teste',
                    categoryId: category._id.toString(),
                    status: true
                })
                .expect(201)
                .then(() => {
                    done()
                })
            });
        });
    });
})