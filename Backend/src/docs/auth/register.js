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
                        $ref : "#components/schemas/CreateUserDto"
                    }
                }
            }
        },
        responses : {
            200 : {
                description : "Register success",
                content : {
                    "application/json" : {
                        schema : {
                            $ref : "#/components/schemas/ResponseNormalUser"
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