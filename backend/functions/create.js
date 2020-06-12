const uuid = require('uuid');
const DynamoDB = require('aws-sdk/clients/dynamodb');


module.exports.handle = async event => {
    const data = JSON.parse(event.body);

    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }
    const dynamoDb = new DynamoDB.DocumentClient();
    let username = data.username
    let userRating = data.userRating

    var key = username
    var obj = {}
    obj[key] = userRating

    const item = {
        type: 'movie',
        uuid: data.imdbId,
        rating: obj
        
    }

    await dynamoDb.put({
        TableName: process.env.tableName,
        Item: item,
    }).promise();

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
        body: JSON.stringify(item),
    }
}

