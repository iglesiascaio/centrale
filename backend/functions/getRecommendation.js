const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {

    function zeros(dimensions) {
        var array = [];
    
        for (var i = 0; i < dimensions[0]; ++i) {
            array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
        }
    
        return array;
    }
    
    function mean(list){
        var i;
        var n_diff_zero = 0;
        sum = 0;
        for (i=0;i<list.length;i++){
            if (list[i] == 0 ){
                continue
            }
            else{
                sum = sum + list[i];
                n_diff_zero = n_diff_zero + 1
            }
        }
        return (sum/n_diff_zero)
    }
    
    
    function subtract_mean(matrix){
        var i;
        var j;
        matrix_zeros = zeros([matrix.length, matrix[0].length])
        console.log(matrix_zeros)
        for (i=0;i<matrix.length;i++){
            val_mean = mean(matrix[i])
            for (j=0;j<matrix[0].length;j++){
                if(matrix[i][j] == 0){
                    continue
                }
                console.log(i)
                matrix_zeros[i][j] = matrix[i][j] - val_mean
            }
        }
        return matrix_zeros
    }
    
    function intern_product(list1,list2,list1_aux,list2_aux){
        var i,j,k;
        sum = 0;
        sum_square1 = 0;
        sum_square2 = 0;
        for(i=0;i<list1.length;i++){
            if(list1[i]*list2[i] == 0 && list1_aux[i]*list2_aux[i] == 0){
                continue
            }
            sum = sum + list1[i]*list2[i]
            sum_square1 = sum_square1 + list1[i]*list1[i]
            sum_square2 = sum_square2 + list2[i]*list2[i]
        }
        if(sum_square1*sum_square2 == 0){
            return 0;
        }
        return sum/Math.pow((sum_square1*sum_square2),0.5)
    }
    
    
    
    function similarity(matrix,user, user_mapping,matrix_certa){
        var i;
        var i_aux = user_mapping[user]
        list_simlarity = Array(matrix.length)
        for(i=0;i<matrix.length;i++){
            list_simlarity[i] = intern_product(matrix[i], matrix[i_aux],matrix_certa[i],matrix_certa[i_aux])
        }
        return list_simlarity;
        
    }
    
    function rating_films(list_simlarity,user,mean_,user_mapping,matrix_mean){
        var i;
        i_aux = user_mapping[user];
        sum_abs = 0
        sum_mean = 0
        rating_list = Array(matrix_mean[0].length)
        for(i=0;i<matrix_mean[0].length;i++){
            
            sum_abs = 0
            sum_mean = 0
            for(j=0;j<matrix_mean.length;j++){
                sum_mean = sum_mean + list_simlarity[j]*matrix_mean[j][i]
                sum_abs = sum_abs + Math.abs(list_simlarity[j])
            }
            rating_list[i] = mean_ + sum_mean/sum_abs
        }
        return rating_list
    }
    
    function notWatchedMovies(list_rating){
        var i;
        listNotWatched = []
        for (i=0;i<list_rating.length;i++){
            if (list_rating[i] == 0){
                listNotWatched.push(i)
            }
        }
    
        return listNotWatched
    
    } 
   
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
            ':type': 'user',
        },
    }).promise();

    

    user_final = String(event.pathParameters.username)
    var i;
    var it_movies = 0;
    var j;
    let user_mapping = {}
    let movie_mapping = {}
    let movie_mapping_inverse = {}


    for (i=0; i< result.Items.length; i++){
        username = result.Items[i].uuid;
        user_mapping[username] = i;
        list_films = Object.keys(result.Items[i].rating);
        for(j=0;j<list_films.length; j++){
                if(Object.keys(movie_mapping).includes(list_films[j])){
                    continue;
                }
                movie_mapping[list_films[j]] = it_movies;
                movie_mapping_inverse[it_movies] = list_films[j] 
                
                it_movies = it_movies + 1;

    }
    }
    if (!(user_final in user_mapping)){

        return {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
            statusCode: 200,
            
            body: JSON.stringify([]),
        }
        
    }
    rows = Object.keys(user_mapping).length
    columns = Object.keys(movie_mapping).length
    /*matrix = math.zeros(rows,columns)*/
    matrix = zeros([rows,columns])

    for(i=0;i<rows;i++){
        list_films = Object.keys(result.Items[i].rating);
        for(j=0;j<list_films.length;j++){
            matrix[i][movie_mapping[list_films[j]]] = result.Items[i].rating[list_films[j]] 
        }
    }


    i_user = user_mapping[user_final]
    console.log(i_user)
    mean_user = mean(matrix[i_user])
    console.log(matrix)
    matrix_mean = subtract_mean(matrix)

    list_similarity = similarity(matrix_mean,user_final, user_mapping,matrix)

    list_rating = rating_films(list_simlarity,user_final,mean_user,user_mapping,matrix_mean)

    listNotWatched = notWatchedMovies(matrix[i_user])
    list_recommended = []
    var i;
    max = 0
    for (i=0;i<5;i++){
        var max = 0;
        var indmax = 0;
        for(j=0;j<list_rating.length;j++){
            if (list_rating[j]>max && listNotWatched.includes(j)){
                max = list_rating[j]
                indmax = j
            }
        }
        if (max ==0){
            break
        }
        list_recommended.push(movie_mapping_inverse[indmax]);
        list_rating[indmax] = 0
    }

 
    return {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
        statusCode: 200,
        
        body: JSON.stringify(list_recommended),
    }
}
