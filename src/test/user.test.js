import { expect } from 'chai';
import supertest from 'supertest';
import { UserDAO } from '../dao/factory.js';

const request = supertest.agent('http://localhost:8080');
const userDao = new UserDAO();

describe('User Router', () => {
    describe('POST /api/user/register', () => {
        it('Debería devolver los datos del nuevo user registrado', async () => {
            const newUser = {
                first_name: 'User',
                last_name: 'Test',
                email: 'usertest1717@gmail.com',
                age: 30,
                password: 'secretPass123',
                confirmPassword: 'secretPass123'
            }

            await userDao.deleteUser(newUser.email);

            const response = await request.post(`/api/user/register`).send(newUser);
            
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('status', 'success');
            expect(response.body.payload).to.have.property('_id').that.is.a('string');
        });

        it('Debería devolver un error por no cumplir con el limite de edad', async () => {
            const newUser = {
                first_name: 'User',
                last_name: 'Test',
                email: 'usertest1717@gmail.com',
                age: 11,
                password: 'secretPass123',
                confirmPassword: 'secretPass123'
            }

            const response = await request.post(`/api/user/register`).send(newUser);
            
            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('status', 'error');
        });

        it('Debería devolver un error porque las contraseñas no coinciden', async () => {
            const newUser = {
                first_name: 'User',
                last_name: 'Test',
                email: 'usertest1717@gmail.com',
                age: 11,
                password: 'secretPass',
                confirmPassword: 'secretPass123'
            }

            const response = await request.post(`/api/user/register`).send(newUser);
            
            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('status', 'error');
        });
    });
});