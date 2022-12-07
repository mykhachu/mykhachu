const express = require('express')
const router = express.Router({ mergeParams: true })
const about = require('../controllers/about')
const catchAsync = require('../utilities/catchAsync')

const About = require('../models/aboutBlurbs')

router.get('/',
    catchAsync(about.index)
)

router.get('/bio',
    catchAsync(about.bio)
)

router.get('/vtuber',
    catchAsync(about.vtuber)
)

router.get('/attributions',
    catchAsync(about.attributions)
)

module.exports = router