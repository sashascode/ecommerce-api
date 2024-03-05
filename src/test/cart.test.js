import { expect } from 'chai';
import supertest from 'supertest';

const request = supertest.agent('http://localhost:8080');

describe('Cart Router', () => {
    describe('GET /api/cart/:cid', () => {
        it('login', loginUser());
        it('Debería devolver un cart con el ID especificado', async () => {
            const cartId = '65aaecf3d5e22442fccbb184'; // ID de ejemplo real existente en la BD

            const response = await request.get(`/api/cart/${cartId}`);
          
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('status', 'success');
            expect(response.body.payload).to.have.property('_id').that.is.a('string');
            expect(response.body.payload).to.have.property('products').that.is.an('array');
            expect(response.body.payload).to.have.property('timestamp');
            
        });

        it('Debería devolver un error si el cart no existe', async () => {
            const cartId = '507f1f77bcf86cd799439981'; // ID de ejemplo que no existe en la base de datos
            
            const response = await request.get(`/api/cart/${cartId}`);
    
            expect(response.body).to.have.property('status', 'error');
            expect(response.body).to.have.property('error', 'A cart with that ID does not exist.');
            expect(response.status).to.equal(404);
            
            
        });

        it('Debería devolver un error si el ID es invalido', async () => {
            const cartId = '34324431da'; // ID de ejemplo de un string no valido (para ser valido deberia ser un string hexadecimal de 24 caracteres)
            
            const response = await request.get(`/api/cart/${cartId}`);
            
            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('status', 'error');
        });
    });
});


function loginUser() {
    return function(done) {
        request
            .post('/api/user/login')
            .send({ email: 'bestia@gmail.com', password: '123' })
            .end(onResponse);

            function onResponse(err, res) {
            if (err) return done(err);
            return done();
            }
    };
};