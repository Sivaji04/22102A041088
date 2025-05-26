import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [windowState, setWindowState] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [avg, setAvg] = useState(0);

  const windowSize = 10;

  useEffect(() => {
    fetchData('e'); // Fetch initial numbers when component mounts
  }, []);

  const fetchData = async (type) => {
    try {
      const response = await axios.get(`http://20.244.56.144/test/${type}`);

      const newNumbers = response.data.numbers;

      const updatedNumbers = [...numbers, ...newNumbers].slice(-windowSize);
      const updatedWindowState = [...windowState, ...newNumbers].slice(-windowSize);

      setNumbers(updatedNumbers);
      setWindowState(updatedWindowState);
      calculateAverage(updatedNumbers);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculateAverage = (nums) => {
    const sum = nums.reduce((acc, curr) => acc + curr, 0);
    setAvg((sum / Math.min(nums.length, windowSize)).toFixed(2));
  };

  return (
    <div className="App">
      <button onClick={() => fetchData('e')}>Fetch Even Numbers</button>
      <button onClick={() => fetchData('primes')}>Fetch Prime Numbers</button>
      <button onClick={() => fetchData('fibo')}>Fetch Fibonacci Numbers</button>
      <button onClick={() => fetchData('rand')}>Fetch Random Numbers</button>
      <div>
        <pre>
          {"windowPrevState": JSON.stringify(windowState.slice(0, windowState.length - numbers.length), null, 2)}
        </pre>
        <pre>
          {"windowCurrState": JSON.stringify(windowState, null, 2)}
        </pre>
        <pre>
          {"numbers": JSON.stringify(numbers, null, 2)}
        </pre>
        <pre>
          {"avg": avg}
        </pre>
      </div>
    </div>
  );
}

export default App;