const { parse } = require('csv-parse');
const fs = require('fs');

const results = [];

fs.createReadStream('kepler_data.csv')
  .pipe(
    parse({
      comment: '#',
      columns: true,
    })
  )
  .on('data', (data) => {
    results.push(data);
  })
  .on('error', (err) => {
    console.log('(IOB) Error at reading the file: ', err);
  })
  .on('end', () => {
    console.log(results);
    console.log('done reading the file');
  });
