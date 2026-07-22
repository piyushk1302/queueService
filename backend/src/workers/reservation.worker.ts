import { Worker } from "bullmq";
import redis from "../config/redis.js";
import reservationExpiryService from "../services/reservationExpiry.service.js";

const worker = new Worker(
  "reservation-expiry",
  async (job) => {
    await reservationExpiryService.process(
      job.data.reservationId
    );
  },
  {
    connection: redis,
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed`, err);
});