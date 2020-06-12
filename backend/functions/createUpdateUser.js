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
            type: 'user',
            uuid: username,
        },
    }).promise();
    if (result.Item != undefined){

    var key = event.pathParameters.imdbId
    /* var obj = {}
    obj[key] = userRating
 */
    add_rating = result.Item.rating
    add_rating[key] = userRating 


    const item = {
        type: 'user',
        uuid: username,
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

    } else{
    var key = event.pathParameters.imdbId
    var obj = {}
    obj[key] = userRating

    const item = {
        type: 'user',
        uuid: username,
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

}

