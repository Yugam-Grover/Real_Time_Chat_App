const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const { generateMessage } = require("./utils/messages");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  console.log("Websocket connection connected!");

  socket.emit("message", generateMessage("Welcome!"));
  socket.on("sendMessage", (message, callback) => {
    io.emit("message", generateMessage(message));
    callback();
  });
  socket.broadcast.emit("message", generateMessage("a new user has joined."));
  socket.on("sendLocation", (location, callback) => {
    io.emit(
      "locationMessage",
      generateMessage(
        `https://google.com/maps?q=${location.lat},${location.lon}`,
      ),
    );
    callback();
  });
  socket.on("disconnect", () => {
    io.emit("message", generateMessage("a user has left."));
  });
});
server.listen(PORT, () => {
  console.log("Server is up and running on port:", PORT);
});
