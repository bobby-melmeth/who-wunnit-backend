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
exports.startMetricsServer = exports.databaseResponseTimeHistogram = exports.restResponseTimeHistogram = void 0;
const express_1 = __importDefault(require("express"));
const prom_client_1 = __importDefault(require("prom-client"));
const app = (0, express_1.default)();
exports.restResponseTimeHistogram = new prom_client_1.default.Histogram({
    name: "rest_response_time_duration_seconds",
    help: "REST API response time in seconds",
    labelNames: ["method", "route", "status_code"],
    buckets: [0.05, 0.1, 0.15, 0.2, 0.25, 0.3]
});
exports.databaseResponseTimeHistogram = new prom_client_1.default.Histogram({
    name: "db_response_time_duration_seconds",
    help: "Database response time in seconds",
    labelNames: ["operation", "success"],
});
function startMetricsServer() {
    const collectDefaultMetrics = prom_client_1.default.collectDefaultMetrics;
    collectDefaultMetrics();
    app.get("/metrics", (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.set("Content-Type", prom_client_1.default.register.contentType);
        console.log(res);
        return res.send(yield prom_client_1.default.register.metrics());
    }));
    app.listen(9100, () => {
        console.log("Metrics server started at http://localhost:9100");
    });
}
exports.startMetricsServer = startMetricsServer;
