const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const cors = require("cors");

require("dotenv").config();
const { PORT } = process.env || 8000;

//require routes

const videos = require("./routes/allVideos");

app.use(cors());
app.use(express.json());
app.use("/static", express.static("public"));

app.use("/videos", videos);

// Start the server listening
// It's convention to have this at the end of the file
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
