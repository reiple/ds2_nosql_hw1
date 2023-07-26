// TODO:

let start_time = new Date();    // 시간 측정 시작

var mvlist = db.ml_ratings.find({userId :input_userid})
var total = 0
var total_cnt = mvlist.count()
while (mvlist.hasNext()){
x = mvlist.next();
var avgratings = db.ml_ratings.find({movieId: x.movieId}).map(function(a){return a.rating} );
tmpsum = avgratings.reduce((a,b)=> a+b,0);
tmpn = avgratings.length; 
var mavg = (tmpsum/tmpn);
var usern = (x.rating - mavg);
var total = total + usern  }

let end_time = new Date();  // 시간 측정 종료

var bias = (total / total_cnt).toFixed(3);
print(bias);

print("수행시간: " + ((end_time - start_time) / 1000.0) + "초");



// D:\code\ds2_nosql_hw1\박한영님>mongo movielens --quiet --eval "var input_userid = 121120;" q4.js
// -0.580
// 수행시간: 4.697초

// D:\code\ds2_nosql_hw1\박한영님>mongo movielens --quiet --eval "var input_userid = 54313;" q4.js
// -0.919
// 수행시간: 55.515초

// D:\code\ds2_nosql_hw1\박한영님>mongo movielens --quiet --eval "var input_userid = 6917;" q4.js
// 0.088
// 수행시간: 48.374초

// D:\code\ds2_nosql_hw1\박한영님>mongo movielens --quiet --eval "var input_userid = 62986;" q4.js
// 0.057
// 수행시간: 56.824초

// D:\code\ds2_nosql_hw1\박한영님>run_q4.bat

// D:\code\ds2_nosql_hw1\박한영님>mongo movielens --quiet --eval "var input_userid = 121120;" q4.js
// -0.580
// 수행시간: 4.737초

// D:\code\ds2_nosql_hw1\박한영님>mongo movielens --quiet --eval "var input_userid = 54313;" q4.js
// -0.919
// 수행시간: 56.09초

// D:\code\ds2_nosql_hw1\박한영님>mongo movielens --quiet --eval "var input_userid = 6917;" q4.js
// 0.088
// 수행시간: 48.833초

// D:\code\ds2_nosql_hw1\박한영님>mongo movielens --quiet --eval "var input_userid = 62986;" q4.js
// 0.057
// 수행시간: 57.587초

// D:\code\ds2_nosql_hw1\박한영님>run_q4.bat

// D:\code\ds2_nosql_hw1\박한영님>mongo movielens --quiet --eval "var input_userid = 121120;" q4.js
// -0.580
// 수행시간: 4.701초

// D:\code\ds2_nosql_hw1\박한영님>mongo movielens --quiet --eval "var input_userid = 54313;" q4.js
// -0.919
// 수행시간: 55.179초

// D:\code\ds2_nosql_hw1\박한영님>mongo movielens --quiet --eval "var input_userid = 6917;" q4.js
// 0.088
// 수행시간: 47.746초

// D:\code\ds2_nosql_hw1\박한영님>mongo movielens --quiet --eval "var input_userid = 62986;" q4.js
// 0.057
// 수행시간: 57.616초