const uuid = require('uuid');
const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    const data = JSON.parse(event.body);
    let username = data.username
    let userRating = data.userRating 

    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }
    const dynamoDb = new DynamoDB.DocumentClient();

    result = dynamoDB.update_item(
        Key={
            'type': 'movie',
            'uuid': data.imdbId
        },
        UpdateExpression="SET ratings = list_append(ratings, :i)",
        ExpressionAttributeValues={
            ':i': [{username:userRating}],
        },
        ReturnValues="UPDATED_NEW"
    )
   

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
        body: JSON.stringify(item),
    }
}

