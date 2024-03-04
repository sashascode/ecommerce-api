import { expect } from 'chai';
import supertest from 'supertest';

const request = supertest('http://localhost:8080');

describe('Product Router', () => {
    describe('GET /api/product/', () => {
        it('Debería devolver una lista de productos', async () => {
            const response = await request.get('/api/product/');
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('status', 'success');
            expect(response.body).to.have.property('payload');
            expect(response.body.payload).to.have.property('productList').that.is.an('array');
            expect(response.body.payload).to.have.property('totalPages').that.is.a('number');
            expect(response.body.payload).to.have.property('page').that.is.a('number');
            expect(response.body.payload).to.have.property('prevPage');
            expect(response.body.payload).to.have.property('nextPage');
            expect(response.body.payload).to.have.property('hasPrevPage').that.is.a('boolean');
            expect(response.body.payload).to.have.property('hasNextPage').that.is.a('boolean');
            expect(response.body.payload).to.have.property('prevLink');
            expect(response.body.payload).to.have.property('nextLink');
        });
    });

    describe('GET /api/product/:pid', () => {
        it('Debería devolver un producto con el ID especificado', async () => {
            const productId = '63935ef6318a784035fcc3ca'; // ID de ejemplo real existente en la BD
            
            const response = await request.get(`/api/product/${productId}`);
            
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('status', 'success');
            expect(response.body).to.have.property('payload');
            expect(response.body.payload).to.have.property('title').that.is.a('string');
            expect(response.body.payload).to.have.property('description').that.is.a('string');
            expect(response.body.payload).to.have.property('price').that.is.a('number');
            expect(response.body.payload).to.have.property('thumbnail').that.is.a('string');
            expect(response.body.payload).to.have.property('code').that.is.a('string');
            expect(response.body.payload).to.have.property('stock').that.is.a('number');
            expect(response.body.payload).to.have.property('owner').that.is.a('string');
            expect(response.body.payload).to.have.property('category').that.is.a('string');
            expect(response.body.payload).to.have.property('_id').that.is.a('string');
        });
    
        it('Debería devolver un error si el producto no existe', async () => {
            const productId = '507f1f77bcf86cd799439011'; // ID de ejemplo que no existe en la base de datos
            
            const response = await request.get(`/api/product/${productId}`);
            
            expect(response.status).to.equal(404);
            expect(response.body).to.have.property('error', 'Product with that ID not found');
        });

        it('Debería devolver un error si el ID es invalido', async () => {
            const productId = '34324431da'; // ID de ejemplo de un string no valido (para ser valido deberia ser un string hexadecimal de 24 caracteres)
            
            const response = await request.get(`/api/product/${productId}`);
            
            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('error', 'Invalid product ID');
        });
    });
});

