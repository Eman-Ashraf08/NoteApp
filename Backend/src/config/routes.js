const routes = (app) => {
  app.use("/api/auth", require("../controller/authController"));
  app.use("/api/notes", require("../controller/noteController"));
};

module.exports = routes;

