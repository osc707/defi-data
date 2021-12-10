#!/usr/bin/env node

import fs from 'fs';
import { format } from 'date-fns';
import fetch from 'node-fetch';
import path from 'path';

const __dirname = path.resolve();
const today = format(new Date(), 'MM/dd/yyyy');
const fileName = `${__dirname}/_data/defi.json`;
const historyFile = `${__dirname}/_data/defi_history.json`;
let historyFileData = {};

fs.readFile(historyFile, 'utf-8', (err, data) => {
  historyFileData = JSON.parse(data);
});

fs.readFile(fileName, 'utf8', (err, data) => {
  const defi = JSON.parse(data);
  const positions = defi.positions;
  const tickers = Object.keys(positions).join(',');
  fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${tickers}&vs_currencies=USD`,
    {
      headers: {
        'X-CMC_PRO_API_KEY': 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c'
      }
    }
  )
  .then((response) => response.json())
  .then((json) => {
    Object.keys(json).forEach((c) => {
      const coin = positions[c];
      const price = json[c].usd;
      
      coin.price = price;
      coin.lastUpdated = today;
      coin.value = coin.owned * json[c].usd;

      if (!historyFileData.hasOwnProperty(c)) {
        historyFileData[c] = {
          name: defi.positions[c].name,
          ticker: defi.positions[c].ticker,
          priceHistory: []
        };
      }
      historyFileData[c].priceHistory.push({
        date: today,
        price: price
      });
    });

    fs.writeFile(historyFile, JSON.stringify(historyFileData, null, 2), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`File ${historyFile} written successfully`);
      }
    });

    fs.writeFile(fileName, JSON.stringify(defi, null, 2), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`File ${fileName} written successfully`);
      }
    });
  });

});
