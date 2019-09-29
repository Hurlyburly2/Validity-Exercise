const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const fs = require('fs')
const csv = require('csv-parser')

const multer = require('multer')
const upload = multer()

app.listen(port, () => console.log(`Listening on port ${port}`))

app.get('/', (req, res) => {
  res.send()
})

app.post('/upload', upload.single('uploadCsv'), (req, res) => {
  const csv = req.file.buffer.toString('utf8');
  console.log(csv);
  res.json(csv);
})

