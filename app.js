require("dotenv").config();

const express = require("express");
const cors = require("cors");

const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const insurancePolicyRoutes = require("./routes/insurancePolicyRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware umum
app.use(cors());
app.use(logger);
app.use(express.json());

// Route
app.use("/api/insurance-policies", insurancePolicyRoutes);

// 404
app.use((req, res, next) => {
  const error = new Error(
    `Route ${req.method} ${req.originalUrl} tidak ditemukan`
  );

  error.status = 404;

  next(error);
});

// Error handler terpusat
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});