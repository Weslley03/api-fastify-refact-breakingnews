export const newsCreateSchema = {
  description: 'create a new news article',
  tags: ['News'],
  summary: 'creates a new news article and return a succesfuly message',
  body: {
    type: 'object',
    required: ['id user via token JWT', 'NewsCreateBody'],
    properties: {
      title: { type: 'string' },
      text: { type: 'string' },
      banner: { type: 'string' }
    }
  },
  response: {
    201: {
      description: 'CADASTRO of NEWS OK',
      type: 'object',
      properties: {
        message: { type: 'string' },
        OK: { type: 'boolean' },
      },
    },
  },
};

export const newsFindAllSchema = {
  description: 'search all news',
  tags: ['News'],
  summary: 'search all news and return all with',
  response: {
    200: {
      description: 'all news in database',
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        text: { type: 'string' },
        banner: { type: 'string' },
        likes: { type: 'string' },
        comments: { type: 'string' },
        userName: { type: 'string' },
        userAvatar: { type: 'string' },
      },
    },
  },
};

export const findTopNewsSchema = {
  description: 'get the last news in database',
  tags: ['News'],
  summary: 'search all news and return all with',
  response: {
    200: {
      description: 'return the news and succesfuly message with OK equal a true',
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        text: { type: 'string' },
        banner: { type: 'string' },
        likes: { type: 'string' },
        comments: { type: 'string' },
        userName: { type: 'string' },
        userAvatar: { type: 'string' },
      },
      message: 'string',
      OK: 'boolean',
    },
  },
};

export const findByTitleSchema = {
  description: 'get the news with base in title',
  tags: ['News'],
  summary: 'search news with an title',
  response: {
    200: {
      description: 'return the news and succesfuly message with OK equal a true',
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        text: { type: 'string' },
        banner: { type: 'string' },
        likes: { type: 'string' },
        comments: { type: 'string' },
        userName: { type: 'string' },
        userAvatar: { type: 'string' },
      },
      message: 'string',
      OK: 'boolean',
    },
  },
};

export const findByUserSchema = {
  description: 'Retrieve news created by a specific user',
  tags: ['News'],
  summary: 'Fetch all news articles associated with the authenticated user',
  response: {
    200: {
      description: 'List of news articles created by the user',
      type: 'object',
      properties: {
        news: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              title: { type: 'string' },
              text: { type: 'string' },
              banner: { type: 'string' },
              likes: { type: 'number' },
              comments: { type: 'number' },
              userName: { type: 'string' },
              userAvatar: { type: 'string' },
            },
          },
        },
        message: { type: 'string' },
        OK: { type: 'boolean' },
      },
    },
    500: {
      description: 'Error occurred while retrieving news',
      type: 'object',
      properties: {
        message: { type: 'string' },
        OK: { type: 'boolean' },
      },
    },
  },
};

export const findCommentByIdNewsSchema = {
  description: 'Retrieve comments for a specific news article by its ID',
  tags: ['News'],
  summary: 'Fetch comments for a specific news article',
  params: {
    type: 'object',
    required: ['idNews'],
    properties: {
      idNews: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'List of comments for the news article',
      type: 'object',
      properties: {
        news: {
          type: 'object',
          properties: {
            comments: { type: 'array', items: { type: 'string' } },
          },
        },
      },
    },
    500: {
      description: 'Error occurred while retrieving comments',
      type: 'object',
      properties: {
        message: { type: 'string' },
        OK: { type: 'boolean' },
      },
    },
  },
};

export const likeCheckSchema = {
  description: 'Check if a news article has been liked',
  tags: ['News'],
  summary: 'Verify like status of a news article',
  params: {
    type: 'object',
    required: ['idNews'],
    properties: {
      idNews: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Returns the news article with like status',
      type: 'object',
      properties: {
        news: {
          type: 'object',
          properties: {
            likes: { type: 'number' },
          },
        },
      },
    },
    404: {
      description: 'News article or like information not found',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    500: {
      description: 'Error occurred while checking like status',
      type: 'object',
      properties: {
        message: { type: 'string' },
        OK: { type: 'boolean' },
      },
    },
  },
};

export const removeCommentSchema = {
  description: 'Remove a comment from a news article',
  tags: ['News'],
  summary: 'Delete a specific comment from a news article',
  params: {
    type: 'object',
    required: ['idNews', 'commentId'],
    properties: {
      idNews: { type: 'string' },
      commentId: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Comment successfully removed',
      type: 'object',
      properties: {
        message: { type: 'string' },
        OK: { type: 'boolean' },
      },
    },
    500: {
      description: 'Error occurred while removing comment',
      type: 'object',
      properties: {
        message: { type: 'string' },
        OK: { type: 'boolean' },
      },
    },
  },
};

export const findNewsByIdSchema = {
  description: 'Retrieve a news article by its ID',
  tags: ['News'],
  summary: 'Fetch a specific news article by ID',
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Returns the news article details',
      type: 'object',
      properties: {
        noticia: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            text: { type: 'string' },
            banner: { type: 'string' },
            likes: { type: 'number' },
            comments: { type: 'number' },
            userName: { type: 'string' },
            userAvatar: { type: 'string' },
          },
        },
      },
    },
    500: {
      description: 'Error occurred while retrieving news article',
      type: 'object',
      properties: {
        message: { type: 'string' },
        OK: { type: 'boolean' },
      },
    },
  },
};

export const updateNewsSchema = {
  description: 'Update details of an existing news article',
  tags: ['News'],
  summary: 'Modify a news article by its ID',
  params: {
    type: 'object',
    required: ['idNews'],
    properties: {
      idNews: { type: 'string' },
    },
  },
  body: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      text: { type: 'string' },
      banner: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'News article updated successfully',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    404: {
      description: 'Not authorized or news article not found',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    500: {
      description: 'Error occurred while updating news article',
      type: 'object',
      properties: {
        message: { type: 'string' },
        OK: { type: 'boolean' },
      },
    },
  },
};

export const deleteNewsByIdSchema = {
  description: 'Delete a news article by its ID',
  tags: ['News'],
  summary: 'Remove a specific news article',
  params: {
    type: 'object',
    required: ['idNews'],
    properties: {
      idNews: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'News article deleted successfully',
      type: 'object',
      properties: {
        message: { type: 'string' },
        OK: { type: 'boolean' },
      },
    },
    404: {
      description: 'Not authorized to delete or news article not found',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    500: {
      description: 'Error occurred while deleting news article',
      type: 'object',
      properties: {
        message: { type: 'string' },
        OK: { type: 'boolean' },
      },
    },
  },
};

export const likeNewsByIdSchema = {
  description: 'Like or unlike a news article',
  tags: ['News'],
  summary: 'Toggle like status for a specific news article',
  params: {
    type: 'object',
    required: ['idNews'],
    properties: {
      idNews: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Like status updated successfully',
      type: 'object',
      properties: {
        message: { type: 'string' },
        OK: { type: 'boolean' },
      },
    },
    500: {
      description: 'Error occurred while updating like status',
      type: 'object',
      properties: {
        message: { type: 'string' },
        OK: { type: 'boolean' },
      },
    },
  },
};

export const addCommentSchema = {
  description: 'Add a comment to a news article',
  tags: ['News'],
  summary: 'Allows a user to add a comment to a news article',
  params: {
    type: 'object',
    required: ['idNews'],
    properties: {
      idNews: { type: 'string', description: 'ID of the news article to which the comment will be added' },
    },
  },
  body: {
    type: 'object',
    required: ['text'],
    properties: {
      text: { type: 'string', description: 'The content of the comment' },
    },
  },
  response: {
    200: {
      description: 'Comment successfully added',
      type: 'object',
      properties: {
        message: { type: 'string' },
        OK: { type: 'boolean' },
      },
    },
    500: {
      description: 'An error occurred while adding the comment',
      type: 'object',
      properties: {
        err: { type: 'string' },
      },
    },
  },
};

