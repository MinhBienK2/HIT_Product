module.exports = {
  token: {
    type: "string",
    description: "json web token to authorize user",
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiX2lkIjoiNjJmMDY3YjFhNDA1YjVhZmZhZjM5Njk0IiwiaWF0IjoxNTE2MjM5MDIyfQ.SmtU-4pFHCw1H6jPpfaYEZrL9zySTwUEeaXl4d6psRQ",
  },
  LoginUserDto: {
    type: "object",
    properties: {
      email: {
        type: "string",
        describe: "email of user",
        example: "phamminhbien11@gmail.com",
      },
      password: {
        type: "string",
        describe: "password of user",
        example: "Minhbien123@",
      },
    },
    required: ["email", "password"],
  },
  ResponseLoginSuccess: {
    allOf: [
      {
        $ref: "#/components/schemas/ResponseSuccess",
      },
      {
        type : "object",
        properties : {
          token : {
            $ref: "#/components/schemas/token",
          }
        }
      },
      {
        type: "object",
        properties: {
          data: {
              $ref: "#/components/schemas/User",
          },
        },
      },
      
    ],
  },
};
