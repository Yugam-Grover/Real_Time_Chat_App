const generateMessage = (username, content) => {
  return {
    username,
    content,
    createdAt: new Date().getTime(),
  };
};

module.exports = {
  generateMessage,
};
