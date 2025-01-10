const express = require('express');
const router = express.Router();
const Log = require('../models/log');

// POST: Tambah log baru
router.post('/logs', async (req, res) => {
    const { appName, level, message, metadata } = req.body;

    if (!appName || !level || !message) {
        return res.status(400).json({ error: 'appName, level, and message are required.' });
    }

    try {
        const newLog = new Log({
            appName,
            level,
            message,
            metadata,
        });
        await newLog.save();
        res.status(201).json(newLog);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// GET: Ambil semua log untuk aplikasi tertentu
router.get('/logs/:appName', async (req, res) => {
    const { appName } = req.params;

    try {
        const logs = await Log.find({ appName });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/search-logs', async (req, res) => {
    const { appName, level, startDate, endDate, keyword } = req.query;

    let filter = {};

    // Filter berdasarkan nama aplikasi
    if (appName) {
        filter.appName = appName;
    }

    // Filter berdasarkan level log
    if (level) {
        filter.level = level;
    }

    // Filter berdasarkan rentang waktu
    if (startDate && endDate) {
        filter.timestamp = {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
        };
    }

    // Filter berdasarkan kata kunci di pesan
    if (keyword) {
        filter.message = { $regex: keyword, $options: 'i' };
    }

    try {
        const logs = await Log.find(filter).sort({ timestamp: -1 });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
