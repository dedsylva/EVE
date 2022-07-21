const request = require('supertest');
const {Diseases} = require('../../models/nn/diseases');
const {Skin} = require('../../models/nn/skins');

let server;

describe('/api/diseases', () => {
  // call this function before each test
  // if we change the server (port), we will get a test error, so we open the server
  // and close it after making each test
 
  beforeEach(() => {server = require('../../index'); });
  afterEach(async () => { 
    //remove every entry so we don't get length errors
    await Diseases.deleteMany({}); 
    await server.close(); 
  });

  describe('/GET', () => {
    it('should return all diseases', async () => {
      await Diseases.collection.insertMany([
        { name: 'user1', diseaseData: 'No' },
        { name: 'user2', diseaseData: 'Mole' },
        { name: 'user3', diseaseData: 'Melanoma' },
      ]);
      const res = await request(server).get('/api/diseases');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(3);

      expect(res.body.some( g => g.name === 'user1'));
      expect(res.body.some( g => g.diseaseData=== 'No'));

      expect(res.body.some( g => g.name === 'user2'));
      expect(res.body.some( g => g.diseaseData=== 'Mole'));

      expect(res.body.some( g => g.name === 'user3'));
      expect(res.body.some( g => g.diseaseData=== 'Melanoma'));
    });
  });

  describe('/GET /:name', () => {
    it('should return disease if valid name is passed', async () => {
      const disease = new Diseases({ name: 'user1', diseaseData: 'No' });
      await disease.save();

      const res = await request(server).get('/api/diseases/:name=' + disease.name);
      
      expect(res.status).toBe(200);
      expect(res.body[0]).toHaveProperty('name', disease.name);
    });

    it('should return a 404 if invalid name is passed', async () => {
      const res = await request(server).get('/api/diseases/:name=invalid'); //invalid id
      
      expect(res.status).toBe(404);
    });


  });

  describe('/POST ', () => {
    let data;

    const exec = async() => {
      return await request(server)
      .post('/api/diseases')
      .send( data );
    };


    it('should return 400 if disease is less than 2 characters', async () => {
      data = '1';
     const res = await exec(); 

      expect(res.status).toBe(400);
    });

    it('should return 400 if disease is more than 50 characters', async () => {
      data = new Array(52).join('a'); //creating big aaaaa Array

      const res = await exec(); 

      expect(res.status).toBe(400);
    });

    it('should save the disease if valid', async () => {

      data= {name: 'user1', diseaseData: 'No Disease'};

      const res = await exec(); 

      const disease = await Diseases.find({ name: 'user1' });

      expect(disease.length).not.toBe(0);
      expect(res.status).toBe(200);
    });

    it('should return the disease when valid', async () => {
      data = {name: 'user1', diseaseData: 'No Disease'};
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'user1');
    });
  });

});

describe('/api/skin', () => {
  // call this function before each test
  // if we change the server (port), we will get a test error, so we open the server
  // and close it after making each test
 
  beforeEach(() => {server = require('../../index'); });
  afterEach(async () => { 
    //remove every entry so we don't get length errors
    await Skin.deleteMany({}); 
    await server.close(); 
  });

  describe('/GET', () => {
    it('should return all skin cancer results', async () => {
      await Skin.collection.insertMany([
        { name: 'user1', skinCancer: true },
        { name: 'user2', skinCancer: true },
        { name: 'user3', skinCancer: false },
      ]);
      const res = await request(server).get('/api/skin');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(3);

      expect(res.body.some( g => g.name === 'user1'));
      expect(res.body.some( g => g.diseaseData=== true));

      expect(res.body.some( g => g.name === 'user2'));
      expect(res.body.some( g => g.diseaseData=== true));

      expect(res.body.some( g => g.name === 'user3'));
      expect(res.body.some( g => g.diseaseData=== false));
    });
  });

  describe('/GET /:name', () => {
    it('should return skin caner if valid name is passed', async () => {
      const skin =  new Skin({ name: 'user1', skinCancer: false });
      await skin.save();

      const res = await request(server).get('/api/skin/:name=' + skin.name);
      
      expect(res.status).toBe(200);
      expect(res.body[0]).toHaveProperty('name', skin.name);
    });

    it('should return a 404 if invalid name is passed', async () => {
      const res = await request(server).get('/api/skin/:name=invalid'); //invalid id
      
      expect(res.status).toBe(404);
    });


  });

  describe('/POST ', () => {
    let data;

    const exec = async() => {
      return await request(server)
      .post('/api/skin')
      .send( data );
    };


    it('should return 400 if skin is not boolean', async () => {
      data = { name: 'user1', skinCancer: 'string'};
     const res = await exec(); 

      expect(res.status).toBe(400);
    });


    it('should save the skin cancer result if valid', async () => {

      data= {name: 'user1', skinCancer: false};

      const res = await exec(); 

      const skin = await Skin.find({ name: 'user1' });

      expect(skin.length).not.toBe(0);
      expect(res.status).toBe(200);
    });

    it('should return the skin condition when valid', async () => {
      data = {name: 'user1', skinCancer: false};
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'user1');
      expect(res.body).toHaveProperty('skinCancer', false);
    });
  });

});

afterAll (async () => await server.close())