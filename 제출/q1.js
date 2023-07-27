// Q2에서 tag를 기준으로 movieId를 추출할것이기 때문에 tag를 Index key로 설정
// ----------------------------------------------------------------------------------------------
// 개선 사항
// bittersweet 검색 :
// 519 ms , 1093360 개 서치  -> 6ms, 2044 개 서치
db.ml_tags.createIndex({tag:1})

// 1. Q2에서 ml_tags collection에서 검색하고자 하는 tag가 입력된 movieId를 추출하고, 
// 추출된 movieId를 기준으로 ml_movies collection에서 tilte을 찾아야 하므로
// ml_movies collection의 search key가 되는 movieId를 Index Key로 설정
// 2. Q3에서 ml_movies collection에서 영화 title로 movieId를 검색 후 
// ml_ratings collection에서 movieId를 search key로 하여 raing을 추출할것이기 때문에
// ml_movies에는 title을, ml_ratings에는 movieId를 index로 설정
// ----------------------------------------------------------------------------------------------
// 개선 사항 1: Q3에서 검색 개선
// var input_title = "Memnto (2000)" 검색 :
// 11454ms ,25000095개 서치  -> 173ms , 41195 개 서치
db.ml_movies.createIndex({movieId:1})
db.ml_movies.createIndex({title: 1})
db.ml_ratings.createIndex({movieId: 1})


// Q4에서특정 고객에 대한 평점 성향 파악 위해 input_userid 기준으로 검색해야 하기 때문에 userId를 Index Key로 추가. 
// ----------------------------------------------------------------------------------------------
// 개선 사항 1: Q4에서 검색 개선
// var input_userid = 54313 검색
// 11590 ms, 25000095개 서치 -> 2ms , 778개 서치
db.ml_ratings.createIndex({"userId":1})