const express = require('express')
const app = express()
const port = 3000;

app.get('/', function (req, res) {
  res.send('Hello World');
  console.log('Palm')
})

app.listen(port,()=>{
  console.log(`app start port ${port}`)
})