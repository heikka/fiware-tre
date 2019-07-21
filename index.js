const express = require('express')
const app = express()

app.use(express.static('build'))

app.use('/tre', function (req, res, next) {
    console.log('Request Type:', req.method)
    res.status(500).send('Just test!')
    next()
})

app.listen(3000, () => console.log('Server running on port 3000'))
