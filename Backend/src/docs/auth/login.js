module.exports = {
    post : {
        tags: ["Auth operations"],
        description : "Login account",
        operationId : "login",
        parameters: [],
        requestBody : {
            required : true,
            content : {
                "application/json" : {
                    schema : {
                        $ref : "#/components/schemas/LoginUserDto"
                    }
                }
            }
        },
        responses : {
            200 : {
                description : "Login success",
                content : {
                    "application/json" : {
                        schema : {
                            $ref : "#/components/schemas/ResponseLoginSuccess"
                        }
                    }
                }
            },
            400 : {
                description : "Login fail",
                content : {
                    "application/json" : {
                        schema : {
                            $ref : "#/components/schemas/ResponseError",
                        },
                        example : {
                            notValidEmailOrPassword : {
                                status: "fail",
                                message: "not valid email or password"
                            }, EmailOrPasswordNotExists : {
                                status: "fail",
                                message: "email or password not exists"
                            }
                        }
                    }
                }
            },
            500 : {
                description : "Internal server error",
                content : {
                    "application/json" : {
                        schema : {
                            $ref : "#/components/schemas/ResponseError",
                        },
                        example : {
                            status: "error",
                            message: "INTERNAL SERVER ERROR !"
                        }
                    }
                }
            }
        }
    }
}