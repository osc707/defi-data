#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';

const __dirname = path.resolve();
const fileName = `${__dirname}/_data/defi.json`;
const today = format(new Date(), 'MM/dd/yyyy');

fs.readFile(fileName, 'utf8' , (err, data) => {
  const defi = JSON.parse(data);
  const deposits = defi.deposits.map((dep) => dep.amount).reduce((prevVal, currentVal) => prevVal + currentVal);
  const currentValue = Object.keys(defi.positions).map((key) => defi.positions[key].value).reduce((prevVal, currentVal) => prevVal + currentVal);
  const gain = currentValue - deposits;
  defi.gain = gain;
  defi.date = today;
  fs.writeFile(fileName, JSON.stringify(defi, null, 2), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`File ${fileName} written successfully`);
    }
  });
});