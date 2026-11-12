const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const petRoutes = require("./routes/pets");
const contactRoutes = require("./routes/contact");
const dashboardRoutes = require("./routes/dashboard");
const favoriteRoutes = require("./routes/favorite");




const app = express();
app.use(express.json());
app.use(cors());


app.use("/auth", authRoutes);
app.use("/pets", petRoutes);
app.use("/contact", contactRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/favorite", favoriteRoutes);

module.exports = app;
