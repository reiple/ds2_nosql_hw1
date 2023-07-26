

// 입력 받은 input_userid에 대한 movieId를 검색한다.
var mIds = db.ml_ratings.find({userId:input_userid}, {_id:0, movieId:1}).map(function(result) {return result.movieId});

// movieID별로 평점의 평균을 구한다.
// 각 movieId에 대한 평균 평점을 tmp_mId_Ratings collection에 저장한다.
db.ml_ratings.aggregate([{$match:{movieId:{$in:mIds}}},
                         {$group:{_id:'$movieId', mId_avg_Rating:{$avg:'$rating'}}},
                         {$out:'tmp_mId_Ratings'}
                        ])


// movieId별 평균 평점을 계산한 collection을 이용하여, lookup으로 JOIN 연산을 수행한다.
var cursor = db.ml_ratings.aggregate([
    {$match:{userId:input_userid}},
    {$lookup:{from:'tmp_mId_Ratings', localField:'movieId', foreignField:'_id', as:'bias_result'}}, // movieId를 기준으로 JOIN
    {$unwind:'$bias_result'},   // 개별 document로 분리
    {$group:{_id:null, total:{$sum:{$subtract:['$rating', '$bias_result.mId_avg_Rating']}}, total_cnt:{$sum:1}}},   // rating - 평균 평점
    {$project: {_id:0, total:1, total_cnt:1}}   // 필요한 필드만 출력
    ]) ;    
    
var total, total_cnt;   // rating - 평균 평점의 합, 개수
    
// JOIN 연산 수행 결과로 평균 평점의 합과 개수를 구한다.
if (cursor.hasNext()) {
        var result = cursor.next();
        total = result.total;
        total_cnt = result.total_cnt;
    }

db.tmp_mId_Ratings.drop()   // 임시 collection 삭제

// 결과 출력
var bias = (total / total_cnt).toFixed(3);
print(bias);