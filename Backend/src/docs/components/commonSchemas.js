module.exports = {
  _id: {
    type: "string",
    description: "An id of a contact",
    example: "63390ffb769306d131512c00",
  },
  ResponseError: {
    type: "object",
    properties: {
      status: {
        type: "string",
        description: "status of error",
      },
      message: {
        type: "string",
      },
    },
  },
  ResponseSuccess: {
    type: "object",
    properties: {
      status: {
        type: "string",
        description: "status of response",
        example: "success",
      },
    },
  },
};
