export const loginUserServiceSchema = {
  description: 'Authenticate a user and return login details',
  tags: ['User'],
  summary: 'Validates the user credentials and returns user details along with a success message if login is successful',
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', description: 'Email address of the user' },
      password: { type: 'string', description: 'Password of the user' },
    },
  },
  response: {
    200: {
      description: 'Successful login with user details',
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            userName: { type: 'string' },
            email: { type: 'string' },
            avatar: { type: 'string' },
            background: { type: 'string' },
          },
        },
        token: { type: 'string', description: 'token success generated' },
        message: { type: 'string', description: 'Login success message' },
        OK: { type: 'boolean', description: 'Indicates successful login' },
      },
    },
    400: {
      description: 'User not found or incorrect credentials',
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Error message indicating the problem' },
        OK: { type: 'boolean', description: 'Indicates an unsuccessful attempt' },
      },
    },
    500: {
      description: 'Error occurred during the login process',
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Error message' },
        OK: { type: 'boolean', description: 'Indicates an error occurred' },
      },
    },
  },
};
