const express = require('express')
const path = require('path')

const app = express()

// setup static and middleware


app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './navbar/index.html'))
  //Second way to access this html is to copy and paste the file and then server will directly servers the html
})


app.all('*', (req, res) => {
  res.status(404).send('resource not found')
})

app.listen(5000, () => {
  console.log('server is listening on port 5000....')
})