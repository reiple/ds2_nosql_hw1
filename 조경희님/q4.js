// TODO:

//var input_userid = 121120;

let start_time = new Date();

var mIds = db.ml_ratings.find({userId:input_userid}, {_id:0, movieId:1}).map(function(result) {return result.movieId});

db.ml_ratings.aggregate([{$match:{movieId:{$in:mIds}}},
                         {$group:{_id:'$movieId', mId_avg_Rating:{$avg:'$rating'}}},
                         {$out:'tmp_mId_Ratings'}
                        ])

var cursor = db.ml_ratings.aggregate([
    {$match:{userId:input_userid}},
    {$lookup:{from:'tmp_mId_Ratings', localField:'movieId', foreignField:'_id', as:'bias_result'}},
    {$unwind:'$bias_result'},
    {$group:{_id:null, total:{$sum:{$subtract:['$rating', '$bias_result.mId_avg_Rating']}}, total_cnt:{$sum:1}}},
    {$project: {_id:0, total:1, total_cnt:1}}
    ]) ;    
    
var total, total_cnt;
    
if (cursor.hasNext()) {
        var result = cursor.next();
        total = result.total;
        total_cnt = result.total_cnt;
    }

db.tmp_mId_Ratings.drop()
    
let end_time = new Date();

var bias = (total / total_cnt).toFixed(3);
print(bias);
print("수행시간: " + ((end_time - start_time) / 1000.0) + "초");


// D:\code\ds2_nosql_hw1\조경희님>run_q4.bat

// D:\code\ds2_nosql_hw1\조경희님>mongo movielens --quiet --eval "var input_userid = 121120;" q4.js
// -0.580
// 수행시간: 1.566초

// D:\code\ds2_nosql_hw1\조경희님>mongo movielens --quiet --eval "var input_userid = 54313;" q4.js
// -0.919
// 수행시간: 19.723초

// D:\code\ds2_nosql_hw1\조경희님>mongo movielens --quiet --eval "var input_userid = 6917;" q4.js
// 0.088
// 수행시간: 17.179초

// D:\code\ds2_nosql_hw1\조경희님>mongo movielens --quiet --eval "var input_userid = 62986;" q4.js
// 0.057
// 수행시간: 20.768초

// D:\code\ds2_nosql_hw1\조경희님>run_q4.bat

// D:\code\ds2_nosql_hw1\조경희님>mongo movielens --quiet --eval "var input_userid = 121120;" q4.js
// -0.580
// 수행시간: 1.591초

// D:\code\ds2_nosql_hw1\조경희님>mongo movielens --quiet --eval "var input_userid = 54313;" q4.js
// -0.919
// 수행시간: 19.368초

// D:\code\ds2_nosql_hw1\조경희님>mongo movielens --quiet --eval "var input_userid = 6917;" q4.js
// 0.088
// 수행시간: 16.669초

// D:\code\ds2_nosql_hw1\조경희님>mongo movielens --quiet --eval "var input_userid = 62986;" q4.js
// 0.057
// 수행시간: 19.666초



/*
db.ml_ratings.aggregate([
    {$match:{userId: input_userid}},
    {$project:{movieId:1, rating:1, _id:0}},
    {$out: 'tmp_user_movies'}
])

db.tmp_user_movies.aggregate([
    {$lookup:{from:'ml_ratings', localField:'movieId', foreignField:'movieId', as:'movie_rating'}},
    {$unwind:'$movie_rating'},
    {$group:{_id:'$movieId', avgRating:{$avg:'$movie_rating.rating'}}},
    {$out:'tmp_movie_ratings'}

])


var cursor = db.tmp_user_movies.aggregate([
    {$lookup:{from:'tmp_movie_ratings', localField:'movieId', foreignField:'_id', as:'bias_result'}},
    {$unwind:'$bias_result'},
    {$group:{_id:null, total:{$sum:{$subtract:['$rating', '$bias_result.avgRating']}}, total_cnt:{$sum:1}}},
    {$project: {_id:0, total:1, total_cnt:1}}
]) ;

var total = 0;
var total_cnt = 0;
if (cursor.hasNext()) {
    var result = cursor.next();
    total = result.total;
    total_cnt = result.total_cnt;
}


var bias = (total / total_cnt).toFixed(3);
print(bias);

db.tmp_user_movies.drop()
db.tmp_movie_ratings.drop()
*/