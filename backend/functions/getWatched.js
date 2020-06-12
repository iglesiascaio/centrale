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
            type: 'user',
            uuid: username,
        },
    }).promise();

    if (result.Item) {

        teste = ['oi','matheusotario']
        let rating = result.Item.rating

        return {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
            statusCode: 200,
            body: JSON.stringify(rating),
        }
    
    } else {
        return {
            headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
            statusCode: 200,
            body: []
        }
    }
}