if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const ejsMate = require('ejs-mate')
const session = require('express-session')
const flash = require('connect-flash')
const ExpressError = require('./utilities/expressError.js')
const catchAsync = require('./utilities/catchAsync')

const Social = require('./models/socialLink')
const About = require('./models/aboutBlurbs')
const Attribution = require('./models/attributions')

const dbUrl = process.env.DB_URL

const mkRoutes = require('./routes/mkRoutes')
const aboutRoutes = require('./routes/about')

const app = express()

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'o7 connection error:'));
db.once('open', () => {
    console.log('o7 database connected')
})

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

const secret = process.env.SECRET

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: { secret }
})

store.on('error', function (e) {
    console.log('session store error oops')
})

const sessionConfig = {
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}
app.use(session(sessionConfig))
app.use(flash())

app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})


app.use('/about', aboutRoutes)
app.use('/', mkRoutes)


app.get('/', ((req, res) => {
    res.render('landing')
}))


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    if (!err.message) err.message = 'Please Try Again!'
    res.status(statusCode).render('error', { err })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`o7 mykha-site up and running: ${port}`)
})