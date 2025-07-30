const routes = (app) => {
  app.use("/api/auth", require("../controller/authController"));
};

module.exports = routes;

