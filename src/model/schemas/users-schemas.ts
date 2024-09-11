export const createUserServiceSchema = {
  description: 'Create a new user',
  tags: ['User'],
  summary: 'Creates a new user with the provided data and returns a success message',
  body: {
    type: 'object',
    required: ['name', 'userName', 'email', 'avatar', 'background'],
    properties: {
      name: { type: 'string' },
      userName: { type: 'string' },
      email: { type: 'string' },
      avatar: { type: 'string' },
      background: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'User successfully created',
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
        message: { type: 'string' },
        OK: { type: 'boolean' },
      },
    },
    500: {
      description: 'Error occurred while creating the user',
      type: 'object',
      properties: {
        message: { type: 'string' },
        OK: { type: 'boolean' },
      },
    },
  },
};

export const GetByIdServiceSchema = {
  description: 'Get a user by ID',
  tags: ['User'],
  summary: 'Retrieves a user based on their ID',
  params: {
    type: 'object',
    required: ['userID'],
    properties: {
      userID: { type: 'string', description: 'ID of the user to retrieve' },
    },
  },
  response: {
    200: {
      description: 'User successfully retrieved',
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
    500: {
      description: 'Error occurred while retrieving the user',
      type: 'object',
      properties: {
        err: { type: 'string' },
      },
    },
  },
};

export const updateUserServiceSchema = {
  description: 'Update a user',
  tags: ['User'],
  summary: 'Updates a user with the given data and returns a success message',
  params: {
    type: 'object',
    required: ['userID'],
    properties: {
      userID: { type: 'string', description: 'ID of the user to update' },
    },
  },
  body: {
    type: 'object',
    required: ['name', 'userName', 'email', 'avatar', 'background'],
    properties: {
      name: { type: 'string' },
      userName: { type: 'string' },
      email: { type: 'string' },
      avatar: { type: 'string' },
      background: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'User successfully updated',
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
        message: { type: 'string' },
        OK: { type: 'boolean' },
      },
    },
    500: {
      description: 'Error occurred while updating the user',
      type: 'object',
      properties: {
        message: { type: 'string' },
        OK: { type: 'boolean' },
      },
    },
  },
};

export const findAllUserServiceSchema = {
  description: 'Find all users',
  tags: ['User'],
  summary: 'Retrieves a list of all users with basic information',
  response: {
    200: {
      description: 'List of all users retrieved successfully',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          userName: { type: 'string' },
          email: { type: 'string' },
        },
      },
    },
    500: {
      description: 'Error occurred while retrieving users',
      type: 'object',
      properties: {
        err: { type: 'string' },
      },
    },
  },
};

export const deleteUserServiceSchema = {
  description: 'Delete a user by ID',
  tags: ['User'],
  summary: 'Deletes a user based on their ID',
  params: {
    type: 'object',
    required: ['userID'],
    properties: {
      userID: { type: 'string', description: 'ID of the user to delete' },
    },
  },
  response: {
    200: {
      description: 'User successfully deleted',
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Confirmation message' },
        OK: { type: 'boolean', description: 'Status of the operation' },
      },
    },
    500: {
      description: 'Error occurred while deleting the user',
      type: 'object',
      properties: {
        err: { type: 'string' },
      },
    },
  },
};
