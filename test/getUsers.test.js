jest.mock('../services/userService.js', () => {
    return {
        getUsers: jest.fn(),
    };
  });

const { getUsers } = require('../services/userService');
const { ServerError } = require('../helpers/errors');

describe('getUsers', () => {
  it('should return an array of users', async () => {
    const mockResult = {
      code: 200,
      status: "success",
      data: [
              {   
                _id: '640cd5ac2d9fecf12e889807',
                name: 'Luann Smith',
                age: 21,
                email: 'smithlu@email.com'
              }
            ]
    };
    
    getUsers.mockResolvedValue(mockResult);

    const result = await getUsers();

    expect(result).toEqual(mockResult);
  });

  it('should throw a ServerError when there is an exception', async () => {

    getUsers.mockRejectedValue(new ServerError('The server could not complete your query.'));

    let error;
    try {
      await getUsers();
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(ServerError);
    expect(error.message).toEqual('The server could not complete your query.');
  });
});