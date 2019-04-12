const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const multer = require('multer')
const session = require('express-session')
const logger = require('morgan')
const fs = require('fs')
//Initialize Routers
const router = express.Router()


//Instantiate Middleware Services
const storage = multer.diskStorage({
    destination: function(req, file, done) {
        done(null, 'uploads/radio/')
    },
    filename: function(req, file, done) {
        done(null, file.fieldname + '-' + Date.now() + path)
    }
})
const upload = multer({storage: storage})

router.get('/', function(req,res) {

	return res.render('radio')
})

router.get('/play', function(req, res) {
    //res.send("Volvme radio stream")

    const playlist = []
    fs.readdir('uploads/radio/', function(err, files) {

        if (err) res.status(500).json(err)
        files.forEach(file => {
            fs.exists(file, function(exists){
                const filePath = 'uploads/radio/' + file
                const radioStream = fs.createReadStream(filePath)
                radioStream.pipe(res)
            })
        })
        
    })
})

router.post('/upload', upload.single('radioUpload'), function(req, res) {

    const file = req.file
    if (!file) return res.status(500).send('Please upload a file')
    console.log('successful file upload')
	return res.status(200).redirect('back')
})

module.exports = router