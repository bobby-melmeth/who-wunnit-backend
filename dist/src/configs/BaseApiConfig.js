"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    apiUrl: 'http://api.football-data.org/v4/',
    authToken: 'your-auth-token',
    headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': process.env.API_KEY
    },
};
exports.default = config;
