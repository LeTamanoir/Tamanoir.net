const logNewConn = (socket) =>
  console.log(
    `${process.env.BLOG_USERNAME} connected via socket : ${
      socket.id
    } at : ${new Date().toLocaleString()}`
  );

const logOldConn = (socket) =>
  console.log(
    `${process.env.BLOG_USERNAME} disconnected his socket : ${
      socket.id
    } on : ${new Date().toLocaleString()}`
  );

module.exports = { logNewConn, logOldConn };
