#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';

const __dirname = path.resolve();
const fileName = `${__dirname}/_data/defi.json`;
const amount = process.argv[2];
const date = (process.argv[3]) ? format(new Date(process.argv[3]), 'P') : format(new Date(), 'P');

fs.readFile(fileName, 'utf8' , (err, data) => {
  const defi = JSON.parse(data);
  defi.deposits.push({
    date: date,
    amount: parseFloat(amount)
  });
  fs.writeFile(fileName, JSON.stringify(defi, null, 2), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`File ${fileName} written successfully`);
    }
  });
});