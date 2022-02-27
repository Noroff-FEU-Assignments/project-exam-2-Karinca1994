const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "https://holidaze-karinca-api.herokuapp.com",
      "via.placeholder.com",
    ],
  },
};
