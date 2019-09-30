const fs = require('fs')
const csv = require('fast-csv')
const levenshtein = require('js-levenshtein');


let emailChecker = {};
let duplicates = [];
let notDuplicates = [];

// row format by index:
  // 0: id    1: first_name   2: last_name    3: company
  // 4: email 5: address1     6: address2     7: zip
  // 8: city  9: state_long   10: state       11: phone

const generateObject = (row) => {
  return {
    id: row[0],
    first_name: row[1],
    last_name: row[2],
    company: row[3],
    email: row[4],
    address1: row[5],
    address2: row[6],
    zip: row[7],
    city: row[8],
    state_long: row[9],
    state: row[10],
    phone: row[11]
  }
}

const closeMatch = (object1, object2, property) => {
  if (levenshtein(object1[property], object2[property]) < 2) {
    return 1
  }
  return 0
}

const checkDuplicates = (currentRow, allRows) => {
  const newObject = generateObject(currentRow);
  // As the most common match, we check first for exact duplicate emails to save us some work
  if (emailChecker[newObject.email.toLowerCase()]) {
    return true;
  } else {
    emailChecker[newObject.email.toLowerCase()] = newObject;
    // Then we check for similar names
    allRows.forEach((row) => {
      similarityScore = 0;
      similarityScore += closeMatch(newObject, row, "first_name") * 3
      similarityScore += closeMatch(newObject, row, "last_name") * 3
      if (similarityScore == 6) {   // if names are similar, check other fields
        similarityScore += closeMatch(newObject, row, "company") * 3
        similarityScore += closeMatch(newObject, row, "email") * 1
        similarityScore += closeMatch(newObject, row, "address1") * 3
        similarityScore += closeMatch(newObject, row, "address2")
        similarityScore += closeMatch(newObject, row, "zip")
        similarityScore += closeMatch(newObject, row, "city") * 3
        similarityScore += closeMatch(newObject, row, "state_long") * 2
        similarityScore += closeMatch(newObject, row, "state") * 2
        similarityScore += closeMatch(newObject, row, "phone") * 4
      }
      // Points for close matches are weighted based on my opinion of how important these are to finding duplicate people, these weights are opinion and can be adjusted
      // Total possible score for an exact match would be = 26
      if (similarityScore > 8) {
        return true;
      }
    })
  }
  return false;
}

const findDuplicateRecords = (filePath) => {
  const allRows = [];
  let firstRow = true;
  let validCSV = true;
  emailChecker = {};
  duplicates = [];
  notDuplicates = [];
  return new Promise((res, rej) => {
    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: false }))
      .on('data', row => {
        if (firstRow) { // Check for bad csv input
          if (row.join(',') !== 'id,first_name,last_name,company,email,address1,address2,zip,city,state_long,state,phone') {
            validCSV = false;
            rej('Improper CSV, please upload a Validity Exercise csv file', error => rej(error))
          }
          firstRow = false;
        } else if (validCSV) {
          let isDuplicate = checkDuplicates(row, allRows)
          const currentObject = generateObject(row)
          if (isDuplicate) {
            duplicates.push(currentObject);
          } else {
            notDuplicates.push(currentObject);
          }
          allRows.push(currentObject)
        }
      })
      .on('Error reading csv', error => rej(error))
      .on('end', () => res({
        duplicates,
        notDuplicates
      }))
  })
}

module.exports = findDuplicateRecords;