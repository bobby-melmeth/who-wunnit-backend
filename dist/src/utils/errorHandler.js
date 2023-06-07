"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, req, res, next) => {
    console.error(error);
    if (res.headersSent) {
        // If headers have already been sent, delegate to the default error handler
        return next(error);
    }
    // Handle specific known errors
    if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    }
    // Handle other unknown errors
    res.status(500).json({ error: 'Internal Server Error' });
};
exports.default = errorHandler;
