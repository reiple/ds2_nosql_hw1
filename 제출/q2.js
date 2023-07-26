
// 입력 받은 input_tag를 ml_tags collection에서 찾아 movieId만 가져온다.
var mvids = db.ml_tags.find({tag : input_tag},{_id:0 , movieId : 1 }).map(function(a){return a.movieId})

// 가져온 movieId 각각에 대해서 ml_movies collection의 movieId와 일치하는 것을 검색한다.
// ml_movies에서 찾은 movie 정보 중 title만 출력한다.
db.ml_movies.find({movieId:{$in:mvids}},{_id:0,title:1}).forEach(function(movies){print(movies.title)})