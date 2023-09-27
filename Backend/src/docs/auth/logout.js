module.exports = {
    get : {
        tags: ["Auth operations"],
        description : "Login account",
        operationId : "login",
        parameters: [],
        requestBody : {},
        responses : {
            200 : {
                description : "Logout success",
                content : {
                    "application/json" : {
                        schema : {
                            $ref : "#/components/schemas/ResponseSuccess"
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