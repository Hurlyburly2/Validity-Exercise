const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const multer = require('multer')
const upload = multer({ dest: 'tmp/csv/' });

const findDuplicateRecords = require('./utils/findDuplicateRecords')

app.listen(port, () => console.log(`Listening on port ${port}`))

app.post('/upload', upload.single('uploadCsv'), (req, res) => {
  if (!req.file) {
    // Send an error if there's no file
    res.json("Please upload a file")
  }
  findDuplicateRecords(req.file.path).then((result) => {
    console.log(result)
    // Send the results of the data parsing
    res.json(result)
  }).catch((error) => {
    // Send any error that could've come up during the data parsing (eg. bad CSV)
    res.json(error)
  })
})

