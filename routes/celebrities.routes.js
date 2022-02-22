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





router.get("/:id", (req, res, next) =>{
    const {id} = req.params
    CelebritiesModel.findById(id)
    .then((oneCelebrity) =>{
        res.render("celebrities/celebrities-details", {oneCelebrity})
    })
    .catch((err)=>{
        next(err)
    })
})
// router.post("/:id", (req, res, next)=>{
//     CelebritiesModel.findById(id)
//     .then((response) =>{
//         res.redirect("/celebrities")
//     })
    
// })

router.post("/:id/delete", (req, res, next)=>{
    const {id} = req.params
    CelebritiesModel.findByIdAndDelete(id)
    .then((response)=>{
        res.redirect("/celebrities")
    })
    .catch((err)=>{
        next(err)
    })

})

router.get("/:id/edit", async(req, res, next)=>{
    try{
        const {id} = req.params
        const oneCelebrity = await CelebritiesModel.findById(id)
        
        res.render("celebrities/edit-celebrity.hbs", {oneCelebrity})

    }
    catch(err){
        next(err)
    }
})

router.post("/:id/edit", (req, res, next) =>{
    const {id} = req.params
    const {name, occupation, catchPhrase} = req.body
    CelebritiesModel.findByIdAndUpdate(id, {
        name, occupation, catchPhrase
    })
    .then((updateCelebrity) =>{
        res.redirect(`/celebrities/${updateCelebrity._id}`)

    })
    .catch((err)=>{
        next(err)
    })
})







module.exports = router;