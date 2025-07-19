const express = require("express");
var app = express();
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());
connectDB();

app.use("/uploads", express.static("uploads"));

const indexrouter = require("./routes/indexRoute");
const regiRouter = require("./routes/regiRoutes");
const loginRouter = require("./routes/loginRoute");

app.use("/", indexrouter);
app.use("/regi", regiRouter);
app.use("/login", loginRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
