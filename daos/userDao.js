const User = require("../models/userModel");

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const getUserById = async (id) => {
  try {
    const data = await User.findById(id);

    if (!data) {
      return { error: "User not found" };
    } else if (data.isDeleted === true) {
      return { message: "This user has been soft-deleted" };
    }
  } catch (error) {
    console.error(`Error fetching user by ID: ${error.message}`);
    return { error: "Server error" };
  }
};

const getUsers = async () => {
  return await User.find({ isDeleted: false });
};

const updateUser = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true }).where({
    isDeleted: false,
  });
};

const deleteUser = async (id) => {
  return await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

const restoreUserById = async (id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return { error: "User not found" };
    } else if (user.isDeleted === false) {
      return { message: "User is already active" };
    } else {
      user.isDeleted = false;
      await user.save();
      return user;
    }
  } catch (error) {
    console.error(`Error restoring user by ID: ${error.message}`);
    return { error: "Server error" };
  }
};

module.exports = {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  restoreUserById,
};
