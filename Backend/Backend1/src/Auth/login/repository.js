const Employee = require('../../models/Employee');
const bcrypt = require('bcrypt');

async function getUserForLoginData(email, password) {
  const userResp = await Employee.find({ email, password });
  const user = userResp[0];
  if (!user) {
    return null;
  }

  const isPasswordValid = (password == user.password);
  
  if (!isPasswordValid) {
    return user;
  }

  return {
    id: user._id,
    username: user.email,
    created_at: user.createdAt,
  };
};

async function getUserById(id) {
  const user = await Employee.findById(id);
  return user
}

module.exports = {
  getUserForLoginData,
  getUserById,
};
