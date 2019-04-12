const express = require('express')
const multer = require('multer')
//Initialize Routers 
const router = express.Router()
//Import Controllers
const controller = require('../controllers/user')


//Instantiate Middleware Services
const storage = multer.diskStorage({
    destination: function(req, file, done) {
        done(null, 'uploads/user/')
    },
    filename: function(req, file, done) {
        done(null, file.fieldname + '-' + Date.now())
    }
})
const upload = multer({storage: storage})


//Route-Specific Middlewares
const redirectLogin = function(req, res, next) {

    if (!req.session.userID) {
        res.redirect('/login')
    } else {
        next()
    }
}

const redirectDashboard = function(req, res, next) {

    if (!req.session.userID) {
        res.redirect('/dashboard')
    } else {
        next()
    }
}

//Mount Routes//
router.post('/signup', controller.signup)
router.post('/login' , controller.login)
//router.get('/dashboard', controller.dashboard)
router.post('/logout', controller.logout)
router.get('/all', controller.getAllUsers)
router.post('/search', controller.getUserByID)
router.post('/addFriend', controller.addFriend)
router.post('/removeFriend', controller.removeFriend)
router.post('/createProject/:title/:id', controller.createProject)
router.post('/deleteProject/:id', controller.deleteProject)
router.put('/updateBio', controller.updateBio)
router.post('/upload/image', upload.single('image'), controller.uploadImage)

//jake routes
router.post('/getStuff', controller.getStuff)
//Export Router//
module.exports = router
