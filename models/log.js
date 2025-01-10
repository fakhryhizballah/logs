const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    appName: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
        enum: ['info', 'warning', 'error'],
    },
    message: {
        type: String,
        required: true,
    },
    metadata: {
        type: Object,
        default: {},
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Log', logSchema);
