const express = require('express');
const http = require('http');
const cors = require('cors');
const env = require("dotenv").config();
const connectDB = require("./config/db.config");
const router = require("./routers/index.router");
const morgan = require("morgan")
const errorHandler = require("./middleware/errorHandler");
const bodyparser = require("body-parser");

connectDB();//made connnection to server

//creating express app
const app = express();
app.use(bodyparser.json())
app.use(cors());
app.use(morgan("dev"));

//initialize the routers
app.use("/",router);

app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);//run server on http
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});