/* eslint-disable no-restricted-syntax */
const fs = require('fs');

/*
  CURRENTLY THIS DOES NOT WORK, IT IS BUILT TO READ ONE LINE AT
  A TIME BUT IS READING CHUNKS INSTEAD
*/

async function processLineByLine() {
  const fileToRead = './csv/reviews.csv';
  const fileToWrite = 'pipe-test.csv';

  const readStream = fs.createReadStream(fileToRead);
  const writeStream = fs.createWriteStream(fileToWrite);

  readStream.on('data', (row) => {
    console.log(row.toString());
    let firstLine = true;
    // Each line in input.txt will be successively available here as `line`.
    const splitLine = row.split(',');

    if (splitLine.length === 12) {
      if (!firstLine) {
        let date = Number(splitLine[3]) || splitLine[3].replace(/"/g, '');
        date = new Date(date);
        splitLine[3] = date;
      }
      firstLine = false;

      const data = `${splitLine.join(',')}\n`;

      writeStream.write(data);
    }
  });
}

processLineByLine();

db.combined_reviews
  .aggregate([
    { $match: { id: 5 } },
    {
      $project: {
        body: 1,
        id: 1,
        date: 1,
        helpfulness: 1,
        photos: { id: 1, url: 1 },
        product_id: 1,
        rating: 1,
        recommend: 1,
        reported: 1,
        response: 1,
        reviewer_email: 1,
        reviewer_name: 1,
        summary: 1,
      },
    },
    {
      $merge: {
        into: {
          db: 'myDB',
          coll: 'project_test',
        },
      },
    },
  ])
  .pretty();
