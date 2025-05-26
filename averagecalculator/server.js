const express = require('express');
const app = express();
const numberRoutes = require('./routes/numberRoute');

app.use(express.json());
app.use('/numbers', numberRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Average Calculator API!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
