// Question #2: 특정 사용자 tag가 입력된 영화를 추출하고자 한다. 사용자 tag(input_tag)가 주어졌을 때,
// 해당 tag가 설정된 영화의 title을 전부 출력하시오. 중복이 발생하여도 된다.

// 입력 받은 input_tag를 ml_tags collection에서 찾아 movieId만 가져온다.
db.ml_tags.find({tag: input_tag}, {movieId: 1}).forEach(
    // 가져온 movieId 각각에 대해서 ml_movies collection의 movieId와 일치하는 것을 검색한다.
    function(doc) { 
        db.ml_movies.find({movieId: doc.movieId}).forEach(
            // ml_movies에서 찾은 movie 정보 중 title만 출력한다.
            function(movie_doc) {
                // 찾은 영화 Title을 출력함
                print(movie_doc.title) 
            }
        ) // END: movie title 찾아서 출력
    } // END: movieID 비교
)