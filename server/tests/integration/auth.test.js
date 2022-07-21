const { create } = require('lodash');
const request = require('supertest');
const {User} = require('../../models/users');

let server;

describe('auth middleware', () => {
	let token;
	let data;

  const exec = async() => {
		return await request(server)
		.post('/api/users')
		.set('x-auth-token', token) 
		.send(data);
	}
 
	beforeEach(() => {
    server = require('../../index'); 
		token = new User().generateAuthToken();
		data = { name: 'user1', email: 'user1@gmail.com', password: 'user1password123'};
	});

  afterEach(async () => { 
    await User.deleteMany({}); 
    await server.close(); 
  });

  it('should return 401 if no token is provided', async () => {
		token = '';
		
		// POST
		let res = await exec(); 

		// Look in Database
		const user = await User.find({ name: 'user1' });

		res = await request(server).get('/api/users/'+user[0]._id);
		expect(res.status).toBe(401); 
  });

  it('should return 400 if token is invalid', async () => {
		token = 'aa';

		// POST
		let res = await exec(); 

		// Look in Database
		const user = await User.find({ name: 'user1' });

		res = await request(server).get('/api/users/'+user[0]._id).set('x-auth-token', token) ;
		
		expect(res.status).toBe(400); 
  });

  it('should return 200 if token is valid', async () => {

		// POST
		let res = await exec(); 

		// Look in Database
		const user = await User.find({ name: 'user1' });

		res = await request(server).get('/api/users/'+user[0]._id).set('x-auth-token', token) ;
		
		expect(res.status).toBe(200); 

  });


});
