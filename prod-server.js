const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// Connect database asynchronously
connectDB();

// Init Middleware
app.use(express.json()); //{ extended: false }));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/playerComparison", require("./routes/api/playerComparison"));
app.use("/api/playerRating", require("./routes/api/playerRating"));
app.use("/api/leaderboard", require("./routes/api/leaderboard"));

// Serve static assets in production
//Set static folder

app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
