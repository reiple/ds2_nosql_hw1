
db.ml_tags.find({tag: input_tag}, {movieId: 1}).forEach(
    function(doc) { 
        db.ml_movies.find({movieId: doc.movieId}).forEach(
            function(movie_doc) { 
                print(movie_doc.title) 
            }
        )
    }
)