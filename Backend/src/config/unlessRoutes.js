const unlessRoutes = {
  path: [
    { url: "/api/auth/signup", method: "POST" },
    { url: "/api/auth/login", method: "POST" },
    { url: "/api/auth/verify-email", method: "POST" },
    { url: "/api/auth/verify-otp", method: "POST" },
  ],
};
module.exports = unlessRoutes;
