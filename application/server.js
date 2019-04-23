const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('application/views', {
    autoescape: true,
    express: app,
    watch: true
})

app.set('view engine', 'njk')
    .use(express.urlencoded({ extended: false }))
    .listen(3002)

const checkAgeMiddleware = (req, res, next) => {
    const { age } = req.query

    if (!age) return res.redirect('/')

    return next()
}

app.get('/', (req, res) => {
    return res.render('index')
})

app.get('/minor', checkAgeMiddleware, (req, res) => {
    const { age } = req.query
    return res.render('minor', { age })
})

app.get('/major', checkAgeMiddleware, (req, res) => {
    const { age } = req.query
    return res.render('major', { age })
})

app.post('/checkAge', (req, res) => {
    const { age } = req.body

    if (age >= 18) {
        return res.redirect(`/major?age=${age}`)
    } else {
        return res.redirect(`/minor?age=${age}`)
    }
})
