
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/dashboard", dashboardRoutes);

const path = require("path");

// Serve Frontend Static Files in Production
const frontendDistPath = path.join(__dirname, "../../frontend/dist");
app.use(express.static(frontendDistPath));

// Catch-all route to serve the Single Page Application (SPA)
app.get("/*splat", (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"), (err) => {
    if (err) {
      console.error("Error sending index.html:", err);
      console.log("Attempted path:", path.join(frontendDistPath, "index.html"));
      res.status(200).send("DineFlow Backend is running. Frontend build not found.");
    }
  });
});

module.exports = app;
