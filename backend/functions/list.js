
module.exports.handle = async event => {

    let vamo = ['vamoo','pff']

    return {
        statusCode: 200,
        headers:{
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(vamo),
    }
}
