const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const router = require("./routes");

// Connect to database
dbConnect();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
