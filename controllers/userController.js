const userService = require("../services/userService");
const userDto = require("../dtos/userDto");
const SuccessHandler = require("../SuccessResponse"); 

// api to create user

const createUser = async (req, res) => {
  const userData = req.body;
  console.log(userData);
  try {
    const user = await userService.createUser(userData);
    SuccessHandler.sendResponse(
      res,
      userDto(user),
      "User created successfully",
      201
    );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// api to fetch user by Id

const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const userResponse = await userService.getUserById(userId);

    if (userResponse.error) {
      res.status(404).json({ error: userResponse.error });
    } else if (userResponse.message) {
      res.status(200).json({ message: userResponse.message });
    } else {
      SuccessHandler.sendResponse(
        res,
        userDto(userResponse),
        "User found",
        200
      );
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// api to fetch users list 

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    SuccessHandler.sendResponse(
      res,
      users.map(userDto),
      "Users retrieved successfully",
      200
    );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




// api to update user  

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const updateData = req.body;
  try {
    const user = await userService.updateUser(userId, updateData);
    if (user) {
      SuccessHandler.sendResponse(
        res,
        userDto(user),
        "User updated successfully",
        200
      );
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// api to delete user  

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userService.deleteUser(userId);
    if (user) {
      SuccessHandler.sendResponse(
        res,
        userDto(user),
        "User deleted successfully",
        200
      );
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// api to restore soft-deleted user  

const restoreUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const restoredUser = await userService.restoreUserById(userId);

    if (restoredUser.error) {
      res.status(404).json({ error: restoredUser.error });
    } else {
      SuccessHandler.sendResponse(
        res,
        userDto(restoredUser),
        "User restored successfully",
        200
      );
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
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
