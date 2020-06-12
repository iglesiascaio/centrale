const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    const dynamoDb = new DynamoDB.DocumentClient();
    username = String(event.pathParameters.username)
    

    const result = await dynamoDb.get({
        TableName: process.env.tableName,
        Key: {
            type: 'movie',
            uuid: event.pathParameters.imdbId,
        },
    }).promise();

    if (result.Item) {


        let rating = result.Item.rating

        if (rating[username] != undefined){

        /* let user_rating = rating[username].S */
        
        return {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
            statusCode: 200,
            body: JSON.stringify({'rating': rating[username]}),
        }
    }
        else {
            return {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                  },
                statusCode: 200,
                body: undefined,
            }
        }
    } else {
        return {
            headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
            statusCode: 200,
            body: undefined
        }
    }
}

