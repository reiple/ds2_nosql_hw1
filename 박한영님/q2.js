// TODO:

let start_time = new Date();    // 시간 측정 시작

var mvids = db.ml_tags.find({tag : input_tag},{_id:0 , movieId : 1 }).map(function(a){return a.movieId})

db.ml_movies.find({movieId:{$in:mvids}},{_id:0,title:1}).forEach(function(movies){print(movies.title)})

let end_time = new Date();  // 시간 측정 종료

print("수행시간: " + ((end_time - start_time) / 1000.0) + "초");