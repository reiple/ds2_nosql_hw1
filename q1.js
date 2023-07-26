// 초기화
db.ml_movies.dropIndexes()
db.ml_ratings.dropIndexes()
db.ml_tags.dropIndexes()

// for q2
db.ml_tags.createIndex({tag: 1})
db.ml_movies.createIndex({movieId: 1})
// for q3
db.ml_movies.createIndex({title: 1})
db.ml_ratings.createIndex({movieId: 1})
// for q4
db.ml_ratings.createIndex({userId:1})