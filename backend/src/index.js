const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const http = require("http");
const {setupWebSocket} = require("./websocket");

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect(
  "mongodb+srv://Jawbreaker:youvebeenthunderstruck@cluster0-fp6v9.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(cors());
app.use(express.json());
app.use(routes);
// Métodos HTTP: get, post, put, delete

// Tipos de parâmetros:
// Query Params;
// Route Params;
// Body;

server.listen(3333);
