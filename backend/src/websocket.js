const socketio = require("socket.io");
const parseStringAsArray = require("./utils/parseStringAsArray");
const calculateDistance = require("./utils/calculateDistance");
const connections = [];
let io;

exports.setupWebSocket = server => {
  io = socketio(server);

  io.on("connection", socket => {
    const { latitude, longitude, technologies } = socket.handshake.query;

    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude)
      },
      technologies: parseStringAsArray(technologies)
    });
  });
};

exports.findConnections = (coordinates, technologies) => {
  return connections.filter(connection => {
    return (
      calculateDistance(coordinates, connection.coordinates) < 10 &&
      connection.technologies.some(item => technologies.includes(item))
    );
  });
};

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
      io.to(connection.id).emit(message, data)
  });
};
