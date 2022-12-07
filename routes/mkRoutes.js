const express = require('express')
const router = express.Router({ mergeParams: true })
const catchAsync = require('../utilities/catchAsync')
/* const { storage } = require('../cloudinary') */

const socialLink = require('../models/socialLink')

router.route('/home')
    .get(
        ((req, res) => {
            res.render('home')
        })
    )
router.route('/social')
    .get(
        (req, res) => {
            res.redirect('/socials')
        })

router.route('/socials')
    .get(
        catchAsync(async (req, res) => {
            const socials = await socialLink.find({})
            res.render('socials/index', { socials })
        })
    )
router.route('/projects')
    .get(
        ((req, res) => {
            res.render('projects/index')
        })
    )
router.route('/disclosure')
    .get(
        ((req, res) => {
            res.render('disclosure')
        })
    )
router.route('/terms')
    .get(
        ((req, res) => {
            res.render('terms')
        })
    )

module.exports = router