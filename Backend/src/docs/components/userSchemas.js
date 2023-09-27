module.exports = {
  User: {
    type: "object",
    properties: {
      _id: {
        type: "ObjectId",
        description: "User identification number",
        example: "63390ffb769306d131512c00",
        required : true
      },
      firstName: {
        type: "string",
        description: "first name of user",
        example: "Minh",
        required : true
      },
      lastName : {
        type : "string",
        description : "last name off user",
        example : "Bien",
        required : true
      },
      password: {
        type: "string",
        description: "Password of user",
        example: "12345678",
      },
      email: {
        type: "string",
        description: "User's email",
        example: "dangdungvdl@gmail.com",
        required : true
      },
      role : {
        type : "string",
        description : "user's role",
        example : "user"
      },
      activeState : {
        type : "ObjectId",
        description : "active state identification number",
        example : "user"
      },
      phoneNumber: {
        type: "string",
        description: "User's phone number",
        example: "0987654321",
      },
      address: {
        type: "string",
        description: "User's address",
        example: "Nguyên Xá, Bắc Từ Liêm, Hà Nội",
      },
      gender: {
        type: "string",
        description: "User's gender",
        example: "male",
      },
      avatar: {
        type: "string",
        description: "User's avatar path",
        example: "/images/default.png",
      },
      banner: {
        type: "string",
        description: "User's banner path",
        example: "/images/default.png",
      },
      birthday: {
        type: "Date",
        description: "user's birtday",
        example: "31/01/2002",
      },
      relationship : {
        type: "string",
        description: "user's birtday",
        example: "31/01/2002",
      },
      statusHomeTown : {
        type: "string",
        description: "user's status hometown",
        example: "public",
      },
      city : {
        type: "string",
        description: "user's city",
      },
      homeTown : {
        type: "string",
        description: "user's homeTown",
      },
      companyName : {
        type: "string",
      },
      position : {
        type: "string",
      },
      schoolName : {
        type: "string",
      },
      majoy : {
        type: "string",
      },
      facebookId: {type: "string",},
      resetPasswordToken: {type: "string",},
      resetPasswordExpire: {type: "Date",},
      changePasswordAt: {type: "Date",},
      createdAt: {
        type: "date",
        description: "User's time created",
        example: "2022-10-08T02:13:32.951Z",
      },
      updatedAt: {
        type: "date",
        description: "User's time updated",
        example: "2022-10-08T02:13:32.951Z",
      },
    },
    required: [
      "firstName",
      "lastName",
      "email",
      "password"
    ],
  },
  ResponseNormalUser: {
    allOf: [
      {
        $ref: "#/components/schemas/ResponseSuccess",
      },
      {
        type: "object",
        properties: {
          data: {
            type: "object",
            properties: {
              user: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
      },
    ],
  },
  CreateUserDto: {
    type: "object",
    properties: {
      firstName: {
        type: "string",
        description: "first name of user",
        example: "Minh",
      },
      lastName : {
        type : "string",
        description : "last name off user",
        example : "Bien"
      },
      password: {
        type: "string",
        description: "Password of user",
        example: "12345678",
      },
      confirmPassword: {
        type: "string",
        description: "confirm password of user",
        example: "12345678",
      },
      email: {
        type: "string",
        description: "User's email",
        example: "dangdungvdl@gmail.com",
      },
    },
    required: [
      "firstName",
      "lastName",
      "email",
      "password",
      "confirmPassword"
    ],
  },
};
