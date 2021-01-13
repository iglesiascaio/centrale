const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    const dynamoDb = new DynamoDB.DocumentClient();
    const result = await dynamoDb.query({
        TableName: process.env.tableName,
        KeyConditionExpression: '#type = :type',
        ExpressionAttributeNames: {
            '#type': 'type'
        },
        ExpressionAttributeValues: {
            ':type': 'movie',
        },
    }).promise();

    list_films = result.Items

    list_films.sort((a,b) => (a.rating.length < b.rating.length)? 1:- 1)

    list_films = list_films.slice(0,5) 

    var i;
    mostWatched = []
    for (i=0;i<list_films.length;i++){

        mostWatched.push(list_films[i].uuid)

    }

    return {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
        statusCode: 200,
       
        body: JSON.stringify(mostWatched),
    }
}

