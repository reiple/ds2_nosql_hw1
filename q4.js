// 너무 오래 걸려서 ml_ratings.userId, ml_ratings.movieId에 대해서 각각 인덱스 생성함
// db.ml_ratings.createIndex({userId: 1})
// db.ml_ratings.createIndex({movieId: 1})


var total_cnt = 0;
var total = 0;

let start_time = new Date();
db.ml_ratings.find({userId: input_userid}, {movieId: 1, rating: 1}).forEach(
    function(doc) {
        total_cnt = total_cnt + 1;
        var sum_movie_rating = 0.0;
        var cnt = 0;
        db.ml_ratings.find({movieId: doc.movieId}, {rating: 1}).forEach(
            function(doc_rating) {
                sum_movie_rating = sum_movie_rating + doc_rating.rating;
                cnt = cnt + 1;
            }
        )
        total = total + (doc.rating - sum_movie_rating / cnt);
    }
)
let end_time = new Date();


var bias = (total / total_cnt).toFixed(3);
print(bias);
print("수행시간: " + ((end_time - start_time) / 1000.0) + "초");