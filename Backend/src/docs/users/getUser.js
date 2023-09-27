module.exports = {
    get : {
        tags : ["User CRUD operations"],
        description : "Get User by Id",
        operatorId : 'getUserId',

        parameters : [
            {
                name : 'id',
                description : "_id of user",
                in : 'path',
                schema : {
                    $ref : "#/components/schemas/_id"
                },
                required : true
            }
        ],
        requestBody : {},
        responses : {
            200 : {
                description : "Get user by id success",
                content : {
                    "application/json" : {
                        schema : {
                            $ref : "#/components/schemas/User"
                        }
                    }
                }
                
            }
        }
    }
    
}