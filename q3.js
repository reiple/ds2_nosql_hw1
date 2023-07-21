sum = 0; // 평점의 합을 계산하기 위한 변수
cnt = 0; // 영화의 평점 개수

let start_time = new Date();    // 시간 측정 시작

// 입력 받은 영화 제목으로 ml_movies collection을 검색하여 movieId만 추출
db.ml_movies.find({title: input_title}, {movieId: 1}).forEach(

    // 각 movieID마다 실행 (cursor를 통해 읽음)
    function(doc_movie) {
        // ml_ratings collection에서 영화 평점을 가져옴
        db.ml_ratings.find({movieId: doc_movie.movieId}, {rating: 1}).forEach(
            function(doc_rating) {
                // 가져온 영화 평점을 sum에 더하고, 개수를 증가
                sum = sum + doc_rating.rating;
                cnt = cnt + 1
            }
        )
    }
)
let end_time = new Date();  // 시간 측정 종료

// 평균평점 계산
var avg = (sum / cnt).toFixed(3);
print(avg);
print("수행시간: " + ((end_time - start_time) / 1000.0) + "초");
