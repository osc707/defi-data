#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
const fileName = `${__dirname}/_data/defi.json`;

fs.readFile(fileName, 'utf-8', (err, data) => {
  const file = JSON.parse(data);
  const invested = file.deposits.map((deposit) => deposit.amount).reduce((acc, value) => value + acc);
  console.log(`$${invested}`);
});