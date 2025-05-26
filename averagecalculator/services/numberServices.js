const axios = require('axios');
const { updateWindow } = require('../utils/windowManager');

const API_URLS = {
  p: 'http://20.244.56.144/evaluation-service/primes',
  f: 'http://20.244.56.144/evaluation-service/fibo',
  e: 'http://20.244.56.144/evaluation-service/even',
  r: 'http://20.244.56.144/evaluation-service/rand',
};

let windowSize = 10;
let window = [];

async function getNumbersAndAverage(numberid) {
  const url = API_URLS[numberid];

  if (!url) {
    throw new Error('Invalid number ID');
  }

  let newNumbers = [];

  try {
    const res = await axios.get(url, { timeout: 500 });
    newNumbers = res.data.numbers;
  } catch (error) {
    throw new Error('Failed to fetch numbers from third-party API');
  }

  const previousState = [...window];
  window = updateWindow(window, newNumbers, windowSize);

  const average = window.length
    ? (window.reduce((a, b) => a + b, 0) / window.length).toFixed(2)
    : 0;

  return {
    windowPrevState: previousState,
    windowCurrState: window,
    numbers: newNumbers,
    avg: parseFloat(average),
  };
}

module.exports = { getNumbersAndAverage };
