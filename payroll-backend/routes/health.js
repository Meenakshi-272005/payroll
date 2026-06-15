const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/health', (req, res) => {
  const mongoStatus = mongoose.connection.readyState;
  
  res.json({
    status: 'OK',
    backend: 'running',
    mongodb: mongoStatus === 1 ? 'connected' : 'disconnected',
    mongodbReadyState: mongoStatus,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
