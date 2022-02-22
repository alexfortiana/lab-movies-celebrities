const router = require("express").Router();
const CelebritiesModel = require("../models/Celebrity.model");
const MoviesModel = require("../models/Movie.model")

router.get("/create", (req, res, next)=>{
    CelebritiesModel.find()
    .then((listCelebrities)=>{
        res.render("movies/new-movie.hbs", {listCelebrities})

    })
    .catch((err)=>{
        next(err)
    })
})

router.post("/create", (req, res, next)=>{
    const {title, genre, plot, cast} = req.body
    MoviesModel.create({
        title, 
        genre, 
        plot, 
        cast
    })
    .then((createMovie)=>{
        res.redirect("/movies")
    })
    .catch((err)=>{
        next(err)
    })

})

router.get("/", (req, res, next) =>{
    MoviesModel.find()
    .then((allMovies)=>{
        res.render("movies/movies.hbs", {allMovies})

    })
    .catch((err)=>{
        next(err)
    })

})

router.get("/:id", (req, res, next) =>{
    const {id} = req.params
    MoviesModel.findById(id)
    .populate("cast")
    .then((oneMovie) =>{
        res.render("movies/movie-details", {oneMovie})
    })
    .catch((err)=>{
        next(err)
    })
})

router.post("/:id/delete", (req, res, next)=>{
    const {id} = req.params
    MoviesModel.findByIdAndDelete(id)
    .then((deletedMovie)=>{
        res.redirect("/movies")
    })
    .catch((err)=>{
        next(err)
    })

})

router.get("/:id/edit", async(req, res, next)=>{
    try{
        const {id} = req.params
        const oneMovie = await MoviesModel.findById(id)
        const allCelebrity = await CelebritiesModel.find()
        res.render("movies/edit-movie.hbs", {oneMovie, allCelebrity})

    }
    catch(err){
        next(err)
    }
})

router.post("/:id/edit", (req, res, next) =>{
    const {id} = req.params
    const {title, genre, plot, cast} = req.body
    MoviesModel.findByIdAndUpdate(id, {
        title, genre, plot, cast
    })
    .then((updateMovie) =>{
        res.redirect(`/movies/${updateMovie._id}`)

    })
    .catch((err)=>{
        next(err)
    })
})



// all your routes here




module.exports = router;


