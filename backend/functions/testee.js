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

    let params = {
        TableName: process.env.tableName,
        key:{
            "type": 'movie',
            "uuid": data.imdbId
        },
        UpdateExpression: "set rating = :i",
        ExpressionAttributeValues:{
            ":i": [{'username': username, 'score': userRating }]
        },
        ReturnValues: "UPDATED_NEW"
        
    }

    dynamoDb.update(params);

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
        body: JSON.stringify(item),
    }
}

