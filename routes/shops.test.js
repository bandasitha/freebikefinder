const request = require('supertest');
const server = require('../server');

// Declare the jest will mock movieData. Must be before the require statement.
jest.mock('../dataInterface/shops');
const shopData = require('../dataInterface/shops');

jest.mock('../auth');
const authMock = require('../auth');

describe('/shops routes', () => {
  beforeEach(() => {});

  describe('GET /', () => {
    it('should return an array on success', async () => {
      shopData.getAllShops.mockResolvedValue([
        { _id: '890', title: 'One Day' },
      ]);

      const res = await request(server).get('/shops');

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toEqual(true);
      expect(res.body.error).not.toBeDefined();
    });
    it('should return a http 500 on error', async () => {
      shopData.getAllShops.mockResolvedValue(null);

      const res = await request(server).get('/shops');

      expect(res.statusCode).toEqual(500);
    });
  });
  it('should return an 404 on empty response', async () => {
    shopData.getAllShops.mockResolvedValue([]);

    const res = await request(server).get('/shops');

    expect(res.statusCode).toEqual(404);
  });
});

  describe('GET /:id', () => {
    it('should return a single movie on success', async () => {
      
      shopData.getShopById.mockResolvedValue(
        { _id: '890', title: 'One Day' }
      );

      const res = await request(server).get('/shops/890');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.title).toEqual('One Day');
    });
    it('should return 500 in case of error', async () => {
      
      shopData.getShopById.mockResolvedValue(null);
      const res = await request(server).get('/shops/890');
      expect(res.statusCode).toEqual(500);
    });
  });

  describe('POST /', () => {
  authMock.verifyToken.mockImplementation( function(req, res, next) {return next()} )
    it('should return the new record on success', async () => {
      
      const item = { _id: '890', title: 'One Day' };
      shopData.createShop.mockResolvedValue(item);

      const res = await request(server).post('/shops').send(item);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.title).toEqual('One Day');
      expect(res.body._id).toEqual('890');
    });
    it('should return http 500 in case of error', async () => {
      
      const item = { _id: '890', title: 'One Day' };
      shopData.createShop.mockResolvedValue(null);

      const res = await request(server).post('/shops').send(item);
      expect(res.statusCode).toEqual(500);
    });
  });

  describe('PUT /:id', () => {
    it('should return the updated record on success', async () => {
      
      const item = { _id: '890', title: 'Second Day' };
      shopData.updateShopById.mockResolvedValue(item);

      const res = await request(server).put('/shops/890').send(item);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.title).toEqual('Second Day');
      expect(res.body._id).toEqual('890');
    });
    it('should return http 500 in case of error', async () => {
      
      const item = { _id: '890', title: 'Second Day' };
      shopData.updateShopById.mockResolvedValue(null);

      const res = await request(server).put('/shops/890').send(item);
      expect(res.statusCode).toEqual(500);
    });
  });

  describe('DELETE /:id', () => {
    it('should return a message on success', async () => {
    
      shopData.deleteByID.mockResolvedValue({ message: 'Deleted 1 shop.' });
      const res = await request(server).delete('/shops/890');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.message).toEqual('Deleted 1 shop.');
    });
    it('should return a error message if record fails to be deleted', async () => {

      shopData.deleteByID.mockResolvedValue({ error: 'some error occured' });
      const res = await request(server).delete('/shops/890');
      expect(res.statusCode).toEqual(400);
    });
  });
