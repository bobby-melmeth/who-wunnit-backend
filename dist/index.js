"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const BaseApiConfig_1 = __importDefault(require("./src/configs/BaseApiConfig"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use(express_1.default.json());
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const headers = BaseApiConfig_1.default.headers;
        const requestConfig = {
            headers: headers,
        };
        const response = yield axios_1.default.get(BaseApiConfig_1.default.apiUrl + 'competitions/competitions/WC/matches', requestConfig);
        console.log(JSON.stringify(response.data, null, 2));
        // Send the response from the API to the client
        res.send(response.data);
    }
    catch (error) {
        // Handle the error and send an error response to the client
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
