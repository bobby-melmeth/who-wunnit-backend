"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./src/components/User/routes"));
const errorHandler_1 = __importDefault(require("./src/utils/errorHandler"));
const routes_2 = __importDefault(require("./src/components/League/routes"));
const routes_3 = __importDefault(require("./src/components/Teams/routes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use(express_1.default.json());
app.use(errorHandler_1.default);
app.use('/users', routes_1.default);
app.use('/teams', routes_3.default);
app.use('/competition', routes_2.default);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
