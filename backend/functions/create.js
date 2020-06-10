const uuid = require('uuid');
const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    const data = JSON.parse(event.body);


    const table_name = "cs-group-8-Matheus-dynamodb"
    const dynamoDb = new DynamoDB.DocumentClient();

    const item = {
        type: 'movie',
        uuid: data.imdbId,
        users: [{
          username: data.username,
          score: data.score
        }]

    }

    await dynamoDb.put({
        TableName: table_name,
        Item: item,
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(item),
    }
}
