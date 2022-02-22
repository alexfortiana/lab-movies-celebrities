const router = require("express").Router();
const CelebritiesModel = require("../models/Celebrity.model")


// ahorramos celebrities
router.get("/create", (req, res, next) =>{
    res.render("celebrities/new-celebrity.hbs")
})
// ahorramos celebrity
router.post("/create", (req, res, next) =>{
    CelebritiesModel.create({
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    })
    .then((newCelebrity)=>{
        res.redirect("/celebrities")
    })
    .catch((err)=>{
        next(err)
    })


    
})

router.get("/", (req, res, next)=>{
    CelebritiesModel.find()
    .then((allCelebrities) =>{
        res.render("celebrities/celebrities.hbs", {allCelebrities})


    })
    .catch((err) =>{
        next(err)
    })

})





module.exports = router;