// TODO:

let start_time = new Date();    // 시간 측정 시작

db.ml_tags.createIndex({"tags":1})
// bittersweet 검색 :
// 519 ms , 1093360 개 서치  -> 6ms, 2044 개 서치



db.ml_ratings.createIndex({"movieId":1})

// var input_title = "Memnto (2000)" 검색
// 11454ms ,25000095개 서치  -> 173ms , 41195 개 서치



db.ml_ratings.createIndex({"userId":1})


// var input_userid = 54313 검색
// 11590 ms, 25000095개 서치 -> 2ms , 778개 서치


let end_time = new Date();  // 시간 측정 종료
print("수행시간: " + ((end_time - start_time) / 1000.0) + "초");

