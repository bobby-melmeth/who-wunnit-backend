"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    apiUrl: 'https://localhost:8080/',
    authToken: 'your-auth-token',
    headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': process.env.API_KEY
    },
};
exports.default = config;
