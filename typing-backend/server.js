require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes   = require("./routes/authRoutes");
const resultRoutes = require("./routes/resultRoutes");
const userRoutes   = require("./routes/userRoutes");

const app = express();


connectDB();


app.use(cors());
app.use(express.json());


app.use(authRoutes);
app.use(resultRoutes);
app.use(userRoutes);


app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
