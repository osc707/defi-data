#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
const fileName = `${__dirname}/_data/defi.json`;
const coin = process.argv[2];
const amount = process.argv[3];

fs.readFile(fileName, 'utf8' , (err, data) => {
  const defi = JSON.parse(data);
  const selectedCoin = defi.positions[coin];
  
  if (selectedCoin === null || selectedCoin === undefined) {
    console.log(`Coin ${coin} does not exist in our collection`);
    return;
  }

  console.log(`Amount before buy: ${selectedCoin.owned}`);
  
  const newAmount = selectedCoin.owned + parseFloat(amount);
  defi.positions[coin].owned = newAmount;

  console.log(`Amount after buy: ${newAmount}`);
  fs.writeFile(fileName, JSON.stringify(defi, null, 2), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`File ${fileName} written successfully`);
    }
  });
});