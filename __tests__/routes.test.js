const request = require('supertest');
const app = require('../server/server.js');


describe('Serve static files', () => {
  it('index.html', async(done) => {
    const res = await request(app)
      .get('/')
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('text/html');
    done();
  });

  it('bundle.js', async(done) => {
    const res = await request(app)
      .get('/dist/bundle.js')
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('application/javascript');
    done();
  });

  it('404 catch all handler', async(done) => {
    const res = await request(app)
      .get('/spiderman')
    expect(res.status).toBe(404);
    done();
  });
});