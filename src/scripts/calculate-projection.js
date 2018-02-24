const fs = require('fs');
const path = require('path');

const years = {
  2017: {
    perMonth: 1400,
    yield: 0.1
  },
  2018: {
    perMonth: 1450,
    yield: 0.1
  }
};

const projection = [];
let prev = 0;

Object.keys(years).forEach(year => {
  for (let i = 1; i <= 12; i++) {
    const yearData = years[year];
    prev = prev + prev * (yearData.yield / 12) + yearData.perMonth;
    projection.push({
      date: `${year}-${i.toString().padStart(2, '0')}-28`,
      amount: prev
    });
  }
});

fs.writeFile(
  path.resolve('data/projection.json'),
  JSON.stringify(projection),
  err => {
    if (err) console.error(err);
    console.log('done');
  }
);
