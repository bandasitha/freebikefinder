const request = require('supertest');
const server = require('../server');

// Declare the jest will mock movieData. Must be before the require statement.
jest.mock('../dataInterface/nonProfits');
const nonProfitData = require('../dataInterface/nonProfits');

jest.mock('../auth');
const authMock = require('../auth');

describe('/nonProfits routes', () => {

    beforeEach(() => {});
    
    describe('GET /', () => {
        it("should return an array", async () => {
            nonProfitData.getAllNonProfits.mockResolvedValue([
                {
                    _id:"890",
                    title:"One Day"
                },
            ]);
    
            const res = await request(server).get('/nonProfits');
    
            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toEqual(true);
            expect(res.body.error).not.toBeDefined();
        });
    
        it("should return an error message", async () => {
            nonProfitData.getAllNonProfits.mockResolvedValue(null);
    
            const res = await request(server).get("/nonProfits");
    
            expect(res.statusCode).toEqual(500);
        });
    });

    it('should return an 404 on empty response', async () => {
        nonProfitData.getAllNonProfits.mockResolvedValue([]);

        const res = await request(server).get('/nonProfits');

        expect(res.statusCode).toEqual(404);
    });

});

describe('GET /:id', () => {
    it('should return a single result on success', async () => {
      
        nonProfitData.getNonProfitById.mockResolvedValue(
        { _id: '890', title: 'One Day' }
      );

      const res = await request(server).get('/nonProfits/890');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.title).toEqual('One Day');
    });
    it('should return 500 in case of error', async () => {
      
        nonProfitData.getNonProfitById.mockResolvedValue(null);
      const res = await request(server).get('/nonProfits/890');
      expect(res.statusCode).toEqual(500);
    });
});

describe('POST /', () => {
  authMock.verifyToken.mockImplementation( function(req, res, next) {return next()} )
    it('should return the new record on success', async () => {
      
        const item = { _id: '890', title: 'One Day' };
        nonProfitData.createNonProfit.mockResolvedValue(item);
  
        const res = await request(server).post('/nonProfits').send(item);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeDefined();
        expect(res.body.title).toEqual('One Day');
        expect(res.body._id).toEqual('890');
      });
  
      it('should return http 500 in case of error', async () => {
        
        const item = { _id: '890', title: 'One Day' };
        nonProfitData.createNonProfit.mockResolvedValue(null);
  
        const res = await request(server).post('/nonProfits').send(item);
        expect(res.statusCode).toEqual(500);
      });
});


describe('PUT /:id', () => {
    it('should return the updated record on success', async () => {
      
        const item = { _id: '890', title: 'Second Day' };
        nonProfitData.updateNonProfitById.mockResolvedValue(item);
  
        const res = await request(server).put('/nonProfits/890').send(item);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeDefined();
        expect(res.body.title).toEqual('Second Day');
        expect(res.body._id).toEqual('890');
      });
      it('should return http 500 in case of error', async () => {
        
        const item = { _id: '890', title: 'Second Day' };
        nonProfitData.updateNonProfitById.mockResolvedValue(null);
  
        const res = await request(server).put('/nonProfits/890').send(item);
        expect(res.statusCode).toEqual(500);
      });
});

describe('DELETE /:id', () => {
    it('should return a message on success', async () => {
    
        nonProfitData.deleteByID.mockResolvedValue({ message: 'Deleted 1 shop.' });
        const res = await request(server).delete('/nonProfits/890');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeDefined();
        expect(res.body.message).toEqual('Deleted 1 shop.');
      });
      it('should return a error message if record fails to be deleted', async () => {
  
        nonProfitData.deleteByID.mockResolvedValue({ error: 'some error occured' });
        const res = await request(server).delete('/nonProfits/890');
        expect(res.statusCode).toEqual(400);
      });
});


    


