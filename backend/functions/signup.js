const uuid = require('uuid');
const DynamoDB = require('aws-sdk/clients/dynamodb');


module.exports.handle = async event => {

    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }
    const dynamoDb = new DynamoDB.DocumentClient();
    username = String(event.pathParameters.username)
    password = String(event.pathParameters.password)



    const item = {
        type: 'login',
        uuid: username ,
        password: password
        
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

