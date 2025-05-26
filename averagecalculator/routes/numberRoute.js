const express = require('express');
const router = express.Router();
const { getNumbersAndAverage } = require('../services/numberServices');

router.get('/:numberid', async (req, res) => {
  const numberid = req.params.numberid;

  try {
    const result = await getNumbersAndAverage(numberid);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
