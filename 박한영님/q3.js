// TODO:

let start_time = new Date();    // 시간 측정 시작

var titleid = db.ml_movies.find({title : input_title}).map(function(a){return a.movieId})
var ratinglist = db.ml_ratings.find({movieId : {$in:titleid}}).map(function(a) {return (a.rating)})

sum = ratinglist.reduce((a,b) => a+b, 0)
cnt = ratinglist.length

let end_time = new Date();  // 시간 측정 종료

var avg = (sum / cnt).toFixed(3);
print(avg);

print("수행시간: " + ((end_time - start_time) / 1000.0) + "초");