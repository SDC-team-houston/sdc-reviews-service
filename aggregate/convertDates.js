const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileToRead = 'reviews.csv';
  const fileToWrite = 'new-test.csv';

  const fileStream = fs.createReadStream(fileToRead);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  let firstLine = true;

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    splitLine = line.split(',');
    if (splitLine.length !== 12) {
      continue;
    }
    if (!firstLine) {
      let date = Number(splitLine[3]) || splitLine[3].replace(/"/g, '');
      date = new Date(date);
      splitLine[3] = date;
    }
    firstLine = false;

    const data = splitLine.join(',') + '\n';

    fs.appendFile(fileToWrite, data, (err) => {
      if (err) throw err;
    });
  }
}

processLineByLine();
