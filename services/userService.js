const User = require("../models/User");
const sha256 = require("js-sha256");
const jwt = require("jwt-then");

function UserService() {}

const fieldIsEmpty = ({ field = "", name = "" }) => {
  if (!!field === false) {
    throw `${name} cannot be empty`;
  }
};

UserService.prototype.registerUser = async function (userData) {
  const { password, phoneNumber, email, firstName, lastName } = userData;
  fieldIsEmpty({ field: firstName, name: "first name" });
  fieldIsEmpty({ field: lastName, name: "last name" });
  fieldIsEmpty({ field: email, name: "email" });
  fieldIsEmpty({ field: password, name: "password" });
  fieldIsEmpty({ field: phoneNumber, name: "phone number" });

  const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;

  if (!emailRegex.test(email)) throw "Email is not supported from your domain.";

  if (password.length < 6) throw "Password must be atleast 6 characters long";

  if (phoneNumber.length < 11)
    throw "Phone number must be atleast 11 numbers long";

  const userEmailExists = await User.findOne({
    email: email.toLowerCase(),
  });
  if (userEmailExists) throw "User with same email already exists";

  const userPhoneExists = await User.findOne({
    phoneNumber,
  });
  if (userPhoneExists) throw "User with same Phone Number already exists";

  const user = new User({
    firstName,
    lastName,
    email: email.toLowerCase(),
    password: sha256(password + process.env.SALT),
    phoneNumber,
  });

  let savedUser = await user.save();
  const token = await jwt.sign({ id: savedUser._id }, process.env.SECRET);
  let userObj = new Object();
  userObj.token = token;
  userObj.firstName = savedUser.firstName;
  userObj.lastName = savedUser.lastName;
  userObj.phoneNumber = savedUser.phoneNumber;

  return userObj;
};

UserService.prototype.loginUser = async function (userData) {
  const { email, password, type, phoneNumber } = userData;
  fieldIsEmpty({ field: type, name: "type" });
  //type = phone_login or email_login
  if (type === "email_login") {
    fieldIsEmpty({ field: email, name: "email" });
    fieldIsEmpty({ field: password, name: "password" });
  }
  if (type === "phone_login") {
    fieldIsEmpty({ field: phoneNumber, name: "phone number" });
    fieldIsEmpty({ field: password, name: "password" });
  }

  let user;
  user =
    type === "email_login"
      ? await User.findOne({
          email: email.toLowerCase(),
          password: sha256(password + process.env.SALT),
        })
      : await User.findOne({
          phoneNumber: phoneNumber,
          password: sha256(password + process.env.SALT),
        });

  if (!user) throw "Email Address and Password did not match.";
  let { name, _id, referralId } = user;

  const token = await jwt.sign({ id: _id }, process.env.SECRET);
  let userObj = new Object();
  userObj.token = token;
  let savedUser = {};
  userObj.firstName = savedUser.firstName;
  userObj.lastName = savedUser.lastName;
  userObj.phoneNumber = savedUser.phoneNumber;
  return userObj;
};

module.exports = UserService;
