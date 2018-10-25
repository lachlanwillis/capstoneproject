"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer = require("multer");
var images_route_1 = require("./images.route");
var messages_route_1 = require("./messages.route");
var users_route_1 = require("./users.route");
var leaderboard_route_1 = require("./leaderboard.route");
var authentication_1 = require("../authentication");
var ensureLogin_1 = require("../middleware/ensureLogin");
var stats_route_1 = require("./stats.route");
// This is just a work in progress. We need to decide where we will be
// storing all the image files that get uploaded.
var upload = multer({ dest: "assets/" });
exports.Router = express_1.Router();
exports.Router
    .post("/api/login", authentication_1.authentication.authenticate("local"), users_route_1.HandleUserLogin)
    .post("/api/signup", users_route_1.HandleUserSignup)
    .get("/api/auth/ping", function (req, res) { return res.json({ auth: !!req.user }); })
    .get("/api/logout", users_route_1.HandleUserLogout)
    .get("/api/isadmin", users_route_1.IsUserAdmin)
    .get("/api/auth/user", function (req, res) { return res.json(req.user); })
    .get("/api/get-users", ensureLogin_1.ensureAdmin, users_route_1.GetUsers)
    .put('/api/message-user', messages_route_1.SendMessageHandler)
    .put('/api/user/change-password', users_route_1.UpdatePasswordHandler)
    .get("/api/auth/facebook", authentication_1.authentication.authenticate("facebook", {
    scope: ["public_profile", "email"]
}))
    .get("/api/auth/facebook/callback", authentication_1.authentication.authenticate("facebook", {
    failureRedirect: "/login"
}), function (req, res) { return res.redirect("/browse-public"); })
    .get("/api/auth/google", authentication_1.authentication.authenticate("google", {
    scope: ["profile", "email"]
}))
    .get("/api/auth/google/callback", authentication_1.authentication.authenticate("google", {
    failureRedirect: "/login"
}), function (req, res) { return res.redirect("/browse-public"); })
    .post("/api/user/promote", ensureLogin_1.ensureAdmin, users_route_1.PromoteUser)
    .post("/api/user/demote", ensureLogin_1.ensureAdmin, users_route_1.DemoteUser)
    .get("/api/users", ensureLogin_1.ensureAdmin, users_route_1.GetUsersHandler)
    .post("/api/delete-user", ensureLogin_1.ensureAdmin, users_route_1.DeleteUserHandler)
    .put("/api/user/optout", ensureLogin_1.ensureLoggedIn, users_route_1.OptOutLeaderboard)
    .put("/api/user/optin", ensureLogin_1.ensureLoggedIn, users_route_1.OptInLeaderboard)
    .put("/api/user/changename", ensureLogin_1.ensureLoggedIn, users_route_1.UpdateUserName)
    .put("/api/user/changeemail", ensureLogin_1.ensureLoggedIn, users_route_1.UpdateUserEmail)
    .put("/api/user/postcode", ensureLogin_1.ensureLoggedIn, users_route_1.SetPostcodeHandler)
    .post("/api/upload-image", ensureLogin_1.ensureLoggedIn, upload.single("image"), images_route_1.UploadImageHandler)
    .put("/api/update-my-image", ensureLogin_1.ensureLoggedIn, images_route_1.UpdateMyImageHandler)
    .get("/api/display-image", images_route_1.GetImageHandler)
    .get("/api/my-images", ensureLogin_1.ensureLoggedIn, images_route_1.GetMyImagesHandler)
    .get("/api/flagged-images", ensureLogin_1.ensureAdmin, images_route_1.GetFlaggedImagesHandler)
    .put("/api/accept-flagged-images", ensureLogin_1.ensureAdmin, images_route_1.AcceptFlaggedImageHandler)
    .delete("/api/my-image/:id", ensureLogin_1.ensureLoggedIn, images_route_1.DeleteMyImageHandler)
    .delete("/api/delete-image/:id", images_route_1.DeleteImageHandler)
    .get("/api/my-messages", ensureLogin_1.ensureLoggedIn, messages_route_1.GetMyMessagesHandler)
    .delete("/api/my-message/:id", ensureLogin_1.ensureLoggedIn, messages_route_1.DeleteMyMessageHandler)
    .get("/api/verify/decline/:token", users_route_1.DeclineUserHandler)
    .get("/api/verify/:token", users_route_1.VerifyUserHandler)
    .post("/api/password/reset", users_route_1.PasswordEmailHandler)
    .put("/api/password/reset", users_route_1.ResetPasswordHandler)
    .get("/api/leaderboard/:location?/:limit?", leaderboard_route_1.GetLeaderboardHandler)
    .get('/api/stats/dist', stats_route_1.RubbishDistributionHandler)
    .get('/api/stats/users', stats_route_1.ContributersStats);
