import express from "express";
import client from "prom-client";

const app = express();

export const restResponseTimeHistogram = new client.Histogram({
  name: "rest_response_time_duration_seconds",
  help: "REST API response time in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.05, 0.1, 0.15, 0.2, 0.25, 0.3]
});

export const databaseResponseTimeHistogram = new client.Histogram({
  name: "db_response_time_duration_seconds",
  help: "Database response time in seconds",
  labelNames: ["operation", "success"],
});

export function startMetricsServer() {
  const collectDefaultMetrics = client.collectDefaultMetrics;

  collectDefaultMetrics();

  app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    console.log(res)
    return res.send(await client.register.metrics());
  });

  app.listen(9100, () => {
    console.log("Metrics server started at http://localhost:9100");
  });
}