jest.mock('../services/userService.js', () => {
    return {
        addUser: jest.fn(),
    };
  });

const { addUser } = require('../services/userService');
const { ValidationError } = require('../helpers/errors');

describe('addUser', () => {
  it('should create a new user and return his info', async () => {
    const mockResult = {
      code: 201,
      status: "created",
      data: {
        _id: '640cd5ac2d9fecf12e889807',
        name: 'Luann Smith',
        age: 21,
        email: 'smithlu@email.com'
      } 
    };

    addUser.mockResolvedValue(mockResult);

    const result = await addUser({   
        name: 'William Baker',
        age: 25,
        email: 'wbaker@email.com'
    });

    expect(result).toEqual(mockResult);
  });

  it('should throw a ValidationError when the data is incorrect', async () => {

    addUser.mockRejectedValue(new ValidationError('Bad request: some required fields are not filled out.'));

    let error;
    try {
      await addUser({   
        name: 'William Baker',
        age: 25,
    });
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(ValidationError);
    expect(error.message).toEqual('Bad request: some required fields are not filled out.');
  });
});