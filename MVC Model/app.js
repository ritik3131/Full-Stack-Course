const express = require('express')
const app = express()
const peopleRouter= require('./router/people');
const authRouter= require('./router/auth');
//MVC model v-view c-controller

// static assets
app.use(express.static('./method_public'))
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())

app.use('/login',authRouter)

app.use('/api/people',peopleRouter);

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})