const request = require('supertest');
const server = require('../server');

// Declare the jest will mock data. Must be before the require statement.
jest.mock('../dataInterface/helmets');
const helmetsData = require('../dataInterface/helmets');

describe('/helmets routes', () => {
    beforeEach(() => {});

    describe('GET /', () => {
        it("should return an array", async () => {
            helmetsData.getAllHelmets.mockResolvedValue([
                {_id:"890", title:"One Day"},
            ]);

            const res = await request(server).get('/helmets');

            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toEqual(true);
            expect(res.body.error).not.toBeDefined();
        });

        it("should return an error message on error", async () => {
            helmetsData.getAllHelmets.mockResolvedValue(null);

            const res = await request(server).get("/helmets");

            expect(res.statusCode).toEqual(500);
        });
    });

    it('should return an 404 on empty response', async () => {
        helmetsData.getAllHelmets.mockResolvedValue([]);
    
        const res = await request(server).get('/helmets');
    
        expect(res.statusCode).toEqual(404);
      });
});

describe('GET /:id', () => {
    it('should return a single result on success', async () => {
      
        helmetsData.getHelmetById.mockResolvedValue(
        { _id: '890', title: 'One Day' }
      );

      const res = await request(server).get('/helmets/890');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.title).toEqual('One Day');
    });
    it('should return 500 in case of error', async () => {
      
      helmetsData.getShopById.mockResolvedValue(null);
      const res = await request(server).get('/helmets/890');
      expect(res.statusCode).toEqual(500);
    });
  });

  describe('POST /', () => {
    it('should return the new record on success', async () => {
      
      const item = { _id: '890', title: 'One Day' };
      helmetsData.createHelmet.mockResolvedValue(item);

      const res = await request(server).post('/helmets').send(item);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.title).toEqual('One Day');
      expect(res.body._id).toEqual('890');
    });

    it('should return http 500 in case of error', async () => {
      
      const item = { _id: '890', title: 'One Day' };
      helmetsData.createHelmet.mockResolvedValue(null);

      const res = await request(server).post('/helmets').send(item);
      expect(res.statusCode).toEqual(500);
    });
  });

  describe('PUT /:id', () => {
    it('should return the updated record on success', async () => {
      
      const item = { _id: '890', title: 'Second Day' };
      helmetsData.updateHelmetById.mockResolvedValue(item);

      const res = await request(server).put('/helmets/890').send(item);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.title).toEqual('Second Day');
      expect(res.body._id).toEqual('890');
    });
    it('should return http 500 in case of error', async () => {
      
      const item = { _id: '890', title: 'Second Day' };
      helmetsData.updateHelmetById.mockResolvedValue(null);

      const res = await request(server).put('/helmets/890').send(item);
      expect(res.statusCode).toEqual(500);
    });
  });

  describe('DELETE /:id', () => {
    it('should return a message on success', async () => {
    
      helmetsData.deleteByID.mockResolvedValue({ message: 'Deleted 1 shop.' });
      const res = await request(server).delete('/helmets/890');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.message).toEqual('Deleted 1 shop.');
    });
    it('should return a error message if record fails to be deleted', async () => {

      helmetsData.deleteByID.mockResolvedValue({ error: 'some error occured' });
      const res = await request(server).delete('/helmets/890');
      expect(res.statusCode).toEqual(400);
    });
  });