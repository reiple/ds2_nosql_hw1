var total_cnt = 0;
var total = 0;

let start_time = new Date();
var user = db.ml_ratings.find({userId: input_userid}, {movieId: 1, rating: 1})

user.forEach(
    function(u) {
        total_cnt = total_cnt + 1;
        var mCursor = db.ml_ratings.aggregate([
            {$match: {movieId: u.movieId}},
            {$group: {_id: '$movieId', total_rate: {$avg: '$rating'}}}
        ]);
        total = total + u.rating - mCursor.toArray()[0].total_rate
    }
)
let end_time = new Date();

var bias = (total / total_cnt).toFixed(3);
print(bias);
print("수행시간: " + ((end_time - start_time) / 1000.0) + "초");


// D:\code\ds2_nosql_hw1\조은옥님>run_q4.bat

// D:\code\ds2_nosql_hw1\조은옥님>mongo movielens --quiet --eval "var input_userid = 121120;" q4.js
// -0.580
// 수행시간: 1.798초

// D:\code\ds2_nosql_hw1\조은옥님>mongo movielens --quiet --eval "var input_userid = 54313;" q4.js
// -0.919
// 수행시간: 22.198초

// D:\code\ds2_nosql_hw1\조은옥님>mongo movielens --quiet --eval "var input_userid = 6917;" q4.js
// 0.088
// 수행시간: 18.713초

// D:\code\ds2_nosql_hw1\조은옥님>mongo movielens --quiet --eval "var input_userid = 62986;" q4.js
// 0.057
// 수행시간: 22.925초

// D:\code\ds2_nosql_hw1\조은옥님>run_q4.bat

// D:\code\ds2_nosql_hw1\조은옥님>mongo movielens --quiet --eval "var input_userid = 121120;" q4.js
// -0.580
// 수행시간: 1.535초

// D:\code\ds2_nosql_hw1\조은옥님>mongo movielens --quiet --eval "var input_userid = 54313;" q4.js
// -0.919
// 수행시간: 19.071초

// D:\code\ds2_nosql_hw1\조은옥님>mongo movielens --quiet --eval "var input_userid = 6917;" q4.js
// 0.088
// 수행시간: 16.468초

// D:\code\ds2_nosql_hw1\조은옥님>mongo movielens --quiet --eval "var input_userid = 62986;" q4.js
// 0.057
// 수행시간: 19.54초