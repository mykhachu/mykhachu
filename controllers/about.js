const About = require('../models/aboutBlurbs')
/* const { cloudinary } = require("../cloudinary"); */

module.exports.index = async (req, res) => {
    const aboutInfo = await About.find({})
    res.render('about/index', { aboutInfo })
}

module.exports.bio = async (req, res) => {
    const aboutInfo = await About.findById({ _id: "63893e2babf364221e17482a" })
    if (!aboutInfo) {
        req.flash('error', 'Oops, this is not the right path!')
        return res.redirect('/about')
    }
    res.render('about/show', { aboutInfo })
}

module.exports.vtuber = async (req, res) => {
    const aboutInfo = await About.findById({ _id: "63893e47abf364221e17482b" })
    if (!aboutInfo) {
        req.flash('error', 'Oops, this is not the right path!')
        return res.redirect('/about')
    }
    res.render('about/show', { aboutInfo })
}

module.exports.attributions = async (req, res) => {
    const aboutInfo = await About.findById({ _id: "63893e6eabf364221e17482c" })
    if (!aboutInfo) {
        req.flash('error', 'Oops, this is not the right path!')
        return res.redirect('/about')
    }
    res.render('about/show', { aboutInfo })
}

