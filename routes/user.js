const router = require("express").Router();
let content_type = require("../middlewares/content_type");
let userController = require("../controllers/user");

const { catchErrors } = require("../handlers/errorHandler");

router.post("/register", content_type, userController.register);
router.post("/login", userController.login);

module.exports = router;
