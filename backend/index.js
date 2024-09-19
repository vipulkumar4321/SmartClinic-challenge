const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

// Environment variables
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

// Start Server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default app;
