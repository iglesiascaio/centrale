const uuid = require('uuid');
const DynamoDB = require('aws-sdk/clients/dynamodb');

function get_dynamodb_resource(){
    return boto3.resource(
            'dynamodb',
            region_name=os.environ['AWS_DYNAMO_REGION'],
            endpoint_url=os.environ['AWS_DYNAMO_ENDPOINT'],
            aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
            aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'])
    }

module.exports.handle = async event => {
    const data = JSON.parse(event.body);
    let username = data.username
    let userRating = data.userRating


    table = get_dynamodb_resource().Table(process.env.tableName)
    result = table.update_item(
        Key={
            type: 'movie',
            uuid: data.imdbId
        },
        UpdateExpression="SET rating = list_append(rating, :i)",
        ExpressionAttributeValues={
            ':i': {'username': username, 'rating': userRating },
        },
        ReturnValues="UPDATED_NEW"
    )
    if ((result['ResponseMetadata']['HTTPStatusCode'] == 200) && ('Attributes' in result)){
        return result['Attributes']['some_attr']}
}




