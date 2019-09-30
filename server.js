const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const multer = require('multer')
const upload = multer({ dest: 'tmp/csv/' });

const findDuplicateRecords = require('./utils/findDuplicateRecords')

app.listen(port, () => console.log(`Listening on port ${port}`))

app.get('/', (req, res) => {
  res.send()
})

app.post('/upload', upload.single('uploadCsv'), (req, res) => {
  findDuplicateRecords(req.file.path).then((result) => {
    res.json(result)
  }).catch((error) => {
    let newError = "Something went wrong"
    res.json(error)
  })
})

