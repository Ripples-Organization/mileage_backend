const UserService = require("../services/userService");

exports.register = async (req, res) => {
  let userService = new UserService();
  let userData = req.body;

  try {
    let user = await userService.registerUser(userData);
    console.log(user, "UUU");
    res
      .status(200)
      .json({ success: true, user, message: "Registration successful" });
  } catch (error) {
    console.log(error, "yyy");
    res.status(400).json({ success: false, error });
  }
};



exports.login = async (req, res) => {
  let userService = new UserService();
  let userData = req.body;
  try {
    let loginUser = await userService.loginUser(userData);
    let { token, name, referralId } = loginUser;
    res.status(200).json({
      success: true,
      token,
      name,
      referralId,
      message: "Login successful",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, error });
  }
};

exports.updateUserDetail = async (req, res) => {
  let userService = new UserService();
  const { id } = req.payload;
  console.log(req.body, id, "controller");
  let userData = req.body; //_id, //howMuchBudget, //location

  try {
    let userDetails = await userService.updateUserProfile(id, userData);
    res
      .status(200)
      .json({ success: true, user: userDetails, message: "Update successful" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, error });
  }
};
