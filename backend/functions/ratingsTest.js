const uuid = require('uuid');
const DynamoDB = require('aws-sdk/clients/dynamodb');


module.exports.handle = async event => {
    const data = JSON.parse(event.body);

    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }
    
    let username = data.username
    let userRating = data.userRating

    const dynamoDb = new DynamoDB.DocumentClient();
    const result = await dynamoDb.get({
        TableName: process.env.tableName,
        Key: {
            type: 'movie',
            uuid: event.pathParameters.imdbId,
        },
    }).promise();

    var key = username
    var obj = {}
    obj[key] = userRating

    add_rating = result.Item.rating
    add_rating[username] = userRating 


    const item = {
        type: 'movie',
        uuid: event.pathParameters.imdbId,
        rating: add_rating 
        
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

