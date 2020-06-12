const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    const dynamoDb = new DynamoDB.DocumentClient();
    username = String(event.pathParameters.username)
    password = String(event.pathParameters.password)
    

    const result = await dynamoDb.get({
        TableName: process.env.tableName,
        Key: {
            type: 'login',
            uuid: username,
        },
    }).promise();

    if (result.Item) {
       
        if (result.Item.password == password){

        /* let user_rating = rating[username].S */
        
        return {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
            statusCode: 200,
            body: 1,
        }
    }
        else {
            return {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                  },
                statusCode: 200,
                body: -1,
            }
        }
    } else {
        return {
            headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
            statusCode: 200,
            body: -1
        }
    }
}

